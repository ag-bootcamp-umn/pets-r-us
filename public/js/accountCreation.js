$(document).ready(function() {
    const questions = [
        { title: "Question 1", text: "What kind of pet are you looking for?", answers: ["Dog", "Cat", "Bird", "Rodent", "All of the Above"] },
        { title: "Question 2", text: "Do you have any pet allergies?", answers: ["Yes", "No"] },
        { title: "Question 3", text: "Will you require a pet that is good with children?", answers: ["Yes", "No"] }
    ];
    let currentQuestionIndex = 0;

    function showQuestion(index) {
        const question = questions[index];
        $('#question-title').text(question.title);
        $('#question-text').text(question.text);
        $('.answer-button').remove();
        question.answers.forEach(answer => {
            $('<button>')
                .addClass('btn btn-secondary px-5 m-2 answer-button')
                .text(answer)
                .click(() => answerQuestion(index))
                .appendTo('.button-container');
        });
    }

    function answerQuestion(index) {
        if (index < questions.length - 1) {
            showQuestion(index + 1);
        } else {
            sendAnswersToServer();
        }
    }

    function sendAnswersToServer() {
        $.ajax({
            url: '/api/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({answers: answers}),
            success: function(response) {
                window.location.href = "/profile";
            },
            error: function(xhr, status, error) {
                console.error("Error submitting answers:", status, error);
            }
        });
    }

    $('.start-button').click(() => {
        $('.start-button').hide();
        showQuestion(currentQuestionIndex);
    });
});
