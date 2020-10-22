import React,{useState,useRef,useEffect} from "react";
import cx from "classnames";

import "./showbox.less";

interface ShowBoxProps
{
  show:ShowInfo
  extraInfo:ExtraShowInfo
  updatedExtraInfo(id:number,info:ExtraShowInfo):void
}

export default function ShowBox(props:ShowBoxProps):JSX.Element
{
  // focus enabled
  const [inputsFocused,setinputsFocused]=useState<boolean>(false);

  // input zone elements
  const nyaaBox=useRef<HTMLInputElement>(null);
  const dayBox=useRef<HTMLSelectElement>(null);

  // set input zone elements on extra info change
  useEffect(()=>{
    if (props.extraInfo)
    {
      nyaaBox.current!.value=props.extraInfo.nyaa;
      dayBox.current!.value=props.extraInfo.day;
    }
  },[props.extraInfo]);

  // handle input zone items being focused
  function focusHandler():void
  {
    setinputsFocused(true);
  }

  // handle input zone items being blurred
  function unfocusHandler():void
  {
    setinputsFocused(false);
    props.updatedExtraInfo(props.show.id,{
      nyaa:nyaaBox.current!.value,
      day:dayBox.current!.value as DayString
    });
  }

  // open nyaa tab
  function openNyaa(e:React.MouseEvent):void
  {
    e.preventDefault();
    chrome.tabs.create({
      active:false,
      url:`https://nyaa.si/?q=${props.extraInfo.nyaa}&f=0&c=1_2`
    });
  }

  const showBoxClass={
    focused:inputsFocused
  };

  return <div className={cx("show-box",showBoxClass)}>
    <a href="" onClick={openNyaa}>
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
        <input className="nyaa-input" type="text" placeholder="nyaa..." ref={nyaaBox}
          onFocus={focusHandler} onBlur={unfocusHandler}/>
      </div>
      <select className="day-input" onFocus={focusHandler} onBlur={unfocusHandler} ref={dayBox}>
        <option value="N/A">N/A</option>
        <option value="MON">Mon</option>
        <option value="TUE">Tue</option>
        <option value="WED">Wed</option>
        <option value="THU">Thu</option>
        <option value="FRI">Fri</option>
        <option value="SAT">Sat</option>
        <option value="SUN">Sun</option>
      </select>
    </div>
  </div>;
}