import { GetFeed } from "@/utility/feed";
import o2x from "object-to-xml"

export async function GET() {
  const item = await GetFeed();
 var obj = { 
  '?xml version=\"1.0\" encoding=\"iso-8859-1\"?' : null,
  item: item
  };
  return new Response(o2x(obj),
    {
      status: 200,
      headers: { "Content-Type": "application/rss+xml" },
    },
  );

}
