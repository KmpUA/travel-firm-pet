window.addEventListener('load', function() {
  setTimeout(function(){
    showAd();
  }, 50000);
  setInterval(function() {
    showAd();
  }, 60000);
});

function showAd() {
  let modal = document.getElementById("modal");
  modal.style.display = "block";
  document.body.style.overflow = 'hidden';
  document.body.style.userSelect = "none";
  setTimeout(function() {
    let closeBtnAdv = document.querySelector(".close");
    closeBtnAdv.style.display = "block";
  }, 5000);
}

let closeBtnAdv = document.querySelector(".close");
closeBtnAdv.addEventListener('click', function(){
  let modal = document.getElementById("modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  document.body.style.userSelect = "auto";
});