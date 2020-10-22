import _ from "lodash";

// sort array of show infos with extra infos. returns sorted array.
export function sortShowInfos(shows:ShowInfo[],extraInfos:ExtraShowInfos):ShowInfo[]
{
    var combinedinfo:CombinedShowInfo[]=_.map(shows,(x:ShowInfo)=>{
        return {
            show:x,
            extras:extraInfos[x.id]
        };
    });

    combinedinfo.sort(compareCombinedInfoDay);

    return _.map(combinedinfo,(x:CombinedShowInfo)=>{
        return x.show;
    });
}

// sort function for 2 combined show infos, sort by day
function compareCombinedInfoDay(a:CombinedShowInfo,b:CombinedShowInfo):number
{
    return getDayNum(a)-getDayNum(b);
}

// get day number from a combined show info, if possible
function getDayNum(combinedInfo:CombinedShowInfo):number
{
    if (combinedInfo.extras)
    {
        return dayToNum(combinedInfo.extras.day);
    }

    return 0;
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