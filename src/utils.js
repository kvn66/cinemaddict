import moment from 'moment';

const getFullDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatDateTime = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};

const FilterType = {
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  ALL: `all`,
};

const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const render = (containerElement, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      containerElement.after(element);
      break;
    case RenderPosition.BEFOREEND:
      containerElement.append(element);
      break;
    default:
      throw new Error(`Указана неверная цель при вызове функции render`);
  }
};

export {getFullDate, formatDateTime, RenderPosition, render, FilterType, SortType};
