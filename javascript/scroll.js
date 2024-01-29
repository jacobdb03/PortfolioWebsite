const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classlist.add("small");
    } else {
      entry.target.classlist.remove("small");
    }
  });
});

const scrollElements = document.querySelectorAll(".big");
scrollElements.forEach((el) => observer.observe(el));
