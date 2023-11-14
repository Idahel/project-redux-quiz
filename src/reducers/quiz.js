import { createSlice } from "@reduxjs/toolkit";

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: "Which capital city is known as the 'City of Love' and is famous for the Eiffel Tower?",
    options: ["Rome", "Berlin", "Paris", "Madrid"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/src/assets/paris.jpeg"
  },
  {
    id: 2,
    questionText: "In which capital city can you find the ancient Acropolis?",
    options: ["Athens", "Istanbul", "Rome", "Cairo"],
    correctAnswerIndex: 0,
    correctAnswerImageUrl: "/src/assets/athens.jpeg"
  },
  {
    id: 3,
    questionText: "What is the capital of Japan, known for its advanced technology and cherry blossoms?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/src/assets/tokyo.jpeg"
  },
  {
    id: 4,
    questionText: "In which European capital can you visit the famous Red Square and the Kremlin?",
    options: ["Berlin", "Paris", "Moscow", "Rome"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/src/assets/moscow.jpeg"
  },
  {
    id: 5,
    questionText: "Which capital city is located on the islands of Zealand and Amager?",
    options: ["Copenhagen", "Oslo", "Stockholm", "Helsinki"],
    correctAnswerIndex: 0,
    correctAnswerImageUrl: "/src/assets/copenhagen.jpeg"
  },
  {
    id: 6,
    questionText: "In which capital can you explore the ancient ruins of the Colosseum?",
    options: ["Athens", "Rome", "Madrid", "Lisbon"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/src/assets/rome.jpeg"
  },
  {
    id: 7,
    questionText: "What is the capital city of Australia, known for its iconic Opera House?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/src/assets/canberra.jpeg"
  },
  {
    id: 8,
    questionText: "In which Asian capital can you find the famous Petronas Towers?",
    options: ["Jakarta", "Kuala Lumpur", "Singapore", "Bangkok"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/src/assets/kualalumpur.jpeg"
  },
  {
    id: 9,
    questionText: "Which capital city is famous for its historic canals, bicycles, and Anne Frank's house?",
    options: ["Brussels", "Amsterdam", "Prague", "Vienna"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/src/assets/amsterdam.jpeg"
  },
  {
    id: 10,
    questionText: "In which South American capital can you experience the Carnival festival?",
    options: ["Buenos Aires", "Rio de Janeiro", "Lima", "Bogotá"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/src/assets/RiodeJaneiro.jpeg"
  },
  {
    id: 11,
    questionText: "What is the capital of Canada, known for its impressive Parliament Hill?",
    options: ["Vancouver", "Toronto", "Ottawa", "Montreal"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/src/assets/Ottawa.jpeg"
  },
  {
    id: 12,
    questionText: "In which European capital can you find the Little Mermaid statue?",
    options: ["Oslo", "Copenhagen", "Stockholm", "Helsinki"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/src/assets/copenhagen 2.jpeg"
  },
  {
    id: 13,
    questionText: "Which capital city is famous for its historical sites, including the Vatican City?",
    options: ["Rome", "Madrid", "Athens", "Paris"],
    correctAnswerIndex: 0,
    correctAnswerImageUrl: "/src/assets/rome 2.jpeg"
  },
  {
    id: 14,
    questionText: "In which African capital can you explore the pyramids of Giza?",
    options: ["Cairo", "Nairobi", "Johannesburg", "Accra"],
    correctAnswerIndex: 0,
    correctAnswerImageUrl: "/src/assets/cairo.jpeg"
  },
  {
    id: 15,
    questionText: "What capital city is the home of the iconic Big Ben?",
    options: ["Paris", "Berlin", "London", "Dublin"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/src/assets/london.jpg"
  }
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    }
  }
});
