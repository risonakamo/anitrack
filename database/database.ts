// OVERRIDE the current shows with the given array of shows
export function setCurrentShows(shows:ShowInfo[]):void
{
    chrome.storage.local.set({currentShows:shows});
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