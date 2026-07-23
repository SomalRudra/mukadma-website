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

  const contactForm = document.querySelector("[data-contact-form]");
  const contactStatus = document.querySelector("[data-contact-status]");

  if (contactForm) {
    const topicField = contactForm.querySelector("#topic");
    const preparedMailLink = contactForm.querySelector("[data-prepared-mail]");
    const params = new URLSearchParams(window.location.search);
    const topicOptionLabels = {
      waitlist: {
        en: "Join waitlist",
        bn: "অপেক্ষমাণ তালিকায় নাম দিতে চাই"
      },
      launch: {
        en: "Launch question",
        bn: "অ্যাপ চালুর খবর জানতে চাই"
      },
      support: {
        en: "Support question",
        bn: "সাধারণ সহায়তা দরকার"
      },
      partnership: {
        en: "Partnership",
        bn: "সহযোগিতা নিয়ে কথা বলতে চাই"
      },
      other: {
        en: "Other genuine inquiry",
        bn: "অন্য প্রয়োজনীয় জিজ্ঞাসা"
      }
    };

    const syncTopicLabels = () => {
      if (!topicField) return;
      const language = document.body.dataset.lang === "en" ? "en" : "bn";
      Array.from(topicField.options).forEach((option) => {
        option.textContent = topicOptionLabels[option.value]?.[language] || option.textContent;
      });
    };

    if (params.get("type") === "waitlist" && topicField) {
      topicField.value = "waitlist";
    }

    const blockedPatterns = [
      "seo",
      "backlink",
      "guest post",
      "link building",
      "rank higher",
      "google ads",
      "facebook ads",
      "lead generation",
      "cold email",
      "email list",
      "crypto",
      "casino",
      "web design agency",
      "marketing services",
      "digital marketing",
      "sponsored post"
    ];

    const contactMessages = {
      blocked: {
        en: "This message could not be prepared.",
        bn: "এই বার্তার খসড়া তৈরি করা গেল না।"
      },
      required: {
        en: "Please complete the required fields with a clear message.",
        bn: "প্রয়োজনীয় ঘরগুলো পূরণ করে পরিষ্কারভাবে আপনার কথা লিখুন।"
      },
      email: {
        en: "Please enter a valid email address.",
        bn: "সঠিক ইমেইল ঠিকানা লিখুন।"
      },
      marketing: {
        en: "Marketing, SEO, backlink, ads, and lead-generation pitches are filtered. Please email only genuine Mokoddoma inquiries.",
        bn: "অযাচিত প্রচারণা, এসইও, ব্যাকলিংক, বিজ্ঞাপন বা লিড-জেনারেশনের প্রস্তাব গ্রহণ করা হয় না। শুধু মোকদ্দমা-সংক্রান্ত প্রয়োজনীয় জিজ্ঞাসা পাঠান।"
      },
      success: {
        en: "Your email request is ready. If your email app does not open automatically, use the prepared email button below.",
        bn: "আপনার ইমেইল অনুরোধ প্রস্তুত। ইমেইল অ্যাপ নিজে থেকে না খুললে নিচের প্রস্তুত ইমেইল বোতামটি চাপুন।"
      }
    };

    const setContactStatus = (messageKey, type) => {
      if (!contactStatus) return;
      const language = document.body.dataset.lang === "en" ? "en" : "bn";
      contactStatus.textContent = contactMessages[messageKey]?.[language] || messageKey;
      contactStatus.dataset.type = type;
    };

    syncTopicLabels();
    languageToggle?.addEventListener("click", () => {
      window.setTimeout(syncTopicLabels, 0);
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const honeypot = String(formData.get("website") || "").trim();
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const topic = String(formData.get("topic") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const combined = `${name} ${email} ${phone} ${topic} ${message}`.toLowerCase();

      if (honeypot) {
        setContactStatus("blocked", "error");
        return;
      }

      if (!name || !email || !topic || message.length < 12) {
        setContactStatus("required", "error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setContactStatus("email", "error");
        return;
      }

      if (blockedPatterns.some((pattern) => combined.includes(pattern))) {
        setContactStatus("marketing", "error");
        return;
      }

      const topicLabels = {
        waitlist: "Waitlist request",
        launch: "Launch question",
        support: "Support question",
        partnership: "Partnership inquiry",
        other: "General inquiry"
      };
      const subject = `Mokoddoma: ${topicLabels[topic] || "Website inquiry"}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "Phone: Not provided",
        `Topic: ${topicLabels[topic] || topic}`,
        "",
        message
      ].join("\n");
      const mailto = `mailto:business@mokoddoma.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (preparedMailLink) {
        preparedMailLink.href = mailto;
        preparedMailLink.hidden = false;
      }

      setContactStatus("success", "success");
      window.setTimeout(() => {
        preparedMailLink?.click();
      }, 80);
    });
  }

})();
