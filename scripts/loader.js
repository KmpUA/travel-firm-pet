document.addEventListener('DOMContentLoaded', function () {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(function () {
    loader.style.display = 'none';
  }, 600);
});

const logo = document.querySelector('.users-logo');
const figcpt = document.querySelector('.figcaption');
const user = JSON.parse(localStorage.getItem('user'));
const logoutBtn = document.querySelector('.logout-btn');

if(user){
  figcpt.innerText = `Ім'я: ${user.name} \n Пошта: ${user.email} \n Статус: ${user.role}`;
  if(user.role == 'Admin'){
    document.querySelector('.adminpanel-btn').style.display = 'block';
  }
}
else{
  figcpt.innerText = 'Ви не авторизовані!';
  logoutBtn.innerText = 'Авторизуватися';
}


logoutBtn.addEventListener('click', () => {
  if(figcpt.innerText == 'Ви не авторизовані!'){
    window.location.href = './login-page.html';
  }
  else{
    localStorage.removeItem('user');
    figcpt.innerText == 'Ви не авторизовані!'
    document.getElementsByClassName('product-rows')[0] = '';
    window.location.reload();
  }
});

logo.addEventListener('click', () => {
  if(document.querySelector('.fir-image-figure').style.display == 'none'){
    document.querySelector('.fir-image-figure').style.display = 'flex';
  }
  else{
    document.querySelector('.fir-image-figure').style.display = 'none';
  }
})