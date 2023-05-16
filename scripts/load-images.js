const imagesPerPage = 8;
let currentPage = 1;
let currentImages = [];

const imagesList = document.getElementById("prod1");
const loadNextButton = document.getElementById("nextBtn");
const loadPreviousButton = document.getElementById("prevBtn");
const pageNumP = document.getElementById("page-num");
const pageButtonsContainer = document.getElementById("page-buttons");
const selector = document.querySelector('#sort-select');
const searchCon = document.querySelector('.search-container');
const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    range = document.querySelector(".ranger-slider .progress");
let priceGap = 0;
let minVal = parseInt(rangeInput[0].value),
    maxVal = parseInt(rangeInput[1].value);

range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";

fetch("https://api.jsonbin.io/v3/b/645146669d312622a3562425")
    .then(response => response.json())
    .then(data => {
        imagesData = data.record;
        imagesData = imagesData.filter((element) => {
            return element != null;
        });
        function convert(x) {
            var floatValue = +(x);
            return floatValue;
        }

        function displayImages(pageNumber) {
            const startIndex = (pageNumber - 1) * imagesPerPage;
            const endIndex = startIndex + imagesPerPage;
            const pageImages = imagesData.slice(startIndex, endIndex);
        
            currentImages.forEach(image => {
                image.remove();
            });
        
            currentImages = [];
        
            pageImages.forEach(imageData => {
                const image = document.createElement('article');
                let finalCards = "";
                image.classList.add('card');
                image.setAttribute('draggable', true);
                finalCards += `<div class="image-container-discount">
                                        <img class="product-image" src="${imageData.src}" alt="Туристичне місце">`;
                if (imageData.discount != "") {
                    finalCards += `<div class="discount">${convert(imageData.discount)}%</div>`;
                }
                finalCards += `</div>
                                    <div class="card-info">
                                        <h2 class="card-title">${imageData.title}</h2>
                                        <p class="product-price">${convert(imageData.price)}$</p>
                                        <div class="add_buttons">
                                            <button class="card-btn">Детальніше</button>
                                            <button class="add-to-cart card-btn-style">Додати в кошик</button>
                                        </div>
                                        <div class="card-description">
                                        <p id="desc">
                                            ${imageData.description}</p>
                                        </div>
                                        <div class="region" style="display:none;">${imageData.region}</div>
                                    </div>`;
                image.innerHTML = finalCards;
                imagesList.appendChild(image);
                currentImages.push(image);
            });
        }
        
        function createPageButton(pageNumber) {
            const button = document.createElement("button");
            button.innerText = pageNumber;
            if (pageNumber == currentPage) {
                button.classList.add("chosen");
            }
            else {
                button.classList.add("page-button");
            }
            button.addEventListener("click", () => {
                currentPage = pageNumber;
                displayImages(currentPage);
                updatePageButtons();
            });
            return button;
        }
        
        function updatePageButtons() {
            pageButtonsContainer.innerHTML = "";
            const totalPages = Math.ceil(imagesData.length / imagesPerPage);
        
            let startPage = 1;
            let endPage = totalPages;
        
            if (totalPages > 5) {
                if (currentPage <= 3) {
                    endPage = 5;
                } else if (currentPage >= totalPages - 2) {
                    startPage = totalPages - 4;
                } else {
                    startPage = currentPage - 2;
                    endPage = currentPage + 2;
                }
            }
            if (totalPages != 1) {
                pageButtonsContainer.appendChild(createPageButton(1));
                for (let i = startPage + 1; i < endPage; i++) {
                    pageButtonsContainer.appendChild(createPageButton(i));
                }
                pageButtonsContainer.appendChild(createPageButton(totalPages));
            }
            else {
                pageButtonsContainer.appendChild(createPageButton(totalPages));
            }
        
        }
        displayImages(currentPage);
        updatePageButtons();
        const startCards = imagesList.querySelectorAll('.card');
        
        searchCon.addEventListener('click', () => {
            selector.addEventListener('change', (e) => {
                const cardsSort = Array.from(startCards);
                switch (parseInt(e.originalTarget.value)) {
                    case 1:
                        cardsSort.sort((a, b) => {
                            return parseInt(a.querySelector('.product-price').innerText.replace('$', '')) -
                                parseInt(b.querySelector('.product-price').innerText.replace('$', ''));
                        });
                        break;
                    case 2:
                        cardsSort.sort((a, b) => {
                            return parseInt(b.querySelector('.product-price').innerText.replace('$', '')) -
                                parseInt(a.querySelector('.product-price').innerText.replace('$', ''));
                        });
                        break;
                    case 3:
                        cardsSort.sort((a, b) => {
                            return a.lastChild.firstElementChild.innerText.localeCompare(b.lastChild.firstElementChild.innerText);
                        });
                        break;
                    default:
                        break;
                }
                let crdCnt = document.querySelector('.card-container');
                crdCnt.innerHTML = '';
                cardsSort.forEach((card) => {
                    crdCnt.appendChild(card);
                });
            });
        });
        
        priceInput.forEach((input) => {
            input.addEventListener("input", (e) => {
                let minPrice = parseInt(priceInput[0].value),
                    maxPrice = parseInt(priceInput[1].value);
                let cards = Array.from(startCards);
                cards = cards.filter((element) => {
                    return parseInt(element.querySelector('.product-price').innerText.replace('$', '')) >= minPrice && parseInt(element.querySelector('.product-price').innerText.replace('$', '')) <= maxPrice;
                });
                let crdCnt = document.querySelector('.card-container');
                crdCnt.innerHTML = '';
                cards.forEach((card) => {
                    crdCnt.appendChild(card);
                });
                if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                    if (e.target.className === "input-min") {
                        rangeInput[0].value = minPrice;
                        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
                    } else {
                        rangeInput[1].value = maxPrice;
                        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                    }
                }
            });
        });
        
        rangeInput.forEach((input) => {
            input.addEventListener("input", (e) => {
                let minPrice = parseInt(rangeInput[0].value),
                    maxPrice = parseInt(rangeInput[1].value);
                let cards = Array.from(startCards);
                cards = cards.filter((element) => {
                    return parseInt(element.querySelector('.product-price').innerText.replace('$', '')) >= minPrice && parseInt(element.querySelector('.product-price').innerText.replace('$', '')) <= maxPrice;
                });
                let crdCnt = document.querySelector('.card-container');
                crdCnt.innerHTML = '';
                cards.forEach((card) => {
                    crdCnt.appendChild(card);
                });
                if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                    if (e.target.className === "input-min") {
                        rangeInput[0].value = minPrice;
                        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
                    } else {
                        rangeInput[1].value = maxPrice;
                        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                    }
                }
            });
        });
        displayImages(currentPage);
        updatePageButtons();
    })
    .catch(error => console.error(error));



