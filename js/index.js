var tl = new TimelineMax();


async function animatePage() {
    tl.fromTo("#footer", 1, { bottom: "-5vh" }, { ease: Power2.easeOut, bottom: "0vh" }, "+=0.25");
    tl.fromTo("h1", 1, { fontSize: 0, lineHeight: "12vw" }, { ease: Power2.easeOut, fontSize: "8vw", lineHeight: "12vw" }, "-=0.75");
}

animatePage();

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

if (localStorage.getItem("theme") == "night") {
    document.documentElement.style.setProperty("--background", "#1F1F1F");
    document.documentElement.style.setProperty("--primary", "#333333");
    document.documentElement.style.setProperty("--secondary", "#fa973b");
    document.documentElement.style.setProperty("--text", "#e5e2f3");
}