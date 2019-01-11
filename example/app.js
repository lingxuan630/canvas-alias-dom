import { createElement } from '../src/index';

const appRoot = document.querySelector('#app');

const layer = createElement('Layer');

const stage = createElement('Stage');

console.log(stage);
stage.setAttribute('width', 800);
stage.setAttribute('height', 800);
const container = stage.getContainer();

function createCircle(fill){
  const circle = createElement('Circle');
  const x = Math.random() * 800;
  const y = Math.random() * 800;
  circle.setAttribute('x', x);
  circle.setAttribute('y', y);
  circle.setAttribute('radius', 40);
  circle.setAttribute('fill', fill || 'red');
  return circle;
}

const circle1 = createCircle();
const circle2 = createCircle();
const circle3 = createCircle();
const circle4 = createCircle('blue');
const circle5 = createCircle('green');

layer.appendChild(circle1);
layer.appendChild(circle2);
layer.appendChild(circle3);
stage.appendChild(layer);

appRoot.appendChild(container);

setTimeout(() => {
  layer.removeChild(circle1);
  layer.insertBefore(circle4, circle2);
  layer.replaceChild(circle5, circle3);
  layer.batchDraw();
}, 2000);