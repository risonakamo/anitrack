interface UserShowsQueryResult
{
    data:{
        MediaListCollection:{
            lists:RawList[]
        } | null
    }
}

interface RawList
{
    name:string
    entries:RawEntry[]
}

interface RawEntry
{
    progress:number
    media:RawMedia
}

interface RawMedia
{
    title:{
        romaji:string
    }

    coverImage:{
        large:string
    }

    siteUrl:string
    id:number
}