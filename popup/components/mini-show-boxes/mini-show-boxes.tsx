import React from "react";
import _ from "lodash";
import cx from "classnames";

import MiniShowBox from "../mini-show-box/mini-show-box";
import {openNyaa} from "../../../helpers/nyaa-helpers";

import "./mini-show-boxes.less";

interface MiniShowBoxesProps
{
  day:DayString
  shows:CombinedShowInfo[]
}

export default function MiniShowBoxes(props:MiniShowBoxesProps):JSX.Element
{
  // click handler for clicking day text. opens all nyaas of shows in the show hold.
  function dayTextClick():void
  {
    for (var x=0;x<props.shows.length;x++)
    {
      if (props.shows[x].extras)
      {
        openNyaa(props.shows[x].extras!.nyaa);
      }
    }
  }

  const shows:JSX.Element[]=_.map(props.shows,(x:CombinedShowInfo,i:number)=>{
    return <MiniShowBox key={i} show={x}/>;
  });

  return <div className={cx("mini-show-boxes",props.day)}>
    <div className="day-text-zone" onClick={dayTextClick}>
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