import Parser from 'rss-parser';
import  { shareOnLinkedin} from '@/utility/utility';
import { GetFeed } from "@/utility/feed";


export async function GET() {
  
  const ArticleLists = await GetFeed()

 await shareOnLinkedin(ArticleLists)

  return new Response('every thing fine is here', {
    status: 200,
  })
}
