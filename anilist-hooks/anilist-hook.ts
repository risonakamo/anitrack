import {anilistSync} from "./anilist-sync";
import {injectHookStyles} from "./inject-style-hook";
import {daymarktest} from "./day-mark-hook";

import "./hook-styles.less";

// main file for running hooks.
(()=>{
    injectHookStyles();
    anilistSync();
    daymarktest();
})();