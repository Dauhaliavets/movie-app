const form = document.querySelector('.header__form');
const search = document.querySelector('.header__search');
const main = document.querySelector('.main__body');

const API_KEY = '5310e65bd52ea1cdc768ced9af904654';

const URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const URL_MOVIE = 'https://api.themoviedb.org/3/search/movie?';

const URL_POSTER = 'https://image.tmdb.org/t/p/';
const DEFAULT_PATH_POSTER = '/kqjL17yufvn9OVLyXYpvtyrFfak.jpg';
const DEFAULT_WIDTH = '342';

function pressSubmit(e){
    e.preventDefault();
    const query = search.value;
    const pathMovies = `${URL_MOVIE}api_key=${API_KEY}&query=${query}&page=1`;
    getData(pathMovies, query);
}

async function getData(url, query){
    const response = await fetch(url);
    if(response.status === 200) {
        const data = await response.json();
        console.log(data)
        showData(data.results, main, query)
    } else {
        throw Error('Something went wrong');
    }

}

function showData(data, selector, query) {
    selector.innerHTML = '';
    if(data.length === 0) {
        selector.appendChild(createTextElement(`Movies on request "${query}" not found.`, 'h2', 'main__body-title'));
        return;
    }
    selector.appendChild(createTextElement(`Movies on request "${query}":`, 'h2', 'main__body-title'));
    data.forEach(data => addCardToSelector(data, selector));
}

function addCardToSelector(data, selector) {
    let card = new Card(data);
    selector.appendChild(card.createCard());
}

class Card {
    constructor({ poster_path, overview, title, vote_average } = data) {
        this.poster = poster_path,
        this.title = title,
        this.vote_overage = vote_average,
        this.overview = overview,
        this.src = `${URL_POSTER}w${DEFAULT_WIDTH}${this.poster || DEFAULT_PATH_POSTER}`
    }

    createCard = () => {    
        const div = this.createCustomElement('div', 'card', null);
        div.appendChild(this.createImage(this.poster, this.title));
        div.appendChild(this.createCustomElement('div', 'card__rating', this.vote_overage));
        div.appendChild(this.createCustomElement('div', 'card__title', this.title));
        div.appendChild(this.createCustomElement('div', 'overview', this.overview));
        
        return div;
    }
    
    createImage = () => {
        const img = this.createCustomElement('img', 'card__image', null);
        img.src = this.src;
        img.alt = this.title;
        img.width = DEFAULT_WIDTH;
    
        return img;
    }
    
    createCustomElement = (tagName, className, content) => {
        const el = document.createElement(tagName);
        el.classList.add(className);
        el.textContent = content;
        return el;
    }
}

const createTextElement = (content, tagName, className) => {
    const el = document.createElement(tagName);
    el.classList.add(className);
    el.textContent = content;
    return el;
}


form.addEventListener('submit', pressSubmit);
window.onload = function() {
    getData(URL_POPULAR, 'popular');
    search.focus();
}