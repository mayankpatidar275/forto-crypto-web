import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const nfts = await prisma.nFT.findMany();
    return NextResponse.json({
      success: true,
      data: nfts,
    });
  } catch (error) {
    console.error("[NFTs_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
