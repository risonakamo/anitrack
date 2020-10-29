import {getAllExtraShowInfos} from "../database/database";

// perform day mark hook on given show elements. attempts to restyle
// row with day class
export async function dayMarkHook(showRows:WatchRow[])
{
    var extraInfos:ExtraShowInfos=await getAllExtraShowInfos();
    var todays:Set<DayString>=getTodays();

    for (var x=0,i=showRows.length;x<i;x++)
    {
        attachDayClass(showRows[x],extraInfos,todays);
    }
}

// given a show row element and the extra infos object, attempt to add the day class to the show row.
function attachDayClass(showRow:WatchRow,extraInfos:ExtraShowInfos,todays:Set<DayString>):void
{
    if (showRow.id<0 || !extraInfos[showRow.id])
    {
        return;
    }

    showRow.element.classList.add("day",extraInfos[showRow.id].day);

    if (todays.has(extraInfos[showRow.id].day))
    {
        showRow.element.classList.add("today");
    }
}

// return a set of strings that count as today (today and yesterday)
function getTodays():Set<DayString>
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