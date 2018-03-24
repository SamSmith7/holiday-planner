
module.exports = errorCode => {
    console.log(errorCode)
    return new Promise((resolve, reject) => {
        reject(new Error(errorCode))
    })
}
