// from user-shows.gql
const userShowQuery:string=`
query($userName:String)
{
    MediaListCollection(
        userName:$userName,
        type:ANIME,
        status:CURRENT
    )
    {
        lists {
            name
            entries {
                progress
                media {
                    title {
                        romaji
                    }

                    coverImage {
                        large
                    }

                    id
                    siteUrl
                }
            }
        }
    }
}`;

export async function queryUserShows(user:string)
{
    var res=await (await fetch("https://graphql.anilist.co",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({
            variables:{
                userName:user
            },
            query:userShowQuery
        })
    })).json();

    console.log(res);
}