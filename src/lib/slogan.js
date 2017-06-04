import moment from 'moment';

import translations from '../constants/translations';

const slogans = {
  excellent: {
    message: translations.STATUS_SLOGAN_EXCELLENT,
  },
  good: {
    message: translations.STATUS_SLOGAN_GOOD,
  },
  notGood: {
    message: translations.STATUS_SLOGAN_NOT_GOOD,
  },
  poor: {
    message: translations.STATUS_SLOGAN_POOR,
  },
  sorry: {
    message: translations.STATUS_SLOGAN_SORRY,
  }
};
export default (percentage) => {

  const currentDay = moment().date();
  let slogan = {};
  const roundedPercentage = Math.round(percentage);

  if (!percentage) {
    return (<View />);
  }

  if (currentDay < 10) {
    if (roundedPercentage < 30) {
      slogan = { ...slogans.excellent };
    } else if (roundedPercentage < 60) {
      slogan = { ...slogans.good };
    } else if (roundedPercentage < 90) {
      slogan = { ...slogans.notGood };
    } else if (roundedPercentage < 100) {
      slogan = { ...slogans.poor };
    } else if (roundedPercentage >= 100) {
      slogan = { ...slogans.sorry };
    }
  } else if (currentDay < 20) {
    if (roundedPercentage < 60) {
      slogan = { ...slogans.excellent };
    } else if (roundedPercentage < 80) {
      slogan = { ...slogans.good };
    } else if (roundedPercentage < 90) {
      slogan = { ...slogans.notGood };
    } else if (roundedPercentage < 100) {
      slogan = { ...slogans.poor };
    } else if (roundedPercentage >= 100) {
      slogan = { ...slogans.sorry };
    }
  } else {
    if (roundedPercentage < 75) {
      slogan = { ...slogans.excellent };
    } else if (roundedPercentage < 85) {
      slogan = { ...slogans.good };
    } else if (roundedPercentage < 95) {
      slogan = { ...slogans.notGood };
    } else if (roundedPercentage < 100) {
      slogan = { ...slogans.poor };
    } else if (roundedPercentage >= 100) {
      slogan = { ...slogans.sorry };
    }
  }

  return slogan.message;
};
