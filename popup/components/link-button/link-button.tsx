import React from "react";
import cx from "classnames";

import "./link-button.less";

interface LinkButtonProps
{
  newTabHref?:string //if given, click will open this in background tab
  multiOpenHrefs?:string[] //if given, click will open all links in background tab
  activeOpen?:boolean //open new tab as active instead of background.
                      // if given with multi open hrefs, opens the first one as active.

  className?:string
  title?:string
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
        active:props.activeOpen || false
      });
    }

    if (props.multiOpenHrefs)
    {
      for (var x=0,l=props.multiOpenHrefs.length;x<l;x++)
      {
        var active:boolean=false;

        if (x==0 && props.activeOpen)
        {
          active=true;
        }

        chrome.tabs.create({
          url:props.multiOpenHrefs[x],
          active
        });
      }
    }
  }

  return <div className={cx("link-button",props.className)} onClick={clickHandler} title={props.title}>
    {props.children}
  </div>;
}