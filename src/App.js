import React, { Component } from "react";
import { arr } from "./questions";
import "./app.scss";

class App extends Component {
  state = {
    disableButton: false,
    pickedIndex: null,
    questionsTotal: 0,
    currentNumber: 0
  };
  componentDidMount = () => {
    this.setState({ questionsTotal: arr.length });
  };

  selectAnswer = e => {
    const picked = Number(e.target.value);
    this.setState({ disableButton: true, pickedIndex: picked });
    console.log(picked, e.target.id);
  };

  handlePrevious = () => {
    const { currentNumber } = this.state;
    if (currentNumber > 0) {
      this.setState({ currentNumber: currentNumber - 1, disableButton: false });
    }
  };

  handleNext = () => {
    const { currentNumber } = this.state;
    if (currentNumber < arr.length) {
      this.setState({ currentNumber: currentNumber + 1, disableButton: false });
    }
  };

  render() {
    const { disableButton, pickedIndex, currentNumber } = this.state;
    console.log(currentNumber);
    return (
      <div className="questionnaire">
        <div>
          <p className="question">{arr[currentNumber].question}</p> 
          <div>
            {arr[currentNumber].options.map((option, index) => {
              return (
                <button
                  key={index}
                  className={
                    disableButton ? "option-button disabled" : "option-button"
                  }
                  onClick={this.selectAnswer}
                  value={index}
                  disabled={disableButton}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <button
            onClick={this.handlePrevious}
            disabled={currentNumber ? false : true}
          >
            Prev
          </button>
          <button
            onClick={this.handleNext}
            disabled={currentNumber === arr.length - 1 ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App;
