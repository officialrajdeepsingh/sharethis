"use client";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { RWebShare } from "react-web-share";
import Link from "next/link";


export function Card({ item }: {
  item: {
    title: string;
    description: string;
    link: string;
    image: string;
    guid: string;
    categories: string[];
    hashTags: string;
    author: string;
    date: string;
  };
}) {
  return (
    <div className="mx-auto flex-row flex flex-row justify-center pb-8 items-center">
      <div className="max-w-[328px] flex-none">
        <Image
          src={item.image}
          alt={item.title}
          height={624}
          width={624}
          className="inline-block h-40 w-40 max-w-full object-cover"
        />
      </div>

      <div className="p-10 flex flex-col flex-row item-center">
        <div className="my-5 flex flex-row flex-justify">
          {item.categories.map((category: string) => (
            <p key={category} className="grid-cols-4 gap-2 mx-2 p-2 bg-blue-100 text-center text-xs text-blue-800 text-sm font-semibold dark:bg-blue-200 dark:text-blue-800">
              {category}
            </p>
          ))}
        </div>

        <Link target={"_blank"} href={item.link} className="font-bold">
          {item.title}
        </Link>

        <p className="my-2 text-sm">{item.description}</p>

        <p className="my-2 text-sm">{item.author}</p>
    
        <div className="flex flex-justify">
          <RWebShare
            data={{
              text: item.description,
              url: item.link,
              title: item.title,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <button
              type="button"
              className="text-blue-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z"
                />
              </svg>
            </button>
          </RWebShare>

          <button
            onClick={() => copy(item.link)}
            type="button"
            className="text-blue-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
