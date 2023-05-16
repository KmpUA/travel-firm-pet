const upBtn = document.getElementById('up-btn');

window.addEventListener('scroll', () => {
  const twoThirdsPageHeight = document.documentElement.scrollHeight * (2 / 3);
  
  if (window.scrollY + window.innerHeight > twoThirdsPageHeight) {
    upBtn.style.display = 'block';
  } else {
    upBtn.style.display = 'none';
  }
});
