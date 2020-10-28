export function plusIncrementHook(showElements:HTMLElement[]):void
{
    for (var x=0,l=showElements.length;x<l;x++)
    {
        showElements[x].querySelector(".plus-progress")?.addEventListener("click",()=>{
            console.log("hello");
        });
    }
}