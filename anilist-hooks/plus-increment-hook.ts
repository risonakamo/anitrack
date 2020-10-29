export function plusIncrementHook(showElements:WatchRow[]):void
{
    for (var x=0,l=showElements.length;x<l;x++)
    {
        showElements[x].element.querySelector(".plus-progress")?.addEventListener("click",()=>{
            console.log(showElements[x].id);
        });
    }
}