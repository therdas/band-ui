import "./style.sass"
import 'hammerjs'

//Do these things first
initTimer(1);
const dummy  = document.createElement('div');
const inner  = document.querySelector('#inner') as HTMLElement
const container = document.querySelector('#container') as HTMLElement
const Swiper = new Hammer.Manager(inner == null ? dummy : inner)
let currentTop = 0;
let currentScreen = "home" //replace with ENUM
Swiper.add(new Hammer.Pan({threshold: 0, pointers: 0}));

//Event Handler for vertical swipe
Swiper.on('pan', (e) => {
    if(e.direction == Hammer.DIRECTION_UP || e.direction == Hammer.DIRECTION_DOWN){ 
        container!.style.transform = 'translateY(' + (currentTop + e.deltaY) + 'px)';
    }
    if(e.isFinal)
        currentTop += e.deltaY;
    if(currentScreen == "home")
        scaleIcons(currentTop + e.deltaY);
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

function scaleIcons(currentTop: number) {
    let elem = document.querySelectorAll('.icon'); 
    for(let i = 0; i < elem.length; ++i) {
        let el = elem[i] as HTMLElement;
        let e = elem[i].getBoundingClientRect();
        let p = document.querySelector('#inner')?.getBoundingClientRect();
        let cE = e.top + (e.bottom - e.top) / 2;
        let cP = (p!.bottom + p!.top) / 2

        let calcW = 15/Math.abs(cP - cE)
        
        if(calcW > 1)
            calcW = 1;
        
        let calcP = 5 - (calcW + 3);
        calcP /= 2;

        el.style.width = calcW + 3 + "em";
        el.style.height = calcW + 3 + "em";
        el.style.margin = (5 - (calcW + 3))/2 + "em";
    }
}