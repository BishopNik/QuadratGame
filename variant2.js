/** @format */

class Quadrat {
	constructor(row, column, color) {
		this.element = this.createQuadratElement(row, column, color);
		this.neighbours = [];
	}

	createQuadratElement(row, column, color) {
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
	}

	addToContainer(container) {
		container.appendChild(this.element);
	}

	addNeighbour(neighbour) {
		this.neighbours.push(neighbour);
	}

	handleClick() {
		this.element.firstChild.style.opacity = '1';
		this.neighbours.forEach(neighbour => {
			const colorBox = neighbour.element.firstChild.style.backgroundColor;
			const isSameColor =
				this.element.firstChild.style.backgroundColor === colorBox &&
				neighbour.element.firstChild.style.opacity !== '1';

			if (isSameColor) {
				neighbour.handleClick();
			}
		});
	}
}

class Board {
	constructor(rows, columns) {
		this.rows = rows;
		this.columns = columns;
		this.quadrats = this.createQuadrats();
		this.container = document.querySelector('.main_container');
		this.resetButton = document.querySelector('.button_reset');

		this.init();
	}

	createQuadrats() {
		const quadrats = [];
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				const randomColor = getRandomColor();
				quadrats.push(new Quadrat(i, j, randomColor));
			}
		}
		return quadrats;
	}

	init() {
		this.resetButton.addEventListener('click', this.reset.bind(this));
		this.container.addEventListener('click', this.quadratClick.bind(this));
		this.reset();
	}

	reset() {
		this.container.innerHTML = '';
		this.quadrats = this.createQuadrats();
		this.quadrats.forEach(quadrat => {
			quadrat.addToContainer(this.container);
		});
		this.findQuadrats();
	}

	findQuadrats() {
		this.quadrats.forEach(quadrat => {
			const row = parseInt(quadrat.element.dataset.row);
			const column = parseInt(quadrat.element.dataset.column);

			const neighbours = this.quadrats.filter(neighbour => {
				const i = parseInt(neighbour.element.dataset.row);
				const j = parseInt(neighbour.element.dataset.column);

				return (
					(i === row + 1 && j === column) ||
					(i === row - 1 && j === column) ||
					(i === row && j === column + 1) ||
					(i === row && j === column - 1)
				);
			});

			neighbours.forEach(neighbour => {
				quadrat.addNeighbour(neighbour);
			});
		});
	}

	quadratClick(e) {
		e.preventDefault();
		const clickElement = e.target;
		const containerElement = clickElement.parentNode;
		if (!containerElement.dataset.row) return;
		const clickedQuadrat = this.quadrats.find(quadrat => quadrat.element === containerElement);
		clickedQuadrat.handleClick();
	}
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

document.addEventListener('DOMContentLoaded', () => {
	const board = new Board(7, 7);
});
