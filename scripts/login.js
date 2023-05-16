let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".login-slider");
let formSection = document.querySelector(".form-section");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});

const signupBox = document.querySelector('.signup-box');
const signupBtn = signupBox.querySelector('.clkbtn');
const loginBox = document.querySelector('.login-box');
const loginBtn = loginBox.querySelector('.clkbtn');
let loginEmailPlaceholder = loginBox.querySelector('.email.ele');
let loginPasswordPlaceholder = loginBox.querySelector('.password.ele');
let signupEmailPlaceholder = signupBox.querySelector('.email.ele');
let signupPasswordPlaceholder = signupBox.querySelectorAll('.password.ele');
let namePlaceholder = signupBox.querySelector('.name.ele');
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");
let signupCheckAlert = signupBox.querySelector('.check-alert');
let loginCheckAlert = document.querySelector('.check-alert-login');

function isFieldsEmpty() {
  return !namePlaceholder.value
    || !signupEmailPlaceholder.value
    || !signupPasswordPlaceholder[0].value
    || !signupPasswordPlaceholder[1].value;
}

function isPasswordsValid(){
  return letter.classList.contains('valid') &&
          capital.classList.contains('valid') &&
          number.classList.contains('valid') &&
          length.classList.contains('valid');
}

function isPasswordsSimilar() {
  if (signupPasswordPlaceholder[0].value != signupPasswordPlaceholder[1].value) {
    alert("Паролі не співпадають!");
    signupPasswordPlaceholder.forEach((password) => {
      password.value = '';
      letter.classList.add("invalid");
      capital.classList.add("invalid");
      number.classList.add("invalid");
      length.classList.add("invalid");
    });
    return 1;
  }
  return 0;
}

function clearFields() {
  namePlaceholder.value = '';
  signupEmailPlaceholder.value = '';
  signupPasswordPlaceholder[0].value = '';
  signupPasswordPlaceholder[1].value = '';
}

function emailEvent(event, type) {
  let checkAlert;
  type == "login" ? checkAlert = signupCheckAlert : checkAlert = signupCheckAlert;
  if (!validateEmail(event.target.value)) {
    checkAlert.innerText = 'Неправильно введена адреса пошти!';
    checkAlert.style.display = 'block';
  }
  else {
    checkAlert.style.display = 'none';
  }
}

function emptyFieldsEvent(type) {
  let checkAlert;
  type == "login" ? checkAlert = loginCheckAlert : checkAlert = signupCheckAlert;
  if (isFieldsEmpty()) {
    checkAlert.innerText = 'Не всі поля заповнені!';
    checkAlert.style.display = 'block';
  }
  else {
    checkAlert.style.display = 'none';
  }
}

loginBtn.addEventListener('click', () => {
  fetch('https://api.jsonbin.io/v3/b/6450e5158e4aa6225e94b580')
    .then(response => response.json())
    .then(data => {
      const email = loginEmailPlaceholder.value;
      const password = loginPasswordPlaceholder.value;

      const users = data.record.users;
      const user = users.find(u => u.email === email && u.password === password)

      if (user) {
        console.log(`Користувач ${user.email} знайдений!`);
        user.password = '';
        localStorage.setItem('user', JSON.stringify(user));
        loginEmailPlaceholder.value = '';
        loginPasswordPlaceholder.value = '';
        window.location.href = './index.html';
      } else {
        loginCheckAlert.innerText = 'Помилка у введених даних!';
      }
    })
    .catch(error => console.error(error))
});

signupEmailPlaceholder.addEventListener('keyup', (event) => {
  emailEvent(event, "signup");
});

signupPasswordPlaceholder[0].addEventListener('focus', () => {
  document.getElementById('message').style.display = 'block';
});

signupPasswordPlaceholder[0].addEventListener('blur', () => {
  document.getElementById('message').style.display = 'none';
});

signupPasswordPlaceholder[0].addEventListener('keyup', () => {
  let pass = signupPasswordPlaceholder[0].value;
  let lowerCaseLetters = /[a-z]/g;
  if (pass.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  let upperCaseLetters = /[A-Z]/g;
  if (pass.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  let numbers = /[0-9]/g;
  if (pass.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  if (pass.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
});

signupBox.addEventListener('click', emptyFieldsEvent('signup'));
loginBox.addEventListener('click', emptyFieldsEvent('login'));

signupBtn.addEventListener('click', () => {
  const email = signupEmailPlaceholder.value;
  const password = signupPasswordPlaceholder[0].value;
  const name = signupBox.querySelector('.name.ele').value;
  if (isPasswordsSimilar && isPasswordsValid && validateEmail(email)) {
    fetch('https://api.jsonbin.io/v3/b/6450e5158e4aa6225e94b580')
      .then(response => response.json())
      .then(data => {
        const users = data.record.users;

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          signupCheckAlert.innerText = 'Користувач з такою адресою вже існує!';
          clearFields();
          return;
        }

        const newUser = { name: name, password: password, email: email, role: "User" };
        users.push(newUser);

        fetch('https://api.jsonbin.io/v3/b/6450e5158e4aa6225e94b580', {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'X-Master-Key': '$2b$10$7Oe1WJbbDt1LCeFPeCjC6efIWFNBJAsRS1Z.dYiHcfGQn2MpQolJm'
          },
          body: JSON.stringify(data.record)
        })
          .then(response => {
            alert('Дані успішно збережено!');
            clearFields();
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error))
  }
  else{
    signupCheckAlert.value = 'Помилка у введних паролях!';
    signupPasswordPlaceholder[0].value = '';
    signupPasswordPlaceholder[1].value = '';
  }
});
