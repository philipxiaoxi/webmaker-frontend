const common = {
    copy(value) {
        const oInput = document.createElement('input')
        oInput.value = value
        document.body.appendChild(oInput)
        oInput.select()
        document.execCommand('copy')
        oInput.remove()
        return true
    },
    debounce(fn, delay) {
        let timer = null
        return () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn()
            }, delay)
        }
    }
}
module.exports = common
