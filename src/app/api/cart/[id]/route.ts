import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Correctly typed context param
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const nft = await prisma.nFT.findUnique({
      where: { id },
    });

    if (!nft) {
      return NextResponse.json(
        { success: false, message: "NFT not found" },
        { status: 404 }
      );
    }

    // Optional: actually delete the NFT
    await prisma.nFT.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "NFT deleted successfully",
    });
  } catch (error) {
    console.error("[NFT_BY_ID_DELETE]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
