let hamIcon = document.querySelector("#ham-icon");
let navMenu = document.querySelector(".nav-menu");
let closeIcon = document.querySelector("#close-icon");

hamIcon.addEventListener("click", function() {
    navMenu.classList.toggle("active-menu");
});

closeIcon.addEventListener("click",function() {
    navMenu.classList.toggle("active-menu");
})

