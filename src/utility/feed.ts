import Parser from 'rss-parser';
import { format } from 'date-fns';
import Nodeparser from 'node-html-parser';
import medium from '@/feed/medium.json';
import type { Items } from "@/types";



let parser = new Parser({
    customFields: {
        item: [["content:encoded", "content"], ["dc:creator", "creator"]]
    }
});


export async function GetFeed() {

    let setData: Items[] = [];

    let todayArticle = [];

    // get Image from html content
    function htmlImage(content: string) {

        let img = Nodeparser.parse(content).querySelector('img')?.getAttribute('src')

        return img;
    }

    // get description from summary,content and contentSnippet
    function description(summary: string | undefined, content: string, contentSnippet: string | undefined): string {


        let mediumFeedSnippet = Nodeparser.parse(content).querySelector(".medium-feed-snippet")?.innerText

        let desc = Nodeparser.parse(content).querySelector('p')?.innerText

        if (summary) {
            return summary
        } if (contentSnippet && mediumFeedSnippet) {
            return mediumFeedSnippet
        }
        else {
            return desc ? desc : " "
        }

    }

    for (let index = 0; index < medium.length; index++) {

        const url = medium[index]

        try {

            await parser.parseURL(url)
                .then(
                    (feed) => {

                        feed.items.forEach((item) => {

                            const { link, guid, title, pubDate, creator, summary, content, categories, contentSnippet } = item

                            var urlparts = link?.split("?") ? link?.split("?")[0] : link;

                            let convertIntoHashTags = categories?.map(item => `#${item}`).join().replaceAll(",", " ")


                            if (title !== undefined && content !== undefined && link !== undefined && pubDate !== undefined && guid !== undefined) {

                                let getdescription = description(summary, content, contentSnippet)


                                // push post into setData variable
                                setData.push(

                                    {
                                        title: title,
                                        link: urlparts,
                                        image: htmlImage(content),
                                        date: pubDate,
                                        description: getdescription,
                                        author: creator,
                                        categories: categories,
                                        hashTags: convertIntoHashTags,
                                        guid: guid
                                    }
                                );
                            }

                        });
                    }
                );
        } catch (error) {

            console.log(error)

        }

    }

    if (setData !==undefined) {

        for (let index = 0; index < setData.length; index++) {

            const todayFormat = format(new Date(), "yyyy-MM-dd");

            const articleDataFormat = format(new Date(setData[index].date), "yyyy-MM-dd");

            // sort the article pase on date
            if (todayFormat === articleDataFormat) {

                todayArticle.push(setData[index])

            }

        }

    }

    return todayArticle

}
