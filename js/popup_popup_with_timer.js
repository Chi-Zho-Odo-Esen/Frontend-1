const popupPopupWithTimer = document.querySelector(".popup__popup-with-timer")
const popupPopupWithTimerContainer = popupPopupWithTimer.querySelector(".popup__container")
const popupPopupWithTimerCloseButton = popupPopupWithTimer.querySelector(".popup__close-button")

const showPopupWithTimer = () => {
    popupPopupWithTimer.classList.add("popup_shown")
}
const hidePopupWithTimer = () => {
    popupPopupWithTimer.classList.remove("popup_shown")
}
const showIfFirstTime = () => {
    if (!localStorage.getItem("is-popup-with-timer-closed")) {
        setTimeout(showPopupWithTimer, 5000)
    }
}
const setPopupWithTimerShown = () => {
    localStorage.setItem("is-popup-with-timer-closed", "true")
}

showIfFirstTime()

popupPopupWithTimerCloseButton.addEventListener("click", (event) => {
    event.preventDefault()
    setPopupWithTimerShown()
    hidePopupWithTimer()
})
popupPopupWithTimer.addEventListener("click", (event) => {
    if (!event.composedPath().includes(popupPopupWithTimerContainer)) {
        setPopupWithTimerShown()
        hidePopupWithTimer()
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        setPopupWithTimerShown()
        hidePopupWithTimer()
    }
})
