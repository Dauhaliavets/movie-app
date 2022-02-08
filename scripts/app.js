import { Card } from './Card.js';

const form = document.querySelector('.header__form');
const search = document.querySelector('.header__search');
const main = document.querySelector('.main__body');

const API_KEY = '5310e65bd52ea1cdc768ced9af904654';
const URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const URL_MOVIE = 'https://api.themoviedb.org/3/search/movie?';

function pressSubmit(e) {
	e.preventDefault();
	const query = search.value;
	const pathMovies = `${URL_MOVIE}api_key=${API_KEY}&query=${query}&page=1`;
	getData(pathMovies, query);
}

async function getData(url, query) {
	const response = await fetch(url);
	if (response.status === 200) {
		const data = await response.json();
		showData(data.results, main, query);
	} else {
		throw Error('Something went wrong');
	}
}

function showData(data, selector, query) {
	selector.innerHTML = '';
	if (data.length === 0) {
		selector.appendChild(
			createTextElement(
				`Movies on request "${query}" not found.`,
				'h2',
				'main__body-title'
			)
		);
		return;
	}
	selector.appendChild(
		createTextElement(`Movies on request "${query}":`, 'h2', 'main__body-title')
	);
	data.forEach((data) => addCardToSelector(data, selector));
}

function addCardToSelector(data, selector) {
	let card = new Card(data);
	selector.appendChild(card.createCard());
}

const createTextElement = (content, tagName, className) => {
	const el = document.createElement(tagName);
	el.classList.add(className);
	el.textContent = content;
	return el;
};

form.addEventListener('submit', pressSubmit);
window.onload = function () {
	getData(URL_POPULAR, 'popular');
	search.focus();
};
