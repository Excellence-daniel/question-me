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
    totalScores: 0,
    questionTimer: 0,
    startedTest: false,
    disabledNext: true,
    finishTest: false,
    failedQuestions: []
  };

  componentDidMount = () => {
    this.setState({
      questionsTotal: arr.length,
      questionTimer: arr[0].time || 0
    });
  };

  startTest = () => {
    this.setState({ startedTest: true });
  };

  finishTest = () => {
    this.setState({ finishTest: true });
  };

  selectAnswer = e => {
    this.setState({ disabledNext: false });
    const { currentNumber, totalScores, failedQuestions } = this.state;
    const picked = Number(e.target.value);
    const correctAnswerIndex = arr[currentNumber].answer;
    const score = arr[currentNumber].score;
    console.log({
      picked,
      correctAnswerIndex,
      score,
      currentNumber
    });
    if (picked === correctAnswerIndex) {
      this.setState({ totalScores: totalScores + score });
      console.log({ totalScores: totalScores + score });
    } else {
      failedQuestions.push({
        question: arr[currentNumber].question,
        correctAnswer: arr[currentNumber].options[correctAnswerIndex],
        pickedAnswer: arr[currentNumber].options[picked]
      });
    }
    this.setState({
      disableButton: true,
      pickedIndex: picked,
      correctAnswerIndex
    });
    // this.countTime();
  };

  countTime = questionTime => {
    if (questionTime > 0) {
      // setInterval(() => {
      //   const newTime = questionTime - 1;
      //   console.log(newTime);
      //   this.countTime();
      //   return;
      // }, 1000);
    }
    return;
  };

  // countTime = questionTime => {
  //   console.log({ questionTime });

  //   if (questionTime > 0) {
  //     const interval = setInterval(() => {
  //       this.setState({ questionTimer: questionTime - 1 },  () => {
  //         // this.countTime(questionTime - 1);
  //         const newTime = questionTime - 1;
  //         // this.countTime(newTime) ;
  //         return;
  //       });
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   } else {
  //     console.log("here");
  //     return;
  //   }
  // };

  handlePrevious = () => {
    const { currentNumber } = this.state;
    let previousNumber = currentNumber - 1;
    const questionTime = arr[previousNumber].time;
    if (currentNumber > 0) {
      this.setState({
        currentNumber: previousNumber,
        questionTimer: questionTime
      });
      this.resetStateAnswers();
    }
  };

  handleNext = () => {
    const { currentNumber } = this.state;
    let nextNumber = currentNumber + 1;
    const questionTime = arr[nextNumber].time;
    if (currentNumber < arr.length) {
      this.setState({
        currentNumber: nextNumber,
        questionTimer: questionTime
      });
      this.resetStateAnswers();
      this.countTime(questionTime);
    }
  };

  sortGrade = grade => {
    switch (true) {
      case grade <= 30:
        return "F";
      case grade > 30:
        return "D";
      case grade > 60:
        return "C";
      case grade > 90:
        return "B";
      case grade > 120:
        return "A";
      default:
        return "Score Thief!";
    }
  };

  resetStateAnswers = () => {
    this.setState({
      pickedIndex: null,
      correctAnswerIndex: null,
      disableButton: false,
      disabledNext: true
    });
  };

  render() {
    const {
      disableButton,
      pickedIndex,
      currentNumber,
      correctAnswerIndex,
      totalScores,
      questionTimer,
      startedTest,
      disabledNext,
      finishTest,
      failedQuestions
    } = this.state;
    return (
      <div className="questionnaire">
        {!finishTest ? (
          !startedTest ? (
            <div className="questions-info">
              <h3>Test Quiz</h3>
              <h4>
                This set of questions are CSS, HTML and Javascript basic
                questions. There are 15 in this set, with a total score of 170.
              </h4>
              <h4>Grades::</h4>
              <p>
                <ul>
                  <li>
                    <b>A</b> : > 120
                  </li>
                  <li>
                    <b>B</b> : > 90
                  </li>
                  <li>
                    <b>C</b> : > 60
                  </li>
                  <li>
                    <b>D</b> : > 30
                  </li>
                  <li>
                    <b>F</b> : less/= 30
                  </li>
                </ul>
              </p>
              <h4>
                There is a timer on each question and an immediate display of
                scores as soon as you answer your question.
              </h4>

              <h2>Wish you best of luck! Daniel :)</h2>
              <button className="start-test" onClick={this.startTest}>
                Start Test
              </button>
            </div>
          ) : (
            <>
              <div className="question-div">
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
                            disableButton
                              ? "option-button disabled"
                              : "option-button"
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
                    // disabled={currentNumber ? false : true}
                    disabled={true}
                  >
                    Prev
                  </button>
                  {currentNumber === arr.length - 1 ? (
                    <button onClick={this.finishTest}>Finish</button>
                  ) : (
                    <button onClick={this.handleNext} disabled={disabledNext}>
                      Next
                    </button>
                  )}
                </div>
                <div className="total-scores">
                  <p>
                    Total Scores : <b>{totalScores}</b>
                  </p>
                </div>
              </div>
              <div className="timer-div">{questionTimer}</div>
            </>
          )
        ) : (
          <div className="finish-test">
            <h3>Results</h3>
            <h4>
              {failedQuestions.map((qU, index) => {
                return (
                  <>
                    <p className="test-question">
                      <b>
                        {index + 1}. {qU.question}
                      </b>
                    </p>
                    <p className="picked-answer">
                      <span className="picked"> Picked: </span>
                      <span className="value">{qU.pickedAnswer}</span>
                    </p>
                    <p className="correct-answer">
                      <span className="correct">Correct Answer: </span>
                      <span className="value">{qU.correctAnswer}</span>
                    </p>
                  </>
                );
              })}
            </h4>
            <h4>
              Grade:{" "}
              <span className="grade">{this.sortGrade(totalScores)}</span>
            </h4>
          </div>
        )}
      </div>
    );
  }
}

export default App;
