// Modal logic
const htp = document.getElementById("htp");
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close");

htp.onclick = function() {
    modal.style.display = "flex";
};
closeModal.onclick = function() {
    modal.style.display = "none";
};
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Game logic
const Input = document.getElementById("Input");
const mySbmt = document.getElementById("mySbmt");
const result = document.getElementById("result");
const gLeft = document.getElementById("gLeft");
const fres = document.getElementById("fres");
const ans = document.getElementById("ans");
const Rnum = document.getElementById("Rnum");
const progressBar = document.getElementById("progress-bar");
const restartBtn = document.getElementById("restart");

let num, chances, maxChances;

function initGame() {
    num = Math.floor(Math.random() * 101);
    chances = 7;
    maxChances = 7;
    result.textContent = "";
    gLeft.textContent = `You have ${chances} chances!`;
    fres.textContent = "";
    ans.textContent = "?";
    Rnum.classList.remove("reveal");
    mySbmt.disabled = false;
    Input.disabled = false;
    Input.value = "";
    restartBtn.style.display = "none";
    updateProgressBar();
}

function updateProgressBar() {
    const percent = (chances / maxChances) * 100;
    progressBar.style.width = percent + "%";
    progressBar.style.background =
        percent > 50
            ? "linear-gradient(90deg, #0ff 0%, #00f2fe 100%)"
            : percent > 20
            ? "linear-gradient(90deg, #ffeb3b 0%, #ff9800 100%)"
            : "linear-gradient(90deg, #ff3cac 0%, #784ba0 100%)";
}

function animateResult(type) {
    result.style.transition = "none";
    result.style.transform = "scale(1.2)";
    setTimeout(() => {
        result.style.transition = "transform 0.3s cubic-bezier(.4,2,.6,1)";
        result.style.transform = "scale(1)";
    }, 50);
    if (type === "win") {
        Rnum.classList.add("reveal");
    }
}

mySbmt.onclick = function () {
    let gnum = parseInt(Input.value, 10);
    if (isNaN(gnum) || gnum < 0 || gnum > 100) {
        result.textContent = "Please enter a number between 0 and 100!";
        animateResult();
        return;
    }
    if (chances <= 0) return;
    if (gnum > num) {
        result.textContent = "Your guess is too high!";
        chances--;
        animateResult();
    } else if (gnum < num) {
        result.textContent = "Your guess is too low!";
        chances--;
        animateResult();
    } else {
        result.textContent = "🎉 You guessed it! 🎉";
        fres.textContent = "Congratulations!";
        ans.textContent = num;
        animateResult("win");
        mySbmt.disabled = true;
        Input.disabled = true;
        restartBtn.style.display = "block";
        gLeft.textContent = "You did it!";
        updateProgressBar();
        return;
    }
    Input.value = "";
    gLeft.textContent = chances > 0 ? `${chances} chances left...` : "Game Over!";
    updateProgressBar();
    if (chances === 0) {
        result.textContent = "Game Over! You ran out of chances.";
        fres.textContent = "The number was... ";
        ans.textContent = num;
        Rnum.classList.add("reveal");
        mySbmt.disabled = true;
        Input.disabled = true;
        restartBtn.style.display = "block";
    }
};

restartBtn.onclick = function () {
    initGame();
};

// Start game on load
initGame();


