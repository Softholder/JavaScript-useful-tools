function throttle (){
    let tag = true; // 通过闭包保存一个标记
    return function (){
        if (!tag) return; // 在函数开头判断标记是否为true，不为true则return
        tag = false; // 立即设置为false
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
            fn.apply(this, arguments);
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
            tag = true;
        }, 500)
    }
}

function sayHi (e){
    console.log(e.innerWidth, e.innerHeight);
}

window.addEventListener('resize', throttle(sayHi)); // 节流，传入节流函数的是函数名