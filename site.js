(function () {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const comparisonRows = document.querySelectorAll(".comparison-row");

  comparisonRows.forEach((row) => {
    row.addEventListener("click", () => {
      comparisonRows.forEach((item) => item.classList.remove("is-active"));
      row.classList.add("is-active");
    });
  });
})();
