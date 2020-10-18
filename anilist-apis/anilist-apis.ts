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

// return raw anilist api result query for user shows
export async function queryUserShows(user:string):Promise<UserShowsQueryResult>
{
    return await (await fetch("https://graphql.anilist.co",{
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
}