import React, { Component } from "react";
import "./SortingVisualizer.css";                                
import { mergesort } from "../SortingAlgorithms/mergesort.js";        //importing mergesort and quicksort
import { quicksort } from "../SortingAlgorithms/quicksort.js";

class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = { array: [] };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {                                     //function to generate random array of 200 elements
    const array = [];                 
    for (let i = 0; i < 200; i++) {
      array.push(randomIntFromInterval(5, 550));     //function to invoke random array of elements ranging from 5 to 500           
    }                                                //minimum value of 5 is chosen to make thr array bar visibily possible
    this.setState({ array });
    console.log(array);
  }

  mergesort() {
    const animations = mergesort(this.state.array);                    //calling array uopn which mergesort is applied
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");     //call to array-bar for animation
      const isColorChange = i % 3 !== 2;                
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "rgb(216, 222, 135)" : "rgb(222, 145, 135)";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);                                               //here, 10 refers to the speed of animations
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 10);
      }
    }
  }

  quicksort() {
    const animation = quicksort(this.state.array);
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange =
        animation[i][0] === "comparison1" || animation[i][0] === "comparison2";
      if (isColorChange === true) {
        const [comparison, barOneIndex, barTwoIndex] = animation[i];
        const color =
          animation[i][0] === "comparison1"
            ? "rgb(216, 222, 135)"
            : "rgb(222, 145, 135)";
        const barOneStyle = arrayBars[barOneIndex]
          ? arrayBars[barOneIndex].style
          : {};
        const barTwoStyle = arrayBars[barTwoIndex]
          ? arrayBars[barTwoIndex].style
          : {};
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);
      } else {
        const [swap, barOneIdx, newHeight] = animation[i];
        const barOneStyle = arrayBars[barOneIdx]
          ? arrayBars[barOneIdx].style
          : {};
        setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
        }, i * 10);
      }
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div class="array-container">
        {array.map((value, index) => (
          <div
            className="array-bar"
            key={index}
            style={{ height: `${value}px` }}                 //to display array bars height is quoted and used pixels value 
          ></div>
        ))}
        <br />
        <div class="buttons">
          <button onClick={() => this.resetArray()}>Generate New Array</button>       
          <button onClick={() => this.mergesort()}>Merge Sort</button>
          <button onClick={() => this.quicksort()}>Quick Sort</button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default SortingVisualizer;
