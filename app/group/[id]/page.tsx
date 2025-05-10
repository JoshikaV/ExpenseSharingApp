'use client';

import { useOrganizationList } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/app/components/ui/card';
import { Trash2, Plus, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getGroupData, deleteExpense } from '@/app/actions';

interface Expense {
  id: string;
  amount: number;
  description: string;
  created_by: string;
  split_with: Array<{
    id: string;
    name: string;
    splitAmount: number;
  }>;
}

interface Balance {
  name: string;
  amount: number;
  owes: boolean;
}

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const fetchGroupData = async () => {
    try {
      const selectedOrganization = userMemberships?.data?.find(
        (membership) => membership.organization.id === params.id
      );
      
      if (!selectedOrganization) return;

      const data = await getGroupData(params.id as string, selectedOrganization.organization.name);
      setExpenses(data.expenses);
      setBalances(data.balances);
    } catch (error) {
      console.error('Error fetching group data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load group data',
      });
    }
  };

  useEffect(() => {
    const checkAccess = async () => {
      if (!isLoaded) return;

      const hasAccess = userMemberships?.data?.some(
        (membership) => membership.organization.id === params.id
      );

      if (!hasAccess) {
        toast({
          title: 'Error',
          description: 'You do not have access to this group',
        });
        router.push('/groups');
        return;
      }

      await fetchGroupData();
      setIsLoading(false);
    };

    checkAccess();
  }, [isLoaded, userMemberships?.data, params.id, router, toast]);

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      const result = await deleteExpense(expenseId);
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Expense deleted successfully',
        });
        fetchGroupData(); // Refresh the data
      } else {
        throw new Error('Failed to delete expense');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete expense',
      });
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const selectedOrganization = userMemberships?.data?.find(
    (membership) => membership.organization.id === params.id
  );

  if (!selectedOrganization) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Organization not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4">
          {selectedOrganization.organization.name}
        </h1>

        <div className="flex gap-4">
          <Link href={`/expense?groupId=${params.id}`}>
            <Button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              <Plus className="inline-block w-4 h-4 mr-1" /> Add Expense
            </Button>
          </Link>

          <Link href="/groups">
            <Button className="bg-purple-600 text-white px-4 py-2 rounded-md">
              All Groups
            </Button>
          </Link>
        </div>
      </div>

      {/* Balances Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Balances</h2>
        <div className="flex flex-col gap-8">
          {/* Owes Section */}
          <div>
            <h3 className="text-lg font-medium text-red-700 mb-3">💸 Money Owed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {balances.filter(balance => balance.owes).map((balance, index) => (
                <Card 
                  key={index} 
                  className="bg-red-50 border-red-200 transition-all duration-200 hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{balance.name}</span>
                        <span className="font-bold text-lg text-red-600">
                          ${balance.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm px-2 py-1 rounded-full w-fit text-red-700 bg-red-100">
                        Needs to pay
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Is Owed Section */}
          <div>
            <h3 className="text-lg font-medium text-green-700 mb-3">💰 Money to Receive</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {balances.filter(balance => !balance.owes).map((balance, index) => (
                <Card 
                  key={index} 
                  className="bg-green-50 border-green-200 transition-all duration-200 hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{balance.name}</span>
                        <span className="font-bold text-lg text-green-600">
                          ${balance.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm px-2 py-1 rounded-full w-fit text-green-700 bg-green-100">
                        To receive
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Expenses</h2>
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No expenses yet</p>
          ) : (
            expenses.map((expense) => (
              <Card key={expense.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{expense.description}</h3>
                      <p className="text-sm text-gray-500">Added by {expense.created_by}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg">${expense.amount.toFixed(2)}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Split with:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {expense.split_with.map((split, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                        >
                          {split.name} (${split.splitAmount.toFixed(2)})
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 