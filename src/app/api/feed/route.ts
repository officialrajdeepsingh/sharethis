import { GetFeed } from "@/utility/feed";


export async function GET() {

const ArticleLists = await GetFeed()

let baseUrl = '/'

const item = ArticleLists.map((data) => `<item>
  <title><![CDATA[${data.title}]]> </title>
    <description> <![CDATA[ ${data.description} ]]> </description>
    <link> <![CDATA[ ${data.link} ]]> </link>
    <image> <![CDATA[ ${data.image} ]]></image>
    <guid> <![CDATA[ ${data.guid} ]]></guid>
    <categories> <![CDATA[${data.categories} ]]></categories>
    <hashtags> <![CDATA[${data.hashTags} ]]></hashtags>
    <author> <![CDATA[${data.author} ]]></author>
    <date>${data.date}</date>
  </item>`
).join('')

return new Response( `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
              ${item}        
      </channel>
</rss> `, {
status: 200,
headers: { 'Content-Type': "text/xml" },
})
}
