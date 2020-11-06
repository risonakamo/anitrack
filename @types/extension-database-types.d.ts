type DayString="MON"|"TUE"|"WED"|"THU"|"FRI"|"SAT"|"SUN"|"N/A"
type ExtraShowInfos=Record<number,ExtraShowInfo>

// mapping of shows to a day
type ShowsByDay=Record<DayString|string,ShowInfo[]>
// mapping of combined show info to a day
type CombinedShowsByDay=Record<DayString|string,CombinedShowInfo[]>

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

// extra info of a show
interface ExtraShowInfo
{
    nyaa:string
    day:DayString
}

// combined show and its extra info, if it exists
interface CombinedShowInfo
{
    show:ShowInfo
    extras?:ExtraShowInfo
}