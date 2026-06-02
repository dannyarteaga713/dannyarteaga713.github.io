document.addEventListener("DOMContentLoaded", function() {
    // Select our UI Nodes
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const questionText = document.getElementById("question-text");
    const displayGif = document.getElementById("display-gif");
    const actionControls = document.getElementById("action-controls");

    // The state tracking values
    let noClickCount = 0;
    let yesButtonScale = 1.0;
    let fontSizeValue = 1.2; // Baseline font size in rem units

    // Array of string labels to loop through when they try to click "No"
    const rejectionPhrases = [
        "No",
        "Are you absolutely sure? 🥺",
        "Ples think about it again... 😭",
        "Don't do this to me!!",
        "What if I buy you coffee? ☕",
        "You're breaking my heart, click yes!"
    ];

    // --- Action Listener: Rejection Handler ---
    btnNo.addEventListener("click", function() {
        noClickCount++;

        // 1. Cycle through phrases (clamp at the last message if they keep clicking)
        const phraseIndex = Math.min(noClickCount, rejectionPhrases.length - 1);
        btnNo.innerText = rejectionPhrases[phraseIndex];

        // 2. Scale up the Success button component exponentially
        yesButtonScale += 0.4;
        fontSizeValue += 0.2;
        
        btnYes.style.transform = `scale(${yesButtonScale})`;
        btnYes.style.fontSize = `${fontSizeValue}rem`;
        
        // Ensure padding grows comfortably along with scaling bounds
        btnYes.style.padding = `${12 + noClickCount * 2}px ${28 + noClickCount * 4}px`;
    });

    // --- Action Listener: Success Routing Handler ---
    btnYes.addEventListener("click", function() {
        // Transform the active layout contents seamlessly to emulate yay.html view state!
        questionText.innerText = "YAYYY! I knew you would say yes! 🥰❤️";
        
        // Swap the default graphic out for the victory celebratory GIF asset
        displayGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW9scXF6YTN0Y3I2bW93ZzB4N29wY3RxamM0bXN6cmN6ZzZsOHZ0dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3RsPTE/KztT2c4Y8m7xcEMYUt/giphy.gif"; 
        
        // Hide the choice button module completely
        actionControls.style.display = "none";
    });
});