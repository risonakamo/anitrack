import React from "react";
import ReactDOM from "react-dom";

import MiniShowBox from "./components/mini-show-box/mini-show-box";

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
    <MiniShowBox/>
    <MiniShowBox/>
    <div>
      <a href="" onClick={openShowListPage}>showlist</a>
    </div>
  </>;
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}

window.onload=main;