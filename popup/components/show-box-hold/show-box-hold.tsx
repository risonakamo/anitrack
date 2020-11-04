import React from "react";

import MiniShowBox from "../mini-show-box/mini-show-box";

import "./show-box-hold.less";

export default function ShowBoxHold():JSX.Element
{
  return <div className="show-box-hold">
    <div className="day-text-zone">
      <p className="day-text">THU</p>
    </div>
    <div className="boxes">
      <MiniShowBox/>
      <MiniShowBox/>
      <MiniShowBox/>
      <MiniShowBox/>
      <MiniShowBox/>
      <MiniShowBox/>
      <MiniShowBox/>
    </div>
  </div>;
}