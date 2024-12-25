document.addEventListener("DOMContentLoaded", () => {
    // Create the star container
    const starContainer = document.createElement("div");
    starContainer.classList.add("star-container");
    document.body.appendChild(starContainer);

    const starCount = 400; // Number of stars
    const colors = ['#fff', '#ff9', '#f99', '#ff0000'];

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random size for each star
        const size = Math.random() * 3 + 1; // Star size between 1px and 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random initial position
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;

        // Random animation duration
        star.style.animationDuration = `${Math.random() * 10 + 5}s`; // Duration between 5s and 15s
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        starContainer.appendChild(star);
        console.log("Background");
        
    }
});
