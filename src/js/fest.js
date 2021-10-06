import confetti from "canvas-confetti";

const fest = () => {
    const body = document.querySelector('body');

    body.addEventListener('click', () => {
        if (confetti) {
            confetti();
        }
    });
};

export { fest };