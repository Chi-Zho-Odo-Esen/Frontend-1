const popupFeedback = document.querySelector(".popup__feedback")
const popupFeedbackContainer = popupFeedback.querySelector(".popup__container")
const popupFeedbackCloseButton = popupFeedback.querySelector(".popup__close-button")

const footerFeedbackButton = document.querySelector(".footer__feedback_button")
const popupFeedbackForm = document.querySelector(".popup__form")

const popupFeedbackTextRegularExpression = /^.{5,256}$/
const popupFeedbackEmailRegularExpression = /^(([^<>()[\]\.,:\s@\"]+(\.[^<>()[\]\.,:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,:\s@\"]+\.)+[^<>()[\]\.,:\s@\"]{2,})$/i

const popupFeedbackNameInput = popupFeedbackForm.querySelector(".popup__name-input")
const popupFeedbackEmailInput = popupFeedbackForm.querySelector(".popup__email-input")
const popupFeedbackTextInput = popupFeedbackForm.querySelector(".popup__text-input")
const popupFeedbackCheckbox = popupFeedbackForm.querySelector(".popup__checkbox")
const popupFeedbackSubmitButton = popupFeedbackForm.querySelector(".popup__submit-button")
const popupFeedbackNameErrorMessage = popupFeedbackForm.querySelector(".popup__name-error-message")
const popupFeedbackEmailErrorMessage = popupFeedbackForm.querySelector(".popup__email-error-message")
const popupFeedbackTextErrorMessage = popupFeedbackForm.querySelector(".popup__text-error-message")
const popupFeedbackCheckboxErrorMessage = popupFeedbackForm.querySelector(".popup__checkbox-error-message")

const showPopupFeedback = () => {
    popupFeedback.classList.add("popup_shown")
}
const hidePopupFeedback = () => {
    popupFeedback.classList.remove("popup_shown")
}
const togglePopupFeedback = () => {
    popupFeedback.classList.toggle("popup_shown")
}
const showInputError = (elementInput, elementError) => {
    elementInput.classList.add("popup__input_error")
    elementError.classList.remove("popup__error-message_hidden")
}
const hideInputError = (elementInput, elementError) => {
    elementInput.classList.remove("popup__input_error")
    elementError.classList.add("popup__error-message_hidden")
}
const ValidateInput = (inputElement, errorElement, regularExpression) => {
    if (String(inputElement.value).toLowerCase().match(regularExpression)) {
        hideInputError(inputElement, errorElement)
        return true
    }
    showInputError(inputElement, errorElement)
    return false
}
const ValidateCheckbox = (checkboxElement, errorElement) => {
    if (checkboxElement.checked) {
        hideInputError(checkboxElement, errorElement)
        return true
    }
    showInputError(checkboxElement, errorElement)
    return false
}
const makeSubmitButtonInactive = () => {
    popupFeedbackSubmitButton.classList.add("popup__submit-button_inactive")
}
const makeSubmitButtonActive = () => {
    popupFeedbackSubmitButton.classList.remove("popup__submit-button_inactive")
}
const recalculateSubmitButtonState = () => {
    if (ValidateInput(popupFeedbackEmailInput, popupFeedbackEmailErrorMessage, popupFeedbackEmailRegularExpression) && ValidateInput(popupFeedbackTextInput, popupFeedbackTextErrorMessage, popupFeedbackTextRegularExpression) && ValidateCheckbox(popupFeedbackCheckbox, popupFeedbackCheckboxErrorMessage)) {
        makeSubmitButtonActive()
        return true
    }
    makeSubmitButtonInactive()
    return false
}
const changeButtonAfterSubmit = () => {
    popupFeedbackSubmitButton.textContent = ("Отправлено")
    setTimeout(() => {
        togglePopupFeedback()
        popupFeedbackForm.reset()
        popupFeedbackSubmitButton.textContent = ("Отправить")
        makeSubmitButtonInactive()
    }, 300)
}
const constructPostRequest = (newPost) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json charset=UTF-8'
        },
        body: JSON.stringify({
            email: newPost.email,
            message: newPost.text
        })
    }).then(() => changeButtonAfterSubmit())
}

footerFeedbackButton.addEventListener("click", () => {
    togglePopupFeedback()
})
popupFeedbackCloseButton.addEventListener("click", (event) => {
    hidePopupFeedback()
})
popupFeedback.addEventListener("click", (event) => {
    if (!event.composedPath().includes(popupFeedbackContainer)) {
        hidePopupFeedback()
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        hidePopupFeedback()
    }
})

popupFeedbackEmailInput.addEventListener("input", () => {
    ValidateInput(popupFeedbackEmailInput, popupFeedbackEmailErrorMessage, popupFeedbackEmailRegularExpression)
    recalculateSubmitButtonState()
})
popupFeedbackTextInput.addEventListener("input", () => {
    ValidateInput(popupFeedbackTextInput, popupFeedbackTextErrorMessage, popupFeedbackTextRegularExpression)
    recalculateSubmitButtonState()
})
popupFeedbackCheckbox.addEventListener("input", () => {
    ValidateCheckbox(popupFeedbackCheckbox, popupFeedbackCheckboxErrorMessage)
    recalculateSubmitButtonState()
})

popupFeedbackForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (recalculateSubmitButtonState()) {
        popupFeedbackSubmitButton.textContent = ("Отправка...")
        const {email, text} = event.currentTarget.elements
        constructPostRequest({
            email: email.value,
            message: text.value
        })
    }
})
