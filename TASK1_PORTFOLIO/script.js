"use strict";

const cursor = document.querySelector(".cursor");
const form = document.querySelector("form");
const navBar = document.querySelector(".navbar");
const projectSection = document.querySelector("#work");
const logo = document.querySelector(".logo h1");
const arrow = document.querySelector(".arrow");
const projects = document.querySelectorAll(".project");

document.addEventListener("DOMContentLoaded", function () {
  const navigationObserver = function () {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.boundingClientRect.top < 150) {
            navBar.classList.add("fixednav");
            navBar.style.height = "12.5vh";
            if (entry.boundingClientRect.top < -350) {
              logo.classList.add(".logo-min");
              logo.textContent = "SM.";
            }
          } else {
            logo.textContent = "SAADMUHAMMAD.";
            navBar.classList.remove("fixednav");
          }
        });
      },
      {
        root: null,
        rootMargin: "200px 0px 0px 0px",
        threshold: 1,
      }
    );
    navObserver.observe(projectSection);
  };

  document.addEventListener("scroll", function (e) {
    navigationObserver();
  });

  document.addEventListener("mousemove", function (e) {
    cursor.style.cssText = `left: ${e.clientX}px; top: ${e.clientY}px;`;

    if (
      e.target.closest(".links") ||
      e.target.closest(".button") ||
      e.target.closest(".logo") ||
      e.target.tagName === "H1" ||
      e.target.closest(".project") ||
      e.target.closest(".container") ||
      e.target.tagName === "P"
    ) {
      cursor.classList.add("grow");
      cursor.classList.add("blend");
      cursor.style.cssText = `left: ${
        e.clientX - cursor.offsetWidth / 2
      }px; top: ${e.clientY - cursor.offsetHeight / 2}px;`;
    } else {
      cursor.classList.remove("grow");
      cursor.classList.remove("blend");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const json = JSON.stringify(Object.fromEntries(formData));
  });

  projects.forEach((project) => {
    project.addEventListener("mouseover", (e) => {
      console.log(e);
    });
  });
});
