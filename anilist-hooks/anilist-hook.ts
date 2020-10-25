import {anilistSync} from "./anilist-sync";
import {popupNotify} from "./notification-hook";
import {injectHookStyles} from "./inject-style-hook";

import "./hook-styles.less";

// main file for running hooks.
(()=>{
    injectHookStyles();
    anilistSync();
    popupNotify("a");
})();