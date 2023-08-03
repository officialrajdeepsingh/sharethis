import { shareOnLinkedin } from '@/utility/utility';
import { GetFeed } from "@/utility/feed";
import { NextResponse } from 'next/server';

export async function GET() {

  const ArticleLists = await GetFeed()

  let result = await shareOnLinkedin(ArticleLists)

  let data = Promise.all(result)
    .then(results => {
      console.log("Promis results", results)
      return results
    }).catch((error) => {
      console.log("Promis error", error)
      return error
    });
    
  return NextResponse.json({ data: data })
}
