import { Card } from "@/components/Card";
import { GetFeed } from "@/utility/feed";

export const revalidate = 60
export default async function Home() {
  const ArticleLists = await GetFeed();

  return (
    <div className="bg-[#f2f2f7]">
      <div className="px-5 md:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="text-center">
              <h2 className="font-bold text-3xl md:text-5xl">
                Lists of articles
              </h2>
            </div>

            <div className="mx-auto w-[824px] grid-cols-1 grid gap-[16px]">
              {ArticleLists.map((item) => <Card key={item.guid} item={item} />)}
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}
