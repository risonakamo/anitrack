import _ from "lodash";

import {getDayNum} from "../day-helpers/day-helpers";

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

// convert array of show infos into ShowsByDay dictionary, using extra infos.
export function groupByDay(shows:ShowInfo[],extraInfos:ExtraShowInfos):ShowsByDay
{
    return _.groupBy(shows,(x:ShowInfo)=>{
        return extraInfos[x.id]?.day || "N/A";
    }) as ShowsByDay;
}

// sort function for 2 combined show infos, sort by day
function compareCombinedInfoDay(a:CombinedShowInfo,b:CombinedShowInfo):number
{
    return getDayNum(a)-getDayNum(b);
}