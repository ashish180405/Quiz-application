const questions = [
    {
        question:"which is the largest animal in world?",
        answer : [
            {text: "shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "tiger", correct: false},
            {text: "elephant", correct: false},
        ]
    },
    {
        question:"which animal can swim in water?",
        answer : [
            {text: "shark", correct: true},
            {text: "Bird", correct: false},
            {text: "tiger", correct: false},
            {text: "elephant", correct: false},
        ]
    },
    {
        question:"which animal can fly?",
        answer : [
            {text: "shark", correct: false},
            {text: "tiger", correct: false},
            {text: "Bird", correct: true},
            {text: "elephant", correct: false},
        ]
    },
    {
        question:"which is the largest animal in world?",
        answer : [
            {text: "shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "tiger", correct: false},
            {text: "elephant", correct: false},
        ]
    }
];

const ques = document.getElementById("question");
const answerBtn = document.getElementById("ques-ans");
const next = document.getElementById("next-btn");
let currQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currQuestionIndex = 0;
    score = 0;
    next.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currQuestion = questions[currQuestionIndex];
    let questionNumber = currQuestionIndex+1;
    ques.innerHTML = questionNumber + ". " + currQuestion.question;

    currQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer");
        answerBtn.appendChild(button); 

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    next.style.display = "block";
}

function showScore(){
    resetState();
    ques.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    next.innerHTML = `Play Again`;
    next.style.display = "block";
}

function handelNextButton(){
    currQuestionIndex++;
    if(currQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

next.addEventListener("click", ()=>{
    if(currQuestionIndex < questions.length){
        handelNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();