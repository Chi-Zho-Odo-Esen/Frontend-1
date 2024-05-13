const header = document.querySelector(".header")

const getWindowScrollY = () => {
    return window.scrollY
}
const getWindowScreenHeight = () => {
    return window.screen.height
}
const addHeaderFixed = () => {
    header.classList.add("header_fixed")
}
const removeHeaderFixed = () => {
    header.classList.remove("header_fixed")
}

document.addEventListener("scroll", () => {
    if (getWindowScrollY() >= getWindowScreenHeight()) {
        addHeaderFixed()
    } else {
        removeHeaderFixed()
    }
})
