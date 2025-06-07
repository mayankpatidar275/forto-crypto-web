import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/nfts/:id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  console.log("nft id: ", id);

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

    return NextResponse.json({
      success: true,
      data: nft,
    });
  } catch (error) {
    console.error("[NFT_BY_ID_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
