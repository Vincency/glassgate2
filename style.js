
document.addEventListener('DOMContentLoaded', function() {
  
  // Testimonial Slide

  const carousel = document.querySelector(".carousel");
  const slideBtn = document.querySelectorAll(".testimonial button");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const carouselChildren = [...carousel.children];
  
  
  let isDragging = false, startX, startScrollLeft;
  
  // get the number off cards that can fit in the carousel at once.
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  
  // Inserts copies of the last few cards to the begining of the carousel for infinite scrolling.
  carouselChildren.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
  
  // Inserts copies of the first few cards to the end of the carousel for infinite scrolling.
  carouselChildren.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });
  
  
  // add event listener for the slide button to scroll the carousel left and right
  slideBtn.forEach(btn => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
      })
  })
  
  const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      // Records the initial cursor and scroll position of the carousel
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  }
  
  const dragging = (e) => {
      if(!isDragging) return;   //if isDragging is false return from here.
      //updates the scroll position of the carousel based on the cursor movement.
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  }
  
  const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
  }
  
  const infiniteScroll = () => {
      // if the carousel is at the beginning, scroll to the end
      if(Math.ceil(carousel.scrollLeft) === 0) {
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          console.log("you have reached the LEFT end");
      }
      // if carouselis at the end, scroll to the beginning
      else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
          carousel.scrollLeft = carousel.offsetWidth;
          console.log("you have reached the right end");
      }
  }
  
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  

 });
  




