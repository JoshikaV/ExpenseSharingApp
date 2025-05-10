// app/actions.ts
'use server';

import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
// import { deleteAllExpensesForOrg } from "@/lib/your-db-utils"; // Your DB logic

export async function getGroupData(id: string, name: string) {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        groupId: id,
      },
      include: {
        splits: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate balances
    const balances = new Map<string, number>();
    
    expenses.forEach(expense => {
      // Add the amount paid by the expense creator
      balances.set(expense.createdBy, (balances.get(expense.createdBy) || 0) + expense.amount);
      
      // Subtract the split amounts from each person
      expense.splits.forEach(split => {
        balances.set(split.userId, (balances.get(split.userId) || 0) - split.amount);
      });
    });

    // Convert balances to the required format
    const formattedBalances = Array.from(balances.entries()).map(([userId, amount]) => ({
      name: userId === name ? 'You' : userId,
      amount: Math.abs(amount),
      owes: amount < 0,
    }));

    return {
      expenses: expenses.map(expense => ({
        id: expense.id,
        amount: expense.amount,
        description: expense.description,
        created_by: expense.createdBy,
        split_with: expense.splits.map(split => ({
          id: split.userId,
          name: split.userName,
          splitAmount: split.amount,
        })),
      })),
      balances: formattedBalances,
    };
  } catch (error) {
    console.error('Error fetching group data:', error);
    return { expenses: [], balances: [] };
  }
}

export async function deleteExpense(expenseId: string) {
  try {
    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting expense:', error);
    return { success: false };
  }
}

export async function DELETE(req: Request) {
  const { orgId } = await req.json();
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Delete all expenses for the organization
    await prisma.expense.deleteMany({
      where: {
        groupId: orgId,
      },
    });

    // Delete the organization from Clerk
    await clerkClient.organizations.deleteOrganization(orgId);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete organization";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

interface ExpenseData {
  amount: number;
  description: string;
  groupId: string;
  splitPercentage: number;
  splitWith: Array<{ id: string; name: string }>;
  createdBy: string;
}

export async function addExpense(data: ExpenseData) {
  try {
    const { amount, description, groupId, splitPercentage, splitWith, createdBy } = data;
    
    // Calculate split amount per person
    const splitAmount = (amount * splitPercentage) / 100 / splitWith.length;

    // Create expense with splits
    const expense = await prisma.expense.create({
      data: {
        amount,
        description,
        groupId,
        createdBy,
        splits: {
          create: splitWith.map(member => ({
            userId: member.id,
            userName: member.name,
            amount: splitAmount,
            percentage: splitPercentage / splitWith.length,
          })),
        },
      },
      include: {
        splits: true,
      },
    });

    return { success: true, expense };
  } catch (error) {
    console.error('Error adding expense:', error);
    return { success: false, error };
  }
}