document.addEventListener("DOMContentLoaded", function() {
  var links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(function(link) {
      link.addEventListener('click', function(event) {
          var target = document.querySelector(this.hash);
          
          if (target) {
              event.preventDefault();

              var targetOffset = target.getBoundingClientRect().top + window.scrollY;
              
              window.scrollTo({
                  top: targetOffset,
                  behavior: 'smooth'
              });
          }
      });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  let currentIndex = 0;

  function scrollToNextSection() {
    if (currentIndex < sections.length - 1) {
      sections[currentIndex].classList.remove("active");
      currentIndex++;
      sections[currentIndex].classList.add("active");
      window.scrollTo({
        top: sections[currentIndex].offsetTop,
        behavior: "smooth",
      });
    }
  }

  function handleScroll(event) {
    const direction = event.deltaY;
    if (direction > 0) {
      scrollToNextSection();
    }
  }

  window.addEventListener("wheel", handleScroll);

  // Initial animation
  sections[currentIndex].classList.add("active");
});

const element = document.querySelector(".main")
console.log(element)
element.addEventListener("mouseover", () => {
  element.style.backgroundColor = "brown";
});
