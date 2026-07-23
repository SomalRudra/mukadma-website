(function () {
  const languageToggle = document.querySelector("[data-language-toggle]");
  const languageStorageKey = "mokoddoma-language-v2";
  const savedLanguage = window.localStorage.getItem(languageStorageKey);
  const initialLanguage = savedLanguage === "en" ? "en" : "bn";

  const setLanguage = (language) => {
    document.body.dataset.lang = language;
    document.documentElement.lang = language === "bn" ? "bn" : "en";

    if (languageToggle) {
      languageToggle.setAttribute(
        "aria-label",
        language === "bn" ? "Switch to English" : "Switch to Bangla"
      );
    }

    window.localStorage.setItem(languageStorageKey, language);
  };

  setLanguage(initialLanguage);

  languageToggle?.addEventListener("click", () => {
    setLanguage(document.body.dataset.lang === "bn" ? "en" : "bn");
  });

  const revealItems = document.querySelectorAll(".reveal");

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  });

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
  let activeComparison = 0;

  const activateComparison = (index) => {
    comparisonRows.forEach((item) => item.classList.remove("is-active"));
    comparisonRows[index]?.classList.add("is-active");
    activeComparison = index;
  };

  comparisonRows.forEach((row) => {
    row.addEventListener("click", () => {
      activateComparison(Array.from(comparisonRows).indexOf(row));
    });
  });

  if (comparisonRows.length > 1) {
    window.setInterval(() => {
      activateComparison((activeComparison + 1) % comparisonRows.length);
    }, 2600);
  }

})();
