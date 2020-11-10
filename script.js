const banners = document.querySelectorAll('.banner');
const locks = document.querySelectorAll('.lock');
const pickers = document.querySelectorAll('#picker');
const texts = document.querySelectorAll('.hex-value');
const generateBtn = document.getElementById('generate');
const chars = '0123456789abcdef';
const storage = JSON.parse(localStorage.getItem('storage'));

//generate code
function generateX() {
  var x = '';
  for (i = 0; i < 6; i++) {
    x += chars[Math.floor(Math.random() * chars.length)];
  }

  return x;
}

//local storage

if (storage) {
  banners.forEach((banner, i) => {
    banner.style.backgroundColor = storage[i];
    texts[i].innerText = storage[i];
    pickers[i].value = storage[i];
  });
}

//lock
locks.forEach((lock, i) => {
  lock.addEventListener('click', () => {
    banners[i].classList.toggle('locked');
    pickers[i].toggleAttribute('disabled');
    lock.classList.toggle('locked');
  });
});

//picker
pickers.forEach((picker, i) => {
  picker.addEventListener('input', () => {
    banners[i].style.backgroundColor = `${picker.value}`;
    texts[i].innerHTML = `${picker.value}`;
    updateLS();
  });
});

//copy code on click
texts.forEach((text) => {
  text.addEventListener('click', () => {
    let textarea = document.createElement('textarea');
    textarea.innerText = text.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  });
});

//generate btn
generateBtn.addEventListener('click', () => {
  banners.forEach((banner, i) => {
    if (banner.classList.contains('locked') === false) {
      code = `#${generateX()}`;

      banner.style.backgroundColor = code;
      texts[i].innerHTML = code;
      pickers[i].value = code;
    }
    updateLS();
  });
});

function updateLS() {
  const currentColors = document.querySelectorAll('.hex-value');

  colorsArray = [];

  currentColors.forEach((currentColor) => {
    colorsArray.push(currentColor.innerText);
  });

  localStorage.setItem('storage', JSON.stringify(colorsArray));
}
