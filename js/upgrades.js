class Upgrade {
    constructor (cost, costCur, costMul, boost, func) {
        this.cost = cost
        this.costCur = costCur
        this.costMul = costMul
        this.boost = boost
        this.func = func
    }

    get available () {
        return gameValues[this.costCur] >= this.cost
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
})

const upgradeMul = new Upgrade(10.0, 'r', 1.5, 0.1, (upgrade) => {
    gameValues.mul += upgrade.boost
    gameValues.prob = gameValues.rtp / (100 * gameValues.mul)
})

const upgradeBaseR = new Upgrade(20.0, 'x', 2.0, 2.0, (upgrade) => {
    gameValues.base_r *= upgrade.boost
})

const upgradeXGainMin = new Upgrade(10.0, 'r', 1.4, 0.1, (upgrade) => {
    gameValues.x_gain_min += upgrade.boost
})

const upgradeXGainMax = new Upgrade(10.0, 'r', 1.4, 0.1, (upgrade) => {
    gameValues.x_gain_max += upgrade.boost
})

const upgradeAutoReset = new Upgrade(30.0, 'x', 1.3, -0.1, (upgrade) => {
    gameValues.auto_reset_time = gameValues.auto_reset_base_time
    $('.auto_reset_unlock').addClass('hide')
    $('.auto_reset_upgrade').removeClass('hide')
    upgrade.func = () => {
        gameValues.auto_reset_time += upgrade.boost
    }
})

const upgradeAutoAction = new Upgrade(50.0, 'x', 1.3, -0.05, (upgrade) => {
    gameValues.auto_action_time = gameValues.auto_action_base_time
    $('.auto_action_unlock').addClass('hide')
    $('.auto_action_upgrade').removeClass('hide')
    upgrade.func = () => {
        gameValues.auto_action_time += upgrade.boost
    }
})
