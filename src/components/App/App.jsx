import React, { Component } from "react";
import s from "Components/App/App.css";

export default class App extends Component {

	//LIFECYCLE JAZZ
	//---------------------------------
	constructor(...args){
		super(...args);

		//non-render-state variables
		const greetings = this.greetings = [
			"Ahoy",
			"Allo",
			"Hello",
			"Bonjour"
		];

		//scope binding
		this.selectNewGreeting = this.selectNewGreeting.bind(this);

		//initialise the state
		this.state = {
			greetingIndex: this.generateRandomIndex(greetings)
		};
	}//constructor


	//UTILS
	//----------------------------
	generateRandomIndex(array){
		//return a random index from somewhere in the array
		return Math.floor(Math.random() * array.length);
	}//generateRandomIndex


	//EVENT HANDLING
	//---------------------------
	selectNewGreeting(){
		//ensure that the new greeting is different from the current one
		let greetingIndex = this.state.greetingIndex;
		while(greetingIndex == this.state.greetingIndex){
			greetingIndex = this.generateRandomIndex(this.greetings);
		}
		//update with new greeting
		this.setState({ greetingIndex });
	}//selectNewGreeting


	//RENDER FUNCTIONS
	//---------------------------
	render(){

		const {
			state,    // (object) containing the current component state
			greetings // (array) of greetings in multiple languages
		} = this;

		const {
			greetingIndex // (int) index of the currently selected greeting
		} = state;


		//display the currently active greeting and change it on click
		const activeGreeting = greetings[greetingIndex];
		return(
			<p 
				className={s.world}
				onClick={this.selectNewGreeting}>
				{activeGreeting}
			</p>
		);
	}//render

}