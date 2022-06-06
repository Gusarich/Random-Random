const rng = new MersenneTwister()

function randomString () {
    let len = Math.floor(rng.random() * 15), result = '';
    for (let i = 0; i < len; i++) {
        result += String.fromCharCode(Math.floor(rng.random() * 128))
    }
    return result;
}

function format (n) {
    if (n < 10000) return n.toFixed(2)
    return n.toExponential(2).replace('+', '')
}

function action () {
    // gameValues.prob = gameValues.rtp / (100 * gameValues.mul)
}

function update () {
    $('#value_r')[0].innerText = format(gameValues.r)
    $('#value_x')[0].innerText = format(gameValues.x)
    $('#value_rtp')[0].innerText = format(gameValues.rtp) + '%'
    $('#value_mul')[0].innerText = 'x' + format(gameValues.mul)
    $('#value_prob')[0].innerText = format(gameValues.prob) + '%'
}
