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

console.log(`
Вёрстка +10: 
- на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма. Также на карточке может быть другая информация, которую предоставляет API, например, описание фильма, его рейтинг на IMDb и т.д. +5
- в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10.
Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10.
Поиск +30:
- при открытии приложения курсор находится в поле ввода +5
- есть placeholder +5
- автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
- поисковый запрос можно отправить нажатием клавиши Enter +5
- после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
- в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
- высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
- дополнительным функционалом может быть, например, наличие на карточке фильма его описания и рейтинга на IMDb.
Итого: 70 / 70 баллов.
`);
