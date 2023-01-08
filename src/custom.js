// Get root element to change CSS variables 
let root = document.documentElement;
// Select each color input element
const color01Input = document.querySelector('#color01Picker');
const color02Input = document.querySelector('#color02Picker');
const gameBackgroundInput = document.querySelector('#gameBackgroundPicker');
const pageBackgroundInput = document.querySelector('#pageBackgroundPicker');
const textColorInput = document.querySelector('#textColorPicker');

// Add event listener to each color input element
color01Input.addEventListener('input', () => {
    root.style.setProperty('--color1', color01Input.value);
});
color02Input.addEventListener('input', () => {
    root.style.setProperty('--color2', color02Input.value);
});
gameBackgroundInput.addEventListener('input', () => {
    root.style.setProperty('--second-bg-color', gameBackgroundInput.value);
});
pageBackgroundInput.addEventListener('input', () => {
    root.style.setProperty('--background-color', pageBackgroundInput.value);
});
textColorInput.addEventListener('input', () => {
    root.style.setProperty('--font-color', textColorInput.value);
});