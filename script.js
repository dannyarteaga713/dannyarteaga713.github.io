document.addEventListener("DOMContentLoaded", function() {
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const questionText = document.getElementById("question-text");
    const displayGif = document.getElementById("display-gif");
    const actionControls = document.getElementById("action-controls");
    const lessonForm = document.getElementById("lesson-form");
    const mainCard = document.getElementById("main-card");

    let noClickCount = 0;
    let yesScale = 1.0;
    let yesFontSize = 1.1;

    const rejectionPhrases = [
        "Hindi",
        "Talaga ba? Isip muna... 🥺",
        "Huwag naman ganyan! 😭",
        "Sige na, please? Sali ako!",
        "Libre kitang kape! ☕",
        "Pindutin mo na yung Yes! Simulan na natin!"
    ];

    // 1. "Hindi" Button Handler (Grows the "Yes" button)
    btnNo.addEventListener("click", function() {
        noClickCount++;
        const phraseIndex = Math.min(noClickCount, rejectionPhrases.length - 1);
        btnNo.innerText = rejectionPhrases[phraseIndex];

        yesScale += 0.35;
        yesFontSize += 0.15;
        
        btnYes.style.transform = `scale(${yesScale})`;
        btnYes.style.fontSize = `${yesFontSize}rem`;
    });

    // 2. "Yes" Button Handler (Swaps Proposal UI out for the Form UI)
    btnYes.addEventListener("click", function() {
        questionText.innerText = "YAYYY! Let's schedule our first lesson! 🎓❤️";
        displayGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW9scXF6YTN0Y3I2bW93ZzB4N29wY3RxamM0bXN6cmN6ZzZsOHZ0dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3RsPTE/KztT2c4Y8m7xcEMYUt/giphy.gif"; 

        actionControls.classList.add("hidden");
        lessonForm.classList.remove("hidden");
    });

    // 3. Form Submit Event Handler (Sends data to Formspree via AJAX & serves final view)
    lessonForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Stop standard browser page reload

        const formData = new FormData(lessonForm);
        const studentName = document.getElementById("student-name").value;
        const preferredDay = document.getElementById("lesson-day").value;
        const preferredTime = document.getElementById("lesson-time").value;

        // Send data behind the scenes to Formspree
        fetch(lessonForm.action, {
            method: lessonForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Render the beautiful custom layout only if submission succeeds
                mainCard.innerHTML = `
                    <div class="image-wrapper">
                        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW9scXF6YTN0Y3I2bW93ZzB4N29wY3RxamM0bXN6cmN6ZzZsOHZ0dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3RsPTE/KztT2c4Y8m7xcEMYUt/giphy.gif" alt="Success">
                    </div>
                    <h1>See you on ${preferredDay}! 🎉</h1>
                    <p class="success-text">
                        Awesome, <strong>${studentName}</strong>! Your preference for <strong>${preferredDay}s (${preferredTime})</strong> has been successfully captured. Time to master Tagalog! 🇵🇭
                    </p>
                `;
            } else {
                alert("Oops! There was a problem submitting your form. Please try again.");
            }
        }).catch(error => {
            alert("Oops! There was a connection error. Please check your internet link.");
        });
    });
});