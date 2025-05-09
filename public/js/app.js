window.onscroll = function () { headerStick() };
var header = document.querySelector(".main-header");
var sticky = header.offsetTop;
function headerStick() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}