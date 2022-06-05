function randomString () {
    let len = Math.floor(Math.random() * 15), result = '';
    for (let i = 0; i < len; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * 128))
    }
    return result;
}
