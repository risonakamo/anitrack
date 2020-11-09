import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";

import MiniShowBoxes from "./components/mini-show-boxes/mini-show-boxes";
import LinkButton from "./components/link-button/link-button";

import {getCombinedInfoByDay} from "../database/database";
import {getTodaysNormal} from "../helpers/day-helpers";

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

  // open show list page
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
      <MiniShowBoxes day={todayShowsState.today.day} key="today"
        shows={todayShowsState.today.shows} today={true}/>,
      <MiniShowBoxes day={todayShowsState.yesterday.day} key="yesterday"
        shows={todayShowsState.yesterday.shows}/>,
    ];
  }

  return <>
    <div className="show-boxes">
      {showBoxes}
    </div>
    <div className="control">
      <div className="link-button-row">
        <LinkButton newTabHref="https://calendar.google.com/">CAL</LinkButton>
        <LinkButton>AL</LinkButton>
        <LinkButton newTabHref="https://gogoanimes.co/">GO</LinkButton>
      </div>
      <div className="link-button-row">
        <LinkButton>TRIP</LinkButton>
        <LinkButton newTabHref="showlist/showlist-index.html">LIST</LinkButton>
        <LinkButton newTabHref="https://nyaa.si/?f=0&c=1_2&q=">NYAA</LinkButton>
      </div>
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