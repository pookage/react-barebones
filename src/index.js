import React from "react";
import ReactDOM from "react-dom";
import Hello from "COMPONENTS/Hello/Hello.jsx";

window.addEventListener("DOMContentLoaded", init);

function init(){
	ReactDOM.render(
		<Hello />,
		document.getElementById("app")
	);
}
