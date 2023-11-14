import { createSlice } from "@reduxjs/toolkit";

const questions = [
  {
    id: 1,
    questionText: "Which capital city is known as the 'City of Love' and is famous for the Eiffel Tower?",
    options: ["Rome", "Berlin", "Paris", "Madrid"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/paris.jpeg"
  },
  {
    id: 2,
    questionText: "In which capital city can you find the ancient Acropolis?",
    options: ["Athens", "Istanbul", "Rome", "Cairo"],
    correctAnswerIndex: 0,
    correctAnswerImageUrl: "/athens.jpeg"
  },
  {
    id: 3,
    questionText: "What is the capital of Japan, known for its advanced technology and cherry blossoms?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/tokyo.jpeg"
  },
  {
    id: 4,
    questionText: "In which European capital can you visit the famous Red Square and the Kremlin?",
    options: ["Berlin", "Paris", "Moscow", "Rome"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/moscow.jpeg"
  },
  {
    id: 5,
    questionText: "Which capital city is located on the islands of Zealand and Amager?",
    options: ["Copenhagen", "Oslo", "Stockholm", "Helsinki"],
    correctAnswerIndex: 0,
    correctAnswerImageUrl: "/copenhagen.jpeg"
  },
  {
    id: 6,
    questionText: "In which capital can you explore the ancient ruins of the Colosseum?",
    options: ["Athens", "Rome", "Madrid", "Lisbon"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/rome.jpeg"
  },
  {
    id: 7,
    questionText: "What is the capital city of Australia, known for its iconic Opera House?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/canberra.jpeg"
  },
  {
    id: 8,
    questionText: "In which Asian capital can you find the famous Petronas Towers?",
    options: ["Jakarta", "Kuala Lumpur", "Singapore", "Bangkok"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/kualalumpur.jpeg"
  },
  {
    id: 9,
    questionText: "Which capital city is famous for its historic canals, bicycles, and Anne Frank's house?",
    options: ["Brussels", "Amsterdam", "Prague", "Vienna"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/amsterdam.jpeg"
  },
  {
    id: 10,
    questionText: "In which South American capital can you experience the Carnival festival?",
    options: ["Buenos Aires", "Rio de Janeiro", "Lima", "Bogotá"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/RiodeJaneiro.jpeg"
  },
  {
    id: 11,
    questionText: "What is the capital of Canada, known for its impressive Parliament Hill?",
    options: ["Vancouver", "Toronto", "Ottawa", "Montreal"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/Ottawa.jpeg"
  },
  {
    id: 12,
    questionText: "In which European capital can you find the Little Mermaid statue?",
    options: ["Oslo", "Copenhagen", "Stockholm", "Helsinki"],
    correctAnswerIndex: 1,
    correctAnswerImageUrl: "/copenhagen 2.jpeg"
  },
  {
    id: 13,
    questionText: "Which capital city is famous for its historical sites, including the Vatican City?",
    options: ["Rome", "Madrid", "Athens", "Paris"],
    correctAnswerIndex: 0,
    correctAnswerImageUrl: "/rome 2.jpeg"
  },
  {
    id: 14,
    questionText: "In which African capital can you explore the pyramids of Giza?",
    options: ["Cairo", "Nairobi", "Johannesburg", "Accra"],
    correctAnswerIndex: 0,
    correctAnswerImageUrl: "/cairo.jpeg"
  },
  {
    id: 15,
    questionText: "What capital city is the home of the iconic Big Ben?",
    options: ["Paris", "Berlin", "London", "Dublin"],
    correctAnswerIndex: 2,
    correctAnswerImageUrl: "/london.jpg"
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

    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    restart: () => {
      return initialState;
    }
  }
});
