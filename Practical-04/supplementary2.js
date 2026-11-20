
let selectedSeats = [];
let bookedSeats = [];
let ticketPrice = 150;

let seatsContainer = document.getElementById("seats");

// Create 20 seats
for (let i = 1; i <= 20; i++) {
    let seat = document.createElement("div");

    seat.innerText = i;
    seat.className = "seat";
    seat.onclick = function() {
        selectSeat(i, seat);
    };

    seatsContainer.appendChild(seat);
}

function selectSeat(number, seat) {

    if (bookedSeats.includes(number)) {
        return;
    }

    if (selectedSeats.includes(number)) {
        selectedSeats = selectedSeats.filter(s => s !== number);
        seat.classList.remove("selected");
    } else {
        selectedSeats.push(number);
        seat.classList.add("selected");
    }

    updateSummary();
}

function updateSummary() {

    document.getElementById("selected").innerText =
        selectedSeats.length > 0 ? selectedSeats.join(", ") : "None";

    document.getElementById("count").innerText =
        selectedSeats.length;

    document.getElementById("total").innerText =
        selectedSeats.length * ticketPrice;
}

function bookTickets() {

    if (selectedSeats.length === 0) {
        document.getElementById("message").innerText =
            "Please select at least one seat!";
        return;
    }

    bookedSeats.push(...selectedSeats);

    document.querySelectorAll(".seat").forEach(function(seat) {
        if (selectedSeats.includes(Number(seat.innerText))) {
            seat.classList.remove("selected");
            seat.classList.add("booked");
            seat.onclick = null;
        }
    });

    document.getElementById("message").innerText =
        "Tickets booked successfully!";

    selectedSeats = [];
    updateSummary();
}
