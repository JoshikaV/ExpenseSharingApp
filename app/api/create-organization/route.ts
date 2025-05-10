import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { groupName, members } = await req.json();
  const { userId } = await auth();

  // Debug log
  console.log({ groupName, members, userId });

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Create the organization
    const org = await clerkClient.organizations.createOrganization({
      name: groupName,
      createdBy: userId,
    });

    // 2. Invite members
    for (const email of members) {
      await clerkClient.organizations.createOrganizationInvitation({
        organizationId: org.id,
        emailAddress: email,
        role: "basic_member",
      });
    }

    return NextResponse.json({ success: true, orgId: org.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create organization";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}