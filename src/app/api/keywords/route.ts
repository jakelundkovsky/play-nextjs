import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello, world!' }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Keywords:', body);
  return NextResponse.json({ message: 'Keywords received' }, { status: 200 });
}
