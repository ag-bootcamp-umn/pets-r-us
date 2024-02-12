$(document).ready(function() {
    const questions = [
        { title: "Question 1", text: "What kind of pet are you looking for?", answers: ["Dog", "Cat", "Bird", "Rodent", "All of the Above"] },
        { title: "Question 2", text: "Do you have any pet allergies?", answers: ["Yes", "No"] },
        { title: "Question 3", text: "Will you require a pet that is good with children?", answers: ["Yes", "No"] }
    ];
    let currentQuestionIndex = 0;

    let answers = {
        species: null,
        hypoallergenic: false,
        kidsStatus: false
    };

    function showQuestion(index) {
        const question = questions[index];
        $('#question-title').text(question.title);
        $('#question-text').text(question.text);
        $('.answer-button').remove();
        question.answers.forEach((answer, answerIndex) => {
            $('<button>')
                .addClass('btn btn-secondary px-5 m-2 answer-button')
                .text(answer)
                .click(() => answerQuestion(index, answerIndex))
                .appendTo('.button-container');
        });
    }

    function answerQuestion(index, answerIndex) {
        if (index === 0) {
            answers.species = answerIndex + 1;
        } else if (index === 1) {
            answers.hypoallergenic = answerIndex === 0;
        } else if (index === 2) {
            answers.kidsStatus = answerIndex === 0;
        }

        if (index < questions.length - 1) {
            showQuestion(index + 1);
        } else {
            sendAnswersToServer();
        }
    }

    function sendAnswersToServer() {
        const userId = sessionStorage.getItem('userId') || 'null';

        console.log('putting...', answers);

        fetch(`/api/users/signup/${userId}`, { 
            method: 'PUT',
            body: JSON.stringify(answers),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (response.ok) {
                console.log(`Answers successfully submitted to ${userId}`);
            } else {
                console.error('Failed to submit answers');
            }
        })
        .catch(error => {
            console.error('Error submitting answers:', error);
        });
    }

    $('.start-button').click(() => {
        $('.start-button').hide();
        showQuestion(currentQuestionIndex);
    });
});
