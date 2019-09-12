import React, { useState } from "react";
import { s } from "./";

export default function Hello(){

	//INITALISATION
	//------------------------------
	//grab state hooks
	const [ greetingIndex, setGreetingIndex ] = useState(0);
	//private variables
	const greetings = [ "Ahoy", "Allo", "Hello", "Bonjour"];


	//UTILS
	//------------------------------
	function generateRandomIndex(array){

		//return a random index from somewhere in the array
		return Math.floor(Math.random() * array.length);
	}//generateRandomIndex
	function selectNewGreeting(){

		//ensure that the new greeting is different from the current one
		let newIndex = greetingIndex;
		do newIndex  = generateRandomIndex(greetings);
		while(newIndex == greetingIndex);

		//update state with new greeting
		setGreetingIndex(newIndex);
	}//selectNewGreeting
	

	//RENDER LOGIC
	//------------------------------
	//get the currently active greeting
	const activeGreeting = greetings[greetingIndex];
	
	//display the currently active greeting and change it on click
	return(
		<p 
			className={s.wrapper}
			onClick={selectNewGreeting}>
			<span className={s.container}>
				{activeGreeting}
			</span>
		</p>
	);

}