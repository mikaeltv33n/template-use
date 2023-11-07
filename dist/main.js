/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/scripts/headline.js
/* harmony default export */ var headline = ((function headline() {
	const headline = "Newsbox"
	document.querySelector("h1").innerText = headline
})());

;// CONCATENATED MODULE: ./src/scripts/burgermenu.js
/* harmony default export */ var burgermenu = ((function burgermenu() {
	const button = document.querySelector(".menuButton")
	const menu = document.querySelector(".primaryMenu")

	button.addEventListener("click", clickHandler)

	function clickHandler() {
		menu.style.right = menu.style.right == "-19em" ? "0" : "-19em"
	}
})());
;// CONCATENATED MODULE: ./src/scripts/observer.js
/* harmony default export */ var observer = ((function () {
    let options = {
        rootMargin: "0px",
        threshold: 0.75,
    }


    function callback(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return // guard-clause

            if (entry.intersectionRatio >= 0.75) {
                console.log(entry)
                entry.target.classList.remove("dims")
                entry.target.classList.add("dims-on")
            }
        })
    }

    let observer = new IntersectionObserver(callback, options)
    
    observer.observe(document.querySelector(".dims"))

})());
;// CONCATENATED MODULE: ./src/images/aubergine-feta.png
var aubergine_feta_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL2F1YmVyZ2luZS1mZXRhLnBuZyI7";
;// CONCATENATED MODULE: ./src/images/OST3.jpg
var OST3_namespaceObject = "data:image/jpeg;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL09TVDMuanBnIjs=";
;// CONCATENATED MODULE: ./src/index.js






/******/ })()
;
//# sourceMappingURL=main.js.map