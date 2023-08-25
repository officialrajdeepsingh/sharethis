import { GetFeed } from "@/utility/feed";
import jsonxml from "jsontoxml";

export async function GET() {
  const ArticleLists = await GetFeed();

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
        guid: data.guid,
      },
    });
  }).join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
      <channel>
              ${item}        
      </channel>
</rss>`,
    {
      status: 200,
      headers: { "Content-Type": "application/rss+xml" },
    },
  );
}
