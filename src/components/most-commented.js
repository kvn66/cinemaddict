import {createElement} from '../utils.js';
import {render} from "../utils";
import {createFilmElement} from "./film";

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommented {
  constructor(films) {
    this._films = films;

    this._element = null;
  }

  getMostCommented() {
    return this._films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENTED_FILMS_COUNT);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const mostCommentedFilmsListContainerElement = this._element.querySelector(`.films-list__container`);

      const mostCommented = this.getMostCommented();
      if (mostCommented[0].comments.length > 0) {
        mostCommented.forEach((film) => {
          render(mostCommentedFilmsListContainerElement, createFilmElement(film));
        });
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
      </section>`
    );
  }
}
