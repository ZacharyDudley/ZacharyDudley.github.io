class Website {
    constructor() {
        this.activePage = 'home';
        this.pages = {
            home: {
                id: 'home',
                element: document.getElementById('page-home'),
                button: document.getElementById('button-home'),
            },
            work: {
                id: 'work',
                element: document.getElementById('page-work'),
                button: document.getElementById('button-work'),
            },
            resume: {
                id: 'resume',
                element: document.getElementById('page-resume'),
                button: document.getElementById('button-resume'),
            },
            contact: {
                id: 'contact',
                element: document.getElementById('page-contact'),
                button: document.getElementById('button-contact'),
            },
        };
        this.names = [
            'DESIGNER',
            'DEVELOPER',
            'PROGRAMMER',
            'CODER',
            'PHILOSOPHER',
            'ALUMNUS',
            'MILLENIAL',
            'ARIES',
            'BACHELOR',
            'HUMAN',
            'OHIOAN',
            'AMERICAN',
            'CAT FANCIER',
            'CITIZEN',
            'BIBLIOPHILE',
            'POET',
            'FOOL',
            'SOLIPSIST',
            'MINIMALIST',
            'MATERIALIST',
            'IDEALIST',
            'POSTMODERNIST',
            'EVERYMAN',
            'MENSCH',
            'TEAMMATE',
            'ARTIST',
            'CONSUMER',
            'COMEDIAN',
            'GUITARIST',
            'READER',
            'DREAMER',
            'FRIEND',
            'OMNIVORE',
            'CREATOR',
            'IDEATOR',
            'MIDFIELDER',
            'SECOND BASEMAN'
        ];
        this.nameOne = {
            title: 'DEVELOPER',
            time: 4000,
            element: document.getElementById('title-name-one'),
            interval: null,
        };
        this.nameTwo = {
            title: 'DESIGNER',
            time: 5000,
            element: document.getElementById('title-name-two'),
            interval: null,
        };
        this.nameThree = {
            title: 'PHILOSOPHER',
            time: 2000,
            element: document.getElementById('title-name-three'),
            interval: null,
        };

        this.init();
    }

    init() {
        Object.keys(this.pages).forEach((id) => {
            this.pages[id].button.addEventListener('click', () => this.setActivePage(id));
        });

        this.startNameChange();
        this.attachWorkCollapseHandlers();
        this.attachResumeScrollHandlers();
    }

    setActivePage(id) {
        const pageOld = this.pages[this.activePage];
        const pageNew = this.pages[id];

        pageOld.element.classList.remove('zdf-page--active');
        pageOld.button.classList.remove('zdf-link--active');

        pageNew.element.classList.add('zdf-page--active');
        pageNew.button.classList.add('zdf-link--active');

        this.activePage = id;
    }

    setName(whichName) {
        let hasNewName = false;

        while (!hasNewName) {
            let randomName = Math.floor(Math.random() * this.names.length);
            let name = this.names[randomName];

            if (name !== this.nameOne.title && name !== this.nameTwo.title && name !== this.nameThree.title) {
                let time = this.setTime();
                if (whichName === 'one') {
                    this.nameOne.title = name;
                    this.nameOne.element.innerText = name;
                    this.nameOne.time = time;
                } else if (whichName === 'two') {
                    this.nameTwo.title = name;
                    this.nameTwo.element.innerText = name;
                    this.nameTwo.time = time;
                } else if (whichName === 'three') {
                    this.nameThree.title = name;
                    this.nameThree.element.innerText = name;
                    this.nameThree.time = time;
                }
                hasNewName = true;
            }
        }
    }

    setTime() {
        let randomTime = Math.floor(Math.random() * 4) + 1;
        return randomTime * 1000;
    }

    startNameChange() {
        this.nameOne.interval = setInterval(
            () => this.setName('one'), this.nameOne.time);

        this.nameTwo.interval = setInterval(
            () => this.setName('two'), this.nameTwo.time);

        this.nameThree.interval = setInterval(
            () => this.setName('three'), this.nameThree.time);
    }

    attachWorkCollapseHandlers() {
        const details = [...document.querySelectorAll('#page-work details')];
        details.forEach((section) => {
            section.addEventListener('toggle', () => {
                if (section.open) {
                    details.forEach((detail) => {
                        if (!section.isSameNode(detail) && detail.open) detail.open = false;
                    });
                }
            });
        });
    }

    attachResumeScrollHandlers() {
        [...document.querySelectorAll('[data-section="scroll"]')].forEach((section) => {
            const container = section.querySelector('[data-scroll="container"]');
            const buttonLeft = section.querySelector('[data-scroll="button-left"]');
            const buttonRight = section.querySelector('[data-scroll="button-right"]');

            const toggleArrows = () => {
                const scrollPos = container.scrollLeft;
                const scrollLeftMax = container.scrollWidth - container.offsetWidth;

                if (scrollPos === 0) {
                    if (buttonLeft.style.display !== 'none') buttonLeft.style.display = 'none';
                    if (buttonRight.style.display === 'none') buttonRight.style.display = '';
                } else if (scrollPos === scrollLeftMax) {
                    if (buttonLeft.style.display === 'none') buttonLeft.style.display = '';
                    if (buttonRight.style.display !== 'none') buttonRight.style.display = 'none';
                } else {
                    if (buttonLeft.style.display === 'none') buttonLeft.style.display = '';
                    if (buttonRight.style.display === 'none') buttonRight.style.display = '';
                }
            };

            buttonLeft.addEventListener('click', () => {
                container.scrollBy({
                    left: (container.offsetWidth * -1),
                    behavior: 'smooth',
                });
            });

            buttonRight.addEventListener('click', () => {
                container.scrollBy({
                    left: container.offsetWidth,
                    behavior: 'smooth',
                });
            });

            let isScrolling = false;
            let scrollTimeout;
            container.addEventListener('scroll', () => {
                if (!isScrolling) {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        isScrolling = false;
                        toggleArrows();
                    }, 100);
                }
            });

            toggleArrows();
        });
    }
}

new Website();



// const showInput = () => {
//     const modal = document.getElementById('zdf-modal');

//     if (modal !== null) {
//         if (!modal.classList.contains('show')) {
//             modal.classList.add('show');
//         } else {
//             modal.classList.remove('show');
//         }
//     }
// };

// const toggleMode = (mode) => {
//     let body = document.body;
//     let hasMode1 = body.classList.contains('theme-one');
//     let hasMode2 = body.classList.contains('theme-two');
// };
