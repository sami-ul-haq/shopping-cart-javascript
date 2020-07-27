if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready)
} else{
    ready()
}

// Main Function
function ready(){

    // Access Remove Button
    let  removeCartItemBtn= document.getElementsByClassName('btn-danger');
    for (let i = 0; i < removeCartItemBtn.length; i++) {
        let button = removeCartItemBtn[i];
        button.addEventListener('click' , removeCartItem );
    }

    // Access Quantity Input
    let quantityInput = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener('change' , quantityChanged );
    }

    // Access AddToCart Button
    let addToCartBtn = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartBtn.length; i++) {
        let button = addToCartBtn[i];
        button.addEventListener('click' , addToCartClicked );
    }

    let purchased = document.getElementsByClassName('btn-purchase')[0];
    purchased.addEventListener('click' , purchasedClicked );
}


// On Purchased Button Click 
function purchasedClicked() { 
    alert('Thank You For Your Purchase !!')
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCart();
}


// Add To Cart
function addToCartClicked(event){
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    addItemToCart(title , price , imgSrc);
    updateCart();
}

// Add Cart Row
function addItemToCart(title , price , imgSrc){
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartRow = document.createElement('div');
    let cartItemNames = document.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if( cartItemNames[i].innerText == title){
            alert('This Item Already Added !!');
            return;
        }        
    }
    let cartRowContent = 
    `<div class="cart-row">
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    </div>`;

    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click' , removeCartItem );
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change' , quantityChanged );
}

// Updates Cart
function updateCart() { 
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let elementPrice = cartRow.getElementsByClassName('cart-price')[0];
        let elementQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0];

        let price = parseFloat(elementPrice.innerText.replace('$' , ''));
        let quantity = elementQuantity.value;
        total += (price * quantity);
    }
    total = Math.round(total *100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = `$ ${total}`;
}

// On Quantity Change
function quantityChanged(event){ 
    let input = event.target;
    console.log(input);
    if( isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCart();
}

// Remove Cart
function removeCartItem(event){
    let btnClicked = event.target;
    btnClicked.parentElement.parentElement.remove();
    updateCart();
}


