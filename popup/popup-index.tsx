import React,{useEffect} from "react";
import ReactDOM from "react-dom";

import ShowBoxHold from "./components/show-box-hold/show-box-hold";
import {getShowsByDay} from "../database/database";

import "./popup-index.less";

function PopupMain():JSX.Element
{
  // testing
  useEffect(()=>{
    (async ()=>{
      console.log(await getShowsByDay());
    })();
  },[]);

  function openShowListPage(e:React.MouseEvent):void
  {
    chrome.tabs.create({
      url:"../showlist/showlist-index.html",
      active:true
    });
  }

  return <>
    <ShowBoxHold/>
    <ShowBoxHold/>
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