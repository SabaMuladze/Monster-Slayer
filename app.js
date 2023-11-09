function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        }
    },
    computed: {
        monsterBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }
            else {
                return { width: this.monsterHealth + '%' };
            }
        },
        playerBar() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            else {
                return { width: this.playerHealth + '%' };
            }
        },
        disabledBtn() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            }
            else if (value <= 0) {
                this.winner = 'monster'

            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            }
            else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        startAgain() {
            this.playerHealth = 100,
                this.monsterHealth = 100,
                this.currentRound = 0,
                this.winner = null
            this.logMessages = []
        },
        attackMonster() {
            this.currentRound++
            let attackVal = randomVal(5, 12)
            this.monsterHealth -= attackVal;
            this.addLogMessage('player', 'attack', attackVal)
            this.attackPlayer();
        },
        attackPlayer() {
            let attackVal = randomVal(8, 15)
            this.playerHealth -= attackVal
            this.addLogMessage('Monster', 'attack', attackVal);
        },
        specialAttack() {
            this.currentRound++
            let attackVal = randomVal(10, 25)
            this.monsterHealth -= attackVal
            this.addLogMessage('player', 'special attack', attackVal);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++
            const healVal = randomVal(8, 20)
            if (this.playerHealth + healVal > 100) {
                this.playerHealth = 100

            } else {
                this.playerHealth += healVal
            }
            this.addLogMessage('player', 'heal', healVal);

            this.attackPlayer()
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }

    },
}).mount('body')