import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";

import MiniShowBoxes from "./components/mini-show-boxes/mini-show-boxes";
import LinkButton from "./components/link-button/link-button";

import {getCombinedInfoByDay,getUser} from "../database/database";
import {getTodaysNormal} from "../helpers/day-helpers";

import "./popup-index.less";

const _refSiteLink:string="https://www9.gogoanimehub.tv/";

function PopupMain():JSX.Element
{
  const [todayShowsState,setTodayShowsState]=useState<TodayShows>();
  const [anilistUsernameState,setAnilistUsernameState]=useState<string|null>(null);

  // load today shows
  useEffect(()=>{
    (async ()=>{
      setTodayShowsState(await getTodaysShows());
      setAnilistUsernameState(await getUser());
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

  var anilistLink:string="https://anilist.co/";
  if (anilistUsernameState)
  {
    anilistLink=`https://anilist.co/user/${anilistUsernameState}/animelist`;
  }

  var tripleOpenLinks:string[]=[
    "https://calendar.google.com/",
    anilistLink,
    _refSiteLink
  ];

  return <>
    <div className="show-boxes">
      {showBoxes}
    </div>
    <div className="control">
      <div className="link-button-row">
        <LinkButton title="Calendar" className="image-button" newTabHref="https://calendar.google.com/">
          <img src="/assets/popup-icons/calendar-white.png" className="link-icon"/>
        </LinkButton>
        <LinkButton title="AniList" newTabHref={anilistLink} className="image-button">
          <img src="/assets/popup-icons/al-white.png" className="link-icon"/>
        </LinkButton>
        <LinkButton title="Release Site" newTabHref={_refSiteLink} className="image-button">
          <img src="/assets/popup-icons/go-white.png" className="link-icon"/>
        </LinkButton>
      </div>
      <div className="link-button-row">
        <LinkButton title="Open All Main Sites" activeOpen={true}
          multiOpenHrefs={tripleOpenLinks} className="triple-button image-button"
        >
          <img src="/assets/popup-icons/triple-rect.png"/>
        </LinkButton>
        <LinkButton title="Tracked Shows List" activeOpen={true}
          newTabHref="showlist/showlist-index.html"
        >
          LIST
        </LinkButton>
        <LinkButton title="Nyaa" activeOpen={true}
          newTabHref="https://nyaa.si/?f=0&c=1_2&q="
        >
          NYAA
        </LinkButton>
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