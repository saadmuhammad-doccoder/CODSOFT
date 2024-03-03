"use strict";

// Components Selection
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const message = document.createElement("div");
const logo = document.querySelector(".nav__logo");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const header2 = document.querySelector(".header");
const nav = document.querySelector(".nav");
const allSections = document.querySelectorAll(".section");

// -----------------------------Pop-Up window code----------------------------
// Function for opening modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Function for closing modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Adding eventlisteners to each of the button for opening visibility of the Pop-Up window
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// Eventlistener for closing the PopUp window by button
btnCloseModal.addEventListener("click", closeModal);

// Eventlistener for closing the PopUp window by clicking on the overlay
overlay.addEventListener("click", closeModal);

// Eventlistener for closing the PopUp window by pressing the escape key
document.addEventListener("keydown", function (e) {
  // condition which checks the key if it is Escape and the modal classlist does not contain the hidden class
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//---------------------------------Cookie Notification--------------------------
// cookie-message is added to the classlist of the message component
message.classList.add("cookie-message");

// The innerHTML is set in this line
message.innerHTML = `We use cookies for improved functionality and analytics, <button class="btn btn--close--cookie">Got it!</button>`;

// The message component is appended to the header component
header.append(message);

// EventListener is added to the component which will be used for closing the message, by DOM traversing; selecting the parentElement and then removing the child element of the parent element
document
  .querySelector(".btn--close--cookie")
  .addEventListener("click", function () {
    message.parentElement.removeChild(message);
  });

// Setting the background color
message.style.backgroundColor = "#37383d";

// Setting the width of the message box
message.style.width = "120%";

// Setting the height dynamically getting the height of the computed style of the message adding 40 with it and using the unit px
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + "px";

// Eventlistener is added to the "learn more" button to enable smooth scroll from the first section to the rest of the site (moved to second section)
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Page navigation the old way without using Bubbling

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Page navigation the new way using event bubbling
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Condition for checking if the targeted event element has the class of nav__link
  if (e.target.classList.contains("nav__link")) {
    // As the condition is satisfied the the attribute of href is selected.
    const id = e.target.getAttribute("href");

    // the selected attribute is used to scrollintoView of  the id of the clicked element with smooth behavior
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// --------------------------Tab Components-------------------------------------

// Eventlistener is added to TabsContainer to show the content of the respected tab
tabsContainer.addEventListener("click", function (e) {
  // The closest parent element is selected with the closest() method
  const clicked = e.target.closest(".operations__tab");

  // If the clicked element is a falsy value then the function will be ended without returning anything.
  if (!clicked) return;

  // "operations__tab--active" class for active tab is deleted from the classList of the tabbed components
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  // The same class is added to the clicked element
  clicked.classList.add("operations__tab--active");

  // "operations__tab--active" class for active content is deleted from the classList of the tabbed content components
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Element selected with respect to the data attribute dynamically and operatoins__content--active class is added to its classList
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//-----------------------Hover animation of navigation menu--------------------s

// function for handling hover effect
const handleHover = function (e) {
  // Condition which checks if the targeted element has the class of nav__link
  if (e.target.classList.contains("nav__link")) {
    // The targeted element is selected
    const link = e.target;

    // siblings of the element are selected with the help of event delegation
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    // The logo is also selected with the help of event delegeation
    const logo = link.closest(".nav").querySelector("img");

    // forEach() method is used on siblings to set the opacity of the elements and the logo dynamically with the help of bind method by setting it to the this keyword
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Eventlisteners for mouseover and mouseout at the navigation children
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

//----------------------STICKY NAV----------------------------------------------
// The boundingclientRect is selected of the section1
const initialCoords = section1.getBoundingClientRect();

// Scroll Eventlistener is added to window
window.addEventListener("scroll", function (e) {
  // A condition which checks the scrollY position of the window if it is greater than initialcoords of section1 and then adds sticky class to the navbar
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  // Else the sticky class will be removed from the nav
  else nav.classList.remove("sticky");
});

// height of the navbar is selected
const navHeight = nav.getBoundingClientRect().height;

// Function for implementing the sticky nav with the help of IntersectionObserver API
const stickyNav = function (entries) {
  // The passed arguments are destructured into single component
  const [entry] = entries;

  // Condition which checks if the entry.isIntersecting is not False then the sticky class will be added to the nav classlist
  if (!entry.isIntersecting) nav.classList.add("sticky");
  // Else that class will be removed
  else nav.classList.remove("sticky");
};

// IntersectionObserver is set to the navbar in wihch the stickyNav function is passed and the properties of the element to be observed are set.
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

// Observing through observe() method
headerObserver.observe(header2);

//-----------------------------REVEALING SECTIONS ANIMATION---------------------
// Function for revealing sections as we scroll onto the section
const revealSection = function (entries, observer) {
  // entries are destructured into single entry
  const [entry] = entries;

  // A condition which checks if the entry is not intersecting then it will return nothing
  if (!entry.isIntersecting) return;
  // The section--hidden class will be removed from the classlist of the targeted entry
  entry.target.classList.remove("section--hidden");

  // Observer will be removed as it loads
  observer.unobserve(entry.target);
};

// IntersectionObserver for revealing sections animations
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// sections are observed and are initially set to be hidden
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//--------------------LAZY LOADING OF THE IMAGES--------------------------------

// Images are selected with the help of data-src attribute
const imgTargets = document.querySelectorAll("img[data-src]");

// Function which will swap the img URL
const loadingImg = function (entries, observer) {
  // Destructurung entries into entry
  const [entry] = entries;

  // Gaurd condition which will checked and if it is False then it will return nothing.
  if (!entry.isIntersecting) return;

  // The src attribute is swapped with the data-src attribute which contains the real highquality image
  entry.target.src = entry.target.dataset.src;

  // Eventlistener is added to the img i.e it will revealed as it is loaded
  entry.target.addEventListener("load", function (e) {
    entry.target.classList.remove("lazy-img");
  });

  // The element is unobserved
  observer.unobserve(entry.target);
};

// Intersection observer for the images
const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

// observing each of the img
imgTargets.forEach((img) => imgObserver.observe(img));

//----------------------Slider-------------------------------------

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i})`));

  const createDots = function () {
    slides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };

  createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  goToSlide(0);
  activateDot(0);
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
