import retry from "async-retry";

import {getAllExtraShowInfos} from "../database/database";

export function daymarktest()
{
    setTimeout(async ()=>{
        var showElements:HTMLElement[]|null=getWatchingRowElements();

        if (!showElements)
        {
            return;
        }

        var extraInfos:ExtraShowInfos=await getAllExtraShowInfos();
        var todays:Set<DayString>=getTodays();

        for (var x=0,i=showElements.length;x<i;x++)
        {
            attachDayClass(showElements[x],extraInfos,todays);
        }
    },1000);
}

// get all the show row entry elements in the watching category, or null if it failed
function getWatchingRowElements():HTMLElement[]|null
{
    // target all list sections on the page, and attempt to find section that is watching section.
    var watchingListSection:HTMLElement|undefined=Array.from(document.querySelectorAll(".list-wrap")).find((x:Element)=>{
        return (x.querySelector(".section-name") as HTMLElement).innerText=="Watching";
    }) as HTMLElement;

    if (!watchingListSection)
    {
        console.log("failed");
        return null;
    }

    return Array.from(watchingListSection.querySelector(".list-entries")!.children) as HTMLElement[];
}

// given a show row element and the extra infos object, attempt to add the day class to the show row.
function attachDayClass(showRow:HTMLElement,extraInfos:ExtraShowInfos,todays:Set<DayString>):void
{
    var gotId:number|null=extractIdFromAnilistUrl((showRow.querySelector(".title a") as HTMLLinkElement).href);

    if (!gotId || !extraInfos[gotId])
    {
        return;
    }

    showRow.classList.add("day",extraInfos[gotId].day);

    if (todays.has(extraInfos[gotId].day))
    {
        showRow.classList.add("today");
    }
}

// attempt to extract id number for anilist url
function extractIdFromAnilistUrl(url:string):number|null
{
    // [1]: the id number
    var idMatchs:RegExpMatchArray|null=url.match(/anime\/(\d+)/);

    if (!idMatchs || idMatchs.length!=2)
    {
        return null;
    }

    return parseInt(idMatchs[1]);
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