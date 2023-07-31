import axios from "axios";
import type { Items } from "@/types";


 function shareOnLinkedin(todayArticle: Items[]) {


  let headersList = {
    "Authorization": process.env.LINKEDIN_ACCESS_TOKEN,
    "Content-Type": "application/json"
  }

  return  todayArticle.map(
    
  function article(post) {

      
      let bodyContent = JSON.stringify({
        "content": {
          "contentEntities": [
            {
              "entityLocation": post?.link,
              "thumbnails": [
                {
                  "resolvedUrl": post?.image
                }
              ]
            }
          ],
          "title": post.title,
          "description": post.description
        },
        "distribution": {
          "linkedInDistributionTarget": {}
        },
        "owner": "urn:li:organization:76615898",
        "subject": post.description,
        "text": {

          "text": post.author ? `${post.title} 

${post.description}

Publish By ${post.author}

${post.hashTags}
`: `${post.title} 

${post.description}
                      
${post.hashTags}
`
        }


      });

      let reqOptions = {

        url: "https://api.linkedin.com/v2/shares",
        method: "POST",
        headers: headersList,
        data: bodyContent,


      };

      
     return axios.request(reqOptions)

        .then((response)=> {
          
          return {
            statusText: response.statusText,
            status: response.status,
            successful:true
          }

        })

        .catch((error)=> {
      
          return {
              error : error.response.data.message,
              statusText: error.response.statusText,
              status: error.response.status,
              successful:false
            }
          }

        );

    }
  )

}



export { shareOnLinkedin }
