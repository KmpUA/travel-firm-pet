document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    const cart = document.querySelector('#cart');
    const cartModalOverlay = document.querySelector('.cart-modal-overlay');

    cart.addEventListener('click', () => {
        if (cartModalOverlay.style.transform === 'translateX(-200%)') {
            cartModalOverlay.style.transform = 'translateX(0)';
        } else {
            cartModalOverlay.style.transform = 'translateX(-200%)';
        }
    })

    const closeBtn = document.querySelector('#close-btn');

    closeBtn.addEventListener('click', () => {
        cartModalOverlay.style.transform = 'translateX(-200%)';
    });

    cartModalOverlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-modal-overlay')) {
            cartModalOverlay.style.transform = 'translateX(-200%)'
        }
    })


    let priceSortFlag = 0;
    let titleSortFlag = 0;

    function sortByPrice() {
        const productRows = document.getElementsByClassName('product-row');
        let products = [];

        for (let i = 0; i < productRows.length; i++) {
            if (productRows[i]) {
                const productRow = productRows[i];
                const priceElement = productRow.querySelector('.cart-price');
                const price = parseFloat(priceElement.innerText.replace('$', ''));
                const title = productRow.querySelector('.cart-title').innerText;
                const src = productRow.querySelector('.cart-image').src;
                const quantity = productRow.querySelector('.product-quantity').value;
                products.push({ price, src, title, quantity });
            }
        }

        if (priceSortFlag == 0) {
            products.sort((a, b) => (a.price * a.quantity > b.price * b.quantity) ? 1 : -1);
            priceSortFlag = 1;
        }
        else {
            products.sort((a, b) => (a.price * a.quantity < b.price * b.quantity) ? 1 : -1);
            priceSortFlag = 0;
        }

        const productRowsContainer = document.getElementsByClassName('product-rows')[0];
        productRowsContainer.innerHTML = '';

        const unique = products.filter((obj, index) => {
            return index === products.findIndex(o => obj.price === o.price && obj.src === o.src && obj.title === o.title && obj.quantity === o.quantity);
        });

        for (let i = 0; i < unique.length; i++) {
            addItemToCart(`${unique[i].price}$`, unique[i].src, unique[i].title, unique[i].quantity);
        }

        updateEventListeners();
        updateCartPrice();
        saveCart();
    }

    function sortByName() {
        const productRows = document.getElementsByClassName('product-row');
        let products = [];

        for (let i = 0; i < productRows.length; i++) {
            if (productRows[i]) {
                const productRow = productRows[i];
                const priceElement = productRow.querySelector('.cart-price');
                const price = parseFloat(priceElement.innerText.replace('$', ''));
                const title = productRow.querySelector('.cart-title').innerText;
                const src = productRow.querySelector('.cart-image').src;
                products.push({ price, src, title });
            }
        }

        if (titleSortFlag == 0) {
            products.sort((a, b) => (a.title > b.title) ? 1 : -1);;
            titleSortFlag = 1;
        }
        else {
            products.sort((a, b) => (a.title < b.title) ? 1 : -1);;
            titleSortFlag = 0;
        }

        const productRowsContainer = document.getElementsByClassName('product-rows')[0];
        productRowsContainer.innerHTML = '';
        const unique = products.filter((obj, index) => {
            return index === products.findIndex(o => obj.price === o.price && obj.src === o.src && obj.title === o.title && obj.quantity === o.quantity);
        });
        for (let i = 0; i < unique.length; i++) {
            addItemToCart(`${unique[i].price}$`, unique[i].src, unique[i].title, unique[i].quantity);
        }

        updateEventListeners();
        saveCart();
    }

    function mulitplyArrays(arr1, arr2) {
        let result = []
        for (let i = 0; i < arr1.length; i++) {
            result.push(arr1[i] * arr2[i]);
        }
        return result;
    }


    function updateEventListeners() {
        document.getElementById('sort-by-name').removeEventListener('click', sortByName);
        document.getElementById('sort-by-price').removeEventListener('click', sortByPrice);

        document.getElementById('sort-by-name').addEventListener('click', sortByName);
        document.getElementById('sort-by-price').addEventListener('click', sortByPrice);
    }

    document.querySelector('.card-container').addEventListener('click', () => {
        addToCart = document.querySelectorAll('.add-to-cart');
        addToCart.forEach(button => {
            button.addEventListener('click', addToCartClicked);
        });
    });

    function addToCartClicked(event) {
        button = event.target;
        var cartItem = button.parentElement.parentElement.parentElement;
        var cartImage = document.getElementsByClassName('cart-image');
        var price = cartItem.querySelector('.product-price').innerText;
        var imageSrc = cartItem.querySelector('.product-image').src;
        var title = cartItem.querySelector('.card-title').innerText;
        for (let i = 0; i < cartImage.length; i++) {
            if (cartImage[i].src == imageSrc) {
                alert("Вже в кошику");
                return;
            }
        }
        addItemToCart(price, imageSrc, title);
        document.querySelector('#cart').style.transition = "transform 1s";
        document.querySelector('#cart').style.transform = "rotate(360deg)";
        updateCartPrice()
    }

    function addItemToCart(price, imageSrc, title, quantity = 1) {
        var productRow = document.createElement('div');
        productRow.classList.add('product-row');
        var productRows = document.getElementsByClassName('product-rows')[0];
        var cartImage = document.getElementsByClassName('cart-image');

        for (var i = 0; i < cartImage.length; i++) {
            if (cartImage[i].src == imageSrc) {
                return;
            }
        }

        var cartRowItems = `
        <div class="product-row">
            <h1 class="cart-title">${title}</h1>
            <img class="cart-image" src="${imageSrc}" alt="">
            <span class ="cart-price">${price}</span>
            <input class="product-quantity" type="number" value="${parseInt(quantity)}">
            <button class="remove-btn">Видалити</button>
        </div>
        
      `
        productRow.innerHTML = cartRowItems;
        productRows.append(productRow);
        productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
        productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
        updateCartPrice()
        updateEventListeners();
    }

    const removeBtn = document.getElementsByClassName('remove-btn');
    for (var i = 0; i < removeBtn.length; i++) {
        button = removeBtn[i]
        button.addEventListener('click', removeItem)
    }

    function removeItem(event) {
        btnClicked = event.target
        btnClicked.parentElement.parentElement.remove()
        updateCartPrice()
        saveCart();
    }

    var quantityInput = document.getElementsByClassName('product-quantity')[0];

    for (var i = 0; i < quantityInput; i++) {
        input = quantityInput[i]
        input.addEventListener('change', changeQuantity)
    }

    function changeQuantity(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartPrice()
        saveCart();
    }

    function updateCartPrice() {
        let productRow = document.getElementsByClassName('product-row');
        var total = 0
        for (var i = 0; i < productRow.length; i += 2) {
            cartRow = productRow[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)

        }
        document.getElementsByClassName('total-price')[0].innerText = '$' + total

        document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
        saveCart();
    }

    const purchaseBtn = document.querySelector('.purchase-btn');

    purchaseBtn.addEventListener('click', purchaseBtnClicked)

    function purchaseBtnClicked() {
        if(!localStorage.getItem('user')){
            alert('Ви не авторизовані!');
            return;
        }
        alert('Дякуємо за покупку, наші працівники скоро з вами зв`яжуться');
        cartModalOverlay.style.transform = 'translateX(-100%)'
        var cartItems = document.getElementsByClassName('product-rows')[0]
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartPrice()
    }

    function saveCart() {
        let cart = document.getElementsByClassName('product-row');
        let cartArray = [];
        for (let i = 0; i < cart.length; i++) {
            let productRow = cart[i];
            let price = productRow.querySelector('.cart-price').innerText;
            let imageSrc = productRow.querySelector('.cart-image').src;
            let title = productRow.querySelector('.cart-title').innerText;
            let quantity = productRow.querySelector('.product-quantity').value;
            cartArray.push({ price, imageSrc, title, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cartArray));
    }

    function loadCart() {
        let cartArray = JSON.parse(localStorage.getItem('cart'));
        if (cartArray) {
            for (let i = 0; i < cartArray.length; i++) {
                let product = cartArray[i];
                addItemToCart(product.price, product.imageSrc, product.title, product.quantity);
            }
        }
    }

    const productCardContainer = document.querySelector('.card-container');
    const cartDrag = document.querySelector('.cart-btn')
    let tempCard = '';

    productCardContainer.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains("card")) {
            tempCard = e.target;
        }
    });

    cartDrag.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    cartDrag.addEventListener('drop', (e) => {
        e.preventDefault();
        document.querySelector('#cart').style.transition = "transform 1s";
        document.querySelector('#cart').style.transform = "rotate(360deg)";
        let checkIfInside = JSON.parse(localStorage.getItem('cart')).map(a => a.title);
        if(checkIfInside.indexOf(tempCard.querySelector('.card-title').innerText) == -1){
            addItemToCart(parseFloat(tempCard.querySelector('.product-price').innerText.replace('$', '')), tempCard.querySelector('.product-image').src, tempCard.querySelector('.card-title').innerText);
        }
        else{
            alert('Вже у кошику!');
        }
    });
});

