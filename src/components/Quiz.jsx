import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { quiz } from '../reducers/quiz';

const Quiz = () => {
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.quiz);

  // State to track if the answer has been submitted and if it's correct
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  // State to track the correct answer index
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  const handleAnswerSubmit = (answerIndex) => {
    // Do not proceed if the answer is already submitted
    if (answerSubmitted) {
      return;
    }

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    // Set the correct answer index
    setCorrectAnswerIndex(currentQuestion.correctAnswerIndex);

    dispatch(quiz.actions.submitAnswer({ questionId: currentQuestion.id, answerIndex }));
    setAnswerSubmitted(true);
  };

  const goToNextQuestion = () => {
    // Move to the next question
    dispatch(quiz.actions.goToNextQuestion());
    // Reset answerSubmitted, isAnswerCorrect, and correctAnswerIndex for the next question
    setAnswerSubmitted(false);
    setIsAnswerCorrect(false);
    setCorrectAnswerIndex(null);
  };

  const restartQuiz = () => {
    dispatch(quiz.actions.restart());
    setAnswerSubmitted(false);
    setIsAnswerCorrect(false);
    setCorrectAnswerIndex(null);
  };

  // useEffect to handle the submission logic only once when the component mounts
  useEffect(() => {
    if (answerSubmitted) {
      const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
      setIsAnswerCorrect(
        currentQuestion.correctAnswerIndex === quizState.answers.slice(-1)[0].answerIndex
      );
    }
  }, [answerSubmitted, quizState]);

  if (quizState.quizOver) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>{`Correct Answers: ${quizState.answers.filter((answer) => answer.isCorrect).length}`}</p>
        <p>{`Incorrect Answers: ${quizState.answers.filter((answer) => !answer.isCorrect).length}`}</p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div className='question-wrapper'>
      <p className='question-number'>{`Question ${quizState.currentQuestionIndex + 1} / ${quizState.questions.length}`}</p>
      <h3>{currentQuestion.questionText}</h3>
      {answerSubmitted && (
        <div>
          <p>{`Your answer is ${isAnswerCorrect ? 'correct' : 'incorrect'}`}</p>
          <p>{`The correct answer is: ${currentQuestion.options[correctAnswerIndex]}`}</p>
          <img
          src={currentQuestion.correctAnswerImageUrl}
          alt={`Correct city - ${currentQuestion.options[correctAnswerIndex].text}`}
        />
        </div>
      )}
      {!answerSubmitted && (
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswerSubmit(index)}
              style={{ cursor: answerSubmitted ? 'not-allowed' : 'pointer' }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {answerSubmitted && (
        <button onClick={goToNextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default Quiz;
