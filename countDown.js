class CountDown{
    constructor(){
        this.countDownNumber = 10
    }

    countdown(interval) {
        // 第一次调用时interval为undefined
        // console.log('interval: ', interval)
        // 每递归一次清空一次interval，保证重新开始计时
        clearInterval(interval)
        this.countDownNumber--
        console.log(this.countDownNumber)
        if (this.countDownNumber == 0) {
            this.countDownNumber = 10
            return
        }
        interval = setInterval(() => {
            this.countdown(interval)
        }, 1000)
    }
}

let countDown = new CountDown()
countDown.countdown()