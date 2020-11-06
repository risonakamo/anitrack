import React from "react";

import "./mini-show-box.less";

interface MiniShowBoxProps
{
  show:CombinedShowInfo
}

export default function MiniShowBox(props:MiniShowBoxProps):JSX.Element
{
  var nyaaString:string=props.show.extras?.nyaa || "";

  return <div className="mini-show-box">
    <div className="cover-box">
      <img className="cover" src={props.show.show.cover}/>
      <div className="progress">
        <div className="progress-text">{props.show.show.progress}</div>
      </div>
    </div>
    <p className="nyaa">{nyaaString}</p>
  </div>;
}