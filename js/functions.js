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

function update () {
    let time = Date.now()

    if (gameValues.auto_reset_time > 0) {
        if ((time - gameValues.lastAutoReset) / 1000 >= gameValues.auto_reset_time) {
            reset()
            gameValues.lastAutoReset = time
        }
    }
    if (gameValues.auto_action_time > 0) {
        if ((time - gameValues.lastAutoAction) / 1000 >= gameValues.auto_action_time) {
            action()
            gameValues.lastAutoAction = time
        }
    }

    $('.value_r').html(format(gameValues.r))
    $('.value_x').html(format(gameValues.x))
    $('.value_rtp').html(format(gameValues.rtp) + '%')
    $('.value_mul').html('x' + format(gameValues.mul))
    $('.value_prob').html(format(gameValues.prob * 100) + '%')
    $('.value_base_r').html(format(gameValues.base_r))
    $('.value_x_gain').html('[' + format(gameValues.x_gain_min) + '; ' + format(gameValues.x_gain_max) + ')')
    $('.value_auto_reset_time').html(format(gameValues.auto_reset_time) + 's')
    $('.value_auto_action_time').html(format(gameValues.auto_action_time) + 's')
    $('.upgrade_rtp_boost').html('+' + format(upgradeRTP.boost) + '%')
    $('.upgrade_rtp_cost').html(format(upgradeRTP.cost) + ' R')
    $('.upgrade_mul_boost').html('+' + format(upgradeMul.boost))
    $('.upgrade_mul_cost').html(format(upgradeMul.cost) + ' R')
    $('.upgrade_base_r_boost').html('x' + format(upgradeBaseR.boost))
    $('.upgrade_base_r_cost').html(format(upgradeBaseR.cost) + ' X')
    $('.upgrade_x_gain_min_boost').html('Min +' + format(upgradeXGainMin.boost))
    $('.upgrade_x_gain_min_cost').html(format(upgradeXGainMin.cost) + ' R')
    $('.upgrade_x_gain_max_boost').html('Max +' + format(upgradeXGainMax.boost))
    $('.upgrade_x_gain_max_cost').html(format(upgradeXGainMax.cost) + ' R')
    $('.upgrade_auto_reset_base_time').html(format(gameValues.auto_reset_base_time) + 's')
    $('.upgrade_auto_reset_cost').html(format(upgradeAutoReset.cost) + ' X')
    $('.upgrade_auto_reset_boost').html(format(upgradeAutoReset.boost) + 's')
    $('.upgrade_auto_action_base_time').html(format(gameValues.auto_action_base_time) + 's')
    $('.upgrade_auto_action_cost').html(format(upgradeAutoAction.cost) + ' X')
    $('.upgrade_auto_action_boost').html(format(upgradeAutoAction.boost) + 's')

    if (gameValues.r > 0) {
        $('.actions_action').addClass('action-available')
        $('.actions_reset').removeClass('action-available')
    }
    else {
        $('.actions_action').removeClass('action-available')
        $('.actions_reset').addClass('action-available')
    }

    if (upgradeRTP.available) $('.rtp_upgrade').addClass('action-available')
    else $('.rtp_upgrade').removeClass('action-available')
    if (upgradeMul.available) $('.mul_upgrade').addClass('action-available')
    else $('.mul_upgrade').removeClass('action-available')
    if (upgradeBaseR.available) $('.base_r_upgrade').addClass('action-available')
    else $('.base_r_upgrade').removeClass('action-available')
    if (upgradeXGainMin.available) $('.x_gain_min_upgrade').addClass('action-available')
    else $('.x_gain_min_upgrade').removeClass('action-available')
    if (upgradeXGainMax.available) $('.x_gain_max_upgrade').addClass('action-available')
    else $('.x_gain_max_upgrade').removeClass('action-available')
    if (upgradeAutoReset.available) {
        $('.auto_reset_unlock').addClass('action-available')
        $('.auto_reset_upgrade').addClass('action-available')
    }
    else {
        $('.auto_reset_unlock').removeClass('action-available')
        $('.auto_reset_upgrade').removeClass('action-available')
    }
    if (upgradeAutoAction.available) {
        $('.auto_action_unlock').addClass('action-available')
        $('.auto_action_upgrade').addClass('action-available')
    }
    else {
        $('.auto_action_unlock').removeClass('action-available')
        $('.auto_action_upgrade').removeClass('action-available')
    }
}
