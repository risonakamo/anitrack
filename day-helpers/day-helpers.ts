// return a set of strings that count as today (today and yesterday)
export function getTodays():Set<DayString>
{
    var todayNum:number=new Date().getDay();
    var yesterdayNum:number=todayNum-1;

    if (yesterdayNum<0)
    {
        yesterdayNum=6;
    }

    return new Set([
        numToDay(todayNum),
        numToDay(yesterdayNum)
    ]);
}

// get day number from a combined show info, if possible
export function getDayNum(combinedInfo:CombinedShowInfo):number
{
    if (combinedInfo.extras)
    {
        return dayToNum(combinedInfo.extras.day);
    }

    return 0;
}

// convert day number from Date().getDay() to daystring
function numToDay(dayNum:number):DayString
{
    switch (dayNum)
    {
        case 0:
        return "SUN";

        case 1:
        return "MON";

        case 2:
        return "TUE";

        case 3:
        return "WED";

        case 4:
        return "THU";

        case 5:
        return "FRI";

        case 6:
        return "SAT";
    }

    return "N/A";
}

// convert day string to number
function dayToNum(day:DayString):number
{
    switch (day)
    {
        case "MON":
        return 1;

        case "TUE":
        return 2;

        case "WED":
        return 3;

        case "THU":
        return 4;

        case "FRI":
        return 5;

        case "SAT":
        return 6;

        case "SUN":
        return 7;
    }

    return 0;
}