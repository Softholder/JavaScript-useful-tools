// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
// 每次触发事件时都取消之前的延时调用方法
function debounce(fn){
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function (){
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            // sayHi函数定义在全局中，调用时this指向window， 需要加上 apply，绑定this值(input对象)到 sayHi函数中
            fn.apply(this, arguments);
        }, 500);
    };
}

function sayHi (){
    console.log('successfully debounced!');
}

const ip = document.querySelector("ip");
ip.addEventListener('input', debounce(sayHi)); // 防抖，传入防抖函数的是函数名