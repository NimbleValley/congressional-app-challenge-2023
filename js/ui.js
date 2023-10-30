var tl = new TimelineMax();

var screen = "chat";

var theme = "day";

// Switch to chat screen
async function toChatScreen() {
    if (screen == "chat") {
        return;
    }

    tl.clear();

    document.getElementById("course-screen-button").className = "";
    document.getElementById("chat-screen-button").className = "page-active";

    tl.fromTo("#chat-bot-container", 1, { left: "-100vw", opacity: 0 }, { ease: Power2.easeOut, left: "0vw", opacity: 1 }, "+=0");
    tl.fromTo("#course-card-container", 1, { left: "0vw", opacity: 1 }, { ease: Power2.easeOut, left: "-100vw", opacity: 0 }, "-=1");

    sleep(1000);
    screen = "chat";
}

// Switch to course screen
async function toCourseScreen() {
    if (screen == "course") {
        return;
    }

    tl.clear();

    document.getElementById("chat-screen-button").className = "";
    document.getElementById("course-screen-button").className = "page-active";

    tl.fromTo("#course-card-container", 1, { left: "100vw", opacity: 0 }, { ease: Power2.easeOut, left: "0vw", opacity: 1 }, "+=0");
    tl.fromTo("#chat-bot-container", 1, { left: "0vw", opacity: 1 }, { ease: Power2.easeOut, left: "100vw", opacity: 0 }, "-=1");

    sleep(1000);
    screen = "course";
}

function toggleTheme() {
    tl.clear();
    if (theme == "day") {
        theme = "night";
        document.getElementById("day-night-button").innerText = "☾";
        tl.fromTo("#day-night-button", 1, { opacity: 0, scale: 1.25 }, { ease: Power2.easeOut, opacity: 1, scale: 1 }, "+=0");

        document.documentElement.style.setProperty("--background", "#1F1F1F");
        document.documentElement.style.setProperty("--primary", "#333333");
        document.documentElement.style.setProperty("--secondary", "#fa973b");
        document.documentElement.style.setProperty("--text", "#e5e2f3");
        document.getElementById("counsler-textbox").style.filter = "invert(0.85) contrast(1.2) brightness(150%)";
        
        localStorage.setItem("theme", "night");
    } else {
        theme = "day";
        document.getElementById("day-night-button").innerText = "☀︎";
        tl.fromTo("#day-night-button", 1, { opacity: 0, scale: 0.75 }, { ease: Power2.easeOut, opacity: 1, scale: 1 }, "+=0");
        
        document.documentElement.style.setProperty("--background", "#f7f4f4");
        document.documentElement.style.setProperty("--primary", "#fa973b");
        document.documentElement.style.setProperty("--secondary", "#333333");
        document.documentElement.style.setProperty("--text", "#00101a");
        document.getElementById("counsler-textbox").style.filter = "contrast(0.92)";

        localStorage.setItem("theme", "day");
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

if (localStorage.getItem("theme") == "night") {
    toggleTheme();
}

animateScreen();

function animateScreen() {
    let tempTL = new TimelineMax();

    tempTL.fromTo("#course-guide-header", 0.75, {top: "-5vh", opacity: 0}, { ease: Power2.easeOut, top: "0vh", opacity: 1}, "+=0");
    
    tempTL.fromTo("#home-screen-button", 0.75, {top: "-5vh", opacity: 0}, { ease: Power2.easeOut, top: "0vh", opacity: 1}, "-=0.6");
    tempTL.fromTo("#chat-screen-button", 0.75, {top: "-5vh", opacity: 0}, { ease: Power2.easeOut, top: "0vh", opacity: 1}, "-=0.6");
    tempTL.fromTo("#course-screen-button", 0.75, {top: "-5vh", opacity: 0}, { ease: Power2.easeOut, top: "0vh", opacity: 1}, "-=0.6");
    
    tempTL.fromTo("#chat-iframe-container", 0.75, {top: "15vh", opacity: 1, height: "96%"}, { ease: Power2.easeOut, top: "0vh", opacity: 1, height: "96%"}, "-=1");
    
    tempTL.fromTo("#day-night-button", 0.75, {scale: "0.5", opacity: 0}, { ease: Power2.easeOut, scale: "1", opacity: 1}, "-=.8");
}