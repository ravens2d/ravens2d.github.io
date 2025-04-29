const MAX_LIST_ITEMS = 20;

const QUERIES = [
    "how do computers work?",
    "why is nearly nothing actually real?",
    "how did those guys get so good at polyrhythms?",
    "is it possible to build memetic immunity?",
    "what do you care about making better?",
    "is this a useful frame?",
    "chesterton's fence? is that what that thing was?",
    "how much of your identity is chosen vs given?",
    "what % of humanity's knowledge is literally just vibes?",
    "does computing environment affect your thinking?",
    "chat, are we cooked?",
    "is there a shortcut to better numeracy?",
    "how does one avoid the slopocalypse?",
];

const FACTS = [
    "ravens got lost in the rainforest as a child. this was a repressed memory until recently",
    "ravens plays guitar, bass, piano, and can make horrible noises with a synthesizer",
    "ravens knows what an operational amplifier is",
    "ravens does not know their times tables",
    "ravens favorite hobby is cooking, but they cannot bake for shit",
    "ravens is of indeterminate gender",
    "ravens loves jazz music",
    "ravens has fostered 14 dogs to date",
    "ravens is learning about reinforcement learning, which sounds kind of meta",
    "ravens grew up in the bay area",
    "ravens like to hang out in vrchat - say hi sometime!",
    "ravens is spiritually a 2000s emo kid",
    "ravens does not know what they are... yet!",
    "ravens is a forever DM for TTRPGs",
    "one day ravens would like to retire on a farm to solo gamedev",
    "ravens likes to homebrew fruit wine and mead",
    "ravens really loves their friends",
    "ravens takes extreme pleasure in trying new foods",
    "ravens uses lightmode at work and darkmode at home",
    "ravens has visited bhutan and met a few lamas",
    "ravens was once in a beach rock band, they played lead guitar and sang backup",
    "ravens once evacuated from a tsunami and slept in a church parking lot",
    "ravens keeps accidently growing potatoes",
    "ravens used to have lavender colored hair",
    "ravens has participated in the ludum dare game jam",
    "ravens once wrote a binary code signing linux kernel module",
    "ravens once wrote an aspect oriented transpiler for VHDL (yes it was cursed)",
    "ravens once wrote a multiplayer browser based roguelike",
    "when ravens was 15, they wrote an entire \"m\"mo in lua/love2d, complete with the worst netcode ever seen",
    "ravens has previously been known by over 15 pseudonyms",
    "ravens strives to be cute",
    "ravens is above average height, for some definition of average",
    "ravens took an ancient buddhist art history class in college",
    "ravens knows how to clicker train"
];

const EPIGRAMS = [
    "the only way out is through",
    "do it now, do it faster",
    "50% extra execution speed is basically free",
    "be intentional",
    "do not shy away from intellectual adversity",
    "a complex system that works is invariably found to have evolved from a simple system that works",
    "trust that problem solving will be compounding",
    "80% known 20% difficult is a sweet spot for learning ",
    "do not give in to distraction, it is an easy out for adversity",
    "there is return for grit",
    "solve the right problems",
    "cherish your bugs, study them!",
    "in order to remain unchanged, a system must change",
];

const truncateLists = () => {
    const lists = document.querySelectorAll('ul.truncated');

    lists.forEach(list => {
        const items = Array.from(list.children);
        if (items.length <= MAX_LIST_ITEMS) return;

        items.slice(MAX_LIST_ITEMS).forEach(item => {
            item.style.display = 'none';
        });

        const showMoreLink = document.createElement('a');
        showMoreLink.textContent = '[show more]';
        showMoreLink.href = '#';
        showMoreLink.classList.add('show-more');
        list.appendChild(showMoreLink);

        showMoreLink.addEventListener('click', (e) => {
            e.preventDefault();
            items.forEach(item => item.style.display = '');
            showMoreLink.remove();
        });
    });
};

const updateRandomText = (elementId, textArray) => {
    const element = document.querySelector(`#${elementId} .note`);
    if (!element) return;
    
    const randomIndex = Math.floor(Math.random() * textArray.length);
    element.textContent = textArray[randomIndex];
};

const cycleThroughText = (elementId, textArray) => {
    const element = document.querySelector(`#${elementId} .note`);
    if (!element) return;

    const timerSpan = document.createElement('span');
    timerSpan.style.color = '#9f9f9f';
    element.parentNode.appendChild(timerSpan);

    const shuffledArray = [...textArray];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    let currentIndex = 0;

    const updateText = () => {
        const nextInterval = Math.floor(Math.random() * 10000) + 10000;
        const startTime = Date.now();
        
        element.textContent = shuffledArray[currentIndex];
        currentIndex = (currentIndex + 1) % shuffledArray.length;

        const updateTimer = () => {
            const remaining = Math.ceil((startTime + nextInterval - Date.now()) / 1000);
            if (remaining > 0) {
                timerSpan.textContent = `(${remaining}s)`;
                requestAnimationFrame(updateTimer);
            }
        };
        updateTimer();
        setTimeout(updateText, nextInterval);
    };

    updateText();
};

document.addEventListener('DOMContentLoaded', () => {
    truncateLists();
    cycleThroughText('queries', QUERIES);
    cycleThroughText('epigrams', EPIGRAMS);
    cycleThroughText('facts', FACTS);
});

