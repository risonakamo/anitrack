import React from "react";

import MiniShowBox from "../mini-show-box/mini-show-box";

export default function ShowBoxHold():JSX.Element
{
  return <div className="show-box-hold">
    <MiniShowBox/>
    <MiniShowBox/>
  </div>;
}