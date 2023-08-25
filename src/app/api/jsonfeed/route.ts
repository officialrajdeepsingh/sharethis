import { NextResponse } from 'next/server'
import { GetFeed } from "@/utility/feed";

export async function GET() {
  const item = await GetFeed();

  return NextResponse.json({  item  })
}
