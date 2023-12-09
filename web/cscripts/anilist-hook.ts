import {anilistSync} from "lib/anilist-hooks/anilist-sync";
import {injectHookStyles} from "lib/anilist-hooks/inject-style-hook";
import {dayMarkHook} from "lib/anilist-hooks/day-mark-hook";
import {plusIncrementHook} from "lib/anilist-hooks/plus-increment-hook";
import {getWatchRows} from "lib/anilist-hooks/element-hooks";

import "css/hook-styles.less";

// main file for running hooks.
(()=>{
    console.log("anilist hook executing");

    injectHookStyles();
    anilistSync();

    setTimeout(()=>{
        var showElements:WatchRow[]|null=getWatchRows();

        if (!showElements)
        {
            return;
        }

        dayMarkHook(showElements);
        plusIncrementHook(showElements);
    },1000);
})();