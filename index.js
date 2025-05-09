document.addEventListener("DOMContentLoaded", () => {
  // Initialisation des éléments DOM
  const menuToggle = document.querySelector("#menu-toggle");
  const menuMobile = document.querySelector(".menu-mobile");
  const overlay = document.querySelector(".overlay");
  const menuMobileItems = document.querySelectorAll(".menu-mobile-item");
  const body = document.body;
  const modal = document.getElementById("project-modal");
  const closeModalButton = document.querySelector(".close-button");
  const modalDescription = document.querySelector(".modal-description");
  const modalRepoLink = document.querySelector(".repo-link");
  const modalImage = document.querySelector(".modal-image");
  const projectArticles = document.querySelectorAll(".projects-cards article");
  const repoLink = modal.querySelector(".modal-content a");
  const focusableElements = [closeModalButton, repoLink];
  let lastFocusedElement;

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

  const handleModalClose = () => {
    modal.classList.remove("modal-open");
    setTimeout(() => {
      modal.style.display = "none";
      body.classList.remove("body-no-scroll");
      if (lastFocusedElement) lastFocusedElement.focus();
    }, 400);
  };

  const openModal = (article) => {
    lastFocusedElement = document.activeElement;
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("modal-open");
    }, 10);
    modalImage.src = article.querySelector("img").src;
    modalDescription.textContent = article.dataset.description;
    modalRepoLink.href = article.dataset.url;
    
    // Copier les tags dans la modale
    const projectTags = article.querySelector(".project-tags");
    const modalTags = modal.querySelector(".modal-tags");
    if (projectTags) {
      modalTags.innerHTML = projectTags.innerHTML;
    } else {
      modalTags.innerHTML = "";
    }
    
    body.classList.add("body-no-scroll");
    closeModalButton.focus();
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

  const handleModalKeyboardNavigation = (e) => {
    if (e.key === "Tab") {
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
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

  projectArticles.forEach((article) => {
    article.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(article);
    });
    article.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        openModal(article);
      }
    });
  });

  closeModalButton.addEventListener("click", handleModalClose);
  closeModalButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleModalClose();
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      handleModalClose();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      handleModalClose();
    }
  });

  modal.addEventListener("keydown", handleModalKeyboardNavigation);
});
