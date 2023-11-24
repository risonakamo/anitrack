import _ from "lodash";
import {clsx} from "clsx";

import ShowBox from "components/show-box/show-box";

import "./day-container.less";

interface DayContainerProps
{
  day:DayString
  shows:ShowInfo[]
  extraInfos:ExtraShowInfos
  updateExtraShowInfo(id:number,info:ExtraShowInfo):void
  today?:boolean
}

export default function DayContainer(props:DayContainerProps):JSX.Element
{
  const showBoxes:JSX.Element[]=_.map(props.shows,(x:ShowInfo,i:number)=>{
    return <ShowBox show={x} key={i} extraInfo={props.extraInfos[x.id]} today={props.today}
      updatedExtraInfo={props.updateExtraShowInfo}/>;
  });

  return <span className={clsx("day-container",props.day)}>
    {showBoxes}
  </span>;
}