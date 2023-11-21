/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/scripts/headline.js
/* harmony default export */ var headline = ((function headline() {
    const CURRENTPATH = window.location.pathname;

    if (CURRENTPATH.includes("index.html")) {
        const INBOX_HEADLINE = "Newsbox";
        document.querySelector("h1").innerText = INBOX_HEADLINE;
    } else if (CURRENTPATH.includes("archive.html")) {
        const ARCHIVE_HEADLINE = "Archive";
        document.querySelector("h1").innerText = ARCHIVE_HEADLINE;
     } else if (CURRENTPATH.includes("settings.html")) {
        const SETTINGS_HEADLINE = "News settings";
        document.querySelector("h1").innerText = SETTINGS_HEADLINE;
    }
})());

;// CONCATENATED MODULE: ./src/images/LOGO.png
var LOGO_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL0xPR08ucG5nIjs=";
;// CONCATENATED MODULE: ./src/scripts/getJSONfromLocalstorage.js
function getJSONfromLocalStorage(key) {
	const OBJECT = localStorage.getItem(key)
		? JSON.parse(localStorage.getItem(key))
		: null
	return OBJECT
}

/* harmony default export */ var getJSONfromLocalstorage = (getJSONfromLocalStorage);

;// CONCATENATED MODULE: ./src/scripts/fetchArticleApi.js



/* harmony default export */ function fetchArticleApi(onlyarchived = false, action = "archive") {

    const categories = [
        "arts", "automobiles", "books",
        "business", "fashion", "food", "health", "home", "insider", "magazine",
        "movies", "nyregion", "obituaries", "opinion", "politics", "realestate", "science", "sundayreview", "technology",
        "theater", "t-magazine", "travel", "upshot", "us", "world"
    ];

    document.addEventListener("click", function (event) {
        const CLICKEDELEMENT = event.target;
        if (CLICKEDELEMENT.classList.contains("material-symbols-outlined")) {
            const DROPDOWN = CLICKEDELEMENT.closest(".category");
            if (DROPDOWN) {
                const DROPDOWNICON = DROPDOWN.querySelector(".category__dropdown");
                DROPDOWNICON.classList.toggle("rotate");
            }
        }
    });


    const ARCHIVED_ARTICLES = getJSONfromLocalstorage("archived_articles") ?? []
    const CATEGORIES = document.querySelector('.categories');
    const HIDDEN_CATEGORIES = []
    categories.filter(c => onlyarchived || !HIDDEN_CATEGORIES.includes(c)).forEach(category => {
        const CATEGORY = document.createElement('details');
        CATEGORY.className = 'category';

        CATEGORY.innerHTML = `
            <summary class="category__summary">
                <div class="category__summaryContainer">
                <img class="category__logo" src="./images/LOGO.png">
                <h2>${category}</h2>
                </div>
                <span class="material-symbols-outlined category__dropdown">expand_more</span>
            </summary>
            `;

        const CONTENT = document.createElement('div');
        CONTENT.className = 'category__content';
        const UL = document.createElement("ul");
        CONTENT.appendChild(UL)
        CATEGORY.querySelector('.category__dropdown').addEventListener('click', function () {
            if (CATEGORY.querySelector('.category__content')) return;

            fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=uZhoGPSEKtSyAp1AGwJYzO8qDAJsjMvc`)
                .then(res => res.json())
                .then(data => {
                    data.results.filter(element => {
                        if (onlyarchived) return ARCHIVED_ARTICLES.includes(element.uri)

                        return !ARCHIVED_ARTICLES.includes(element.uri)
                    }).forEach(element => {

                        function truncate(string, maxlength) {
                            const LENGTH = string.length
                            let truncated = string.substr(0, maxlength)
                            if (truncated.charAt(truncated.length - 1) === ".") return truncated
                            else if (LENGTH > maxlength) return truncated + "..."
                            return truncated
                        }

                        const LISTITEM = document.createElement("li")


                        const articleContainer = document.createElement('section');
                        LISTITEM.appendChild(articleContainer);

                        const BUTTON = document.createElement("button");
                        const INBOX_ICON = document.createElement("span");
                        INBOX_ICON.classList.add("material-symbols-outlined");
                        if (action === "archive") BUTTON.classList.add("archive-button")
                        if (action === "delete") BUTTON.classList.add("delete-button")
                        if (action === "delete") INBOX_ICON.innerText = "delete"
                        if (action === "archive") INBOX_ICON.innerText = "inbox";
                        BUTTON.appendChild(INBOX_ICON);
                        LISTITEM.appendChild(BUTTON);

                        articleContainer.className = 'article__container';
                        let image = "https://picsum.photos/200"
                        if (element.multimedia?.length) {
                            const MULTIMEDIA = element.multimedia.find(mm => {
                                if (mm.format === "Large Thumbnail") return mm
                            })
                            if (MULTIMEDIA) image = MULTIMEDIA.url
                        }
                        articleContainer.innerHTML = `
                            <img class="article__image" src='${image}'alt='headline picture'>
                            <div class="article__text">
                            <h2 class='article__headline'>${element.title}</h2>
                            <p class='article__description'>${truncate(element.abstract, 100)}</p>
                            </div>
                        `;

                        UL.addEventListener("click", (e) => {
                            const LI = e.target.closest("li");
                            const BTN = e.target.closest("button");
                            if (LI && LI.scrollLeft === 0) {
                                LI.scrollBy({
                                    left: 1,
                                    behavior: "smooth"
                                });
                            } else if (!BTN && LI) {
                                LI.scrollBy({
                                    left: -1,
                                    behavior: "smooth"
                                });
                            } else if (BTN && LI) {
                                LI.remove();
                                if (action === "archive") {
                                    ARCHIVED_ARTICLES.push(element.uri)

                                } else if (action === "delete") {
                                    const INDEXTOBEDELETED = ARCHIVED_ARTICLES.indexOf(element.uri)
                                    if (INDEXTOBEDELETED === -1) return
                                    ARCHIVED_ARTICLES.splice(INDEXTOBEDELETED, 1)

                                }
                                localStorage.setItem("archived_articles", JSON.stringify(ARCHIVED_ARTICLES))
                            }
                        });
                        UL.appendChild(LISTITEM);
                    });

                    CATEGORY.appendChild(CONTENT);
                })
                .catch(error => {
                    console.error(`Error fetching ${category} articles:`, error);
                });
        });

        CATEGORIES.append(CATEGORY);
    });
};


;// CONCATENATED MODULE: ./src/images/aubergine-feta.png
var aubergine_feta_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL2F1YmVyZ2luZS1mZXRhLnBuZyI7";
;// CONCATENATED MODULE: ./src/scripts/fetchArchivedArticles.js


/* harmony default export */ var fetchArchivedArticles = ((function () {
    if (!window.location.pathname.includes("archive.html")) return;

    fetchArticleApi(true, "delete")
})());
;// CONCATENATED MODULE: ./src/scripts/fetchFrontpageArticles.js


/* harmony default export */ var fetchFrontpageArticles = ((function () {
    if (!window.location.pathname.includes("index.html")) return;

    fetchArticleApi()
})());
;// CONCATENATED MODULE: ./src/images/OST3.jpg
var OST3_namespaceObject = "data:image/jpeg;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL09TVDMuanBnIjs=";
;// CONCATENATED MODULE: ./src/index.js









/******/ })()
;
//# sourceMappingURL=main.js.map