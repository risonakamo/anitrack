import React from "react";
import ReactDOM from "react-dom";

import "./popup-index.less";

function PopupMain():JSX.Element
{
  function openShowListPage(e:React.MouseEvent):void
  {
    chrome.tabs.create({
      url:"../showlist/showlist-index.html",
      active:true
    });
  }

  return <>
    <a href="" onClick={openShowListPage}>showlist</a>
  </>;
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}

window.onload=main;