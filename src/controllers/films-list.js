import {render, RenderPosition} from "../utils";
import MovieController from "./movie";
import ShowMoreComponent from "../components/show-more";
import FilmsListComponent from "../components/films-list";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class FilmsListController {
  constructor(parentComponent, api) {
    this._parentComponent = parentComponent;
    this._api = api;
    this._filmsListComponent = null;
  }

  render(moviesModel) {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    const filmsListComponent = new FilmsListComponent();
    const showMoreComponent = new ShowMoreComponent();

    const onClick = () => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      moviesModel.slice(prevFilmsCount, showingFilmsCount).forEach((movieModel) => {
        new MovieController(movieModel, this._api).render(filmsListComponent);
      });

      if (showingFilmsCount >= moviesModel.length) {
        showMoreComponent.remove();
      }
    };

    if (moviesModel.length) {
      filmsListComponent.titleHide = true;

      moviesModel.slice(0, showingFilmsCount).forEach((movieModel) => {
        new MovieController(movieModel, this._api).render(filmsListComponent);
      });

      render(filmsListComponent.getContainerElement(), showMoreComponent.getElement(), RenderPosition.AFTEREND);

      showMoreComponent.setClickHandler(onClick);
    } else {
      filmsListComponent.titleText = `There are no movies in our database`;
      filmsListComponent.titleHide = false;
    }

    this._renderElement(this._parentComponent.getElement(), filmsListComponent.getElement(), RenderPosition.AFTERBEGIN);

    this._filmsListComponent = filmsListComponent;
  }

  _renderElement(containerElement, element, place = RenderPosition.BEFOREEND) {
    if (!this._filmsListComponent) {
      render(this._parentComponent.getElement(), element, place);
    } else {
      const filmsListElement = this._filmsListComponent.getElement();
      if (containerElement.contains(filmsListElement)) {
        filmsListElement.replaceWith(element);
      }
    }
  }
}
