window.onload = function () {
  
  // --- 1. ABOUT & CONTACT MODALS ---
  const aboutBox = document.getElementById("aboutBox");
  const contactBox = document.getElementById("contactBox");
  const overlay = document.getElementById("overlay");
  
  function closeAll() {
    aboutBox.classList.remove("show");
    contactBox.classList.remove("show");
    overlay.classList.remove("show");
  }

  window.openAbout = function () {
    aboutBox.classList.add("show");
    overlay.classList.add("show");
  };

  window.openContact = function () {
    contactBox.classList.add("show");
    overlay.classList.add("show");
  };

  document.getElementById("closeAbout").onclick = closeAll;
  document.getElementById("closeContact").onclick = closeAll;
  overlay.onclick = closeAll;

  // --- 2. BRAND BUBBLES ---
  const bubble = document.createElement("div");
  bubble.className = "brand-bubble";
  document.body.appendChild(bubble);

  const logos = document.querySelectorAll(".brand-click");

  logos.forEach(function (logo) {
    logo.onclick = function (event) {
      event.stopPropagation(); 
      const text = logo.getAttribute("data-text");
      const rect = logo.getBoundingClientRect();

      bubble.textContent = text;
      bubble.style.top = (rect.bottom + window.scrollY + 10) + "px";
      bubble.style.left = (rect.left + rect.width / 2) + "px";
      bubble.classList.add("show");
    };
  });

  document.onclick = function (e) {
    const isModal = e.target === aboutBox || aboutBox.contains(e.target) || 
                    e.target === contactBox || contactBox.contains(e.target);
    if (!isModal) {
      bubble.classList.remove("show");
    }
  };

  // --- 3. SCROLL ANIMATION OBSERVER ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show"); 
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".scroll-fade");
  hiddenElements.forEach((el) => observer.observe(el));
};

window.onscroll = function() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  
  let bar = document.getElementById("scrollBar");
  if (bar) {
    bar.style.width = scrolled + "%";
  }
};
