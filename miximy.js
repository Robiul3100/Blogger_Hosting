
///dL btn js
function toggleOptions(btn) {
  const box = btn.nextElementSibling;
  const arrow = btn.querySelector(".arrow");
  box.classList.toggle("open");
  arrow.style.transform = box.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";
}

function startDownload(btn, hasPassword) {
  const url = btn.dataset.url;
  const seconds = parseInt(btn.dataset.time) || 20;
  const bar = btn.querySelector(".progress-bar-inner");
  const text = btn.querySelector(".progress-text");
  const countdown = btn.parentElement.querySelector(".countdown-text");

  btn.disabled = true;
  bar.style.width = "0%";
  countdown.style.display = "block";
  text.textContent = " Preparing download...";

  let elapsed = 0;
  const totalSteps = seconds * 20;
  const increment = 100 / totalSteps;
  const interval = setInterval(() => {
    if (elapsed >= totalSteps) {
      clearInterval(interval);
      text.textContent = " Opening...";
      window.location.href = url; // Same tab
    } else {
      elapsed++;
      bar.style.width = (increment * elapsed) + "%";
      const remaining = Math.ceil(seconds - (elapsed / 20));
      countdown.textContent = remaining + "s remaining";
      if (remaining <= 3) text.textContent = " Almost ready...";
    }
  }, 50);
}

// Password system
function verifyPassword(btn) {
  const input = btn.previousElementSibling;
  const correct = btn.dataset.password;
  const hint = btn.dataset.hint;
  const directBtn = btn.closest(".option-card").querySelector(".option-btn.direct");

  if (!btn.tryCount) btn.tryCount = 0;

  if (input.value === correct) {
    alert(" Password correct! Download unlocked.");
    directBtn.disabled = false;
    input.disabled = true;
    btn.disabled = true;
  } else {
    btn.tryCount++;
    if (btn.tryCount >= 3) {
      alert(" Three incorrect attempts! Please refresh.");
      btn.disabled = true;
      input.disabled = true;
    } else {
      alert(` Wrong password! (${3 - btn.tryCount} try left)\n${hint}`);
    }
  }
}

//FAQ post
const faqHeaders = document.querySelectorAll(".faq-header");
faqHeaders.forEach(header => {
  header.addEventListener("click", () => {
    header.classList.toggle("active");
    const content = header.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});
