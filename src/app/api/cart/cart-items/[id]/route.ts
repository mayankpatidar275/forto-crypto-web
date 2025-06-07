import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedItem = await prisma.cartItem.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Cart item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    console.error("[DELETE_CART_ITEM]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete cart item",
      },
      { status: 500 }
    );
  }
}
