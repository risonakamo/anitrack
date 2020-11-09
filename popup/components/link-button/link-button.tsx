import React from "react";

import "./link-button.less";

interface LinkButtonProps
{
  newTabHref?:string
}

export default function LinkButton(props:React.PropsWithChildren<LinkButtonProps>):JSX.Element
{
  // handle link button click. opens give prop new tab href in new tab if available
  function clickHandler():void
  {
    if (props.newTabHref)
    {
      chrome.tabs.create({
        url:props.newTabHref,
        active:false
      });
    }
  }

  return <div className="link-button" onClick={clickHandler}>
    {props.children}
  </div>;
}