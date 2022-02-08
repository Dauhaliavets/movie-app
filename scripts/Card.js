const URL_POSTER = 'https://image.tmdb.org/t/p/w300';
const DEFAULT_PATH_POSTER = './assets/img/file-not-found.jpg';

export class Card {
	constructor({
		poster_path,
		overview,
		title,
		vote_average,
		release_date,
	} = data) {
		this.poster = poster_path;
		this.title = title;
		this.vote_overage = vote_average.toFixed(1);
		this.overview = overview;
		this.src = this.poster
			? `${URL_POSTER}${this.poster}`
			: DEFAULT_PATH_POSTER;
		this.release_date = release_date;
	}

	createCard = () => {
		const div = this.createCustomElement('div', 'card', null);
		div.appendChild(this.createImage(this.poster, this.title));
		div.appendChild(
			this.createCustomElement('div', 'card__rating', this.vote_overage)
		);
		div.appendChild(this.createCustomElement('div', 'card__title', this.title));

		const overview = this.createCustomElement('div', 'overview', null);
		overview.appendChild(
			this.createCustomElement('h3', 'overview_title', this.title)
		);

		overview.appendChild(this.createCustomElement('span', '', 'Release Date:'));
		overview.appendChild(
			this.createCustomElement('span', 'overview_release', this.release_date)
		);

		overview.appendChild(this.createCustomElement('span', '', 'Rating:'));
		overview.appendChild(
			this.createCustomElement('span', 'overview_rating', this.vote_overage)
		);

		overview.appendChild(this.createCustomElement('span', '', 'Description:'));
		overview.appendChild(
			this.createCustomElement('p', 'overview_text', this.overview)
		);

		div.appendChild(overview);

		return div;
	};

	createImage = () => {
		const img = this.createCustomElement('img', 'card__image', null);
		img.src = this.src;
		img.alt = this.title;

		return img;
	};

	createCustomElement = (tagName, className, content) => {
		const el = document.createElement(tagName);

		if (className) {
			el.classList.add(className);
		}

		if (content === this.vote_overage) {
			let classNames = this.generateClassNameForRating(content, className);
			el.classList.add(...classNames);
		}

		el.textContent = content;

		return el;
	};

	generateClassNameForRating = (vote, className) => {
		if (+vote >= 8) {
			return [className, 'rating_good'];
		} else if (+vote <= 5) {
			return [className, 'rating_bad'];
		} else {
			return [className];
		}
	};
}
