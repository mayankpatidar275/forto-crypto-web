import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { user } = await request.json();

    if (!user || !user.email || !user.privyId) {
      console.log("User, Privy ID or User Email is missing:", user);
      return NextResponse.json(
        { success: false, message: "User email is required" },
        { status: 400 }
      );
    }

    const upsertedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        walletAddress: user.walletAddress?.trim() || null,
        privyId: user.privyId || null,
      },
      create: {
        privyId: user.privyId,
        walletAddress: user.walletAddress?.trim() || null,
        email: user.email,
      },
    });

    const isNew =
      !upsertedUser.createdAt ||
      upsertedUser.createdAt.getTime() === upsertedUser.updatedAt.getTime();

    return NextResponse.json(
      {
        success: true,
        data: upsertedUser,
        message: isNew
          ? "User created successfully"
          : "User updated successfully",
      },
      { status: isNew ? 201 : 200 }
    );
  } catch (error) {
    console.error("[USER_POST]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
