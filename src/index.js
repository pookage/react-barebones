import React from "react";
import ReactDOM from "react-dom";

import Hello from "COMPONENTS/Hello/";
import "SHARED/reset.scss";
import "SHARED/global.scss";

window.addEventListener("DOMContentLoaded", init);

function init(){
	ReactDOM.render(
		<Hello />,
		document.getElementById("app")
	);
}
