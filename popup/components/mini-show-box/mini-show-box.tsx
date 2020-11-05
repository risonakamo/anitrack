import React from "react";

import "./mini-show-box.less";

interface MiniShowBoxProps
{
  show:ShowInfo
}

export default function MiniShowBox(props:MiniShowBoxProps):JSX.Element
{
  return <div className="mini-show-box">
    <div className="cover-box">
      <img className="cover" src={props.show.cover}/>
      <div className="progress">
        <div className="progress-text">{props.show.progress}</div>
      </div>
    </div>
    <p className="nyaa">one room</p>
  </div>;
}