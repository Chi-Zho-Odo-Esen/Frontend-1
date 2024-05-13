const popupGallery = document.querySelector(".popup__gallery")
const popupGalleryContainer = popupGallery.querySelector(".popup__container")
const popupGalleryImage = popupGalleryContainer.querySelector(".popup__image")
const popupGalleryCloseButton = popupGallery.querySelector(".popup__close-button")
const popupGalleryNextButton = popupGallery.querySelector(".popup__next-item-button")
const popupGalleryPreviousButton = popupGallery.querySelector(".popup__previous-item-button")
const popupGalleryImagesArray = document.querySelectorAll(".gallery__item")

let popupGalleryCurrentItem = document.querySelector(".gallery__item")

const showPopupGallery = () => {
    popupGallery.classList.add("popup_shown")
}
const hidePopupGallery = () => {
    popupGallery.classList.remove("popup_shown")
}
const togglePopupGallery = () => {
    popupGallery.classList.toggle("popup_shown")
}
const updatePopupImageSrc = () => {
    popupGalleryImage.src = popupGalleryCurrentItem.querySelector(".gallery__image").src
}
const switchNextItem = () => {
    let temp = popupGalleryCurrentItem.nextElementSibling
    if (temp != null) {
        popupGalleryCurrentItem = temp
        updatePopupImageSrc()
    }
}
const switchPreviousItem = () => {
    let temp = popupGalleryCurrentItem.previousElementSibling
    if (temp != null) {
        popupGalleryCurrentItem = temp
        updatePopupImageSrc()
    }
}
const hidePreviousItemButton = () => {
    popupGalleryPreviousButton.classList.add("popup__previous-item-button_hidden")
}
const showPreviousItemButton = () => {
    popupGalleryPreviousButton.classList.remove("popup__previous-item-button_hidden")
}
const hideNextItemButton = () => {
    popupGalleryNextButton.classList.add("popup__next-item-button_hidden")
}
const showNextItemButton = () => {
    popupGalleryNextButton.classList.remove("popup__next-item-button_hidden")
}
const updateNavigationButtonsStates = () => {
    let temp = popupGalleryCurrentItem.previousElementSibling
    if (temp == null) {
        hidePreviousItemButton()
    } else {
        showPreviousItemButton()
    }
    temp = popupGalleryCurrentItem.nextElementSibling
    if (temp == null) {
        hideNextItemButton()
    } else {
        showNextItemButton()
    }
}

popupGalleryImagesArray.forEach((element) => {
    element.addEventListener("click", () => {
        popupGalleryCurrentItem = element
        updatePopupImageSrc()
        updateNavigationButtonsStates()
        showPopupGallery()
    })
})
popupGalleryNextButton.addEventListener("click",  (event) => {
    switchNextItem()
    updateNavigationButtonsStates()
})
popupGalleryPreviousButton.addEventListener("click", (event) => {
    switchPreviousItem()
    updateNavigationButtonsStates()
})

popupGalleryCloseButton.addEventListener("click", (event) => {
    hidePopupGallery()
})
popupGallery.addEventListener("click", (event) => {
    if (!event.composedPath().includes(popupGalleryContainer)) {
        hidePopupGallery()
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        hidePopupGallery()
    }
})
