const subscribePopup = document.getElementById('subscribe-popup');
const subscribeAcceptButton = document.getElementById('subscribe-accept');
const subscribeRejectButton = document.getElementById('subscribe-reject');


function setCookie(name, value, days){
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires = ${ expires }; path = /`;
}


function getCookie(name){
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

const showSubscribePopup = () => {
    const subscribed = getCookie('subscribed');
    if (!subscribed) {
        subscribePopup.classList.remove('hidden');
    }
};

const hideSubscribePopup = () => {
    subscribePopup.classList.add('hidden');
};

const handleSubscribeAccept = () => {
    setCookie('subscribed', true, 30);
    hideSubscribePopup();
    alert('Дякуємо за підписку!');
};

const handleSubscribeReject = () => {
    hideSubscribePopup();
};

subscribeAcceptButton.addEventListener('click', handleSubscribeAccept);
subscribeRejectButton.addEventListener('click', handleSubscribeReject);

showSubscribePopup();
