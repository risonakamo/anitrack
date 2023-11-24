import {getUser,setCurrentShows} from "../database/database";
import {getUserShows} from "../anilist-apis/anilist-apis";
import {popupNotify} from "./notification-hook";

// synchronise extension database current shows with anilist
export async function anilistSync():Promise<void>
{
    console.log("anitrack syncing");
    var user:string|null=await getUser();

    if (!user)
    {
        return;
    }

    var gotshows:ShowInfo[]=await getUserShows(user);

    popupNotify(`updated ${gotshows.length} shows`);

    setCurrentShows(gotshows);
}