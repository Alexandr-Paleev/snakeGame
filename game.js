(function () {
	// разбиваем поле на ячейки
	for(let i = 0; i < 100; i++) {
		let cell = document.createElement('div');
		cell.className = 'cell';
		game.appendChild(cell);
	}

	// присваиваем координаты каждой ячейке
	let cell = document.querySelectorAll('.cell');
	let x = 1;
	let y = 10;

	for(let i = 0; i < cell.length; i++) {
		if(x > 10) {
			x = 1;
			y--;
		}
		cell[i].setAttribute('posX', x);
		cell[i].setAttribute('posY', y);
		x++;
	}

	// рисуем голову змейки на поле, с рандомными координатами
	function generateSnake() {
		let posX = Math.floor(Math.random() * (10 - 3) + 3);
		let posY = Math.floor(Math.random() * (10 - 1) + 1);
		return [posX, posY];
	}

	// добавляем тело змейки
	let coordinate = generateSnake();
	let snakeBody = [document.querySelector('[posX = "' + coordinate[0] + '"][posY = "' + 
		coordinate[1] +'"]'), document.querySelector('[posX = "' + (coordinate[0] - 1) + '"][posY = "' + 
		coordinate[1] +'"]'), document.querySelector('[posX = "' + (coordinate[0] - 2) + '"][posY = "' + coordinate[1] +'"]')];

	let mouse;

	// рисуем мышь - рандомно
	function createMouse() {
		function generateMouse() {
			let posX = Math.floor(Math.random() * (10 - 3) + 3);
			let posY = Math.floor(Math.random() * (10 - 1) + 1);
			return [posX, posY];
	    }

	    let mouseCoordinates = generateMouse();
	    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' +	mouseCoordinates[1] +'"]');

	    while(mouse.classList.contains('snakeBody')) {
	    	let mouseCoordinates = generateMouse();
		    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' +	mouseCoordinates[1] +'"]');
	    }

	    mouse.classList.add('mouse');
	}

	createMouse();

	let direction = 'left';
	let steps = false;

	let score = 0;
	inp.value = `Your score: ${score}`;

	// движение змейки во всех направлениях
	function move() {
		let snakeCoordinate = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
		snakeBody[0].classList.remove('head');
		snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
		snakeBody.pop();

		if (direction == 'right') {
			if(snakeCoordinate[0] < 10) {
				snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinate[0] + 1) + '"][posY = "' + snakeCoordinate[1] +'"]'));
			}else{
				snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinate[1] +'"]'));
			}
		}
		else if (direction == 'left') {
			if(snakeCoordinate[0] > 1) {
				snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinate[0] - 1) + '"][posY = "' + snakeCoordinate[1] +'"]'));
			}else{
				snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinate[1] +'"]'));
			}
		}
		else if (direction == 'up') {
			if(snakeCoordinate[1] < 10) {
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinate[0] + '"][posY = "' + (+snakeCoordinate[1] + 1) +'"]'));
			}else{
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinate[0] + '"][posY = "1"]'));
			}
		}
		else if (direction == 'down') {
			if(snakeCoordinate[1] > 1) {
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinate[0] + '"][posY = "' + (+snakeCoordinate[1] - 1) +'"]'));
			}else{
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinate[0] + '"][posY = "10"]'));
			}
		}

		// змейка съедает мышь, увеличивается и добавляет очки (новая мышь рандомно появляется на поле)
		if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
			mouse.classList.remove('mouse');
			let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
			let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
			snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
			createMouse();
			score++;
			inp.value = `Your score: ${score}`;
		}

		// игра окончена
		if (snakeBody[0].classList.contains('snakeBody')) {
			setTimeout(() => {
				alert(`Game over! Your score: ${score}`);
			}, 200);
			clearInterval(interval);
			snakeBody[0].style.background = 'black';

		}

		snakeBody[0].classList.add('head');
		for(let i = 0; i < snakeBody.length; i++) {
			snakeBody[i].classList.add('snakeBody');
		}

		steps = true;

	}

	let interval = setInterval(move, 300);

	// управление змейкой с клавиатуры
	window.addEventListener('keydown', function(e) {
		// исключение двойного хода - за один шаг
		if (steps == true) {
			if (e.keyCode == 37 && direction !== 'right') {
				direction = 'left';
				steps = false;
			}
			else if (e.keyCode == 38 && direction !== 'down') {
				direction = 'up';
				steps = false;
			}
			else if (e.keyCode == 39 && direction !== 'left') {
				direction = 'right';
				steps = false;
			}
			else if (e.keyCode == 40 && direction !== 'up') {
				direction = 'down';
				steps = false;
			}
		}

	});

})();
