import React from "react";

import "./showbox.less";

interface ShowBoxProps
{
  show:ShowInfo
}

export default function ShowBox(props:ShowBoxProps):JSX.Element
{
  return <div className="show-box">
    <a href="">
      <img className="cover-img"
        src={props.show.cover}/>
    </a>
    <div className="content">
      <a href={props.show.url}>
        <h2>{props.show.title}</h2>
      </a>
    </div>
    <div className="day-indicator"></div>
    <div className="input-zone hidden">
      <div className="nyaa-hold">
        <input className="nyaa-input" type="text" placeholder="nyaa..."/>
      </div>
      <select className="day-input">
        <option>N/A</option>
        <option>Mon</option>
        <option>Tue</option>
        <option>Wed</option>
        <option>Thu</option>
        <option>Fri</option>
        <option>Sat</option>
        <option>Sun</option>
      </select>
    </div>
  </div>;
}