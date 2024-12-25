document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);
  
    // Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
  
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  
    // Define Sticky Section and Cards
    const stickySection = document.querySelector("#events");
    const stickyHeight = window.innerHeight * 4;
    const cards = document.querySelectorAll(".card");
    const countContainer = document.querySelector(".count-container");
    const totalCards = cards.length;
  
    // ScrollTrigger Configuration
    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        positionCards(self.progress);
        console.log("ScrollTrigger created");
        
      },
      
    });
  
    // Helper Function to Calculate Radius
    const getRadius = () => {
      return window.innerWidth < 900
        ? window.innerWidth * 8.5
        : window.innerWidth * 1.5
    };
  
    // Arc Configuration
    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;
  
    // Position Cards Based on Scroll Progress
    function positionCards(progress = 0) {
      const radius = getRadius();
      const totalTravel = 1 + totalCards / 10;
      const adjustedProgress = (progress * totalTravel - 1) * 0.75;
  
      cards.forEach((card, i) => {
        const normalizedProgress = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalizedProgress + adjustedProgress;
        const angle = startAngle + arcAngle * cardProgress;
  
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = (angle - Math.PI / 2) * (180 / Math.PI);
  
        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
        });
      });
    }
  
    // Initial Card Position
    positionCards(0);

    let currentCardIndex = 0;

    const options = {
      root : null,
      rootMargin: "0% 0%",
      threshold:0.5,
    };

    const observer = new IntersectionObserver((entries) =>{
      entries.forEach((entry) =>{
        if(entry.isIntersecting){
        lastSrollY = window.scrollY;

        let cardIndex = Array.from(cards).indexOf(entry.target);

        currentCardIndex = cardIndex;

        const targetY = 150 - currentCardIndex*150;
        gsap.to(countContainer,{
          y: targetY,
          duration:0,
          ease:"power1.out",
          overwrite:true,
        });
      }
      });
    }, options);

    cards.forEach((card) =>{
      observer.observe(card);
    });

    window.addEventListener("resize", () => positionCards(0));
  });
  