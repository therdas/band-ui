import "./style.sass"
import 'hammerjs'

//Do these things first
initTimer(1);
const dummy  = document.createElement('div');
const inner  = document.querySelector('#inner') as HTMLElement
const container = document.querySelector('#container') as HTMLElement
const Swiper = new Hammer.Manager(inner == null ? dummy : inner)
let currentTop = 0;
Swiper.add(new Hammer.Pan({threshold: 0, pointers: 0}));

//Event Handler for vertical swipe
Swiper.on('pan', (e) => {
    console.log(e.deltaY);
    if(e.direction == Hammer.DIRECTION_UP || e.direction == Hammer.DIRECTION_DOWN){ 
        container!.style.transform = 'translateY(' + (currentTop + e.deltaY) + 'px)';
    }
    if(e.isFinal)
        currentTop += e.deltaY;
})

function initTimer(interval: number) {
    setInterval(() => {
        const d: Date = new Date();
        let h: number = d.getHours();
        let m: number = d.getMinutes();
        h = h > 12 ? h - 12 : h;
        const hr : string = h.toString().length == 1 ? "0" + h : h.toString();
        const min : string = m < 10 ? "0" + m : m.toString();
        document.querySelector('#bandDisplay > .hour')!.textContent = hr;
        document.querySelector('#bandDisplay > .minute')!.textContent = min;
    }, interval * 1000);
}