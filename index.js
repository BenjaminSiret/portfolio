document.addEventListener("DOMContentLoaded", () => {
  // Initialisation des éléments DOM
  const menuToggle = document.querySelector("#menu-toggle");
  const menuMobile = document.querySelector(".menu-mobile");
  const overlay = document.querySelector(".overlay");
  const menuMobileItems = document.querySelectorAll(".menu-mobile-item");
  const body = document.body;
  const projectArticles = document.querySelectorAll(".projects-cards article");

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



  const handleMenuKeyboardNavigation = (e) => {
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
  };



  const observerElement = (selector, animationClass, delay) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length <= 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: delay }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  };

  // Initialisation des événements
  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuMobile.classList.contains("menu-mobile-open")) {
      toggleMenu();
    }
  });

  menuMobile.addEventListener("keydown", handleMenuKeyboardNavigation);
  menuMobileItems.forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  const backgroundDescriptionClass = window.innerWidth <= 768 ? "fade-in-right" : "fade-in-bottom";
  observerElement(".about-title", "fade-in-right", 0.5);
  observerElement(".about-description", "fade-in-right-delay-1", 0.5);
  observerElement(".background-description", backgroundDescriptionClass, 0.5);
  observerElement(".projects-cards article", "fade-in-bottom", 0.5);

  const downloadLink = document.querySelector(".download-link");
  const contactLinks = document.querySelectorAll(".contact-info a");

  const handleLinkAnimation = (link) => {
    link.classList.add("spin-animation");
    link.classList.remove("spin-exit");
  };

  const handleLinkAnimationExit = (link) => {
    link.classList.remove("spin-animation");
    link.classList.add("spin-exit");
  };

  [downloadLink, ...contactLinks].forEach((link) => {
    link.addEventListener("mouseenter", () => handleLinkAnimation(link));
    link.addEventListener("mouseleave", () => handleLinkAnimationExit(link));
  });
});
