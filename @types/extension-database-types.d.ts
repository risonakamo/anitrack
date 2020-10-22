type DayString="MON"|"TUE"|"WED"|"THU"|"FRI"|"SAT"|"SUN"|"N/A"
type ExtraShowInfos=Record<number,ExtraShowInfo>

interface AnitrackStorage
{
    currentShows:ShowInfo[]
    extraShowInfo:ExtraShowInfos //extra show info keyed by show ID
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

interface ExtraShowInfo
{
    nyaa:string
    day:DayString
}

interface CombinedShowInfo
{
    show:ShowInfo
    extras?:ExtraShowInfo
}