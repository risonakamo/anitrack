import {queryUserShows} from "../anilist-apis/anilist-apis";

(async ()=>{
    console.log(await queryUserShows("risona"));
})();