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
