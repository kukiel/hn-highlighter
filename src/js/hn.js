import '../css/hn.css';
import { defaultColors, values } from './settings';

chrome.storage.sync.get(
  {
    colors: defaultColors,
    values: values,
  },
  data => highlight(data.colors)
);

const highlight = colors => {
  document.querySelectorAll('.score').forEach(span => {
    const votes = span.textContent.replace(/[^\d.]/g, '');
    for (let i = colors.length; i >= 0; i--) {
      if (votes > values[i]) {
        span.style.color = colors[i];
        break;
      }
    }
  });
};
