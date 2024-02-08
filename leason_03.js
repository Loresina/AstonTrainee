// 1. Почему массивы в JS являются "неправильными" и совмещают в себе несколько структур данных? Какие?
// * МАССИВ В JS:
// * может иметь динамическую длину. В других C-подобных языках длина массива - задана изначально
// * может включать разные типы данных (это нежелательно). В других языках - один тип данных в массиве

// * МАССИВ В JS:
// Массив - это списковая структура данных на основе которой построены такие типы данных как Steck и Queue, LinkedList(?).

// 2. Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value (Привязать через bind, call, apply);
// var item = 'my OWN'; переменная var записывается в объект global/windows но не в строгом режиме;

function logger(text) {
    console.log(`${text} - I output only external context: ${this.item}`);
}

const obj1 = { item: "some value 1" };
const obj2 = { item: "some value 2" };
const obj3 = { item: "some value 3" };

logger.call(obj1, 'It is callMethod');

logger.apply(obj2, ['It is applyMethod']);

const newLoggerContext = logger.bind(obj3, 'It is bindMethod');
newLoggerContext();

newLoggerContext.apply(obj2, ['It is applyMethod']); // контекст нельзя перепривязать

const person = {
    name: 'Kate',
    greet: function() {
        console.log(this.name);
    }
}

person.greet();

// 3.1. МАССИВЫ;

// Создайте массив чисел и найдите его сумму;

const numArray = [15, 8, 25, 56, 78];

const sumArray = (array) => array.reduce((acc, num) => acc + num, 0);

const sumRes = sumArray(numArray);

// Создайте массив строк и объедините их в одну строку;

const strArray = ['K', 'a', 'te'];

const strRes = strArray.join('');

// Найдите максимальный и минимальный элементы в массиве чисел;

const minOne = (array) => array.reduce((first, second) => Math.min(first, second));

const minTwo = (array) => {
    let res = array[0];

    for (let i = 1; i < array.length; i += 1) {
        if (array[i] < res) {
            res = array[i];
        }
    }
    return res;
}

minOne(numArray); // 8
minTwo(numArray); // 8


const maxOne = (array) => array.reduce((first, second) => Math.max(first, second));

const maxTwo = (array) => {
    let res = array[0];

    for (let i = 1; i < array.length; i += 1) {
        if (array[i] > res) {
            res = array[i];
        }
    }
    return res;
}

maxOne(numArray); // 78
maxTwo(numArray); // 78


// 3.2 Stack (стек): Реализуйте стек с использованием массива;
// LIFO;

function myOwnStack() {
    this.myStack = [];

    this.add = function(value) {
        this.myStack.push(value);
        return this.myStack;
    }

    this.del = function() {
        if (this.myStack.pop()) {
            return this.myStack;
        }
        console.log(`stack is empty`);
        return false;             
    }

    this.showAll = function() {
        console.log(this.myStack);
        return true;
    }

    this.showFirst = function() {
        const firstEl = this.myStack[this.myStack.length - 1];
        if (firstEl) {
            console.log(firstEl);
            return firstEl;
        }
        console.log('stack is empty');
        return false;        
    }

    this.isEmpty = function() {
        if (this.myStack.length > 0) {
            return false;
        }
        return true;
    }

    this.undo = function(num) {
        if (this.myStack.length < num) {
            console.log(`you can't undo ${num} actions, all stack length is ${this.myStack.length}`);
            return false;
        }
        this.myStack.splice(-num);
        return this.myStack;
    }
}

const stack = new myOwnStack;
stack.add('I');
stack.add('am');
stack.add('Kate');
stack.add('!');
stack.del();
stack.showAll(); //  ['I', 'am', 'Kate']
stack.isEmpty(); // false
stack.showFirst(); // Kate
stack.undo(2);
stack.showAll(); //  ['I']
stack.undo(2); // you can't undo 2 actions, all stack length is 1

// 3.3 Queue (очередь): Реализуйте очередь с использованием массива;
// FIFO;
// Имитируйте работу очереди на примере ожидания на кассе;

const storQueue = {
    queue: [],

    add(value) {
        this.queue.unshift(value);
        return this.queue;
    },

    del() {
        this.queue.pop();
        return this.queue;
    },

    showAll() {
        console.log(this.queue);
        return this.queue;
    },

    showFirst() {
        const firstEl = this.queue[this.queue.length - 1];
        if (firstEl) {
            console.log(firstEl);
            return firstEl;
        }
        console.log('queu is empty');
        return false;        
    },

    isEmpty() {
        if (this.queue.length > 0) {
            return false;
        }
        return true;
    }
}

storQueue.isEmpty(); // true
storQueue.add('Alex');
storQueue.add('Luda');
storQueue.add('Luk');
storQueue.showAll(); // ['Luk', 'Luda', 'Alex']
storQueue.del();
storQueue.showFirst(); // Luda
storQueue.isEmpty(); // false

// 4. Бонус задание: Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind();

function toGo(gest1, gest2) {
    console.log(`${gest1} and ${gest2} - let's go with me - ${this.owner}.`);
}

const bindObj = { owner: "I am Sara" };

Function.prototype.myBind1 = function(context, ...args) {
    const fn = this;

    return function(...params) {
        context['uniqeKey'] = fn;
        const res = context['uniqeKey'](...args.concat(...params));
        delete context['uniqeKey'];
        return res;
    }
};


Function.prototype.myBind2 = function(context) {
    const fn = this;
    const args = Array.from(arguments).slice(1);

    return function() {
        const params = Array.from(arguments);
        return fn.apply(context, [...args, ...params]);
    }
};

Function.prototype.myBind3 = function(context, ...args) {
    const fn = this;

    return function(...params) {
        return fn.call(context, ...[...args, ...params]);
    }
};


toGo.myBind1(bindObj, 'Kate', 'Max');
toGo.myBind2(bindObj, 'Kate')('Max');
toGo.myBind3(bindObj, 'Kate')('Max');
    

// Реализация связанного списка LinkedList;

// class LinkedList {
//     constructor() {
//         this.head = null,
//         this.tail = null
//     }

//     append(data) {
//         const node = {data, next: null};
//         console.log("Это пришедшая нода", node)

//         if (this.tail) {
//             console.log("Это тейл когда он есть", this.tail)
//             this.tail.next = node;
//         }

//         if (!this.head) {
//             this.head = node;
//         }
//         this.tail = node
//     }

//     prepand(data) {
//         const node = {data, next: this.head};

//         if (!this.tail) {
//             this.tail = node;
//         }
//         this.head = node;
//     }
// }

// const list = new LinkedList;


// list.append('My');
// list.append('Name');
// list.prepand('Hi');

