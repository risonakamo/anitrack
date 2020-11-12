import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import {getCurrentShows,getAllExtraShowInfos,updateExtraShowInfoDB} from "../database/database";
import {groupByDay} from "../database/database-helpers";
import {getTodaysNormal} from "../helpers/day-helpers";

import DayContainer from "./components/day-container/day-container";
import UserConfigurator from "./components/user-configurator/user-configurator";

import "./showlist-index.less";

const dayOrder:DayString[]=["N/A","MON","TUE","WED","THU","FRI","SAT","SUN"];

function ShowlistMain():JSX.Element
{
  // the current shows
  const [shows,setShows]=useState<ShowsByDay>({});
  // the extra infos
  const [extraInfos,setExtraInfos]=useState<ExtraShowInfos>({});

  // initial load of shows
  useEffect(()=>{
    (async ()=>{
      var newextraInfo:ExtraShowInfos=await getAllExtraShowInfos();
      setShows(groupByDay(await getCurrentShows(),newextraInfo));
      setExtraInfos(newextraInfo);
    })();
  },[]);

  // update the extrashow info database
  async function updateExtraShowInfo(id:number,info:ExtraShowInfo):Promise<void>
  {
    var newExtraInfos:ExtraShowInfos=await updateExtraShowInfoDB(id,info);
    setExtraInfos(newExtraInfos);
  }

  var today:DayString=getTodaysNormal().today;
  const dayContainers:JSX.Element[]=_.filter(_.map(dayOrder,(x:DayString,i:number)=>{
    if (!shows[x])
    {
      return null;
    }

    return <DayContainer day={x} shows={shows[x]} extraInfos={extraInfos}
      updateExtraShowInfo={updateExtraShowInfo} key={i} today={x==today}/>;
  })) as JSX.Element[];

  return <>
    <div className="day-containers">
      {dayContainers}
    </div>
    <div className="user-config-zone">
      <UserConfigurator/>
    </div>
  </>;
}

function main()
{
  ReactDOM.render(<ShowlistMain/>,document.querySelector(".main"));
}

window.onload=main;