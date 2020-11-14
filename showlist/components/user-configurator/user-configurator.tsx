import React from "react";

import "./user-configurator.less";

export default function UserConfigurator():JSX.Element
{
  return <div className="user-configurator">
    <span>Tracking User:</span>
    <input className="grey-line-input config-input" placeholder="User"/>
    <button>Apply</button>
  </div>
}