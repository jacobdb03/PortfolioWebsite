/*const element = document.querySelector(".animateIn");
const observer = new IntersectionObserver((entries) => {
  element.classList.toggle("animateIn", entries[0].isIntersecting);
});

observer.observe(element);*/

function isInViewport(item) {
  var bounding = item.getBoundingClientRect();
  (myElementHeight = item.offsetHeight), (myElementWidth = item.offsetWidth);

  if (
    bounding.top >= -myElementHeight &&
    bounding.left >= -myElementWidth &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth) +
        myElementWidth &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) +
        myElementHeight
  ) {
    return true;
  } else {
    return false;
  }
}

let imgSelector = document.querySelectorAll("img");

for (const i of imgSelector) {
  window.addEventListener("scroll", function () {
    if (isInViewport(i)) {
      i.classList.add("animateIn");
    }
  });
}

let vidSelector = document.querySelectorAll("video");

for (const i of vidSelector) {
  window.addEventListener("scroll", function () {
    if (isInViewport(i)) {
      i.classList.add("animateIn");
    }
  });
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// document.addEventListener("scroll", function () {
//   // Calculate the scroll percentage (0 at the top, 1 at the bottom)
//   let scrollPercentage =
//     (document.documentElement.scrollTop + document.body.scrollTop) /
//     (document.documentElement.scrollHeight -
//       document.documentElement.clientHeight);

//   // If the user has started scrolling, apply the gradient
//   if (scrollPercentage > 0) {
//     document.querySelector(".blueBg").style.background =
//       `linear-gradient(to bottom right, #0f89fa 0%, #eff1f3 100%)`;
//   }

//   // Adjust the opacity based on scroll (fades out from 1 to 0)
//   document.querySelector(".blueBg").style.opacity = 1 - scrollPercentage;
// });

// let blueBgSelector = document.querySelector(".blueBg");
// //let cursorHitboxSelector = document.querySelector(".whiteCursorBlobHitbox");

// if (blueBgSelector /*|| cursorHitboxSelector*/) {
//   // Function to update the height based on scroll
//   window.addEventListener("scroll", () => {
//     const scrollTop = window.scrollY || window.pageYOffset;
//     const windowHeight = window.innerHeight;

//     // Calculate the height as a percentage of the scroll
//     let newHeight = 100 - (scrollTop / windowHeight) * 100;

//     // Limit the height between 0vh and 100vh
//     newHeight = Math.max(0, Math.min(100, newHeight));

//     blueBgSelector.style.height = `${newHeight}dvh`;
//     /*cursorHitboxSelector.style.height = `${newHeight}dvh`;*/
//   });
// }
//
//
//
//
// BLUE BACKGROUND ANIMATION IN DEVELOPMENT
const backgroundBox = document.querySelector(".blueBg");

// Set the trigger height for when the box starts to scroll out of view
const boxHeight = backgroundBox.offsetHeight; // The height of the box (300px)

// Speed up the transition by applying a scaling factor or reducing the box height
const transitionSpeedFactor = 0.8; // This controls how quickly the transition happens (smaller = faster)

// Parallax Scroll effect
window.addEventListener("scroll", function () {
  let scrollY = window.scrollY;
  let parallaxScroll = scrollY * 1; // Slower movement for parallax effect
  let scrollPercentage = Math.min(
    parallaxScroll / (boxHeight * transitionSpeedFactor),
    1,
  );
  backgroundBox.style.background = `linear-gradient(to bottom right, var(--blue) ${100 - scrollPercentage * 100}%, var(--white) 100%)`;

  backgroundBox.style.opacity = 1 - scrollPercentage;
});

/*
let blueBgSelector = document.querySelectorAll(".blueBg");
for (const i of blueBgSelector) {
  window.addEventListener("scroll", function () {
    if (isInViewport(i)) {
      i.classList.add("ScrollOut");
    }
  });
}

/*
const element = document.querySelectorAll("img.animateIn");
for (const i of element) {
  const observer = new IntersectionObserver((entries) => {
    i.classList.toggle(".animateIn", entries[0].isIntersecting);
  });

  observer.observe(i);
}

*/
/*const elements = document.querySelectorAll(".animateIn");

const options = {};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    elements.classList.toggle("animateIn", entries[0].isIntersecting);
  });
}, options);

// loop
elements.forEach((section) => {
  observer.observe(section);
  });*/
