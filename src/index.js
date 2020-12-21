const remToPixels= (rem) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

window.addEventListener('scroll', event => {
    if(document.querySelector("html").scrollTop > remToPixels(3.75)) {
        document.querySelector("body>header .header-title").classList.add("short");
    }else {
        document.querySelector("body>header .header-title").classList.remove("short");
    }
});