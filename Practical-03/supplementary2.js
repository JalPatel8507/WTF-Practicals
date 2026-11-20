
function calculateBill() {
    let name = document.getElementById("name").value.trim();
    let units = document.getElementById("units").value;
    let result = document.getElementById("result");

    if (name === "" || units === "") {
        result.innerHTML = "Please enter all details!";
        return;
    }

    units = Number(units);

    if (units < 0 || !Number.isFinite(units)) {
        result.innerHTML = "Please enter valid units!";
        return;
    }

    let bill = 0;

    // Slab-wise tariff calculation
    if (units <= 100) {
        bill = units * 3;
    }
    else if (units <= 200) {
        bill = (100 * 3) + ((units - 100) * 5);
    }
    else if (units <= 300) {
        bill = (100 * 3) + (100 * 5) + ((units - 200) * 7);
    }
    else {
        bill = (100 * 3) + (100 * 5) +
               (100 * 7) + ((units - 300) * 10);
    }

    result.innerHTML =
        "<h2>Electricity Bill</h2>" +
        "Customer Name: " + name + "<br>" +
        "Units Consumed: " + units + "<br>" +
        "Total Bill Amount: ₹" + bill.toFixed(2);
}
