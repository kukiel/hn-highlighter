import '../css/options.css';
import { defaultColors, values } from './settings';

values.forEach(value => {
  const div = document.createElement('div');
  const input = document.createElement('input');
  const color = document.createElement('input');

  div.className = 'row';

  input.value = value;
  input.disabled = true;

  color.type = 'color';
  color.className = 'color';

  div.appendChild(input);
  div.appendChild(color);

  document.querySelector('.wrapper').appendChild(div);
});

function save_options() {
  const rows = document.querySelectorAll('.color');
  const colors = [];
  rows.forEach(row => {
    colors.push(row.value);
  });
  chrome.storage.sync.set(
    {
      colors: colors,
      values: values,
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    }
  );
}

function restore_options() {
  chrome.storage.sync.get(
    {
      colors: defaultColors,
      values: values,
    },
    function(data) {
      const rows = document.querySelectorAll('.color');
      rows.forEach((row, index) => {
        row.value = data.colors[index];
      });
    }
  );
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
