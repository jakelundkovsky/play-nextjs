import { NextResponse } from 'next/server';
import { prisma } from "@/utils/prismaDB";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  console.log('GET /api/keywords', { userId });

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const keywords = await prisma.keyword.findMany({
    where: { userId }
  });

  return NextResponse.json({ keywords });
}

export async function POST(request: Request) {
  const keywords = await request.json();
  
  if (!keywords?.length || !keywords[0]?.userId) {
    return NextResponse.json({ error: 'Invalid keywords data' }, { status: 400 });
  }

  const userId = keywords[0].userId;

  // todo is there a better way to do this?
  await prisma.keyword.deleteMany({
    where: { userId }
  });
  await prisma.keyword.createMany({
    data: keywords
  });

  return NextResponse.json({ message: 'Keywords updated' });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const keywordId = searchParams.get('id');
  
  console.log('DELETE /api/keywords', { keywordId });

  return NextResponse.json({ message: 'Keyword deleted' });
}

