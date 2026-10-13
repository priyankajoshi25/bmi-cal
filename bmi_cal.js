// Professional BMI Calculator JavaScript

const calculateBtn = document.getElementById("calculateBtn");
const historyDiv = document.getElementById("history");
const clearBtn = document.getElementById("clearHistory");

calculateBtn.addEventListener("click", calculateBMI);

clearBtn.addEventListener("click", () => {
    historyDiv.innerHTML = "";
});

function calculateBMI() {
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;

    if (!age || !weight || !height || isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert("Please enter valid details");
        return;
    }

    const bmiValue = weight / (height * height);
    const bmi = bmiValue.toFixed(1);

    document.getElementById("bmiValue").innerText = bmi;

    const categoryDiv = document.getElementById("bmiCategory");
    let category = "";

    if (bmiValue < 18.5) {
        category = "Underweight";
        categoryDiv.className = "bmi-category underweight";
    } else if (bmiValue < 24.9) {
        category = "Normal";
        categoryDiv.className = "bmi-category normal";
    } else if (bmiValue < 29.9) {
        category = "Overweight";
        categoryDiv.className = "bmi-category overweight";
    } else {
        category = "Obese";
        categoryDiv.className = "bmi-category obese";
    }

    categoryDiv.innerText = category;

    const item = document.createElement("div");
    item.className = "history-item";
    item.innerText = `Age: ${age}, Gender: ${gender}, BMI: ${bmi}, Status: ${category}`;
    historyDiv.appendChild(item);

    drawGauge(bmiValue);
}


function drawGauge(bmiValue){
    const canvas = document.getElementById("bmiGauge");
    if (!canvas) return; // Safety check

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;

    // Background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#30363d"; // Professional dark
    ctx.stroke();

    // Progress arc
    const percent = Math.min(bmiValue, 40) / 40;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + Math.PI * percent);
    ctx.lineWidth = 20;

    // Professional colors
    if (bmiValue < 18.5) ctx.strokeStyle = "#d29922"; // Warning amber
    else if (bmiValue < 24.9) ctx.strokeStyle = "#56d364"; // Success green
    else if (bmiValue < 29.9) ctx.strokeStyle = "#d29922"; // Warning amber
    else ctx.strokeStyle = "#da3633"; // Error red

    ctx.stroke();

    // BMI text
    ctx.font = "22px 'Fira Code', monospace";
    ctx.fillStyle = "#f0f6fc"; // Professional light text
    ctx.textAlign = "center";
    ctx.fillText(bmiValue.toFixed(1), centerX, centerY + 10);

    // Color bar
    const barWidth = 220;
    const barHeight = 12;
    const startX = centerX - barWidth / 2;
    const startY = centerY + 60;

    // Underweight section
    ctx.fillStyle = "#d29922";
    ctx.fillRect(startX, startY, barWidth * 0.25, barHeight);

    // Normal section
    ctx.fillStyle = "#56d364";
    ctx.fillRect(startX + barWidth * 0.25, startY, barWidth * 0.25, barHeight);

    // Overweight section
    ctx.fillStyle = "#d29922";
    ctx.fillRect(startX + barWidth * 0.5, startY, barWidth * 0.25, barHeight);

    // Obese section
    ctx.fillStyle = "#da3633";
    ctx.fillRect(startX + barWidth * 0.75, startY, barWidth * 0.25, barHeight);

    // Indicator
    const indicatorX = startX + (Math.min(bmiValue, 40) / 40) * barWidth;
    ctx.beginPath();
    ctx.moveTo(indicatorX, startY - 5);
    ctx.lineTo(indicatorX, startY + barHeight + 5);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#58a6ff"; // Professional blue
    ctx.stroke();
}