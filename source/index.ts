import "./style.sass"
initTimer(1);


function initTimer(interval: number) {
    setInterval(() => {
        const d: Date = new Date();
        let h: number = d.getHours();
        h = h > 12 ? h - 12 : h;
        const hr : string = h.toString().length == 1 ? "0" + h : h.toString()
        document.querySelector('#bandDisplay > .hour')!.textContent = hr;
        document.querySelector('#bandDisplay > .minute')!.textContent = d.getMinutes().toString();
    }, interval * 1000);
}