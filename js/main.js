
function enableInfiniteSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  if (slider.dataset.initialized === "true") return;
  slider.dataset.initialized = "true";

  const originalCards = Array.from(slider.children);
  if (originalCards.length === 0) return;

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    slider.appendChild(clone);
  });

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  slider.addEventListener("scroll", () => {
    const halfWidth = slider.scrollWidth / 2;

    if (slider.scrollLeft >= halfWidth) {
      slider.scrollLeft -= halfWidth;
    } else if (slider.scrollLeft <= 0) {
      slider.scrollLeft += halfWidth;
    }
  });

  slider.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    if (e.target.closest("button")) return;

    isDragging = true;
    startX = e.clientX;
    startScrollLeft = slider.scrollLeft;

    slider.classList.add("cursor-grabbing");
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    slider.scrollLeft =
      startScrollLeft - (e.clientX - startX);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    slider.classList.remove("cursor-grabbing");
  });
}

enableInfiniteSlider("Providers");
enableInfiniteSlider("categorySlider");
enableInfiniteSlider("servicesSlider");

document.querySelectorAll(".favorite-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const icon = button.querySelector("svg");
    if (!icon) return;

    icon.classList.toggle("text-red-500");
    icon.classList.toggle("text-gray-500");

    icon.setAttribute(
      "fill",
      icon.getAttribute("fill") === "currentColor"
        ? "none"
        : "currentColor"
    );
  });
});
