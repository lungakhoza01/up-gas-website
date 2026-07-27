document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const location = params.get("location") === "branch" ? "branch" : "main";

  const data = {
    main: {
      label: "MAIN STORE",
      name: "Thekwane South",
      intro: "UP Gas Thekwane South — main store information and photo gallery.",
      description: "This is the main UP Gas store. Update this section with the confirmed store address, opening hours, services, delivery area, directions and any other information customers should know.",
      gallery: "Thekwane South Photos"
    },
    branch: {
      label: "BRANCH STORE",
      name: "Lihawu",
      intro: "UP Gas Lihawu — branch store information and photo gallery.",
      description: "This is the Lihawu UP Gas branch. Update this section with the confirmed branch address, opening hours, services, delivery area, directions and any other information customers should know.",
      gallery: "Lihawu Photos"
    }
  };

  const item = data[location];

  document.title = `UP Gas | ${item.name}`;
  document.getElementById("storeLabel").textContent = item.label;
  document.getElementById("storeTitle").textContent = item.name;
  document.getElementById("storeName").textContent = item.name;
  document.getElementById("storeIntro").textContent = item.intro;
  document.getElementById("storeDescription").textContent = item.description;
  document.getElementById("galleryTitle").textContent = item.gallery;

  const prefix = location === "main" ? "thekwane" : "lihawu";
  const gallery = document.getElementById("galleryGrid");

  for (let i = 1; i <= 5; i++) {
    const card = document.createElement("figure");
    card.className = "gallery-item";
    card.innerHTML = `
      <img src="images/${prefix}-${i}.jpeg" alt="${item.name} photo ${i}">
      <figcaption>Photo ${i}</figcaption>
    `;
    gallery.appendChild(card);
  }

  const menuBtn = document.getElementById("menu-btn");
  const navbar = document.getElementById("navbar");
  const overlay = document.querySelector(".menu-overlay");

  const closeMenu = () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    const icon = menuBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.addEventListener("click", () => {
    const open = !navbar.classList.contains("active");
    navbar.classList.toggle("active", open);
    overlay.classList.toggle("active", open);
    document.body.classList.toggle("menu-open", open);
    const icon = menuBtn.querySelector("i");
    icon.classList.toggle("fa-bars", !open);
    icon.classList.toggle("fa-xmark", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  overlay.addEventListener("click", closeMenu);
  document.querySelectorAll("#navbar a").forEach(a => a.addEventListener("click", closeMenu));
});
