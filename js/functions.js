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
    if (gameValues.r > 0) {
        if (rng.random() < gameValues.prob) gameValues.r *= gameValues.mul
        else gameValues.r = 0
        gameValues.x += 1
    }
}

function reset () {
    if (gameValues.r <= 0) {
        gameValues.r = gameValues.base_r
        $('#random_title')[0].innerText = randomString()
    }
}

function upgradeRTP () {
    if (gameValues.r >= gameValues.upgrade_rtp_cost) {
        gameValues.r -= gameValues.upgrade_rtp_cost
        gameValues.rtp += gameValues.upgrade_rtp_boost
        gameValues.upgrade_rtp_cost *= gameValues.upgrade_rtp_costmul
        gameValues.prob = gameValues.rtp / (100 * gameValues.mul)
    }
}

function upgradeMul () {
    if (gameValues.r >= gameValues.upgrade_mul_cost) {
        gameValues.r -= gameValues.upgrade_mul_cost
        gameValues.mul += gameValues.upgrade_mul_boost
        gameValues.upgrade_mul_cost *= gameValues.upgrade_mul_costmul
        gameValues.prob = gameValues.rtp / (100 * gameValues.mul)
    }
}

function update () {
    $('#value_r')[0].innerText = format(gameValues.r)
    $('#value_x')[0].innerText = format(gameValues.x)
    $('#value_rtp')[0].innerText = format(gameValues.rtp) + '%'
    $('#value_mul')[0].innerText = 'x' + format(gameValues.mul)
    $('#value_prob')[0].innerText = format(gameValues.prob * 100) + '%'
    $('#value_base_r')[0].innerText = format(gameValues.base_r)
    $('#upgrade_rtp_boost')[0].innerText = '+' + format(gameValues.upgrade_rtp_boost) + '%'
    $('#upgrade_rtp_cost')[0].innerText = format(gameValues.upgrade_rtp_cost) + ' R'
    $('#upgrade_mul_boost')[0].innerText = '+' + format(gameValues.upgrade_mul_boost)
    $('#upgrade_mul_cost')[0].innerText = format(gameValues.upgrade_mul_cost) + ' R'

    if (gameValues.r > 0) {
        $('#actions_action').addClass('action-available')
        $('#actions_reset').removeClass('action-available')
    }
    else {
        $('#actions_action').removeClass('action-available')
        $('#actions_reset').addClass('action-available')
    }
    if (gameValues.r > gameValues.upgrade_rtp_cost) $('#rtp_upgrade').addClass('action-available')
    else $('#rtp_upgrade').removeClass('action-available')
    if (gameValues.r > gameValues.upgrade_mul_cost) $('#mul_upgrade').addClass('action-available')
    else $('#mul_upgrade').removeClass('action-available')
}
