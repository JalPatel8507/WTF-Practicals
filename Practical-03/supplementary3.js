
function generateBill() {
    let name = document.getElementById("name").value.trim();
    let product = document.getElementById("product").value.trim();

    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let discount = document.getElementById("discount").value;
    let gst = document.getElementById("gst").value;

    let result = document.getElementById("result");

    if (name === "" || product === "" || quantity === "" ||
        price === "" || discount === "" || gst === "") {
        result.innerHTML = "Please fill all fields!";
        return;
    }

    quantity = Number(quantity);
    price = Number(price);
    discount = Number(discount);
    gst = Number(gst);

    if (quantity <= 0 || price < 0 ||
        discount < 0 || discount > 100 ||
        gst < 0 || !Number.isFinite(quantity) ||
        !Number.isFinite(price) || !Number.isFinite(discount) ||
        !Number.isFinite(gst)) {
        result.innerHTML = "Please enter valid values!";
        return;
    }

    let total = quantity * price;
    let discountAmount = total * discount / 100;
    let afterDiscount = total - discountAmount;
    let gstAmount = afterDiscount * gst / 100;
    let finalAmount = afterDiscount + gstAmount;

    result.innerHTML =
        "<h2>Shopping Bill</h2>" +
        "Customer: " + name + "<br>" +
        "Product: " + product + "<br>" +
        "Quantity: " + quantity + "<br>" +
        "Total Amount: ₹" + total.toFixed(2) + "<br>" +
        "Discount: ₹" + discountAmount.toFixed(2) + "<br>" +
        "GST: ₹" + gstAmount.toFixed(2) + "<br>" +
        "<hr>" +
        "Final Payable Amount: ₹" + finalAmount.toFixed(2);
}
