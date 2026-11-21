// Select all Order Now buttons
const orderButtons = document.querySelectorAll(".order-btn");

// Add click event to each button
orderButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        alert("Thank you for choosing FoodExpress! Your order is being processed.");
    });
});

// Contact form submission
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Thank you! Your message has been submitted.");
        contactForm.reset();
    });
}