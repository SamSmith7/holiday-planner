
module.exports = errorCode => {

    return new Promise((resolve, reject) => {
        reject(new Error(errorCode))
    })
}
