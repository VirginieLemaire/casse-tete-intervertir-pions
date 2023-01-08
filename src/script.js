const app = {
	grid : 11,
	tokenNb : 5,
// 	DOM elements
	container : document.querySelector('.container'),
	button : document.getElementById('reset'),
	
	init : function() {
		app.drawGrid();
// 		reset game if button is clicked
		app.button.addEventListener('click', app.reset);
	},
	
	drawGrid: function() {
		// set grid
		for (let i=0; i < app.grid; i++) {
			// create a cell
			const cell = document.createElement('div');
			cell.classList.add('target');
			cell.id = i+1;
			// allow and follow drop
			cell.setAttribute('ondragover', 'app.onDragOver(event);');
			cell.setAttribute('ondrop', 'app.onDrop(event);');
			
			// add 1st tokens
			if (i<app.tokenNb) {
				let color1Token = app.drawToken('color1', cell.id);
				color1Token.id = `token-${i+1}`;
				// console.log(color1Token);
				cell.appendChild(color1Token);
			} // add 2nd tokens
			else if (i>app.tokenNb) {
				let color2Token = app.drawToken('color2', cell.id);
				color2Token.id = `token-${i+1}`;
				// console.log(color2Token);
				cell.appendChild(color2Token);
			}
			// finally, add cells to the container
			app.container.appendChild(cell);
		};
	},
	
	drawToken: function(color, currentTargetId) {
		// create the element
		const tokenElement = document.createElement('div');
		tokenElement.classList.add('circle', `${color}`);
		tokenElement.setAttribute('draggable', 'true');
		// give the target id to allow checking move's direction
		tokenElement.setAttribute('currenttarget', currentTargetId);
		// add eventListener to follow drag & drop
		tokenElement.setAttribute('ondragstart',"app.onDragStart(event);");
		// return element
		return tokenElement;
	},
	
	reset: function() {
		app.container.textContent = '';
		app.init();
	},

	/* Follow oken drag and drop */
		// set dragging datas
	onDragStart: function(event) {
		event.dataTransfer.setData('text/plain', event.target.id);
		// console.log('dragging token:', event.dataTransfer.getData('text'));
	},
	// change default behavior to allow dropping
	onDragOver: function(event) {
		event.preventDefault();
	},
	// get token id to add element to the drop zone
	onDrop: function(event) {
		const tokenId = event.dataTransfer.getData('text');
		const draggedElement = document.getElementById(tokenId);
		// get last position
		const draggedElementLastTarget = Number(draggedElement.getAttribute('currenttarget'));
		// get target
		const dropZone = event.target;
		const dropZoneId = Number(dropZone.id);
		
		// console.log('dernière position:', draggedElementLastTarget);
		// console.log('dropZone:', dropZone);
		// console.log(dropZone.id, draggedElementId, draggedElement.classList.contains('color2'));
		
		/* CHECK RULES */
		// check if dropZone is empty
		if (dropZone.hasChildNodes() || dropZone.className.includes('circle')) {
			alert('il y a déjà un pion sur cette case');
		} 
		// if color 2 -> only move to left
		else if (draggedElement.classList.contains('color2') && dropZoneId >= draggedElementLastTarget) {
			alert('ce pion ne peut pas se déplacer vers la droite');
		}
		// if color 1 only move to rigth
		else if (draggedElement.classList.contains('color1') && dropZoneId <= draggedElementLastTarget){
			alert('ce pion ne peut pas se déplacer vers la gauche');
		}
		// don't move more than 2 cells aways
		else if (dropZoneId - draggedElementLastTarget > 2 || draggedElementLastTarget- dropZoneId > 2) {
			alert('on ne peut pas déplacer le pion de plus de 2 cases');
		}
		else {
			dropZone.appendChild(draggedElement);
			// set new position to the token moved
			draggedElement.setAttribute('currenttarget',dropZone.id);	
		}
	}
};

document.addEventListener("DOMContentLoaded",app.init);