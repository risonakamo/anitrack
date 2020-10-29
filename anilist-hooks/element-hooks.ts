// return watch row objects with watch row and information
export function getWatchRows():WatchRow[]|null
{
    var watchingElements:HTMLElement[]|null=getWatchingRowElements();

    if (!watchingElements)
    {
        console.log("failed to get watching rows");
        return null;
    }

    return watchingElements.map((x:HTMLElement)=>{
        return {
            element:x,
            id:extractIdFromAnilistUrl((x.querySelector(".title a") as HTMLLinkElement).href)
        };
    });
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

// attempt to extract id number for anilist url
function extractIdFromAnilistUrl(url:string):number
{
    // [1]: the id number
    var idMatchs:RegExpMatchArray|null=url.match(/anime\/(\d+)/);

    if (!idMatchs || idMatchs.length!=2)
    {
        return -1;
    }

    return parseInt(idMatchs[1]);
}