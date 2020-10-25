import React from "react";
import _ from "lodash";
import cx from "classnames";

import ShowBox from "../show-box/show-box";

import "./day-container.less";

interface DayContainerProps
{
  day:DayString
  shows:ShowInfo[]
  extraInfos:ExtraShowInfos
  updateExtraShowInfo(id:number,info:ExtraShowInfo):void
}

export default function DayContainer(props:DayContainerProps):JSX.Element
{
  const showBoxes:JSX.Element[]=_.map(props.shows,(x:ShowInfo,i:number)=>{
    return <ShowBox show={x} key={i} extraInfo={props.extraInfos[x.id]} updatedExtraInfo={props.updateExtraShowInfo}/>;
  });

  return <span className={cx("day-container",props.day)}>
    {showBoxes}
  </span>;
}