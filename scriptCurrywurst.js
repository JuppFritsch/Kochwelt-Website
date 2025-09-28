const input = document.querySelector('.portionInputCurrywurst');
const button = document.querySelector('.portionButtonCurrywurst');
const zutatenList = document.querySelector('.zutatenListeCurrywurst');

let message = document.querySelector('.portionMessageCurrywurst');
if (!message) {
  message = document.createElement('span');
  message.className = 'portionMessageCurrywurst';
  input.parentNode.appendChild(message);
}

const originalZutaten = [];
zutatenList.querySelectorAll('li').forEach(li => {
  originalZutaten.push(li.textContent);
});

function updateZutaten() {
  const value = Number(input.value);

  if (value < 1 || value > 20) {
    message.textContent = 'Bitte gib eine Zahl zwischen 1 und 20 ein!';
    input.value = Math.min(Math.max(value, 1), 20);
    return;
  } else {
    message.textContent = '';
  }

  zutatenList.querySelectorAll('li').forEach((li, i) => {
    const match = originalZutaten[i].match(/^(\d+)\s*(.*)$/);
    if (match) {
      const base = Number(match[1]);
      const newAmount = base * value;
      li.textContent = `${newAmount} ${match[2]}`;
    } else {
      li.textContent = originalZutaten[i];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  input.value = 2;
  updateZutaten();
});

button.addEventListener('click', updateZutaten);
