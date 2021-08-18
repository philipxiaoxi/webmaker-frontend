const common = {
    copy(value) {
        const oInput = document.createElement('input')
        oInput.value = value
        document.body.appendChild(oInput)
        oInput.select()
        document.execCommand('copy')
        oInput.remove()
        return true
    }
}
module.exports = common
