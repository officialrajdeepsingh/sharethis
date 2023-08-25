import { GetFeed } from "@/utility/feed";

export async function GET() {
  const ArticleLists = await GetFeed();

  const item = ArticleLists.map((data) => (`
    <item>
      <title> <![CDATA[${data.title}]]> </title>
      <description> <![CDATA[ ${data.description} ]]> </description>
      <link> <![CDATA[ ${data.link} ]]> </link>
      <img> <![CDATA[ ${data.image} ]]> </img>
      <guid> <![CDATA[ ${data.guid} ]]> </guid>
      <category> <![CDATA[${data.categories} ]]> </category>
      <hashtags> <![CDATA[${data.hashTags} ]]> </hashtags>
      <author> <![CDATA[${data.author} ]]> </author>
      <pubDate> ${data.date} </pubDate>
    </item>`)
  ).join('')

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?><rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title> RSS Feed </title>
    <description> Customize RSS Feed of an RSS feed </description>
      ${item}        
  </channel>
</rss>`,
    {
      status: 200,
      headers: { "Content-Type": "application/rss+xml" },
    },
  );
}
