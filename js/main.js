$(document).ready(() => {
    window.gameValues = {
        r: 1.0,
        x: 0.0,
        rtp: 90.0,
        mul: 2.0,
        prob: 0.45,
    }

    $('#actions_action').click(action)

    setInterval(update, 25)
})
