import {getAllCombinedInfo} from "lib/database/database";

/** uploader name filter. case insensitive, and matches as long as the string is
 *  somewhere in the uploader name */
const highlightUploaders:string[]=[
    "erai"
];

(async ()=>{
    console.log("hello");
    console.log("shows",await getAllCombinedInfo());
})();