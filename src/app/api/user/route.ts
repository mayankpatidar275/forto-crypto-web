import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { UserType } from "@/types/user";

// TODO: update the user if tried login again
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userData = transformPrivyUser(body.user);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { privyId: userData.privyId },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: true, data: existingUser, message: "User already exists" },
        { status: 200 }
      );
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        privyId: userData.privyId,
        walletAddress: userData.walletAddress?.trim() || null,
        email: userData.email?.trim() || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, data: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[USER_POST]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper to transform Privy user object to our schema
function transformPrivyUser(user: any): UserType {
  // Get wallet address (prioritizing embedded wallets)
  //   const wallet = user.linkedAccounts.find((acc: any) => acc.type === "wallet");
  //   const walletAddress = wallet?.address || user.wallet?.address;

  return {
    privyId: user.privyId,
    walletAddress: user.walletAddress,
    email: user.email,
  };
}
