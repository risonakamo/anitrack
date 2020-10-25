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

        for (var x=0,i=showElements.length;x<i;x++)
        {
            attachDayClass(showElements[x],extraInfos);
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
function attachDayClass(showRow:HTMLElement,extraInfos:ExtraShowInfos):void
{
    var gotId:number|null=extractIdFromAnilistUrl((showRow.querySelector(".title a") as HTMLLinkElement).href);

    if (!gotId || !extraInfos[gotId])
    {
        return;
    }

    showRow.classList.add(extraInfos[gotId].day);
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