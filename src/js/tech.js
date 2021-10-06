import { getRandomColor } from "./color";

const tech = () => {
    const h1 = document.querySelector('h1')
    console.log(h1);

    const color = getRandomColor();

    h1.style.textShadow = `0px 0px 30px ${color}`;
    console.log(h1.style);
}

export { tech };