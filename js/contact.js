/*====================================================
    UP GAS - CONTACT PAGE JAVASCRIPT
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {


    /*=================================
      HEADER
    =================================*/

    const header = document.getElementById("header");

    if (header) {

        const handleHeader = () => {

            if (window.scrollY > 80) {

                header.classList.add("sticky");

            } else {

                header.classList.remove("sticky");

            }

        };

        window.addEventListener("scroll", handleHeader);

        handleHeader();

    }


    /*=================================
      MOBILE MENU
    =================================*/

    const menuBtn = document.getElementById("menu-btn");

    const overlay = document.querySelector(".menu-overlay");

const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {

        const icon = menuBtn.querySelector("i");

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navbar.classList.toggle("active");

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

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                });

            });

    }


    /*=================================
      FAQ ACCORDION
    =================================*/

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        const icon =
            question.querySelector("i");


        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("active");


            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                otherAnswer.style.maxHeight = null;

                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });


            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /*=================================
      CONTACT FORM → WHATSAPP
    =================================*/

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("name")
                    .value
                    .trim();


                const phone =
                    document.getElementById("phone")
                    .value
                    .trim();


                const email =
                    document.getElementById("email")
                    .value
                    .trim();


                const service =
                    document.getElementById("service")
                    .value;


                const message =
                    document.getElementById("message")
                    .value
                    .trim();


                if (
                    !name ||
                    !phone ||
                    !service ||
                    !message
                ) {

                    alert(
                        "Please complete all required fields."
                    );

                    return;

                }


                const whatsappMessage =

`*NEW ENQUIRY - UP GAS*

*Customer Details*
Name: ${name}
Phone: ${phone}
Email: ${email || "Not Provided"}

*Enquiry Type*
${service}

*Message*
${message}

Thank you.`;


                const whatsappURL =
                    "https://wa.me/27638761182?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }

        );

    }


    /*=================================
      SCROLL REVEAL
    =================================*/

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealOnScroll = () => {

        const trigger =
            window.innerHeight - 100;


        revealElements.forEach(element => {

            const top =
                element.getBoundingClientRect().top;


            if (top < trigger) {

                element.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        revealOnScroll
    );


    revealOnScroll();


    /*=================================
      BACK TO TOP
    =================================*/

    const topBtn =
        document.getElementById("topBtn");


    if (topBtn) {

        const updateTopButton = () => {

            if (window.scrollY > 500) {

                topBtn.style.display = "flex";

            } else {

                topBtn.style.display = "none";

            }

        };


        window.addEventListener(
            "scroll",
            updateTopButton
        );


        updateTopButton();


        topBtn.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        );

    }


    /*=================================
      ACTIVE PAGE
    =================================*/

    const currentPage =
        window.location.pathname
        .split("/")
        .pop() || "index.html";


    document.querySelectorAll("#navbar a")
        .forEach(link => {

            const linkPage =
                link.getAttribute("href");


            if (
                linkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });


});