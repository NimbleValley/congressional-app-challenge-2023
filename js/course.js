const departmentFilterSelect = document.getElementById("department-filter");
const courseCardContainer = document.getElementById("course-card-container");

const courseFilterButton = document.getElementById("filter-button");

var departmentFilter = "all";

var courseNumbers = [];
var courseNames = [];
var courseObjects = [];

var inCourseCard = false;

function fetchData() {
    fetch("courses.json")
        .then((response) => response.json())
        .then((json) => { updateCourses(json) })
}

function updateCourses(data) {
    if (courseNames.length == 0) {
        populateCourseArrays(data);
    }

    departmentFilterSelect.innerHTML = "";
    data.courseTypes.forEach(element => {
        let tempOption = document.createElement("option");
        tempOption.innerText = element[0].charAt(0).toUpperCase() + element[0].slice(1);;
        tempOption.value = element[0];

        departmentFilterSelect.appendChild(tempOption);
    });

    let courses = Object.entries(data.courses);

    console.log(departmentFilter)
    courses.forEach(element => {
        if (element[0] == departmentFilter || departmentFilter == "all") {
            element[1].forEach(course => {
                //console.log(course);

                let tempCourseCard = document.createElement("div");
                tempCourseCard.classList.add("course-overview-card");
                tempCourseCard.classList.add("course-overview-card-hoverable");

                let tempCourseName = document.createElement("h3");
                tempCourseName.innerText = course.courseName;

                let tempHorizontalContainer = document.createElement("div");
                tempHorizontalContainer.className = "vertical-container";

                let tempCreditsText = document.createElement("p");
                tempCreditsText.innerText = `Credits: ${course.credits}`;

                let tempGradesText = document.createElement("p");
                tempGradesText.innerText = `Available to: ${course.gradesOffered.join(", ")}`;

                tempHorizontalContainer.appendChild(tempCreditsText);
                tempHorizontalContainer.appendChild(tempGradesText);

                tempCourseCard.appendChild(tempCourseName);
                tempCourseCard.appendChild(tempHorizontalContainer);

                tempCourseCard.addEventListener("click", courseCardClicked)

                courseCardContainer.appendChild(tempCourseCard);
            });
        }
    });
    departmentFilterSelect.value = departmentFilter;
}

fetchData();

courseFilterButton.addEventListener("click", function () {
    let courseOverviewCards = document.getElementsByClassName("course-overview-card");

    for (let i = 0; i < courseOverviewCards.length;) {
        courseOverviewCards[i].parentNode.removeChild(courseOverviewCards[i]);
    }

    departmentFilter = departmentFilterSelect.value;
    fetchData();
});

function courseCardClicked(event) {
    if(inCourseCard) {
        return;
    }

    inCourseCard = true;

    console.warn("clicked");

    this.style.position = "fixed";
    this.style.maxWidth = "100vw";
    this.style.zIndex = 100;
    this.style.border = "none";

    this.classList.remove("course-overview-card-hoverable");

    let tempBackButton = document.createElement("button");
    tempBackButton.innerText = "Back";
    tempBackButton.id = "back-to-courses-button";
    this.appendChild(tempBackButton);
    tempBackButton.addEventListener("click", resetCards)

    document.body.style.overflow = "hidden";
    tl.to(this, 0.5, { width: "100vw", height: "100vh", margin: 0, top: 0, fontSize: "4vw", ease: Power2.easeOut });

    let paragraphs = this.getElementsByTagName("p");
    tl.to(paragraphs, 0.5, { fontSize: "3vw", ease: Power2.easeOut }, "-=0.5");

    let tempPrerequisiteContainer = document.createElement("div");
    tempPrerequisiteContainer.id = "prerequisite-container";

    this.appendChild(tempPrerequisiteContainer);
    //tl.fromTo(tempPrerequisiteContainer, 1.25, { width: 0 }, { width: "90vw" }, "-=0.5");
    tl.fromTo(tempPrerequisiteContainer, 0.75, { scale: 0 }, { scale: 1, ease: Power2.easeOut }, "-=0.5");

    let coursePrerequisites = courseObjects[courseNames.indexOf(this.getElementsByTagName("h3")[0].innerText)];

    while (coursePrerequisites != null) {
        let tempContainer = document.createElement("div");
        tempContainer.classList.add("vertical-container");
        tempContainer.style.position = "relative";

        let tempCourseName = document.createElement("p");
        tempCourseName.className = "prerequisite-tree-course";
        tempCourseName.innerText = coursePrerequisites.courseName;

        if (coursePrerequisites.courseName != this.getElementsByTagName("h3")[0].innerText) {
            let tempArrowContainer = document.createElement("div");
            tempArrowContainer.classList.add("vertical-container");
            tempArrowContainer.style.position = "relative";

            let tempCourseArrow = document.createElement("p");
            tempCourseArrow.className = "prerequisite-tree-arrow";
            tempCourseArrow.innerText = "→";

            tempArrowContainer.appendChild(tempCourseArrow);
            tempPrerequisiteContainer.appendChild(tempArrowContainer);
        }

        tempContainer.appendChild(tempCourseName);
        tempPrerequisiteContainer.appendChild(tempContainer);

        console.log(coursePrerequisites);
        coursePrerequisites = courseObjects[courseNumbers.indexOf(String(coursePrerequisites.prerequisites))];
    }
}

async function resetCards(event) {
    document.body.style.overflow = "scroll";

    let tempPrereqisitesContainer = document.getElementById("prerequisite-container");
    this.parentNode.removeChild(tempPrereqisitesContainer);
    
    this.parentNode.style.position = "relative";
    this.parentNode.style.marginTop = "5vh";
    this.parentNode.style.zIndex = "0";
    this.parentNode.style.border = "solid 0.5vh var(--secondary)";
    this.parentNode.classList.add("course-overview-card-hoverable");
    this.parentNode.getElementsByTagName("h3")[0].style.width = "30vh";
    
    tl.to(this.parentNode, 0.5, { width: "30vh", height: "30vh", top: 0, fontSize: "2.75vh",  ease: Power2.easeOut });
    
    let paragraphs = this.parentNode.getElementsByTagName("p");
    tl.to(paragraphs, 0.5, { fontSize: "2.5vh" }, "-=0.5");
    
    this.parentNode.removeChild(this);

    await sleep(100);

    inCourseCard = false;
}

function populateCourseArrays(data) {
    let courses = Object.entries(data.courses);

    courses.forEach(element => {
        element[1].forEach(course => {
            courseNames.push(course.courseName);
            courseObjects.push(course);
            courseNumbers.push(course.courseNumber);
        });
    });
}