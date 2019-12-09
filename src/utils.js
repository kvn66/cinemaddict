const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const getCheckedParametersCount = (films, parametr) => {
  let count = 0;
  films.forEach((item) => {
    if (item[parametr]) {
      count++;
    }
  });
  return count;
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`Указана неверная цель при вызове функции render`);
  }
};

export {getCheckedParametersCount, RenderPosition, render, SortType};
