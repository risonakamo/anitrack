import React from "react";

import "./link-button.less";

interface LinkButtonProps
{
  newTabHref?:string //if given, click will open this in background tab
  multiOpenHrefs?:string[] //if given, click will open all links in background tab
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

    if (props.multiOpenHrefs)
    {
      for (var x=0,l=props.multiOpenHrefs.length;x<l;x++)
      {
        chrome.tabs.create({
          url:props.multiOpenHrefs[x],
          active:false
        });
      }
    }
  }

  return <div className="link-button" onClick={clickHandler}>
    {props.children}
  </div>;
}