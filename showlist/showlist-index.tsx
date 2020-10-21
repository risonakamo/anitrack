import React from "react";
import ReactDOM from "react-dom";

import ShowBox from "./components/show-box/show-box";

import "./showlist-index.less";

function ShowlistMain():JSX.Element
{
  return <>
    <ShowBox/>
  </>;
}

function main()
{
  ReactDOM.render(<ShowlistMain/>,document.querySelector(".main"));
}

window.onload=main;