import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello, world!' }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();

  const keywords = Object.keys(body).map((key) => {
    const index = Number(key.split('-')[1]);
    return {
      keyword: body[key],
      position: index
    };
  });

  console.log({keywords});

  await prisma.keyword.create({
    data: {
      keyword: 'test',
      position: 1,
      userId: 'cm4j7smns000013k86y3vu7ve',
    }
  });
  
  return NextResponse.json({ message: 'Keywords received' }, { status: 200 });
}

