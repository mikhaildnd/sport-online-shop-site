const helpers = {
  cardDetailsControl(options) {
    const { container, openButtonSelector, closeButtonSelector, cardSelector, classToAdd } =
      options;

    const cardHandler = (selector) => {
      const container = document.querySelector(selector);

      if (!container) return;

      container.addEventListener('click', (e) => {
        const card = e.target.closest(cardSelector);

        if (e.target.closest(openButtonSelector)) {
          e.preventDefault();
          openCard(card);
        } else if (e.target.closest(closeButtonSelector)) {
          closeCard(card);
        }
      });
    };

    if (Array.isArray(container)) {
      container.forEach((selector) => {
        cardHandler(selector);
      });
    } else if (typeof container === 'string') {
      cardHandler(container);
    }

    const openCard = (card) => {
      card.classList.add(classToAdd);
    };

    const closeCard = (card) => {
      card.classList.remove(classToAdd);
    };
  },

  headerViewToggler({ selector, activeClass }) {
    let prevScrollpos = window.pageYOffset;
    const header = document.querySelector(selector);

    if (!header) return;

    window.addEventListener(
      'scroll',
      () => {
        let currentScrollPos = window.pageYOffset;

        prevScrollpos < currentScrollPos
          ? header.classList.add(activeClass)
          : header.classList.remove(activeClass);

        prevScrollpos = currentScrollPos;
      },
      { passive: true },
    );
  },

  getCoords(elem) {
    if (!elem) return;

    let box = elem.getBoundingClientRect();

    return {
      top: box.top,
      right: box.right,
      bottom: box.bottom,
      left: box.left,
      height: box.height,
    };
  },
};

export const cardDetailsControl = helpers.cardDetailsControl;
export const headerViewToggler = helpers.headerViewToggler;
export const getCoords = helpers.getCoords;
