class Upgrade {
    constructor (cost, costCur, costMul, boost, func, selector) {
        this.cost = cost
        this.costCur = costCur
        this.costMul = costMul
        this.boost = boost
        this.func = func
        this.selector = selector
    }

    get available () {
        return gameValues[this.costCur] >= this.cost
    }

    update () {
        let available = this.available
        if (available) $(this.selector).addClass('action-available')
        else $(this.selector).removeClass('action-available')
        return available
    }

    upgrade () {
        if (this.available) {
            gameValues[this.costCur] -= this.cost
            this.cost *= this.costMul
            this.func(this)
        }
    }
}


const upgradeRTP = new Upgrade(5.0, 'r', 1.5, 1.0, (upgrade) => {
    gameValues.rtp += upgrade.boost
    gameValues.prob = gameValues.rtp / (100 * gameValues.mul)
}, '.rtp_upgrade')

const upgradeMul = new Upgrade(10.0, 'r', 1.5, 0.1, (upgrade) => {
    gameValues.mul += upgrade.boost
    gameValues.prob = gameValues.rtp / (100 * gameValues.mul)
}, '.mul_upgrade')

const upgradeBaseR = new Upgrade(20.0, 'x', 2.0, 2.0, (upgrade) => {
    gameValues.base_r *= upgrade.boost
}, '.base_r_upgrade')

const upgradeXGainMin = new Upgrade(10.0, 'r', 1.4, 0.1, (upgrade) => {
    gameValues.x_gain_min += upgrade.boost
}, '.x_gain_min_upgrade')

const upgradeXGainMax = new Upgrade(10.0, 'r', 1.4, 0.1, (upgrade) => {
    gameValues.x_gain_max += upgrade.boost
}, '.x_gain_max_upgrade')

const upgradeAutoReset = new Upgrade(0.003, 'x', 1.3, -0.1, (upgrade) => {
    gameValues.auto_reset_time = gameValues.auto_reset_base_time
    $('.auto_reset_upgrade').removeClass('hide')
    $('.auto_reset_unlock').addClass('hide')
    upgrade.func = () => {
        gameValues.auto_reset_time += upgrade.boost
    }
}, '.auto_reset_upgrade')

const upgradeAutoAction = new Upgrade(0.005, 'x', 1.3, -0.05, (upgrade) => {
    gameValues.auto_action_time = gameValues.auto_action_base_time
    $('.auto_action_upgrade').removeClass('hide')
    $('.auto_action_unlock').addClass('hide')
    upgrade.func = () => {
        gameValues.auto_action_time += upgrade.boost
    }
}, '.auto_action_upgrade')


const upgrades = [
    upgradeRTP,
    upgradeMul,
    upgradeBaseR,
    upgradeXGainMin,
    upgradeXGainMax,
    upgradeAutoReset,
    upgradeAutoAction,
]
