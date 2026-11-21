
// FoodExpress JavaScript

// Get cart data from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("foodCart")) || [];
}

// Save cart data
function saveCart(cart) {
    localStorage.setItem("foodCart", JSON.stringify(cart));
}

// Add food items to cart
document.querySelectorAll(".add-to-cart").forEach(function (button) {

    button.addEventListener("click", function () {

        let cart = getCart();

        let id = this.dataset.id;
        let name = this.dataset.name;
        let price = Number(this.dataset.price);

        let existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }

        saveCart(cart);

        alert(name + " added to cart successfully!");
    });

});

// Display cart items
function displayCart() {

    let cart = getCart();
    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function (item) {

        let subtotal = item.price * item.quantity;
        total += subtotal;

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        let priceCell = document.createElement("td");
        priceCell.textContent = "₹" + item.price;

        let quantityCell = document.createElement("td");

        let decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.className = "btn btn-sm btn-secondary me-2";
        decreaseButton.dataset.action = "decrease";
        decreaseButton.dataset.id = item.id;

        let quantityText = document.createElement("span");
        quantityText.textContent = item.quantity;

        let increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.className = "btn btn-sm btn-secondary ms-2";
        increaseButton.dataset.action = "increase";
        increaseButton.dataset.id = item.id;

        quantityCell.append(
            decreaseButton,
            quantityText,
            increaseButton
        );

        let subtotalCell = document.createElement("td");
        subtotalCell.textContent = "₹" + subtotal;

        let actionCell = document.createElement("td");

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "btn btn-danger btn-sm";
        removeButton.dataset.action = "remove";
        removeButton.dataset.id = item.id;

        actionCell.appendChild(removeButton);

        row.append(
            nameCell,
            priceCell,
            quantityCell,
            subtotalCell,
            actionCell
        );

        cartItems.appendChild(row);

    });

    cartTotal.textContent = total;
}

// Handle cart quantity and remove buttons
document.getElementById("cartItems")?.addEventListener("click", function (event) {

    let button = event.target.closest("button[data-action]");

    if (!button) return;

    let cart = getCart();
    let id = button.dataset.id;
    let action = button.dataset.action;

    let item = cart.find(item => item.id === id);

    if (!item) return;

    if (action === "increase") {
        item.quantity++;
    }

    if (action === "decrease") {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }

    if (action === "remove") {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart(cart);
    displayCart();

});

// Clear entire cart
document.getElementById("clearCart")?.addEventListener("click", function () {

    localStorage.removeItem("foodCart");
    displayCart();

    document.getElementById("cartMessage").textContent =
        "Your cart has been cleared.";

});

// Place demo order
document.getElementById("placeOrder")?.addEventListener("click", function () {

    let cart = getCart();
    let message = document.getElementById("cartMessage");

    if (cart.length === 0) {
        message.textContent = "Your cart is empty!";
        return;
    }

    message.textContent =
        "Your demo order has been placed successfully!";

    localStorage.removeItem("foodCart");
    displayCart();

});

// Highlight active navigation link
document.querySelectorAll(".nav-link").forEach(function (link) {

    if (link.href === window.location.href) {
        link.classList.add("active");
    }

});

// Display cart when page loads
displayCart();

console.log("FoodExpress JavaScript loaded successfully!");
