const cardContainer = document.querySelector('.card-container');

cardContainer.addEventListener('click', event => {
  const button = event.target.closest('.card-btn');
  if (!button) return;

  const cardDescription = button.parentElement.nextElementSibling;

  if (button.classList.contains('active')) {
    button.textContent = 'Детальніше';
    cardDescription.style.transform = 'translateY(200%)';
  } else {
      button.textContent = 'Закрити';
      cardDescription.style.transform = 'translateY(0)';
  }

  button.classList.toggle('active');
});
