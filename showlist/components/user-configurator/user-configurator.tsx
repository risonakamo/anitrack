import React,{useEffect,useRef} from "react";

import {getUser,setUser} from "../../../database/database";

import "./user-configurator.less";

export default function UserConfigurator():JSX.Element
{
  const configInput=useRef<HTMLInputElement>(null);

  // initialise input with current user from database
  useEffect(()=>{
    (async ()=>{
      var gotuser:string|null=await getUser();
      if (gotuser)
      {
        configInput.current!.value=gotuser;
      }
    })();
  },[]);

  // handle apply button click. changes the current user in the database.
  function applyHandler():void
  {
    setUser(configInput.current!.value);
  }

  return <div className="user-configurator">
    <span>Tracked User:</span>
    <input className="grey-line-input config-input" placeholder="User" ref={configInput}/>
    <button onClick={applyHandler}>Apply</button>
  </div>;
}