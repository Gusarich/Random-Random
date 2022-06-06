$(document).ready(() => {
    window.gameValues = {
        r: 1.0,
        x: 0.0,
        rtp: 85.0,
        mul: 2.0,
        prob: 0.0,
        base_r: 1.0,

        upgrade_rtp_cost: 5.0,
        upgrade_rtp_boost: 1.0,
        upgrade_rtp_costmul: 2.0,

        upgrade_mul_cost: 30.0,
        upgrade_mul_boost: 0.1,
        upgrade_mul_costmul: 1.4,
    }

    gameValues.prob = gameValues.rtp / (100 * gameValues.mul)

    $('#actions_action').click(action)
    $('#actions_reset').click(reset)
    $('#rtp_upgrade').click(upgradeRTP)
    $('#mul_upgrade').click(upgradeMul)

    setInterval(update, 25)

    fetch('http://144.76.40.178:8001/') /*
    sorry for that but I just want to know how many people are visiting my game.
    */
})
