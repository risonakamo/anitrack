interface Todays
{
    today:DayString
    yesterday:DayString
}

// contains data on today and yesterday's shows
interface TodayShows
{
    today:DaysShows
    yesterday:DaysShows
}

// represents the shows of a given day
interface DaysShows
{
    day:DayString
    shows:CombinedShowInfo[]
}