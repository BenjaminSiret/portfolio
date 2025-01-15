const Router = {
  init: () => {
    document.querySelectorAll(".nav-main__list a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        Router.go(link.getAttribute("href"));
      });
    });
    // event handler for URL changes
    window.addEventListener("popstate", (event) => {
      const route = event.state?.route || location.pathname;
      Router.go(route, false);
    });

    // check the initial route
    Router.go(location.pathname, false);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let component = null;
    switch (route) {
      case "/":
        component = document.getElementById("template-hero").content.cloneNode(true);
        break;

      case "/background":
        component = document.getElementById("template-background").content.cloneNode(true);
        break;

      case "/philosophy":
        component = document.getElementById("template-philosophy").content.cloneNode(true);
        break;

      case "/projects":
        component = document.getElementById("template-projects").content.cloneNode(true);
        break;

      case "/contact":
        component = document.getElementById("template-contact").content.cloneNode(true);
        break;

      default:
        component = document.getElementById("template-hero").content.cloneNode(true);
        break;
    }

    if (component) {
      const main = document.querySelector("main");
      main.innerHTML = "";
      main.appendChild(component);
      window.scrollTo(0, 0);
    }
  },
};

export default Router;
