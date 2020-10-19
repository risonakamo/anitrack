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