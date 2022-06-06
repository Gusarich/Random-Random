$(document).ready(() => {
    window.balances = {
        r: 1.0,
        x: 0.0
    }

    $('#actions_action').click(action)

    setInterval(update, 25)
})
