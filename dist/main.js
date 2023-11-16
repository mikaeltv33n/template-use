/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/scripts/headline.js
/* harmony default export */ var headline = ((function headline() {
	const headline = "Newsbox"
	document.querySelector("h1").innerText = headline
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



/* harmony default export */ var fetchArticleApi = ((function () {
    if (!window.location.pathname.includes("index.html")) return;

    const categories = [
        "arts", "automobiles", "books",
        "business", "fashion", "food", "health", "home", "insider", "magazine",
        "movies", "nyregion", "obituaries", "opinion", "politics", "realestate", "science", "sundayreview", "technology",
        "theater", "t-magazine", "travel", "upshot", "us", "world"
    ];

    const DELETED_ARTICLES = getJSONfromLocalstorage('deleted_articles') ?? []

    const CATEGORIES = document.querySelector('.categories');

    categories.forEach(category => {
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
                    data.results.filter(element => !DELETED_ARTICLES.includes(element.uri)).forEach(element => {
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
                        INBOX_ICON.innerText = "inbox";
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
                                DELETED_ARTICLES.push(element.uri)
                                localStorage.setItem("deleted_articles", JSON.stringify(DELETED_ARTICLES))
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
})());

;// CONCATENATED MODULE: ./src/images/aubergine-feta.png
var aubergine_feta_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL2F1YmVyZ2luZS1mZXRhLnBuZyI7";
;// CONCATENATED MODULE: ./src/images/OST3.jpg
var OST3_namespaceObject = "data:image/jpeg;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL09TVDMuanBnIjs=";
;// CONCATENATED MODULE: ./src/index.js








/******/ })()
;
//# sourceMappingURL=main.js.map