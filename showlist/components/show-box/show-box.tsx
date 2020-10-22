import React,{useState} from "react";
import cx from "classnames";

import "./showbox.less";

interface ShowBoxProps
{
  show:ShowInfo
}

export default function ShowBox(props:ShowBoxProps):JSX.Element
{
  // focus enabled
  const [inputsFocused,setinputsFocused]=useState<boolean>(false);

  // handle input zone items being focused
  function focusHandler():void
  {
    setinputsFocused(true);
  }

  // handle input zone items being blurred
  function unfocusHandler():void
  {
    setinputsFocused(false);
  }

  const showBoxClass={
    focused:inputsFocused
  };

  return <div className={cx("show-box",showBoxClass)}>
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
        <input className="nyaa-input" type="text" placeholder="nyaa..." onFocus={focusHandler} onBlur={unfocusHandler}/>
      </div>
      <select className="day-input" onFocus={focusHandler} onBlur={unfocusHandler}>
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