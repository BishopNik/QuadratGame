/** @format */

const mainContainer = document.querySelector('.main_container');
const button = document.querySelector('.button_reset');
document.addEventListener('DOMContentLoaded', findQuadrats);
let quadrats = null;
const rowBoard = 7;
const columnBoard = 7;

button.addEventListener('click', resetPage);
mainContainer.addEventListener('click', quadratClick);

function findQuadrats() {
	quadrats = document.querySelectorAll('.quadrat');
}

function getRandomColor() {
	const colors = [
		'rgba(255, 0, 0, 1)',
		'rgba(0, 255, 0, 1)',
		'rgba(0, 0, 255, 1)',
		'rgba(255, 200, 0, 1)',
	];
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}

const createQuadrat = (row, column, color) => {
	const li = document.createElement('li');
	li.classList.add('quadrat');
	li.dataset.row = row;
	li.dataset.column = column;

	const div = document.createElement('div');
	div.classList.add('elem');
	div.style.backgroundColor = color;
	div.style.opacity = '0.6';

	li.appendChild(div);
	return li;
};

const markupElements = () => {
	let fragment = document.createDocumentFragment();
	for (let i = 0; i < rowBoard; i++) {
		for (let j = 0; j < columnBoard; j++) {
			const randomColor = getRandomColor();
			const quadrat = createQuadrat(i, j, randomColor);
			fragment.appendChild(quadrat);
		}
	}
	mainContainer.innerHTML = '';
	mainContainer.appendChild(fragment);
	findQuadrats();
};

function resetPage() {
	markupElements();
}

// const markupElements = () => {
// 	let str = '';
// 	for (let i = 0; i < 7; i++) {
// 		for (let j = 0; j < 7; j++) {
// 			const randomColor = getRandomColor();
// 			str += `<li class="quadrat" data-row="${i}" data-column="${j}"><div class="elem" style="background-color: ${randomColor}; opacity: 0.6;"></div></li>`;
// 		}
// 	}
// 	return str;
// };

// function resetPage() {
// 	mainContainer.innerHTML = markupElements();
// 	findQuadrats();
// }

resetPage();

function quadratClick(e) {
	e.preventDefault();
	const clickElement = e.target;
	const containerElement = clickElement.parentNode;
	if (!containerElement.dataset.row) return;
	clickElement.style.opacity = 1;
	neighbour(
		containerElement.dataset.row,
		containerElement.dataset.column,
		clickElement.style.backgroundColor
	);
}

function neighbour(row, column, color) {
	quadrats.forEach(quadrat => {
		const i = parseInt(quadrat.dataset.row);
		const j = parseInt(quadrat.dataset.column);
		const colorBox = quadrat.firstChild.style.backgroundColor;
		if ((i === parseInt(row) + 1) & (j === parseInt(column))) {
			if ((color === colorBox) & (quadrat.firstChild.style.opacity !== '1')) {
				quadrat.firstChild.style.opacity = 1;
				neighbour(i, j, color);
			}
		}
		if ((i === parseInt(row) - 1) & (j === parseInt(column))) {
			if ((color === colorBox) & (quadrat.firstChild.style.opacity !== '1')) {
				quadrat.firstChild.style.opacity = 1;
				neighbour(i, j, color);
			}
		}
		if ((i === parseInt(row)) & (j === parseInt(column) + 1)) {
			if ((color === colorBox) & (quadrat.firstChild.style.opacity !== '1')) {
				quadrat.firstChild.style.opacity = 1;
				neighbour(i, j, color);
			}
		}
		if ((i === parseInt(row)) & (j === parseInt(column) - 1)) {
			if ((color === colorBox) & (quadrat.firstChild.style.opacity !== '1')) {
				quadrat.firstChild.style.opacity = 1;
				neighbour(i, j, color);
			}
		}
	});
}
