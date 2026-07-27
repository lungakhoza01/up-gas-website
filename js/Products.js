/*====================================================
    UP GAS - PRODUCTS.JS
    Premium Product Page JavaScript
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {


    /*====================================================
        STICKY HEADER
    ====================================================*/

    const header = document.getElementById("header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 80) {

                header.classList.add("sticky");

            } else {

                header.classList.remove("sticky");

            }

        });

    }


    /*====================================================
        MOBILE MENU
    ====================================================*/

    const menuBtn = document.getElementById("menu-btn");

    const navbar = document.getElementById("navbar");
    const overlay = document.querySelector(".menu-overlay");

    if (menuBtn && navbar) {

        const icon = menuBtn.querySelector("i");

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");
            if (overlay) overlay.classList.toggle("active");
            document.body.classList.toggle("menu-open");

            const isOpen =
                navbar.classList.contains("active");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            if (isOpen) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });


        document.querySelectorAll("#navbar a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");
                if (overlay) overlay.classList.remove("active");
                document.body.classList.remove("menu-open");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    if (overlay) overlay.addEventListener("click",()=>{ navbar.classList.remove("active"); overlay.classList.remove("active"); document.body.classList.remove("menu-open"); const icon=menuBtn?.querySelector("i"); if(icon){icon.classList.remove("fa-xmark");icon.classList.add("fa-bars");} });

    /*====================================================
        PRODUCT IMAGE VISIBILITY
    ====================================================*/

    // global.css fades images to opacity:0 until they receive .loaded.
    // Ensure every cylinder photo on the Products page is visible even
    // when the page is opened directly or on a slower mobile connection.
    document.querySelectorAll("img").forEach(image => {

        const showImage = () => image.classList.add("loaded");

        if (image.complete) {
            showImage();
        } else {
            image.addEventListener("load", showImage, { once: true });
            image.addEventListener("error", showImage, { once: true });
        }

    });


    /*====================================================
        PRODUCTS
    ====================================================*/

    const cards =
        document.querySelectorAll(".product-card");

    const searchInput =
        document.getElementById("searchInput");

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    let currentFilter = "all";


    /*====================================================
        FILTER PRODUCTS
    ====================================================*/

    function filterProducts() {

        const searchValue =
            searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


        cards.forEach(card => {

            const productName =
                card.dataset.name
                ? card.dataset.name.toLowerCase()
                : "";


            const productText =
                card.innerText.toLowerCase();


            const matchesSearch =
                productName.includes(searchValue) ||
                productText.includes(searchValue);


            const matchesFilter =
                currentFilter === "all" ||
                card.classList.contains(currentFilter);


            if (matchesSearch && matchesFilter) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }


    /*====================================================
        SEARCH
    ====================================================*/

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProducts
        );

    }


    /*====================================================
        CATEGORY BUTTONS
    ====================================================*/

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            filterProducts();

        });

    });


    /*====================================================
        FAQ ACCORDION
    ====================================================*/

    const questions =
        document.querySelectorAll(".faq-question");


    questions.forEach(question => {

        question.addEventListener("click", () => {

            const answer =
                question.nextElementSibling;


            const icon =
                question.querySelector("i");


            const isOpen =
                answer.style.maxHeight;


            document
                .querySelectorAll(".faq-answer")
                .forEach(item => {

                    item.style.maxHeight = null;

                });


            document
                .querySelectorAll(".faq-question i")
                .forEach(item => {

                    item.classList.remove("fa-minus");

                    item.classList.add("fa-plus");

                });


            if (!isOpen) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";


                icon.classList.remove("fa-plus");

                icon.classList.add("fa-minus");

            }

        });

    });


    /*====================================================
        SCROLL REVEAL
    ====================================================*/

    const revealElements =
        document.querySelectorAll(
            ".product-card, .delivery-card, .faq-item, .section-title"
        );


    function revealOnScroll() {

        revealElements.forEach(element => {

            const position =
                element.getBoundingClientRect().top;


            if (
                position <
                window.innerHeight - 100
            ) {

                element.classList.add("reveal");

                setTimeout(() => {

                    element.classList.add("active");

                }, 50);

            }

        });

    }


    window.addEventListener(
        "scroll",
        revealOnScroll
    );


    revealOnScroll();


    /*====================================================
        BACK TO TOP
    ====================================================*/

    const topBtn =
        document.getElementById("topBtn");


    if (topBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                topBtn.style.display = "flex";

            } else {

                topBtn.style.display = "none";

            }

        });


        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /*====================================================
        HERO IMAGE MOUSE MOVEMENT
    ====================================================*/

    const heroImage =
        document.querySelector(".hero-image img");


    if (heroImage && window.innerWidth > 768) {

        window.addEventListener("mousemove", event => {

            const x =
                (window.innerWidth / 2 - event.clientX) / 60;


            const y =
                (window.innerHeight / 2 - event.clientY) / 60;


            heroImage.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /*====================================================
        RIPPLE EFFECT
    ====================================================*/

    document
        .querySelectorAll(".btn, .order-btn")
        .forEach(button => {

            button.addEventListener("click", function(event) {

                const circle =
                    document.createElement("span");


                const diameter =
                    Math.max(
                        this.clientWidth,
                        this.clientHeight
                    );


                circle.style.width =
                    diameter + "px";


                circle.style.height =
                    diameter + "px";


                circle.style.left =
                    event.offsetX -
                    diameter / 2 +
                    "px";


                circle.style.top =
                    event.offsetY -
                    diameter / 2 +
                    "px";


                circle.classList.add("ripple");


                const oldRipple =
                    this.querySelector(".ripple");


                if (oldRipple) {

                    oldRipple.remove();

                }


                this.appendChild(circle);

            });

        });


});