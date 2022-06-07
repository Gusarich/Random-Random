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
        auto_action_time: 0.0,

        upgrade_rtp_cost: 5.0,
        upgrade_rtp_boost: 1.0,
        upgrade_rtp_costmul: 1.5,

        upgrade_mul_cost: 10.0,
        upgrade_mul_boost: 0.1,
        upgrade_mul_costmul: 1.5,

        upgrade_base_r_cost: 20.0,
        upgrade_base_r_boost: 2.0,
        upgrade_base_r_costmul: 2.0,

        upgrade_x_gain_min_cost: 10.0,
        upgrade_x_gain_min_boost: 0.1,
        upgrade_x_gain_min_costmul: 1.4,

        upgrade_x_gain_max_cost: 10.0,
        upgrade_x_gain_max_boost: 0.1,
        upgrade_x_gain_max_costmul: 1.4,

        upgrade_auto_reset_cost: 30.0,
        upgrade_auto_reset_boost: -0.1,
        upgrade_auto_reset_costmul: 1.3,
        upgrade_auto_reset_base_time: 2.0,

        upgrade_auto_action_cost: 50.0,
        upgrade_auto_action_boost: -0.05,
        upgrade_auto_action_costmul: 1.3,
        upgrade_auto_action_base_time: 1.0,

        lastAutoReset: Date.now(),
        lastAutoAction: Date.now(),
    }

    gameValues.prob = gameValues.rtp / (100 * gameValues.mul)

    $('.actions_action').click(action)
    $('.actions_reset').click(reset)
    $('.rtp_upgrade').click(upgradeRTP)
    $('.mul_upgrade').click(upgradeMul)
    $('.base_r_upgrade').click(upgradeBaseR)
    $('.x_gain_min_upgrade').click(upgradeXGainMin)
    $('.x_gain_max_upgrade').click(upgradeXGainMax)
    $('.auto_reset_unlock').click(unlockAutoReset)
    $('.auto_reset_upgrade').click(upgradeAutoReset)
    $('.auto_action_unlock').click(unlockAutoAction)
    $('.auto_action_upgrade').click(upgradeAutoAction)

    setInterval(update, 25)
})
