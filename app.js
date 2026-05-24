(function () {
  const config = window.MUKADMA_CONFIG || {};
  const apiBaseUrl = (config.apiBaseUrl || "").replace(/\/+$/, "");
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";

  const form = document.querySelector("[data-reset-form]");
  const passwordInput = document.querySelector("#new-password");
  const confirmInput = document.querySelector("#confirm-password");
  const submitButton = document.querySelector("[data-submit]");
  const message = document.querySelector("[data-message]");
  const tokenStatus = document.querySelector("[data-token-status]");
  const passwordToggles = document.querySelectorAll("[data-password-toggle]");

  const setMessage = (text, type) => {
    message.textContent = text;
    message.dataset.type = type;
    message.hidden = !text;
  };

  const setLoading = (isLoading) => {
    submitButton.disabled = isLoading;
    submitButton.textContent = isLoading ? "Resetting..." : "Reset password";
  };

  const getBackendMessage = async (response) => {
    try {
      const data = await response.json();
      return data.message || "Something went wrong. Please try again.";
    } catch (_error) {
      return "Something went wrong. Please try again.";
    }
  };

  passwordToggles.forEach((toggle) => {
    const input = document.getElementById(toggle.dataset.passwordToggle);

    if (!input) {
      return;
    }

    toggle.addEventListener("click", () => {
      const shouldShow = input.type === "password";
      input.type = shouldShow ? "text" : "password";
      toggle.setAttribute("aria-pressed", String(shouldShow));
      toggle.setAttribute(
        "aria-label",
        `${shouldShow ? "Hide" : "Show"} ${input.labels[0].textContent.toLowerCase()}`
      );
      input.focus();
    });
  });

  if (!token) {
    form.hidden = true;
    tokenStatus.textContent = "Invalid reset link. Please request a new password reset email from the app.";
    tokenStatus.dataset.type = "error";
    return;
  }

  if (!apiBaseUrl) {
    form.hidden = true;
    tokenStatus.textContent = "Password reset is not configured. Please set apiBaseUrl in config.js.";
    tokenStatus.dataset.type = "error";
    return;
  }

  tokenStatus.textContent = "Create a new password for your account.";
  tokenStatus.dataset.type = "neutral";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPassword = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (!newPassword.trim()) {
      setMessage("Password can't be empty.", "error");
      passwordInput.focus();
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.", "error");
      passwordInput.focus();
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.", "error");
      confirmInput.focus();
      return;
    }

    setLoading(true);
    setMessage("", "neutral");

    try {
      const response = await fetch(`${apiBaseUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await response.clone().json().catch(() => ({}));

      if (!response.ok) {
        setMessage(await getBackendMessage(response), "error");
        return;
      }

      if (data.reset) {
        form.hidden = true;
        tokenStatus.textContent = data.message || "Password reset successfully. You can return to the app and log in.";
        tokenStatus.dataset.type = "success";
        setMessage("", "neutral");
        return;
      }

      setMessage(data.message || "Unable to reset password. Please request a new link.", "error");
    } catch (_error) {
      setMessage("Unable to reach the password reset service. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  });
})();
