import React from "react";

import "./showbox.less";

export default function ShowBox():JSX.Element
{
  return <div className="show-box">
    <a href="https://anilist.co/anime/113970/Love-Live-Nijigasaki-Gakuen-School-Idol-Doukoukai/">
      <img className="cover-img"
        src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx104937-A4BF3Rl9dMn4.jpg"/>
    </a>
    <div className="content">
      <a href="https://anilist.co/anime/113970/Love-Live-Nijigasaki-Gakuen-School-Idol-Doukoukai/">
        <h2>Love Live! Nijigasaki Gakuen School Idol Doukoukai</h2>
      </a>
    </div>
    <div className="day-indicator"></div>
    <div className="input-zone">
      <input className="nyaa-input" type="text"/>
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