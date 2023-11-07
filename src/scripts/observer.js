export default (function () {
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

})()