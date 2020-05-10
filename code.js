class Website {
    constructor() {
        this.window = window;
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
        this.commands = [
            'options',
            'white',
            'black',
            'teal',
            'orange',
            'blue',
        ];
        this.modalIsOpen = false;
        this.showingOptions = false;
        this.touchLength = 1000;
        this.touchTimer = null;

        this.init();
    }

    init() {
        this.setPageSize();
        this.startNameChange();
        this.attachMenuClickHandlers();
        this.attachWorkCollapseHandlers();
        this.attachResumeScrollHandlers();
        this.attachModalHandlers();
    }

    setPageSize() {
        const setSize = () => {
            const height = window.innerHeight;
            const width = window.innerWidth;
            const body = document.querySelector('body');
            body.style.height = `${height}px`;
            body.style.width = `${width}px`;
        }

        this.window.addEventListener('load', setSize);

        let isResizing = false;
        let resizeTimeout;
        this.window.addEventListener('resize', () => {
            if (!isResizing) {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    isResizing = false;
                    setSize();
                }, 100);
            }
        });
    }

    setActivePage(id) {
        if (id === this.activePage) return;

        const pageOld = this.pages[this.activePage];
        const pageNew = this.pages[id];
        const animateIn = () => {
            pageNew.element.removeEventListener('animationend', animateIn);
            pageNew.element.classList.remove('animating');
        };
        const animateOut = () => {
            pageOld.element.removeEventListener('animationend', animateOut);
            pageOld.element.classList.remove('animating');
            pageOld.element.classList.add('hidden');
        };

        pageNew.element.addEventListener('animationend', animateIn);
        pageOld.element.addEventListener('animationend', animateOut);

        pageOld.button.classList.remove('zdf-link--active');
        pageNew.button.classList.add('zdf-link--active');

        pageOld.element.classList.add('animating');
        pageNew.element.classList.remove('hidden');
        pageNew.element.classList.add('active');

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
                    left: -(container.offsetWidth + 10),
                    behavior: 'smooth',
                });
            });

            buttonRight.addEventListener('click', () => {
                container.scrollBy({
                    left: container.offsetWidth + 10,
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

    toggleModal() {
        const body = document.querySelector('body');
        const modal = document.getElementById('zdf-modal');
        const form = document.getElementById('zdf-form');
        const input = form.querySelector('.zdf-form-input input');
        const keyListener = (event) => {
            if (event.key === 'Escape') {
                this.window.removeEventListener('keyup', keyListener);
                this.toggleModal();
            }
        };

        if (!this.modalIsOpen) {
            if (!body.classList.contains('show-modal')) body.classList.add('show-modal');
            if (!modal.classList.contains('show')) modal.classList.add('show');

            this.window.addEventListener('keyup', keyListener);
            input.focus();
        } else {
            if (body.classList.contains('show-modal')) body.classList.remove('show-modal');
            if (modal.classList.contains('show')) modal.classList.remove('show');

            form.reset();
        }

        this.modalIsOpen = !this.modalIsOpen;
    }

    attachModalHandlers() {
        const buttonClose = document.querySelector('#zdf-modal .zdf-button--close');
        const form = document.getElementById('zdf-form');

        buttonClose.addEventListener('click', () => {
            this.toggleModal();
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const html = document.querySelector('html');
            const input = form.querySelector('.zdf-form-input');
            const textArea = document.querySelector('#zdf-modal .zdf-modal-text');
            const guess = form.elements[0].value.toLowerCase().trim();
            const removeAnimation = () => {
                input.removeEventListener('animationend', removeAnimation);
                input.classList.remove('animating');
            };
            let inputIsValid = false;

            switch (guess) {
                case this.commands[0]:
                    if (!this.showingOptions) {
                        for (let i = 1; i < this.commands.length; i++) {
                            textArea.innerText += `${this.commands[i]}\n`;
                        }
                        this.showingOptions = true;
                    }
                    break;
                case this.commands[1]:
                    html.style.setProperty('--color-background', '#ffffff');
                    html.style.setProperty('--color-background-transparent', '#ffffffcc');
                    html.style.setProperty('--color-background-name', '#d2d2d2a8');
                    html.style.setProperty('--color-text', '#16161d');
                    html.style.setProperty('--color-text-background', '#ffffffcc');
                    html.style.setProperty('--color-text-background-opaque', '#ffffff');
                    html.style.setProperty('--color-link', 'var(--color-text)');
                    html.style.setProperty('--color-outline', 'var(--color-text)');
                    html.style.setProperty('--color-scroll-button-stroke', 'var(--color-outline)');
                    html.style.setProperty('--color-scroll-button-fill', 'var(--color-text-background-opaque)');
                    inputIsValid = true;
                    break;
                case this.commands[2]:
                    html.style.setProperty('--color-background', '#16161d');
                    html.style.setProperty('--color-background-transparent', '#16161dcc');
                    html.style.setProperty('--color-background-name', '#737373a8');
                    html.style.setProperty('--color-text', '#e9e9e2');
                    html.style.setProperty('--color-text-background', '#4c4c4ccc');
                    html.style.setProperty('--color-text-background-opaque', '#4c4c4c');
                    html.style.setProperty('--color-link', 'var(--color-text)');
                    html.style.setProperty('--color-outline', 'var(--color-text)');
                    html.style.setProperty('--color-scroll-button-stroke', 'var(--color-outline)');
                    html.style.setProperty('--color-scroll-button-fill', 'var(--color-text-background-opaque)');
                    inputIsValid = true;
                    break;
                case this.commands[3]:
                    html.style.setProperty('--color-background', '#0f8b8d');
                    html.style.setProperty('--color-background-transparent', '#0f8b8dcc');
                    html.style.setProperty('--color-background-name', '#3cbbb1');
                    html.style.setProperty('--color-text', '#143642');
                    html.style.setProperty('--color-text-background', '#40798ccc ');
                    html.style.setProperty('--color-text-background-opaque', '#40798c');
                    html.style.setProperty('--color-link', 'var(--color-text)');
                    html.style.setProperty('--color-outline', 'var(--color-text)');
                    html.style.setProperty('--color-scroll-button-stroke', 'var(--color-outline)');
                    html.style.setProperty('--color-scroll-button-fill', 'var(--color-text-background-opaque)');
                    inputIsValid = true;
                    break;
                case this.commands[4]:
                    html.style.setProperty('--color-background', '#d95d39');
                    html.style.setProperty('--color-background-transparent', '#d95d39cc');
                    html.style.setProperty('--color-background-name', '#ff8c42');
                    html.style.setProperty('--color-text', '#050517');
                    html.style.setProperty('--color-text-background', '#e2dbbecc');
                    html.style.setProperty('--color-text-background-opaque', '#e2dbbe');
                    html.style.setProperty('--color-link', 'var(--color-text)');
                    html.style.setProperty('--color-outline', '#393d3f');
                    html.style.setProperty('--color-scroll-button-stroke', 'var(--color-outline)');
                    html.style.setProperty('--color-scroll-button-fill', 'var(--color-text-background-opaque)');
                    inputIsValid = true;
                    break;
                case this.commands[5]:
                    html.style.setProperty('--color-background', '#313e50');
                    html.style.setProperty('--color-background-transparent', '#313e50cc');
                    html.style.setProperty('--color-background-name', '#545863');
                    html.style.setProperty('--color-text', '#a8a8a8');
                    html.style.setProperty('--color-text-background', '#16161dcc');
                    html.style.setProperty('--color-text-background-opaque', '#16161d');
                    html.style.setProperty('--color-link', 'var(--color-text)');
                    html.style.setProperty('--color-outline', 'var(--color-text)');
                    html.style.setProperty('--color-scroll-button-stroke', 'var(--color-outline)');
                    html.style.setProperty('--color-scroll-button-fill', 'var(--color-text-background-opaque)');
                    inputIsValid = true;
                    break;
                default:
                    input.addEventListener('animationend', removeAnimation);
                    input.classList.add('animating');
                    break;
            }

            if (inputIsValid) {
                this.toggleModal();
            } else {
                form.reset();
            }
        });
    }

    attachMenuClickHandlers() {
        Object.keys(this.pages).forEach((id) => {
            this.pages[id].button.addEventListener('click', (event) => {
                this.setActivePage(id);

                if (id === 'home' && event.detail >= 3) {
                    this.toggleModal();
                }
            });

            if (id === 'home') {
                this.pages[id].button.addEventListener('touchstart', (event) => {
                    event.preventDefault();
                    this.touchTimer = setTimeout(
                        () => this.toggleModal(), this.touchLength);
                });
                this.pages[id].button.addEventListener('touchend', (event) => {
                    event.preventDefault();
                    if (this.touchTimer) {
                        this.setActivePage(id);
                        clearTimeout(this.touchTimer);
                    }
                });
            }
        });
    }
}

new Website();
