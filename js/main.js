$(document).ready(() => {
    window.gameValues = {
        r: 1.0,
        x: 0.0,
        rtp: 85.0,
        mul: 2.0,
        prob: 0.0,
        base_r: 1.0,
        x_gain_min: 0.0,
        x_gain_max: 1.0,

        auto_reset_time: 0.0,
        auto_reset_base_time: 2.0,
        auto_action_time: 0.0,
        auto_action_base_time: 1.0,

        lastAutoReset: Date.now(),
        lastAutoAction: Date.now(),
    }

    gameValues.prob = gameValues.rtp / (100 * gameValues.mul)

    $('.actions_action').click(action)
    $('.actions_reset').click(reset)
    $('.rtp_upgrade').click(upgradeRTP.upgrade.bind(upgradeRTP))
    $('.mul_upgrade').click(upgradeMul.upgrade.bind(upgradeMul))
    $('.base_r_upgrade').click(upgradeBaseR.upgrade.bind(upgradeBaseR))
    $('.x_gain_min_upgrade').click(upgradeXGainMin.upgrade.bind(upgradeXGainMin))
    $('.x_gain_max_upgrade').click(upgradeXGainMax.upgrade.bind(upgradeXGainMax))
    $('.auto_reset_unlock').click(upgradeAutoReset.upgrade.bind(upgradeAutoReset))
    $('.auto_reset_upgrade').click(upgradeAutoReset.upgrade.bind(upgradeAutoReset))
    $('.auto_action_unlock').click(upgradeAutoAction.upgrade.bind(upgradeAutoAction))
    $('.auto_action_upgrade').click(upgradeAutoAction.upgrade.bind(upgradeAutoAction))

    setInterval(update, 25)
})
