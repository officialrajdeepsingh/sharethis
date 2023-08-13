import type { Items } from "@/types";

interface ArrayType {
  id?:string;
  message?: string;
  statusText?: string;
  status: number;
  successful?: boolean;
  error?: string;
}

let resltData: ArrayType[] = []

async function shareOnLinkedin(todayArticle: Items[]) {


  for (const post of todayArticle) {

    await fetch('https://api.linkedin.com/v2/shares', {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": process.env.LINKEDIN_ACCESS_TOKEN as string
      },
      body: JSON.stringify({
        "content": {
          "contentEntities": [
            {
              "entityLocation": post?.link,
              "thumbnails": [
                {
                  "resolvedUrl": post?.image,
                },
              ],
            },
          ],
          "title": post.title,
          "description": post.description,
        },
        "distribution": {
          "linkedInDistributionTarget": {},
        },
        "owner": "urn:li:organization:76615898",
        "subject": post.description,
        "text": {
          "text": post.author
            ? `${post.title} 
  
  ${post.description}
  
  Publish By ${post.author}
  
  ${post.hashTags}
  `
            : `${post.title} 
  
  ${post.description}
                        
  ${post.hashTags}
  `,
        },
      })
    })
      .then(res => res.json())
      .then((response) => {
        console.log("Response is here",response)
        resltData.push({
          id:response.id,
          statusText:response.subject,
          message: response.message,
          status: 201 && response.status
        })
      }).catch(
        (error) => {
          resltData.push({
            error: error.response.data.message,
            statusText: error.response.statusText,
            status: error.response.status,
            successful: false,
          })
        }
      )
  }

  return resltData

}

export { shareOnLinkedin };
