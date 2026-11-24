const routeFilterButtons = document.querySelectorAll("[data-filter]");

const setActiveNavigation = () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("header nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
};

setActiveNavigation();

const navigationObserver = new MutationObserver(setActiveNavigation);
navigationObserver.observe(document.body, { childList: true, subtree: true });

routeFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    routeFilterButtons.forEach((filterButton) => {
      filterButton.setAttribute(
        "aria-pressed",
        filterButton === button ? "true" : "false"
      );
    });

    document.querySelectorAll(".route-card").forEach((card) => {
      const matchesFilter =
        selectedFilter === "all" || card.dataset.duration === selectedFilter;
      card.classList.toggle("is-hidden", !matchesFilter);
    });
  });
});

const kioskStatus = document.querySelector("#kiosk-status");
const kioskMessage = document.querySelector("#kiosk-message");

if (kioskStatus && kioskMessage) {
  const updateKioskStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const minutes = now.getHours() * 60 + now.getMinutes();
    let open = false;
    let closeLabel = "";

    if (day >= 3 && day <= 5) {
      open = minutes >= 11 * 60 && minutes < 18 * 60;
      closeLabel = "6 p.m.";
    } else if (day === 6) {
      open = minutes >= 10 * 60 && minutes < 16 * 60;
      closeLabel = "4 p.m.";
    }

    if (open) {
      kioskStatus.textContent = "Open today";
      kioskMessage.textContent = `The imaginary counter is open until ${closeLabel}.`;
    } else if (day === 1 || day === 2 || day === 0) {
      kioskStatus.textContent = "Closed today";
      kioskMessage.textContent =
        "The routewriters are planning, writing, or wandering.";
    } else {
      kioskStatus.textContent = "Currently closed";
      kioskMessage.textContent = `The fictional counter is open until ${closeLabel} today.`;
    }
  };

  updateKioskStatus();
  window.setInterval(updateKioskStatus, 60000);
}

const routePlanner = document.querySelector("#route-planner");
const routeResult = document.querySelector("#route-result");

if (routePlanner && routeResult) {
  routePlanner.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(routePlanner);
    const availableTime = formData.get("available-time");
    const walkingPace = formData.get("walking-pace");

    let recommendation = "";

    if (availableTime === "long") {
      recommendation =
        walkingPace === "energetic"
          ? "Try The Quiet Detour: a 25–30 minute route with more room to listen and observe."
          : "Try The Quiet Detour at an easy pace: pause as often as you need during this 25–30 minute wander.";
    } else if (availableTime === "medium") {
      recommendation =
        walkingPace === "energetic"
          ? "Try Corner-Circle: a steady 15–20 minute loop with a few extra stops."
          : "Try Window Weather: take a relaxed 15–20 minute look along the public arcade.";
    } else {
      recommendation =
        walkingPace === "energetic"
          ? "Try Corner-Circle for a quick, shape-finding loop."
          : "Try Window Weather for a calm 15–20 minute route with plenty of reflection.";
    }

    routeResult.textContent = recommendation;
  });
}
