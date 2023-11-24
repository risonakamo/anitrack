import {getAllExtraShowInfos} from "../database/database";
import {getTodays} from "../helpers/day-helpers";

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