import _ from "lodash";

import {groupByDay,groupCombinedInfoByDay} from "./database-helpers";

// OVERRIDE the current shows with the given array of shows
export function setCurrentShows(shows:ShowInfo[]):void
{
    chrome.storage.local.set({currentShows:shows});
}

// update an extra show info given id and the extra show info. returns the newly updated extra show infos.
export async function updateExtraShowInfoDB(id:number,info:ExtraShowInfo):Promise<ExtraShowInfos>
{
    var extraInfos:ExtraShowInfos=await getAllExtraShowInfos();
    extraInfos[id]=info;
    chrome.storage.local.set({extraShowInfo:extraInfos});
    return extraInfos;
}

// increment progress of a show with the given id
export async function incrementShowProgress(id:number):Promise<void>
{
    var shows:ShowInfo[]=await getCurrentShows();
    var targetShow:ShowInfo|undefined=shows.find((x:ShowInfo)=>{
        return x.id==id;
    });

    if (!targetShow)
    {
        console.log("unabled to update progress for non-existing show");
        return;
    }

    targetShow.progress++;

    chrome.storage.local.set({currentShows:shows});
}

// set the current user in the database
export function setUser(user:string):void
{
    chrome.storage.local.set({user});
}

// get the registered user from database
export function getUser():Promise<string|null>
{
    return new Promise<string|null>((resolve)=>{
        chrome.storage.local.get<AnitrackStorage>("user",(storage:AnitrackStorage)=>{
            resolve(storage.user || null);
        });
    });
}

// get the current shows from storage
export async function getCurrentShows():Promise<ShowInfo[]>
{
    return new Promise<ShowInfo[]>((resolve)=>{
        chrome.storage.local.get("currentShows",(storage:AnitrackStorage)=>{
            resolve(storage.currentShows || []);
        });
    });
}

// get all extra show infos object
export async function getAllExtraShowInfos():Promise<ExtraShowInfos>
{
    return new Promise<ExtraShowInfos>((resolve)=>{
        chrome.storage.local.get("extraShowInfo",(storage:AnitrackStorage)=>{
            resolve(storage.extraShowInfo || {});
        });
    });
}

// return all shows, grouped by day.
export async function getShowsByDay():Promise<ShowsByDay>
{
    return groupByDay(await getCurrentShows(),await getAllExtraShowInfos());
}

// return all combined show infos
export async function getAllCombinedInfo():Promise<CombinedShowInfo[]>
{
    var shows:ShowInfo[]=await getCurrentShows();
    var extraInfo:ExtraShowInfos=await getAllExtraShowInfos();

    return _.map(shows,(x:ShowInfo)=>{
        return {
            show:x,
            extras:extraInfo[x.id]
        };
    });
}

// get combined show infos grouped by day
export async function getCombinedInfoByDay():Promise<CombinedShowsByDay>
{
    return groupCombinedInfoByDay(await getAllCombinedInfo());
}