// spawn a notification message with the given message
export function popupNotify(message:string):void
{
    var msg:HTMLElement=document.createElement("div");
    msg.innerHTML=`<div class="hook-message">
        ${message}
    </div>`;
    msg=msg.firstElementChild as HTMLElement;

    document.body.appendChild(msg);
    msg.classList.add("hook-message-show");
}