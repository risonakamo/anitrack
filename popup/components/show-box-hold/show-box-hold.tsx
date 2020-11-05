import React from "react";
import _ from "lodash";

import MiniShowBox from "../mini-show-box/mini-show-box";

import "./show-box-hold.less";

interface ShowBoxHoldProps
{
  day:DayString
  shows:ShowInfo[]
}

export default function ShowBoxHold(props:ShowBoxHoldProps):JSX.Element
{
  const shows:JSX.Element[]=_.map(props.shows,(x:ShowInfo,i:number)=>{
    return <MiniShowBox key={i} show={x}/>;
  });

  return <div className="show-box-hold">
    <div className="day-text-zone">
      <p className="day-text">
        {props.day}
        <span className="arrow">▸</span>
      </p>
    </div>
    <div className="boxes">
      {shows}
    </div>
  </div>;
}