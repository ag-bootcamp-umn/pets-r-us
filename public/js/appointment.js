"use strict";

const appointmentForm = document.querySelector('.appointment-form');

appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const appointmentDate = document.querySelector('#appointment-date').value;
  console.log('apptDate:', appointmentDate);
  const appointmentPost = {appointmentDate};
  console.log('apptPost:', appointmentPost);
  
const response = await fetch('api/meet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointmentPost)
  })
  if (response.ok) {
    console.log('OK!!!')
  } else {
    console.log('No Dice.')
  }
});