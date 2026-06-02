document.addEventListener("DOMContentLoaded", function() {
    // Select core DOM elements
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const questionText = document.getElementById("question-text");
    const displayGif = document.getElementById("display-gif");
    const actionControls = document.getElementById("action-controls");

    // Local runtime variables
    let noClickCount = 0;
    let yesButtonScale = 1.0;
    let fontSizeValue = 1.2;

    // Progression loop for rejection strings
    const rejectionPhrases = [
        "Hindi",
        "Talaga ba? Isip muna... 🥺",
        "Huwag naman ganyan! 😭",
        "Sige na, please? Sali ako!",
        "Libre kitang kape! ☕",
        "Pindutin mo na yung Yes! Simulan na natin!"
    ];

    // --- Action Listener: Rejection Event ---
    btnNo.addEventListener("click", function() {
        noClickCount++;

        // Determine current string phrase
        const phraseIndex = Math.min(noClickCount, rejectionPhrases.length - 1);
        btnNo.innerText = rejectionPhrases[phraseIndex];

        // Incrementally adjust dimensions of the confirmation node
        yesButtonScale += 0.4;
        fontSizeValue += 0.2;
        
        btnYes.style.transform = `scale(${yesButtonScale})`;
        btnYes.style.fontSize = `${fontSizeValue}rem`;
        btnYes.style.padding = `${12 + noClickCount * 2}px ${28 + noClickCount * 4}px`;
    });

    // --- Action Listener: Confirmation Event ---
    btnYes.addEventListener("click", function() {
        // Smooth DOM mutation for the target layout view state
        questionText.innerText = "YAYYY! Maraming salamat! Let's start the lessons! 🎓❤️";
        
        // Retain the high-quality victory graphic source link
        displayGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW9scXF6YTN0Y3I2bW93ZzB4N29wY3RxamM0bXN6cmN6ZzZsOHZ0dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3RsPTE/KztT2c4Y8m7xcEMYUt/giphy.gif"; 
        
        // Wipe away the options controls wrapper element completely
        actionControls.style.display = "none";
    });
});