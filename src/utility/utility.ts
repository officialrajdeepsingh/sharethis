import axios from "axios";
import type { Items } from "@/types";



function shareOnLinkedin(todayArticle: Items[]) {


  let headersList = {
    "Authorization": process.env.LINKEDIN_ACCESS_TOKEN,
    "Content-Type": "application/json"
  }

  todayArticle.map(

    post => {

      let bodyContent = JSON.stringify({
        "content": {
          "contentEntities": [
            {
              "entityLocation": post.link,
              "thumbnails": [
                {
                  "resolvedUrl": post.image
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

      axios.request(reqOptions)

        .then(function (response) {
          console.log(response, ' response json() is here ');
        }

        )
        .catch(
          function error(error) {
            console.log("Some thing wrong with Linkdin API ", error);
          }
        );
    }
  )
}



export { shareOnLinkedin }
