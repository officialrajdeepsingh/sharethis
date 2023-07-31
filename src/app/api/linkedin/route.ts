import  { shareOnLinkedin} from '@/utility/utility';
import { GetFeed } from "@/utility/feed";
import { NextResponse } from 'next/server';


export async function GET() {
  
  const ArticleLists = await GetFeed()

  let result = await shareOnLinkedin(ArticleLists)
 
  return NextResponse.json({ result })
}
