// Sample data for office layouts (in terms of seats)
const offices = {
    office1: { totalSeats: 50, occupiedSeats: 20, powerUsage: 0.5, waterUsage: 2 },
    office2: { totalSeats: 80, occupiedSeats: 40, powerUsage: 0.4, waterUsage: 1.8 },
    office3: { totalSeats: 120, occupiedSeats: 60, powerUsage: 0.3, waterUsage: 1.5 }
};

// Function to update the seat layout based on selected office
function updateSeatPlan() {
    const office = document.getElementById("office").value;
    const layout = offices[office];
    
    const seatLayoutDiv = document.getElementById("seat-layout");
    seatLayoutDiv.innerHTML = ''; // Clear current seats
    
    for (let i = 0; i < layout.totalSeats; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        
        // Mark as occupied if needed
        if (i < layout.occupiedSeats) {
            seat.classList.add("occupied");
        }
        
        seat.textContent = i + 1;
        seat.onclick = () => toggleSeat(i, office);
        
        seatLayoutDiv.appendChild(seat);
    }

    // Update utilities and cost saving
    updateUtilitiesAndCost(office);
}

// Function to toggle seat occupancy
function toggleSeat(seatIndex, office) {
    const layout = offices[office];
    if (layout.occupiedSeats > seatIndex) {
        layout.occupiedSeats--;
    } else {
        layout.occupiedSeats++;
    }
    updateSeatPlan(); // Re-render seat plan
}

// Function to update utilities and cost saving
function updateUtilitiesAndCost(office) {
    const layout = offices[office];

    // Update power and water usage
    const powerConsumption = layout.occupiedSeats * layout.powerUsage;
    const waterConsumption = layout.occupiedSeats * layout.waterUsage;

    document.getElementById("power-consumption").textContent = `${powerConsumption.toFixed(2)} kW`;
    document.getElementById("water-consumption").textContent = `${waterConsumption.toFixed(2)} liters`;

    // Calculate real estate cost saving (assumption: each seat saved = $50/month)
    const savings = (layout.totalSeats - layout.occupiedSeats) * 50;
    document.getElementById("cost-saving").textContent = `${savings.toFixed(2)} USD`;
}

// Initialize the app with the first office's layout
updateSeatPlan();
