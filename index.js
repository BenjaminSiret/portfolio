document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("#menu-toggle");
  const menuMobile = document.querySelector(".menu-mobile");
  const overlay = document.querySelector(".overlay");
  const menuMobileItems = document.querySelectorAll(".menu-mobile-item");
  const body = document.body;

  const toggleMenu = () => {
    const isExpanded = menuMobile.classList.contains("menu-mobile-open");

    menuMobile.classList.toggle("menu-mobile-open");
    overlay.classList.toggle("overlay-open");
    body.classList.toggle("body-no-scroll");
    menuToggle.setAttribute("aria-expanded", !isExpanded);

    if (!isExpanded) {
      menuMobileItems[0].focus();
    } else {
      menuToggle.focus();
    }
  };

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuMobile.classList.contains("menu-mobile-open")) {
      toggleMenu();
    }
  });

  //**************************************************************************
  // Gestion des flèches du clavier
  //**************************************************************************

  menuMobile.addEventListener("keydown", (e) => {
    const currentIndex = Array.from(menuMobileItems).indexOf(document.activeElement);
    let nextIndex;

    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        nextIndex = currentIndex <= 0 ? menuMobileItems.length - 1 : currentIndex - 1;
        menuMobileItems[nextIndex].focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        nextIndex = currentIndex >= menuMobileItems.length - 1 ? 0 : currentIndex + 1;
        menuMobileItems[nextIndex].focus();
        break;
      case "Tab":
        const firstFocusable = menuMobileItems[0];
        const lastFocusable = menuMobileItems[menuMobileItems.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      default:
        return;
    }
  });

  menuMobileItems.forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  //**************************************************************************
  // Observers pour les entrées de texte
  //**************************************************************************

  const observerElement = (selector, animationClass, delay) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: delay }
    );

    observer.observe(element);
  };

  observerElement(".about-title", "fade-in-right", 0.5);
  observerElement(".about-description", "fade-in-right-delay-1", 0.5);
  observerElement(".background-description", "fade-in-bottom", 0.5);

  //**************************************************************************
  // Animation du download__link
  //**************************************************************************

  const link = document.querySelector(".download-link");

  link.addEventListener("mouseenter", () => {
    link.classList.add("spin-animation");
    link.classList.remove("spin-exit");
  });

  link.addEventListener("mouseleave", () => {
    link.classList.remove("spin-animation");
    link.classList.add("spin-exit");
  });
});
