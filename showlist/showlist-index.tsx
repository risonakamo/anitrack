import React from "react";
import ReactDOM from "react-dom";

import "./showlist-index.less";

function ShowlistMain():JSX.Element
{
  return <>
    hello
  </>;
}

function main()
{
  ReactDOM.render(<ShowlistMain/>,document.querySelector(".main"));
}

window.onload=main;