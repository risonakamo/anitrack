import {anilistSync} from "./anilist-sync";
import {injectHookStyles} from "./inject-style-hook";
import {dayMarkHook,getWatchingRowElements} from "./day-mark-hook";

import "./hook-styles.less";

// main file for running hooks.
(()=>{
    injectHookStyles();
    anilistSync();

    setTimeout(()=>{
        var showElements:HTMLElement[]|null=getWatchingRowElements();

        if (!showElements)
        {
            return;
        }

        dayMarkHook(showElements);
    },1000);
})();