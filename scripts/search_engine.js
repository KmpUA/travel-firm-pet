const searchInput = document.querySelector(".search-input");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchContainer = document.querySelector('.main-filter-container');
const sortSelect = document.querySelector('#sort-select');

searchContainer.addEventListener('click', (event) => {
    searchInput.addEventListener("keyup", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        cards.forEach(function (card) {
            const title = card.querySelector(".card-title").innerText.toLowerCase();
            if (title.indexOf(searchTerm) != -1) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            const region = e.currentTarget.dataset.region;
            const cards = document.querySelectorAll('.card');
            cards.forEach(function (card) {
                if (region === "all") {
                    card.style.display = "block";
                } else {
                    const title = card.querySelector('.region').innerText;
                    if (title.indexOf(region) != -1) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        });
    });
});


