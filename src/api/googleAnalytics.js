// src/api/googleAnalytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-TS92RY9CN0');
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};