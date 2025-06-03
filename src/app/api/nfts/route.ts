import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // request: Request
  try {
    // const { searchParams } = new URL(request.url);

    // Pagination
    // const page = parseInt(searchParams.get("page") || "1");
    // const limit = parseInt(searchParams.get("limit") || "12");
    // const skip = (page - 1) * limit;

    // Filters
    // const typeId = searchParams.get("type");
    // const minPrice = searchParams.get("minPrice");
    // const maxPrice = searchParams.get("maxPrice");
    // const availableOnly = searchParams.get("available") !== "false";

    // Sorting
    // const sortBy = searchParams.get("sortBy") || "createdAt";
    // const sortOrder = searchParams.get("sortOrder") || "desc";

    // const where = {
    //   ...(typeId && { typeId }),
    //   ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
    //   ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
    //   ...(availableOnly && { available: true }),
    // };

    // const [nfts, total] = await Promise.all([
    //   prisma.nFT.findMany({
    //     skip,
    //     take: limit,
    //     where,
    //     orderBy: { [sortBy]: sortOrder },
    //     include: {
    //       type: true,
    //     },
    //   }),
    //   prisma.nFT.count({ where }),
    // ]);

    const nfts = await prisma.nFT.findMany();

    console.log("nfts; ", nfts);

    return NextResponse.json({
      success: true,
      data: nfts,
      //   pagination: {
      //     total,
      //     page,
      //     limit,
      //     totalPages: Math.ceil(total / limit),
      //   },
    });
  } catch (error) {
    console.error("[NFTs_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
