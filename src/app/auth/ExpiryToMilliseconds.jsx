const ExpiryToMilliseconds = (exp) => {
    var currentTimestamp = new Date().getTime()
    var ct = currentTimestamp / 1000
    var expSeconds = exp - ct
    var expMilliseconds = expSeconds * 1000
    return expMilliseconds
}

export default ExpiryToMilliseconds
