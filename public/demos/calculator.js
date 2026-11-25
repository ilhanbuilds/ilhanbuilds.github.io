/* global document */
(() => {
  'use strict';
  const display = document.querySelector('#display');
  const feedback = document.querySelector('#feedback');
  const operators = '/×–+';

  function integer(text) {
    if (!/^\s*-?\d+\s*$/.test(text))
      throw new Error('Geçerli bir tam sayı işlemi giriniz.');
    const value = Number(text);
    if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647)
      throw new Error('Sayı 32 bit tam sayı sınırının dışında.');
    return value;
  }
  function operation(left, right, operator) {
    if (operator === '/') {
      if (right === 0) throw new Error('Sıfıra bölme işlemi yapılamaz.');
      if (left === -2147483648 && right === -1)
        throw new Error('Sonuç 32 bit tam sayı sınırının dışında.');
      return Math.trunc(left / right);
    }
    if (operator === '×') return Math.imul(left, right);
    if (operator === '–') return (left - right) | 0;
    return (left + right) | 0;
  }
  // Preserve Form1.cs: sequential Int32 arithmetic, not JavaScript evaluation
  // or standard expression precedence. A standalone number evaluates to zero.
  function calculate(expression) {
    let first = '';
    let second = '';
    let result = 0;
    let operator = '';
    for (const character of expression) {
      if (!operators.includes(character) && !operator) first += character;
      else if (!operator) {
        result = integer(first);
        operator = character;
      } else if (!operators.includes(character)) second += character;
      else {
        result = operation(result, integer(second), operator);
        operator = character;
        second = '';
      }
    }
    if (second) result = operation(result, integer(second), operator);
    else if (!operator && expression.trim()) integer(expression);
    return result;
  }
  function activate(key) {
    feedback.textContent = '';
    if (key === 'delete') display.value = display.value.slice(0, -1);
    else if (key === '=') {
      try {
        display.value = String(calculate(display.value));
      } catch (error) {
        feedback.textContent = error.message;
      }
    } else if (operators.includes(key)) {
      if (display.value && !operators.includes(display.value.at(-1)))
        display.value += key;
    } else display.value += key;
  }
  document.querySelectorAll('button[data-key]').forEach((button) => {
    button.addEventListener('click', () => activate(button.dataset.key));
  });
  display.addEventListener('input', () => {
    feedback.textContent = '';
  });
})();
