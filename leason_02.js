import cloneDeep from 'lodash';

// 1. Создать объект counter всеми возможными способами;

// var1 - при помощи литерала;
const counter = {v1: 1};

// var2 - при помощи конструктора класса Object;
const counter2 = new Object({v2: 2});

// var3 - при помощи функции Object. В чем особенность?
const counter3 = Object({v3: 3});

// var4 - при помощи функции-конструктора;
function counterConstructor() {
  this.v4 = 4;
}

const counter4 = new counterConstructor();

// var5 - при помощи функции-конструктора класса;
// то есть, получается, что конструкторр класса - это и есть обычная функция-конструктор!
class counterClassConstructor {
  constructor() {
    this.v5 = 5;
  }
}

const counter5 = new counterClassConstructor();

// var6 - при помощи встроенного метода create;
// создает объект с указанным прототипом;
// proto - первый параметр (который будет встроен в цепочку прототипов);
// второй параметр - ?properties - описывает свойства создаваемого объекта в виде “название: дескриптор”;
// то eсть значения создаваемого объекта описываются через дескрипторы value, writable, configurable, и enumerable;
const counter6 = Object.create(Object.prototype, {v6: {value: 6, enumerable: true, configurable: true, writable: true}, 'v6-1': {value: '6-1', enumerable: true}});

console.log(Object.values(counter6)); // по-умолчинию объект описывается дескриипторами, где свойства по-умочинию установлены в false;

// var7 - при помощи встроенного метода assign;
// метод копирует и объединяет объекты;
const counter7 = Object.assign({v7: 7}, {'v7-1': '7-1'});

// var8 - при помощи spread оператора;
const counter8 = {...{v8: 8}};

// 2. Скопировать объект counter всеми возможными способами;
const originalObj = {key1: 'howCanIDoIt?', key2: {deepKey: {veryDeepKey: 'helloDeep'}, veryDeepKey1: {'hello!': 1525}}}

// Неглубокое копирование;
// вложенные объекты будут представлены ссылками на первоначальный объект;
// метод assing игнорирует свойства со значениями null и undefined;

const copyObj1 = Object.assign({}, originalObj);
const copyObj2 = {...originalObj};

// Глубокое копирование;

// JSON.parse(JSON.stringify(obj)) не копирует методы объекта(функции)), объекты Date превращает в строку;
// JSON.stringify может обрабатывать только базовые объекты, массивы и примитивы;
const copyObj3 = JSON.parse(JSON.stringify(originalObj));

// при помощи функции cloneDeep из библиотеки lodash;
// не поддерживает копирование функций, которые содержат замыкания или другие сложные контексты;
const copyObj4 = cloneDeep(originalObj).value();

// при помощи глобальной функции structuredClone;
const copyObj5 = structuredClone(originalObj);

// при помощи самописной функции;
// реализовала для объектов глубокой вложенности, где значения - объекты;
// для других случаев (где значения другие типы данных) - можно расширять;

const myOwnDeepCopy = (original) => {
  const newObj = {};

  for (const key in original) {
    const value = original[key];
    if (typeof value === 'object') {
      myOwnDeepCopy(value);
    }
    newObj[key] = value;
  }

  return newObj;
}

console.log(myOwnDeepCopy(originalObj).key2.veryDeepKey1);

// 3. Создать функцию makeCounter всеми описанными и возможными способами;

// functiron declaration;
// всплывает!
function makeCounter1() {
  return 'i am function declaration created';
};

// functiron expression;
// не всплывает!
const makeCounter2 = function() {
  return 'i am function expression created';
};

// named function expressions;
const makeCounter4 = function owerName(message) {
  if (message) {
    return message;
  } else {
    return owerName('i am named function expressions created'); 
  }
};

// arrow function;
const makeCounter5 = () => 'i am arrow function created';

// 4. Прочитать и описать работу глобальной функции structuredClone();
// Клонирует:
// бесконечно вложенные объекты и массивы;
// циклические ссылки (когда ключи объекта ссылаются на сам объект);
// широкий спектр типов JavaScript, таких как: Date, Set, Map, Error, RegExp, ArrayBuffer, Blob, File, ImageData и многие другие;
// любые передаваемые объекты;

// Не может клонировать:
// функции;
// узлы DOM;
// дескрипторы свойств, сеттеры и геттеры;
// прототипы объектов;

// БОНУС 1. Написать функцию глубокого сравнения двух объектов;

const obj1 = {here: {is: "on", other: "2"}, object: "Y"};   
const obj2 = {here: {is: "on", other: "2"}, object: "Y"};
const obj3 = {here: {is: "on", other: {k: 0}}, object: "Y"};
const obj4 = {her: {is: "on", other: 9}, object: "Y"};
const obj5 = null;


const deepEqual = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key in obj1) {
    if (Object.hasOwn(obj2, key)) {
      const value1 = obj1[key];
      const value2 = obj2[key];      
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return deepEqual(value1, value2);
      }
      if (typeof value1 === 'object' || typeof value2 === 'object' || value1 !== value2) {
        return false;
      } 
    }
    if (!Object.hasOwn(obj2, key)) {
      return false;
    }
  }
  return true;
};

console.log(deepEqual(obj1, obj4));

// БОНУС 2. Развернуть строку в обратном направлении при помощи методов массивов;

function reverseStr(str) {
    return str.split('').reduce((newString, letter) => letter + newString, '');
}

const reverseStr2 = (str) => {
  return str.split('').reverse().join(' ');
}

console.log(reverseStr('kate'));
console.log(reverseStr2('kate'));



