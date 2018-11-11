import React from "react";
import ReactDOM from "react-dom";
import App from "Components/App/App.jsx";

window.addEventListener("DOMContentLoaded", init);

function init(){
	ReactDOM.render(
		<App />,
		document.getElementById("app")
	);
}
