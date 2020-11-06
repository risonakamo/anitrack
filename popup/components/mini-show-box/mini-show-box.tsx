import React from "react";

import {openNyaa} from "../../../day-helpers/nyaa-helpers";

import "./mini-show-box.less";

interface MiniShowBoxProps
{
  show:CombinedShowInfo
}

export default function MiniShowBox(props:MiniShowBoxProps):JSX.Element
{
  // box click handler
  function clickHandler():void
  {
    if (props.show.extras)
    {
      openNyaa(props.show.extras.nyaa);
    }
  }

  var nyaaString:string=props.show.extras?.nyaa || "";

  return <div className="mini-show-box" onClick={clickHandler}>
    <div className="cover-box">
      <img className="cover" src={props.show.show.cover}/>
      <div className="progress">
        <div className="progress-text">{props.show.show.progress}</div>
      </div>
    </div>
    <p className="nyaa">{nyaaString}</p>
  </div>;
}