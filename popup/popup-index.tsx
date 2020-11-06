import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";

import ShowBoxHold from "./components/show-box-hold/show-box-hold";
import {getCombinedInfoByDay} from "../database/database";
import {getTodaysNormal} from "../day-helpers/day-helpers";

import "./popup-index.less";

function PopupMain():JSX.Element
{
  const [todayShowsState,setTodayShowsState]=useState<TodayShows>();

  // load today shows
  useEffect(()=>{
    (async ()=>{
      setTodayShowsState(await getTodaysShows());
    })();
  },[]);

  function openShowListPage(e:React.MouseEvent):void
  {
    chrome.tabs.create({
      url:"../showlist/showlist-index.html",
      active:true
    });
  }

  var showBoxes:JSX.Element[]=[];
  if (todayShowsState)
  {
    showBoxes=[
      <ShowBoxHold day={todayShowsState.today.day} key="today"
        shows={todayShowsState.today.shows}/>,
      <ShowBoxHold day={todayShowsState.yesterday.day} key="yesterday"
        shows={todayShowsState.yesterday.shows}/>,
    ];
  }

  return <>
    {showBoxes}
    <div>
      <a href="" onClick={openShowListPage}>showlist</a>
    </div>
  </>;
}

// get today's shows object.
async function getTodaysShows():Promise<TodayShows>
{
  var allInfos:CombinedShowsByDay=await getCombinedInfoByDay();
  var todays:Todays=getTodaysNormal();

  var todayShows:DaysShows={
    day:todays.today,
    shows:allInfos[todays.today] || []
  };

  var yesterdayShows:DaysShows={
    day:todays.yesterday,
    shows:allInfos[todays.yesterday] || []
  };

  return {
    today:todayShows,
    yesterday:yesterdayShows
  };
}

function main()
{
  ReactDOM.render(<PopupMain/>,document.querySelector(".main"));
}

window.onload=main;