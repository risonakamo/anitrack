import React from "react";

import "./mini-show-box.less";

export default function MiniShowBox():JSX.Element
{
  return <div className="mini-show-box">
    <div className="cover-box">
      <img className="cover" src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx116147-PtcjOsmUy4fX.jpg"/>
      <div className="progress">
        <div className="progress-text">12</div>
      </div>
    </div>
    <p className="nyaa">one room</p>
  </div>;
}