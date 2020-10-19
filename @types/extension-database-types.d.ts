interface AnitrackStorage
{
    currentShows:ShowInfo[]
    user:string
}

// show info from anilist
interface ShowInfo
{
    title:string
    id:number
    cover:string
    url:string
    progress:number
}