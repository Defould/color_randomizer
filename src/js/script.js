const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if(event.code.toLowerCase() === 'space') {
        setRandomColors();
    }
});

document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    if(type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }
    if(type === 'copy') {
        copyToClick(event.target.textContent);
    }
});

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

        setTextColor(title, btn, color);
    });

    updateColorsHash(colors);
}

//функция определения оттенка и присвоения цвета кнопки и текста
function setTextColor(text, btns, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';
    btns.style.color = luminance > 0.5 ? 'black' : 'white';
}

//функция копирования по клику
function copyToClick(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(color => color.toString().substring(1)).join('-');
}

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