const snowButton = document.querySelector(".footer__snow-button")
const snow = document.querySelector(".snow")

const toggleSnow = () => {
    snow.classList.toggle("snow_shown")
}
const showSnow = () => {
    snow.classList.add("snow_shown")
}
const hideSnow = () => {
    snow.classList.remove("snow_shown")
}

snow.addEventListener('click',  (event) => {
    hideSnow()
})
snowButton.addEventListener('click',  (event) => {
    event.preventDefault()
    toggleSnow()
})
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        hideSnow()
    }
})
