import { filter, sumBy, map, find } from 'lodash';
import moment from 'moment';

import translations from '../constants/translations';

export const filterCurrentEvents = (events) => {
  return filter(events, (e) => {
    const eventDate = moment(e.date);
    const currentDate = moment();
    return eventDate.month() === currentDate.month() &&
      eventDate.year() === currentDate.year();
  });
};

export const calculateCurrentEvents = (events) => {
  const filteredEvents = filterCurrentEvents(events);
  return sumBy(filteredEvents, 'value');
};

export const calculateEvents = (events) => {
  return sumBy(events, 'value');
};

export const mapIdToItem = (items, itemId) => {
  const item = find(items, (i) => i.id === itemId);

  return {
    ...item,
    name: item.hasTranslation ? translations[item.name] : item.name
  };
};

export const mapIdToCategory = (categories, categoryId) => {
  const category = find(categories, (c) => c.id === categoryId);

  return {
    ...category,
    title: category.hasTranslation ? translations[category.title] : category.title
  };
};

export const getMonthlyEvents = (events, categories, items) => {
  const filteredEvents = filterCurrentEvents(events);

  return map(filteredEvents, event => {
    return {
      ...event,
      category: mapIdToCategory(categories, event.categoryId),
      item: mapIdToItem(items, event.itemId),
    };
  });
};

export const getAllEvents = (events, categories, items) => {
  return map(events, event => {
    return {
      ...event,
      category: mapIdToCategory(categories, event.categoryId),
      item: mapIdToItem(items, event.itemId),
    };
  });
};

export const mapArrayOfIdsToCategories = (categories, ids) => {
  return map(ids, id => {
    return {
      ...id,
      ...mapIdToCategory(categories, id.categoryId)
    };
  });
};

export const isInCurrentMonth = (date) => {
  const eventDate = moment(date);
  const currentDate = moment();
  return eventDate.month() === currentDate.month() &&
    eventDate.year() === currentDate.year();
};

export const getThresholdCategories = (allCategories, categoryIds, expenses, incomes) => {
  const mappedCategories = mapArrayOfIdsToCategories(allCategories, categoryIds);

  const thresholdCategories = map(mappedCategories, (c) => {
    return {
      ...c,
      expenses: filter(expenses, (e) => e.categoryId === c.id && isInCurrentMonth(e.date)) || [],
      incomes: filter(incomes, (i) => i.categoryId === c.id && isInCurrentMonth(i.date)) || [],
    };
  });

  return thresholdCategories;
};
