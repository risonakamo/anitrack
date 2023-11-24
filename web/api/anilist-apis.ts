import _ from "lodash";

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

// return current watching shows of target user as ShowInfos.
export async function getUserShows(user:string):Promise<ShowInfo[]>
{
    var queryresult:UserShowsQueryResult=await queryUserShows(user);

    if (!queryresult.data.MediaListCollection)
    {
        return [];
    }

    var watchingList:RawList|undefined=_.find(queryresult.data.MediaListCollection.lists,(x:RawList)=>{
        return x.name=="Watching";
    });

    if (!watchingList)
    {
        return [];
    }

    return _.map(watchingList.entries,rawEntryToShowInfo);
}

// return raw anilist api result query for user shows
async function queryUserShows(user:string):Promise<UserShowsQueryResult>
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

// convert anilist rawentry type to showinfo type
function rawEntryToShowInfo(entry:RawEntry):ShowInfo
{
    return {
        title:entry.media.title.romaji,
        id:entry.media.id,
        cover:entry.media.coverImage.large,
        url:entry.media.siteUrl,
        progress:entry.progress
    };
}