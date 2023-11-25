import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";

import MiniShowBoxes from "components/mini-show-boxes/mini-show-boxes";
import LinkButton from "components/link-button/link-button";

import {getCombinedInfoByDay,getUser} from "lib/database/database";
import {getTodaysNormal} from "lib/day-helpers";

import { calendarIcon,anilistIcon,goIcon,tripleRectIcon } from "assets/assets";

import "./popup-index.less";

const _refSiteLink:string="https://ww2.gogoanimes.org/";

// const _nyaaLink:string="https://nyaa.si/?f=0&c=1_2&q=";
const _nyaaLink:string="https://animetosho.org/";

function PopupMain():JSX.Element
{
  // --- state ---
  const [todayShowsState,setTodayShowsState]=useState<TodayShows>();
  const [anilistUsernameState,setAnilistUsernameState]=useState<string|null>(null);



  // --- effect ---
  // load today shows
  useEffect(()=>{
    (async ()=>{
      setTodayShowsState(await getTodaysShows());
      setAnilistUsernameState(await getUser());
    })();
  },[]);



  // --- functions ---
  // open show list page
  function openShowListPage(e:React.MouseEvent):void
  {
    chrome.tabs.create({
      url:"/build/showlist/index.html",
      active:true
    });
  }




  // --- render ---
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
    _refSiteLink,
    anilistLink
  ];

  return <>
    <div className="show-boxes">
      {showBoxes}
    </div>
    <div className="control">
      <div className="link-button-row">
        <LinkButton title="Calendar" className="image-button" newTabHref="https://calendar.google.com/">
          <img src={calendarIcon} className="link-icon"/>
        </LinkButton>
        <LinkButton title="AniList" newTabHref={anilistLink} className="image-button">
          <img src={anilistIcon} className="link-icon"/>
        </LinkButton>
        <LinkButton title="Release Site" newTabHref={_refSiteLink} className="image-button">
          <img src={goIcon} className="link-icon"/>
        </LinkButton>
      </div>
      <div className="link-button-row">
        <LinkButton title="Open All Main Sites" activeOpen={true}
          multiOpenHrefs={tripleOpenLinks} className="triple-button image-button"
        >
          <img src={tripleRectIcon}/>
        </LinkButton>
        <LinkButton title="Tracked Shows List" activeOpen={true}
          newTabHref="/build/showlist/index.html"
        >
          LIST
        </LinkButton>
        <LinkButton title="Nyaa" activeOpen={true}
          newTabHref={_nyaaLink}
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
  createRoot(document.querySelector("main")!).render(<PopupMain/>);
}

window.onload=main;