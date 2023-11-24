import {anilistSync} from "./anilist-sync";
import {injectHookStyles} from "./inject-style-hook";
import {dayMarkHook} from "./day-mark-hook";
import {plusIncrementHook} from "./plus-increment-hook";
import {getWatchRows} from "./element-hooks";

import "./hook-styles.less";

// main file for running hooks.
(()=>{
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