'use strict';

const modalTrigger = document.querySelector('.info'),
      modal = document.querySelector('.modal'),
      modalClose = document.querySelector('.close'),
      cols = document.querySelectorAll('.col'),
      notification = document.querySelector('.notification');



//обновление цветов по пробелу
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if(event.code.toLowerCase() === 'space') {
        setRandomColors();
    }
});



//блокировка цвета, копирование по клику
document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    if(type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }
    if(type === 'copy') {
        copyToClick(event.target.textContent);
        notification.classList.add('notification__active');
        setTimeout(function() {
            notification.classList.remove('notification__active');
        }, 2000);
    }
});

//генератор цветов
function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');        
        const title = col.querySelector('h2');
        const btn = col.querySelector('button');
        
        if(isLocked) {
            colors.push(title.textContent);
            return;
        }

        const color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random();

        if(!isInitial) {
            colors.push(color);
        }        

        col.style.background = color;
        title.textContent = color;

        setTextColor(title, btn, color, modalTrigger);
    });

    updateColorsHash(colors);
}

//определение оттенка и присвоение цвета кнопок и текста
function setTextColor(text, btns, color, info) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
    btns.style.color = luminance > 0.5 ? 'black' : 'white';
    info.style.color = luminance > 0.5 ? 'black' : 'white';
}

//копирование кода по клику
function copyToClick(text) {
    return navigator.clipboard.writeText(text);
}

//хеш цветов в url
function updateColorsHash(colors = []) {
    document.location.hash = colors.map(color => color.toString().substring(1)).join('-');
}

//генерация цветов из хеша url
function getColorsFromHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => '#' + color);
    }else {
        return [];
    }
}

setRandomColors(true);


//модалка
modalTrigger.addEventListener('click', () => {
    modal.classList.toggle('modal__active');
});

modalClose.addEventListener('click', () => {
    modal.classList.toggle('modal__active');
});