document.addEventListener("DOMContentLoaded", () => {
  const products = {
    "3kg": {
      name: "3kg LPG Cylinder",
      subtitle: "Compact LPG cylinder for small cooking and portable use.",
      description: "A compact and portable LPG cylinder suited to small households, outdoor cooking, camping and other light cooking needs.",
      use: "Small household cooking, camping, outdoor cooking and portable cooking setups.",
      refill: "R 150",
      cylinder: "R 400",
      image: "images/Size 3.jpeg"
    },
    "5kg": {
      name: "5kg LPG Cylinder",
      subtitle: "A practical LPG size for everyday household cooking.",
      description: "A convenient cylinder for everyday home cooking where a compact but useful LPG supply is needed.",
      use: "Everyday household cooking, small families and convenient home energy.",
      refill: "R 250",
      cylinder: "R 600",
      image: "images/Size 5.jpeg"
    },
    "7kg": {
      name: "7kg LPG Cylinder",
      subtitle: "A popular size for families needing dependable cooking gas.",
      description: "A balanced LPG cylinder size for households looking for a reliable cooking solution with useful capacity.",
      use: "Family cooking, home kitchens and regular household LPG use.",
      refill: "R 350",
      cylinder: "R 650",
      image: "images/Size 7.jpeg"
    },
    "9kg": {
      name: "9kg LPG Cylinder",
      subtitle: "A larger household cylinder for regular cooking.",
      description: "A versatile LPG cylinder for homes and customers who need a larger supply between refills.",
      use: "Regular household cooking, larger families and frequent home use.",
      refill: "R 400",
      cylinder: "R 600",
      image: "images/Size 9.jpeg"
    },
    "19kg": {
      name: "19kg LPG Cylinder",
      subtitle: "A larger LPG cylinder for high-use household and business needs.",
      description: "A higher-capacity cylinder designed for customers who use LPG more frequently and need longer periods between refills.",
      use: "Busy households, restaurants, food preparation and business applications.",
      refill: "R 700",
      cylinder: "R 650",
      image: "images/Size 19.jpeg"
    },
    "48kg": {
      name: "48kg LPG Cylinder",
      subtitle: "High-capacity LPG supply for commercial and heavy-use requirements.",
      description: "A high-capacity LPG cylinder for customers with substantial gas requirements and commercial applications.",
      use: "Restaurants, businesses, commercial kitchens and high-consumption applications.",
      refill: "R 1 700",
      cylinder: "R 1 300",
      image: "images/Size 48.jpeg"
    }
  };

  const key = new URLSearchParams(window.location.search).get("product") || "3kg";
  const product = products[key] || products["3kg"];

  document.title = `UP Gas | ${product.name}`;
  document.getElementById("productTitle").textContent = product.name;
  document.getElementById("productHeading").textContent = product.name;
  document.getElementById("productSubtitle").textContent = product.subtitle;
  document.getElementById("productDescription").textContent = product.description;
  document.getElementById("productUse").textContent = product.use;
  document.getElementById("refillPrice").textContent = product.refill;
  document.getElementById("cylinderPrice").textContent = product.cylinder;

  // Show only the main product photo. Additional gallery photos have been removed.
  const gallery = document.getElementById("productGallery");
  if (gallery) {
    const item = document.createElement("figure");
    item.className = "product-gallery-item product-gallery-main";
    item.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    gallery.appendChild(item);
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
