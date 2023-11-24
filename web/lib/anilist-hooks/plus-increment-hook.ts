import {incrementShowProgress} from "../database/database";

// attach show progress increment to pluses on targeted show elements
export function plusIncrementHook(showElements:WatchRow[]):void
{
    showElements.forEach((x:WatchRow)=>{
        x.element.querySelector(".plus-progress")?.addEventListener("click",()=>{
            incrementShowProgress(x.id);
        });
    });
}