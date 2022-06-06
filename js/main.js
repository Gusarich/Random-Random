$(document).ready(() => {
    window.gameValues = {
        r: 1.0,
        x: 0.0,
        rtp: 80.0,
        mul: 2.0,
        prob: 0.4,
        base_r: 1.0,
    }

    $('#actions_action').click(action)
    $('#actions_reset').click(reset)

    setInterval(update, 25)
})
