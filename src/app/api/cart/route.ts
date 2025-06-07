import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userPrivyId = searchParams.get("userPrivyId");

    console.log("user privy Id is: ", userPrivyId);
    if (!userPrivyId) {
      return NextResponse.json(
        { success: false, message: "User Privy ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        privyId: userPrivyId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User with given privy Id not found." },
        { status: 404 }
      );
    }

    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: cart || { items: [] },
    });
  } catch (error) {
    console.error("[CART_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cartItemToAdd = await request.json();

    const userPrivyId = cartItemToAdd.cartItem.userId;
    const nftId = cartItemToAdd.cartItem.nftId;
    const quantity = cartItemToAdd.cartItem.quantity;

    if (!userPrivyId || !nftId) {
      return NextResponse.json(
        { success: false, message: "User ID and NFT ID are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        privyId: userPrivyId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found with the given privy Id" },
        { status: 404 }
      );
    }

    const userId = user?.id;

    // Get or create cart
    let cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Add item to cart
    const cartItem = await prisma.cartItem.upsert({
      where: { cartId_nftId: { cartId: cart.id, nftId } },
      // create: { cartId: cart.id, nftId, quantity: 1 },
      create: { cartId: cart.id, nftId, quantity: quantity },
      // update: { quantity: { increment: 1 } },
      update: { quantity: quantity },
    });

    return NextResponse.json({
      success: true,
      data: cartItem,
    });
  } catch (error) {
    console.error("[CART_POST]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
