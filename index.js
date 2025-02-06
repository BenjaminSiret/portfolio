document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("#menu-toggle");
  const menuMobile = document.querySelector(".menu__mobile");
  const overlay = document.querySelector(".overlay");
  const menuMobileItems = document.querySelectorAll(".menu__mobile__item");
  const body = document.body;

  const toggleMenu = () => {
    const isExpanded = menuMobile.classList.contains("menu__mobile-open");

    menuMobile.classList.toggle("menu__mobile-open");
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
    if (e.key === "Escape" && menuMobile.classList.contains("menu__mobile-open")) {
      toggleMenu();
    }
  });

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
});
