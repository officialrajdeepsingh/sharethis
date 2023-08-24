import { GetFeed } from "@/utility/feed";
import jsonxml from 'jsontoxml';


export async function GET() {

  const ArticleLists = await GetFeed()

  const item = ArticleLists.map((data) => {
    return jsonxml({
      article: {
        title: data.title,
        link: data.link,
        image: data.image,
        date: data.date,
        description: data.description,
        author: data.author,
        categories: data.categories,
        hashTags: data.hashTags,
        guid: data.guid
      }
    })
  }).join('')

  // jsonxml
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
              ${item}        
      </channel>
</rss> `, {
    status: 200,
    headers: { 'Content-Type': "text/xml" },
  })
}
