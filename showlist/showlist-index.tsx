import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import {getCurrentShows,getAllExtraShowInfos,updateExtraShowInfoDB} from "../database/database";
import {sortShowInfos} from "../database/database-helpers";
import ShowBox from "./components/show-box/show-box";

import "./showlist-index.less";

function ShowlistMain():JSX.Element
{
  // the current shows
  const [shows,setShows]=useState<ShowInfo[]>([]);
  // the extra infos
  const [extraInfos,setExtraInfos]=useState<ExtraShowInfos>({});

  // initial load of shows
  useEffect(()=>{
    (async ()=>{
      var newextraInfo:ExtraShowInfos=await getAllExtraShowInfos();
      setShows(sortShowInfos(await getCurrentShows(),newextraInfo));
      setExtraInfos(newextraInfo);
    })();
  },[]);

  // update the extrashow info database
  async function updateExtraShowInfo(id:number,info:ExtraShowInfo):Promise<void>
  {
    var newExtraInfos:ExtraShowInfos=await updateExtraShowInfoDB(id,info);
    setExtraInfos(newExtraInfos);
  }

  const showBoxes:JSX.Element[]=_.map(shows,(x:ShowInfo,i:number)=>{
    return <ShowBox show={x} key={i} extraInfo={extraInfos[x.id]} updatedExtraInfo={updateExtraShowInfo}/>;
  });

  return <>
    {showBoxes}
  </>;
}

function main()
{
  ReactDOM.render(<ShowlistMain/>,document.querySelector(".main"));
}

window.onload=main;