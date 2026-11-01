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
        orderType.required = false;
    }

    const selectedType = orderType.value;

    const inStore =
        IN_STORE_SIZES.includes(size) &&
        (selectedType === "refill" ||
         selectedType === "bottle-refill");

    // ORDER NOTICE
    if (orderNotice) {
        if (inStore) {
            orderNotice.hidden = false;
            orderNotice.className = "order-notice in-store";
            orderNotice.innerHTML = `
                <i class="fas fa-store"></i>
                <div>
                    <strong>In-store refill only</strong>
                    <span>
                        ${size} refills are done in-store and are not delivered.
                        Please choose your nearest UP Gas store below.
                    </span>
                </div>`;
        } else if (
            DELIVERY_REFILL_SIZES.includes(size) &&
            selectedType === "refill"
        ) {
            orderNotice.hidden = false;
            orderNotice.className = "order-notice delivery";
            orderNotice.innerHTML = `
                <i class="fas fa-truck-fast"></i>
                <div>
                    <strong>Refill delivery available</strong>
                    <span>
                        ${size} refills can be delivered to your address.
                    </span>
                </div>`;
        } else if (
            has === "no" &&
            selectedType === "bottle-only"
        ) {
            orderNotice.hidden = false;
            orderNotice.className = "order-notice delivery";
            orderNotice.innerHTML = `
                <i class="fas fa-truck-fast"></i>
                <div>
                    <strong>Cylinder purchase</strong>
                    <span>
                        The cylinder price for your selected size is shown
                        in the product selection. Delivery details are
                        required below.
                    </span>
                </div>`;
        } else if (
            has === "no" &&
            selectedType === "bottle-refill"
        ) {
            orderNotice.hidden = false;
            orderNotice.className = "order-notice info";
            orderNotice.innerHTML = `
                <i class="fas fa-circle-info"></i>
                <div>
                    <strong>Cylinder + refill</strong>
                    <span>
                        The cylinder and refill prices for your selected
                        size are shown in the product selection. For 3kg,
                        5kg and 7kg, the refill portion is completed in-store.
                    </span>
                </div>`;
        } else {
            orderNotice.hidden = true;
            orderNotice.innerHTML = "";
        }
    }

    // FULFILMENT INFORMATION
    if (fulfilmentTitle) {
        fulfilmentTitle.textContent = inStore
            ? "Store Collection"
            : "Delivery Information";
    }

    if (fulfilmentDescription) {
        fulfilmentDescription.textContent = inStore
            ? `Your ${size} refill must be completed in-store. No residential address or delivery time is required.`
            : "Where should we deliver your LPG gas?";
    }

    if (fulfilmentIcon) {
        fulfilmentIcon.className = inStore
            ? "fas fa-store"
            : "fas fa-location-dot";
    }

    // SHOW OR HIDE DELIVERY FIELDS
    [addressBox, deliveryDateBox, deliveryTimeBox].forEach(element => {
        if (element) {
            element.hidden = inStore;
        }
    });

    if (address) {
        address.required = !inStore;

        if (inStore) {
            address.value = "";
        }
    }

    if (deliveryDate) {
        deliveryDate.required = !inStore;

        if (inStore) {
            deliveryDate.value = "";
        }
    }

    if (deliveryTime) {
        deliveryTime.required = !inStore;

        if (inStore) {
            deliveryTime.value = "";
        }
    }

    // UPDATE ORDER SUMMARY
    updateSummary();
}
