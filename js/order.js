document.addEventListener("DOMContentLoaded", () => {

/*================================================
    STICKY HEADER
=================================================*/
const header = document.getElementById("header");
if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("sticky", window.scrollY > 80);
    });
}

/*================================================
    MOBILE MENU
=================================================*/
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
if (menuBtn && navbar) {
    const icon = menuBtn.querySelector("i");
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
        const isOpen = navbar.classList.contains("active");
        if (icon) icon.className = isOpen ? "fas fa-xmark" : "fas fa-bars";
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });
    document.querySelectorAll("#navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            if (icon) icon.className = "fas fa-bars";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

/*================================================
    FORM ELEMENTS
=================================================*/
const orderForm = document.getElementById("orderForm");
const store = document.getElementById("store");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const hasCylinder = document.getElementById("hasCylinder");
const orderTypeBox = document.getElementById("orderTypeBox");
const orderType = document.getElementById("orderType");
const orderNotice = document.getElementById("orderNotice");
const address = document.getElementById("address");
const deliveryDate = document.getElementById("deliveryDate");
const deliveryTime = document.getElementById("deliveryTime");
const addressBox = document.getElementById("addressBox");
const deliveryDateBox = document.getElementById("deliveryDateBox");
const deliveryTimeBox = document.getElementById("deliveryTimeBox");
const fulfilmentTitle = document.getElementById("fulfilmentTitle");
const fulfilmentDescription = document.getElementById("fulfilmentDescription");
const fulfilmentIcon = document.getElementById("fulfilmentIcon");

const summaryStore = document.getElementById("summaryStore");
const summaryProduct = document.getElementById("summaryProduct");
const summaryOrderType = document.getElementById("summaryOrderType");
const summaryService = document.getElementById("summaryService");
const summaryQuantity = document.getElementById("summaryQuantity");
const summaryLocation = document.getElementById("summaryLocation");
const summaryLocationLabel = document.getElementById("summaryLocationLabel");
const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");
const summaryPayment = document.getElementById("summaryPayment");
const summaryTotal = document.getElementById("summaryTotal");
const paymentTotal = document.getElementById("paymentTotal");

const IN_STORE_SIZES = ["3kg", "5kg", "7kg"];
const DELIVERY_REFILL_SIZES = ["9kg", "19kg", "48kg"];

const PRICES = {
    "3kg": { cylinder: 400, refill: 150 },
    "5kg": { cylinder: 600, refill: 250 },
    "7kg": { cylinder: 650, refill: 350 },
    "9kg": { cylinder: 600, refill: 400 },
    "19kg": { cylinder: 650, refill: 700 },
    "48kg": { cylinder: 1300, refill: 1700 }
};


function getPricing() {
    const size = getSize();
    const prices = PRICES[size];
    const qty = Math.max(1, parseInt(quantity?.value || "1", 10) || 1);
    const has = hasCylinder?.value;
    const type = orderType?.value;

    if (!prices || !has) {
        return { cylinder: 0, refill: 0, unitTotal: 0, total: 0, qty };
    }

    // Customer already owns a cylinder: only the refill is charged.
    if (has === "yes") {
        const refill = prices.refill;
        return { cylinder: 0, refill, unitTotal: refill, total: refill * qty, qty };
    }

    // Customer does not own a cylinder. The selected order type decides
    // whether they pay for the cylinder, the refill, or both.
    if (has === "no" && type === "bottle-only") {
        return { cylinder: prices.cylinder, refill: 0, unitTotal: prices.cylinder, total: prices.cylinder * qty, qty };
    }

    if (has === "no" && type === "bottle-refill") {
        const unitTotal = prices.cylinder + prices.refill;
        return { cylinder: prices.cylinder, refill: prices.refill, unitTotal, total: unitTotal * qty, qty };
    }

    return { cylinder: 0, refill: 0, unitTotal: 0, total: 0, qty };
}

function formatMoney(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}

function getSize(productValue = product?.value || "") {
    const match = productValue.match(/^(3|5|7|9|19|48)kg/);
    return match ? match[1] + "kg" : "";
}

function getBottlePrice() {
    const selected = product?.options[product.selectedIndex];
    return selected?.dataset?.bottlePrice || "Price on request";
}

function isInStoreRefill() {
    const size = getSize();
    const type = orderType?.value;
    return IN_STORE_SIZES.includes(size) && (type === "refill" || type === "bottle-refill");
}

function isDeliveryRefill() {
    const size = getSize();
    return DELIVERY_REFILL_SIZES.includes(size) && orderType?.value === "refill";
}

function getServiceMode() {
    if (!product?.value || !hasCylinder?.value || !orderType?.value) return "Not Selected";
    if (isInStoreRefill()) return "In-store refill — no delivery";
    return "Delivery";
}

function getOrderTypeLabel() {
    if (!orderType?.value) return "Not Selected";
    const labels = {
        refill: "Refill Only",
        "bottle-only": "Cylinder Only",
        "bottle-refill": "Cylinder + Refill"
    };
    return labels[orderType.value] || orderType.value;
}

function updateOrderFlow() {
    const has = hasCylinder?.value;
    const size = getSize();
    const type = orderType?.value;

    if (orderTypeBox) {
        orderTypeBox.hidden = has !== "no";
    }

    if (has === "yes") {
        orderType.value = "refill";
        orderType.required = false;
    } else if (has === "no") {
        orderType.required = true;
    } else {
        orderType.value = "";
        orderType.required = true;
    }

    const selectedType = orderType.value;
    const inStore = IN_STORE_SIZES.includes(size) && (selectedType === "refill" || selectedType === "bottle-refill");

    if (orderNotice) {
        if (inStore) {
            orderNotice.hidden = false;
            orderNotice.className = "order-notice in-store";
            orderNotice.innerHTML = `<i class="fas fa-store"></i><div><strong>In-store refill only</strong><span>${size} refills are done in-store and are not delivered. Please choose your nearest UP Gas store below.</span></div>`;
        } else if (DELIVERY_REFILL_SIZES.includes(size) && selectedType === "refill") {
            orderNotice.hidden = false;
            orderNotice.className = "order-notice delivery";
            orderNotice.innerHTML = `<i class="fas fa-truck-fast"></i><div><strong>Refill delivery available</strong><span>${size} refills can be delivered to your address.</span></div>`;
        } else if (has === "no" && selectedType === "bottle-only") {
            orderNotice.hidden = false;
            orderNotice.className = "order-notice delivery";
            orderNotice.innerHTML = `<i class="fas fa-truck-fast"></i><div><strong>Cylinder purchase</strong><span>The refill price for your selected cylinder is shown in the product selection. Delivery details are required below.</span></div>`;
        } else if (has === "no" && selectedType === "bottle-refill") {
            orderNotice.hidden = false;
            orderNotice.className = "order-notice info";
            orderNotice.innerHTML = `<i class="fas fa-circle-info"></i><div><strong>Cylinder + refill</strong><span>The refill price for your selected cylinder is shown in the product selection. For 3kg, 5kg and 7kg, the refill portion is completed in-store.</span></div>`;
        } else {
            orderNotice.hidden = true;
            orderNotice.innerHTML = "";
        }
    }

    if (fulfilmentTitle) {
        fulfilmentTitle.textContent = inStore ? "Store Collection" : "Delivery Information";
    }
    if (fulfilmentDescription) {
        fulfilmentDescription.textContent = inStore
            ? `Your ${size} refill must be completed in-store. No residential address or delivery time is required.`
            : "Where should we deliver your LPG gas?";
    }
    if (fulfilmentIcon) fulfilmentIcon.className = inStore ? "fas fa-store" : "fas fa-location-dot";

    [addressBox, deliveryDateBox, deliveryTimeBox].forEach(el => {
        if (el) el.hidden = inStore;
    });

    if (address) {
        address.required = !inStore;
        if (inStore) address.value = "";
    }
    if (deliveryDate) {
        deliveryDate.required = !inStore;
        if (inStore) deliveryDate.value = "";
    }
    if (deliveryTime) {
        deliveryTime.required = !inStore;
    }

    updateSummary();
}

/*================================================
    MINIMUM DELIVERY DATE
=================================================*/
if (deliveryDate) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    deliveryDate.min = `${year}-${month}-${day}`;
}

function formatDate(dateValue) {
    if (!dateValue) return "Not Required";
    return new Date(dateValue + "T00:00:00").toLocaleDateString("en-ZA", {
        day: "2-digit", month: "long", year: "numeric"
    });
}

function updateSummary() {
    const pricing = getPricing();
    if (summaryStore) summaryStore.textContent = store?.value || "Not Selected";
    if (summaryProduct) summaryProduct.textContent = product?.value || "Not Selected";
    if (summaryOrderType) summaryOrderType.textContent = getOrderTypeLabel();
    if (summaryService) summaryService.textContent = getServiceMode();
    if (summaryQuantity) summaryQuantity.textContent = quantity?.value || "1";
    if (summaryDate) summaryDate.textContent = formatDate(deliveryDate?.value);
    if (summaryTime) summaryTime.textContent = deliveryTime?.value || "Not Required";
    if (summaryLocation) {
        summaryLocation.textContent = isInStoreRefill() ? "Nearest UP Gas Store" : "Pienaar & Surrounding Areas";
    }
    if (summaryLocationLabel) summaryLocationLabel.textContent = isInStoreRefill() ? "Collection" : "Delivery Area";
    if (summaryPayment) {
        const payment = document.querySelector("input[name='payment']:checked");
        summaryPayment.textContent = payment ? payment.value : "Not Selected";
    }

    if (paymentTotal) {
        paymentTotal.textContent = formatMoney(pricing.total);
    }
    if (summaryTotal) {
        summaryTotal.textContent = formatMoney(pricing.total);
    }
}


[store, product, quantity, deliveryDate, deliveryTime, hasCylinder, orderType]
    .filter(Boolean)
    .forEach(element => {
        element.addEventListener("input", () => {
            if (element === product || element === hasCylinder || element === orderType) updateOrderFlow();
            else updateSummary();
        });
        element.addEventListener("change", () => {
            if (element === product || element === hasCylinder || element === orderType) updateOrderFlow();
            else updateSummary();
        });
    });

document.querySelectorAll("input[name='payment']").forEach(radio => {
    radio.addEventListener("change", updateSummary);
});

updateOrderFlow();

/*================================================
    WHATSAPP ORDER
=================================================*/
if (orderForm) {
    orderForm.addEventListener("submit", event => {
        event.preventDefault();

        updateOrderFlow();

        if (!orderForm.checkValidity()) {
            orderForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const selectedStore = store.value;
        const selectedProduct = product.value;
        const selectedQuantity = quantity.value;
        const selectedType = getOrderTypeLabel();
        const selectedService = getServiceMode();
        const inStore = isInStoreRefill();
        const selectedAddress = address.value.trim();
        const selectedDate = formatDate(deliveryDate.value);
        const selectedTime = deliveryTime.value || "Not Required";
        const selectedPayment = document.querySelector("input[name='payment']:checked");
        const notes = document.getElementById("notes").value.trim();
        const payment = selectedPayment ? selectedPayment.value : "Not Selected";
        const pricing = getPricing();
        const bottlePrice = pricing.cylinder ? formatMoney(pricing.cylinder) : "R 0";
        const refillPrice = pricing.refill ? formatMoney(pricing.refill) : "R 0";
        const totalPrice = formatMoney(pricing.total);

        const message =
`NEW LPG GAS ORDER

━━━━━━━━━━━━━━━━━━

CUSTOMER DETAILS

Name: ${name}
Phone: ${phone}
Email: ${email || "Not Provided"}

━━━━━━━━━━━━━━━━━━

STORE

${selectedStore}

━━━━━━━━━━━━━━━━━━

ORDER DETAILS

Cylinder: ${selectedProduct}
Quantity: ${selectedQuantity}
Cylinder Status: ${hasCylinder.value === "yes" ? "Customer has a cylinder" : "Customer needs a cylinder"}
Order Type: ${selectedType}
Cylinder Price: ${bottlePrice}
Refill Price: ${refillPrice}
TOTAL PRICE: ${totalPrice}

━━━━━━━━━━━━━━━━━━

SERVICE

${selectedService}

${inStore
    ? `COLLECTION DETAILS\n\nCollection: In-store only\nStore: ${selectedStore}`
    : `DELIVERY DETAILS\n\nAddress: ${selectedAddress}\nDate: ${selectedDate}\nTime: ${selectedTime}`}

━━━━━━━━━━━━━━━━━━

PAYMENT METHOD

${payment}

━━━━━━━━━━━━━━━━━━

SPECIAL INSTRUCTIONS

${notes || "None"}

━━━━━━━━━━━━━━━━━━

Thank you.
UP Gas`;

        const whatsappNumber = "27638761182";
        const whatsappURL = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
        window.open(whatsappURL, "_blank");
    });
}

/*================================================
    FAQ ACCORDION
=================================================*/
const questions = document.querySelectorAll(".faq-question");
questions.forEach(question => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector("i");
        const isOpen = answer.style.maxHeight;
        document.querySelectorAll(".faq-answer").forEach(item => item.style.maxHeight = null);
        document.querySelectorAll(".faq-question i").forEach(item => {
            item.classList.remove("fa-minus");
            item.classList.add("fa-plus");
        });
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");
        }
    });
});

/*================================================
    SCROLL REVEAL
=================================================*/
const revealElements = document.querySelectorAll(".delivery-card, .faq-item, .summary-card, .payment-card, .section-title");
function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            element.classList.add("reveal", "active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/*================================================
    BACK TO TOP
=================================================*/
const topBtn = document.getElementById("topBtn");
if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.classList.toggle("show", window.scrollY > 500);
    });
    topBtn.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
}

});
