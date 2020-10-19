import {getUser,setCurrentShows} from "../database/database";
import {getUserShows} from "../anilist-apis/anilist-apis";

// synchronise extension database current shows with anilist
export async function anilistSync():Promise<void>
{
    var user:string|null=await getUser();

    if (!user)
    {
        return;
    }

    setCurrentShows(await getUserShows(user));
}