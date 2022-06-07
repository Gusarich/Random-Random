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
        gameValues.x += rng.random() * (gameValues.x_gain_max - gameValues.x_gain_min) + gameValues.x_gain_min
    }
}

function reset () {
    if (gameValues.r <= 0) {
        gameValues.r = gameValues.base_r
        $('.random_title').html(randomString())
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

function upgradeBaseR () {
    if (gameValues.x >= gameValues.upgrade_base_r_cost) {
        gameValues.x -= gameValues.upgrade_base_r_cost
        gameValues.base_r *= gameValues.upgrade_base_r_boost
        gameValues.upgrade_base_r_cost *= gameValues.upgrade_base_r_costmul
    }
}

function upgradeXGainMin () {
    if (gameValues.r >= gameValues.upgrade_x_gain_min_cost) {
        gameValues.r -= gameValues.upgrade_x_gain_min_cost
        gameValues.x_gain_min += gameValues.upgrade_x_gain_min_boost
        gameValues.upgrade_x_gain_min_cost *= gameValues.upgrade_x_gain_min_costmul
    }
}

function upgradeXGainMax () {
    if (gameValues.r >= gameValues.upgrade_x_gain_max_cost) {
        gameValues.r -= gameValues.upgrade_x_gain_max_cost
        gameValues.x_gain_max += gameValues.upgrade_x_gain_max_boost
        gameValues.upgrade_x_gain_max_cost *= gameValues.upgrade_x_gain_max_costmul
    }
}

function unlockAutoReset () {
    if (gameValues.x >= gameValues.upgrade_auto_reset_cost) {
        gameValues.x -= gameValues.upgrade_auto_reset_cost
        gameValues.auto_reset_time = gameValues.upgrade_auto_reset_base_time
        gameValues.upgrade_auto_reset_cost *= gameValues.upgrade_auto_reset_costmul
        $('.auto_reset_unlock').addClass('hide')
        $('.auto_reset_upgrade').removeClass('hide')
    }
}

function upgradeAutoReset () {
    if (gameValues.x >= gameValues.upgrade_auto_reset_cost) {
        gameValues.x -= gameValues.upgrade_auto_reset_cost
        gameValues.auto_reset_time += gameValues.upgrade_auto_reset_boost
        gameValues.upgrade_auto_reset_cost *= gameValues.upgrade_auto_reset_costmul
    }
}

function unlockAutoAction () {
    if (gameValues.x >= gameValues.upgrade_auto_action_cost) {
        gameValues.x -= gameValues.upgrade_auto_action_cost
        gameValues.auto_action_time = gameValues.upgrade_auto_action_base_time
        gameValues.upgrade_auto_action_cost *= gameValues.upgrade_auto_action_costmul
        $('.auto_action_unlock').addClass('hide')
        $('.auto_action_upgrade').removeClass('hide')
    }
}

function upgradeAutoAction () {
    if (gameValues.x >= gameValues.upgrade_auto_action_cost) {
        gameValues.x -= gameValues.upgrade_auto_action_cost
        gameValues.auto_action_time += gameValues.upgrade_auto_action_boost
        gameValues.upgrade_auto_action_cost *= gameValues.upgrade_auto_action_costmul
    }
}

function update () {
    $('.value_r').html(format(gameValues.r))
    $('.value_x').html(format(gameValues.x))
    $('.value_rtp').html(format(gameValues.rtp) + '%')
    $('.value_mul').html('x' + format(gameValues.mul))
    $('.value_prob').html(format(gameValues.prob * 100) + '%')
    $('.value_base_r').html(format(gameValues.base_r))
    $('.value_x_gain').html('[' + format(gameValues.x_gain_min) + '; ' + format(gameValues.x_gain_max) + ')')
    $('.value_auto_reset_time').html(format(gameValues.auto_reset_time) + 's')
    $('.value_auto_action_time').html(format(gameValues.auto_action_time) + 's')
    $('.upgrade_rtp_boost').html('+' + format(gameValues.upgrade_rtp_boost) + '%')
    $('.upgrade_rtp_cost').html(format(gameValues.upgrade_rtp_cost) + ' R')
    $('.upgrade_mul_boost').html('+' + format(gameValues.upgrade_mul_boost))
    $('.upgrade_mul_cost').html(format(gameValues.upgrade_mul_cost) + ' R')
    $('.upgrade_base_r_boost').html('x' + format(gameValues.upgrade_base_r_boost))
    $('.upgrade_base_r_cost').html(format(gameValues.upgrade_base_r_cost) + ' X')
    $('.upgrade_x_gain_min_boost').html('Min +' + format(gameValues.upgrade_x_gain_min_boost))
    $('.upgrade_x_gain_min_cost').html(format(gameValues.upgrade_x_gain_min_cost) + ' R')
    $('.upgrade_x_gain_max_boost').html('Max +' + format(gameValues.upgrade_x_gain_max_boost))
    $('.upgrade_x_gain_max_cost').html(format(gameValues.upgrade_x_gain_max_cost) + ' R')
    $('.upgrade_auto_reset_base_time').html(format(gameValues.upgrade_auto_reset_base_time) + 's')
    $('.upgrade_auto_reset_cost').html(format(gameValues.upgrade_auto_reset_cost) + ' X')
    $('.upgrade_auto_reset_boost').html(format(gameValues.upgrade_auto_reset_boost) + 's')
    $('.upgrade_auto_action_base_time').html(format(gameValues.upgrade_auto_action_base_time) + 's')
    $('.upgrade_auto_action_cost').html(format(gameValues.upgrade_auto_action_cost) + ' X')
    $('.upgrade_auto_action_boost').html(format(gameValues.upgrade_auto_action_boost) + 's')

    if (gameValues.r > 0) {
        $('.actions_action').addClass('action-available')
        $('.actions_reset').removeClass('action-available')
    }
    else {
        $('.actions_action').removeClass('action-available')
        $('.actions_reset').addClass('action-available')
    }
    if (gameValues.r >= gameValues.upgrade_rtp_cost) $('.rtp_upgrade').addClass('action-available')
    else $('.rtp_upgrade').removeClass('action-available')
    if (gameValues.r >= gameValues.upgrade_mul_cost) $('.mul_upgrade').addClass('action-available')
    else $('.mul_upgrade').removeClass('action-available')
    if (gameValues.x >= gameValues.upgrade_base_r_cost) $('.base_r_upgrade').addClass('action-available')
    else $('.base_r_upgrade').removeClass('action-available')
    if (gameValues.r >= gameValues.upgrade_x_gain_min_cost) $('.x_gain_min_upgrade').addClass('action-available')
    else $('.x_gain_min_upgrade').removeClass('action-available')
    if (gameValues.r >= gameValues.upgrade_x_gain_max_cost) $('.x_gain_max_upgrade').addClass('action-available')
    else $('.x_gain_max_upgrade').removeClass('action-available')
    if (gameValues.x >= gameValues.upgrade_auto_reset_cost) {
        $('.auto_reset_unlock').addClass('action-available')
        $('.auto_reset_upgrade').addClass('action-available')
    }
    else {
        $('.auto_reset_unlock').removeClass('action-available')
        $('.auto_reset_upgrade').removeClass('action-available')
    }
    if (gameValues.x >= gameValues.upgrade_auto_action_cost) {
        $('.auto_action_unlock').addClass('action-available')
        $('.auto_action_upgrade').addClass('action-available')
    }
    else {
        $('.auto_action_unlock').removeClass('action-available')
        $('.auto_action_upgrade').removeClass('action-available')
    }
}
