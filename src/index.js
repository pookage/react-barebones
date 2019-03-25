import React from "react";
import ReactDOM from "react-dom";
import Hello from "Components/Hello/Hello.jsx";

window.addEventListener("DOMContentLoaded", init);

function init(){
	ReactDOM.render(
		<Hello />,
		document.getElementById("app")
	);
}
