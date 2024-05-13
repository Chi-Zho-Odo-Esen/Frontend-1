const countdownTimer = document.querySelector(".countdown-timer")
const countdownTimerDays = countdownTimer.querySelector('.countdown-timer__days')
const countdownTimerHours = countdownTimer.querySelector('.countdown-timer__hours')
const countdownTimerMinutes = countdownTimer.querySelector('.countdown-timer__minutes')
const countdownTimerSeconds = countdownTimer.querySelector('.countdown-timer__seconds')

const graduationDate = new Date("2027-08-31")
const difference = graduationDate - new Date()
let timerId = null

let seconds = difference > 0 ? Math.floor(difference / 1000) % 60 : 0
let minutes = difference > 0 ? Math.floor(difference / 1000 / 60) % 60 : 0
let hours = difference > 0 ? Math.floor(difference / 1000 / 60 / 60) % 24 : 0
let days = difference > 0 ? Math.floor(difference / 1000 / 60 / 60 / 24) : 0

const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]]
}
const decreaseCountdownTimer = () => {
    if (difference <= 0) {
        clearInterval(timerId)
    }

    if (seconds > 0) {
        --seconds
    } else {
        if (minutes > 0) {
            --minutes
            seconds = 59
        } else {
            if (hours > 0) {
                --hours
                minutes = 59
                seconds = 59
            } else {
                if (days > 0) {
                    --days
                    hours = 23
                    minutes = 59
                    seconds = 59
                }
            }
        }
    }

    countdownTimerDays.textContent = days < 10 ? '0' + days : days
    countdownTimerHours.textContent = hours < 10 ? '0' + hours : hours
    countdownTimerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes
    countdownTimerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds

    countdownTimerDays.dataset.title = declensionNum(days, ['день', 'дня', 'дней'])
    countdownTimerHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов'])
    countdownTimerMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут'])
    countdownTimerSeconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд'])
}

decreaseCountdownTimer()
timerId = setInterval(decreaseCountdownTimer, 1000)
