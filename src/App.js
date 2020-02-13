import React, { Component } from "react";
import { arr } from "./questions";
import "./app.scss";

class App extends Component {
  state = {
    disableButton: false,
    pickedIndex: null,
    questionsTotal: 0,
    currentNumber: 0,
    correctAnswerIndex: null,
    totalScores: 0
  };
  componentDidMount = () => {
    this.setState({ questionsTotal: arr.length });
  };

  selectAnswer = e => {
    const { currentNumber, totalScores } = this.state;
    const picked = Number(e.target.value);
    const correctAnswerIndex = arr[currentNumber].answer;
    const score = arr[currentNumber].score;
    if (picked === correctAnswerIndex) {
      this.setState({ totalScores: totalScores + score });
    }
    this.setState({
      disableButton: true,
      pickedIndex: picked,
      correctAnswerIndex
    });
  };

  handlePrevious = () => {
    const { currentNumber } = this.state;
    if (currentNumber > 0) {
      this.setState({
        currentNumber: currentNumber - 1
      });
      this.resetStateAnswers();
    }
  };

  handleNext = () => {
    const { currentNumber } = this.state;
    if (currentNumber < arr.length) {
      this.setState({
        currentNumber: currentNumber + 1
      });
      this.resetStateAnswers();
    }
  };

  resetStateAnswers = () => {
    this.setState({
      pickedIndex: null,
      correctAnswerIndex: null,
      disableButton: false
    });
  };

  render() {
    const {
      disableButton,
      pickedIndex,
      currentNumber,
      correctAnswerIndex,
      totalScores
    } = this.state;
    return (
      <div className="questionnaire">
        <div>
          <p className="question">{arr[currentNumber].question}</p>
          <div>
            {arr[currentNumber].options.map((option, index) => {
              return (
                <button
                  key={index}
                  id={
                    pickedIndex &&
                    correctAnswerIndex !== null &&
                    index === pickedIndex &&
                    index === correctAnswerIndex &&
                    pickedIndex === correctAnswerIndex
                      ? "button-id-correct"
                      : index === pickedIndex
                      ? "button-id-selected"
                      : index === correctAnswerIndex
                      ? "button-id-correct"
                      : "button-id"
                  }
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
        <div className="total-scores">
          <p>
            Total Scores : <b>{totalScores}</b>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
