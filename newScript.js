// Wait for the DOM to finish loading
document.addEventListener('DOMContentLoaded', function() {

  // Create a new button element
  var blVerifyButton = document.createElement('button');

  // Set the properties of the button
  blVerifyButton.setAttribute('class', 'child');
  blVerifyButton.textContent = 'Verify';

  // Set the style of the button
  blVerifyButton.style.backgroundColor = 'black';
  blVerifyButton.style.color = 'white';

  // Get the parent element to append the button
  var parentElement = document.querySelector('.form-control form-control--flexible form-control--empty');

  // Append the button to the parent element
  parentElement.appendChild(blVerifyButton);

});
