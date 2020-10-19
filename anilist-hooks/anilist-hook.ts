import {getUserShows} from "../anilist-apis/anilist-apis";

(async ()=>{
    console.log(await getUserShows("risona"));
})();