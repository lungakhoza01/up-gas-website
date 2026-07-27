/*====================================================
    UP GAS - HOME PAGE JAVASCRIPT
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

/*====================================================
    STICKY HEADER
====================================================*/

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }

});

/*====================================================
    MOBILE MENU
====================================================*/

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
const overlay = document.querySelector(".menu-overlay");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    const icon = menuBtn.querySelector("i");

    if(navbar.classList.contains("active")){
        icon.classList.replace("fa-bars","fa-xmark");
    }else{
        icon.classList.replace("fa-xmark","fa-bars");
    }

});

}

/*====================================================
    CLOSE MENU
====================================================*/

document.querySelectorAll("#navbar a").forEach(link=>{

link.addEventListener("click",()=>{

    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");

    const icon = menuBtn.querySelector("i");
    icon.classList.replace("fa-xmark","fa-bars");

});

});

if(overlay){

overlay.addEventListener("click",()=>{

    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");

    const icon = menuBtn.querySelector("i");
    icon.classList.replace("fa-xmark","fa-bars");

});

}

/*====================================================
    SCROLL REVEAL
====================================================*/

const reveals = document.querySelectorAll(

".service-card,.stat-card,.feature,.step,.product,.testimonial-card,.faq-item,.section-title,.cta-content"

);

function revealScroll(){

reveals.forEach(item=>{

const top = item.getBoundingClientRect().top;

if(top < window.innerHeight-120){

item.classList.add("reveal","active");

}

});

}

window.addEventListener("scroll",revealScroll);

revealScroll();

/*====================================================
    FAQ ACCORDION
====================================================*/

const faq = document.querySelectorAll(".faq-item");

faq.forEach(item => {

    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = button ? button.querySelector("i") : null;

    if(!button || !answer) return;

    button.setAttribute("type","button");
    button.setAttribute("aria-expanded","false");

    button.addEventListener("click", () => {

        const wasOpen = item.classList.contains("active");

        faq.forEach(other => {

            other.classList.remove("active");

            const otherButton = other.querySelector(".faq-question");
            const otherAnswer = other.querySelector(".faq-answer");
            const otherIcon = other.querySelector(".faq-question i");

            if(otherAnswer){
                otherAnswer.style.maxHeight = null;
            }

            if(otherButton){
                otherButton.setAttribute("aria-expanded","false");
            }

            if(otherIcon){
                otherIcon.classList.remove("fa-minus");
                otherIcon.classList.add("fa-plus");
            }

        });

        if(!wasOpen){

            item.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
            button.setAttribute("aria-expanded","true");

            if(icon){
                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }

        }

    });

});

/*====================================================
    BACK TO TOP
====================================================*/

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});

/*====================================================
    BUTTON RIPPLE EFFECT
====================================================*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const diameter=Math.max(this.clientWidth,this.clientHeight);

const radius=diameter/2;

ripple.style.width=diameter+"px";
ripple.style.height=diameter+"px";

ripple.style.left=e.offsetX-radius+"px";
ripple.style.top=e.offsetY-radius+"px";

ripple.classList.add("ripple");

const oldRipple=this.querySelector(".ripple");

if(oldRipple){

oldRipple.remove();

}

this.appendChild(ripple);

});

});

/*====================================================
    HERO PARALLAX
====================================================*/

const hero=document.querySelector(".hero-image img");

if(hero && window.innerWidth>768){

window.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.clientX)/80;
const y=(window.innerHeight/2-e.clientY)/80;

hero.style.transform=`translate(${x}px,${y}px)`;

});

}

/*====================================================
    SMOOTH SCROLL
====================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

const target=document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/*====================================================
    ACTIVE NAVIGATION
====================================================*/

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("#navbar a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;
const height=section.offsetHeight;

if(scrollY>=top && scrollY<top+height){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*====================================================
    IMAGE FADE-IN
====================================================*/

document.querySelectorAll("img").forEach(image=>{

if(image.complete){

image.classList.add("loaded");

}else{

image.addEventListener("load",()=>{

image.classList.add("loaded");

});

}

});

/*====================================================
    CONSOLE BRANDING
====================================================*/

console.log(
"%cUP GAS",
"color:#ff7a00;font-size:22px;font-weight:bold;"
);

console.log(
"%cGas Delivered. Life Made Easy.",
"color:white;font-size:14px;"
);
});