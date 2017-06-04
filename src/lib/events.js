import { filter, sumBy } from 'lodash';
import moment from 'moment';

export const calculateCurrentEvents = (events) => {
  const filteredEvents = filter(events, (e) => {
    const eventDate = moment(e.date);
    const currentDate = moment();
    return eventDate.month() === currentDate.month() &&
      eventDate.year() === currentDate.year();
  });
  return sumBy(filteredEvents, 'value');
};
