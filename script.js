window.onload = function () {
  const aboutBox = document.getElementById("aboutBox");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeAbout");

  window.openAbout = function () {
    aboutBox.classList.add("show");
    overlay.classList.add("show");
  };

  function closeAbout() {
    aboutBox.classList.remove("show");
    overlay.classList.remove("show");
  }

  closeBtn.onclick = closeAbout;
  overlay.onclick = closeAbout;

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

      bubble.style.top = rect.bottom + window.scrollY + 10 + "px";
      bubble.style.left = rect.left + rect.width / 2 + "px";
      bubble.style.transform = "translateX(-50%)";

      bubble.classList.add("show");
    };
  });

  document.onclick = function (e) {
    const isModal = e.target === aboutBox || aboutBox.contains(e.target) || e.target === overlay;
    if (!isModal) {
      bubble.classList.remove("show");
    }
  };
};

function openContact() {
  const overlay = document.getElementById('overlay');
  const box = document.getElementById('contactBox');
  if (overlay && box) {
    overlay.classList.add('show');
    box.classList.add('show');
  }
}

function closeContact() {
  const overlay = document.getElementById('overlay');
  const box = document.getElementById('contactBox');
  if (overlay) overlay.classList.remove('show');
  if (box) box.classList.remove('show');
}

document.getElementById('closeContact')?.addEventListener('click', closeContact);

document.getElementById('overlay')?.addEventListener('click', () => {
  closeContact();
  document.getElementById('aboutBox')?.classList.remove('show');
});

document.querySelectorAll('.collapsible').forEach(button => {
  const panel = button.nextElementSibling;

  button.addEventListener('click', () => {
    const isOpen = panel.classList.contains('open');

    if (isOpen) {
      panel.style.height = panel.scrollHeight + 'px';
      panel.offsetHeight; 
      panel.style.height = '0px';
      panel.classList.remove('open');
      button.classList.remove('active');
      panel.addEventListener('transitionend', function end(e) {
        if (e.propertyName === 'height') {
          panel.style.height = '';
          panel.removeEventListener('transitionend', end);
        }
      });
    } else {
      panel.style.height = panel.scrollHeight + 'px';
      panel.classList.add('open');
      button.classList.add('active');
      panel.addEventListener('transitionend', function end(e) {
        if (e.propertyName === 'height') {
          panel.style.height = 'auto';
          panel.removeEventListener('transitionend', end);
        }
      });
    }
  });
});
