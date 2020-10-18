interface AnitrackStorage
{
    currentShows:ShowInfo[]
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