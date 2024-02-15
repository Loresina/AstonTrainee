import assert from 'assert';

// 1. Какие бывают алгоритмы сортировок?

// ПРОСТЫЕ

// !1. Сортировка пузырьком - O(n^2);
// Последовательный проход в цикле стоящих рядом пар значений,
// меньшее переставляем на первое место.
// Реализуется через цикл в цикле.

// 2. Сортировка перемешиванием (шейкерная сортировка) - O(n^2);
// Вариант пузырьковой сортировки. Она двунаправлена.

// 3. Сортировка расчёской - нестабильна - от O(n^2) до O(n * logn);
// Вариант пузырьковой сортировки. При помощи коэфициента
// (фактора уменьшения = 1,247) расчитывается max расстояние
// между сравниваемыми значениями. На след. проходке расстояние уменьшается,
// пока не достигнет минимального - это соседние элементы.

// 4. Сортировка вставками - O(n^2);
// Каждый следующий элемент списка сравнивается с предыдушим
// и меняется с ним местами, если он меньше.
// Цикл в цикле.

// 5. Алгоритм выбора - O(n^2);
// Ищем в массиве минимальный элемент и ставим его на 1ое место,
// на каждой итерации цикла стартовая точка сдвигается на 1,
// то есть каждая последующая проходка происходит по меньшему массиву.
// Реальная сложность уменьшается, но формально все равно приравнивается к O(n^2);

// ЭФФЕКТИВНЫЕ

// !6. Быстрая сортировка (Хоара - информатик  Тони Хоара) - O(n * logn);
// рекурсивно, массив делился на 2 подмассива и сортируется по опорной точке:
// число меньше опорной - слева, больше - справа.
// когда массив достигнет 1 - выход из рекурсии и склеивание массива.

// !7. Сортировка слиянием - O(n * logn);
// Здесь массив разбивается на две примерно равные части,
// затем еще на части до самых метких.
// Каждая из частей сортируется по отдельности.
// Затем отсортированные подмассивы сливаются в один.

// Пирамидальная сортировка - O(n * logn);
// Сортировка при помощи построения бинарного дерева,
// где родительские элементы меньше дочерних.
// Рекурсивно. 

// 2. Прочитать про "Операторы и выражения, циклы в JS";

// ОПЕРАТОРЫ
// бинарные
// унарные операторы
// тернарный оператор

// ВЫРАЖЕНИЯ

// ЦИКЛЫ
// for
// do...while
// while
// for...in
// for...of

// Метка (label)
// break
// continue


// 3. Создать объект Person несколькими способами,
// после создать объект Person2, чтобы в нём были доступны методы объекта Person.
// Добавить метод logInfo чтоб он был доступен всем объектам.

// Способ 1: Литерал объекта;
const Person = {
      name: '',
      surname: '',
      age: 0,
      greeting() {
        console.log(`Hello, my name is ${this.name} ${this.surname}, I'm ${this.age} years old.`);
      }
};
    
// Способ 2: Функция-конструктор;
function PersonConstructor(name, surname, age) {
      this.name = name;
      this.surname = surname;
      this.age = age;

      // this.greeting = function () {
      //       console.log(`Hello, my name is ${this.name} ${this.surname}, I'm ${this.age} years old.`);
      //     }
}

PersonConstructor.prototype.greeting = function () {
      console.log(`Hello, my name is ${this.name} ${this.surname}, I'm ${this.age} years old.`);
};


// Создание объекта Person2, наследующего методы объекта Person;

function Person2(name, surname, age) {
      PersonConstructor.call(this, name, surname, age); // вызываем конструктор PersonConstructor в контексте текущего;
}

Person2.prototype = Object.create(PersonConstructor.prototype); // установка прототипа;
Person2.prototype.constructor = Person2; // установка переопределенного в предыдущем шаге конструктора;
    
 // Добавление метода logInfo, доступного всем объектам;
 PersonConstructor.prototype.logInfo = function () {
   console.log(`loInfo for ${this.name} ${this.surname}`);
 };
 

// Пример использования;

const me = new PersonConstructor('Kate', 'Volynshchikova', 37);
const notMe = new Person2('Masha', 'lubimova', 15);

console.log('Это прототип notMe', Object.getPrototypeOf(notMe));
console.log('Это прототип notMe', Person2.prototype.constructor);
console.log(notMe instanceof Person2);
console.log(notMe instanceof PersonConstructor);


me.greeting(); // Hello, my name is Kate Volynshchikova, I'm 37 years old.
notMe.greeting(); // Hello, my name is Masha lubimova, I'm 15 years old.
me.logInfo(); // loInfo for Kate Volynshchikova
notMe.logInfo(); //loInfo for Masha lubimova


// 4. Создать класс PersonThree c get и set для поля name и конструктором, сделать класс наследник от класса Person.

class PersonThree extends PersonConstructor {
      constructor(name, surname, age) {
        super(name, surname, age);
      }

      get personName() {
            console.log(this.name);
      }
        
      set personName(newName) {
            this.name = newName;
      }
}

const newPerson = new PersonThree('Kristi', 'Spase', 52);

newPerson.personName = 'newKristi';
newPerson.personName; // newKristi
newPerson.greeting(); // Hello, my name is newKristi Spase, I'm 52 years old.
newPerson.logInfo(); // loInfo for newKristi Spase


// БОНУС;
// 1. Написать функцию, которая вернет массив с первой парой чисел, сумма которых равна total:

const newLocal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 20];
const total = 13;
const bigTotal = 104;
//result = [4, 9]

// ВАРИАНТ 1

const firstSum = (arr, total) => {
      for (let i = 0; i < arr.length; i += 1) {
            const first = arr[i];
            const last = arr[arr.length - 1];

            if (first + last > total) {
                  return firstSum(arr.slice(0, -1), total);
            }
            if (first + last < total) {
                  return firstSum(arr.slice(1), total);
            }
            if (first + last === total) {
                  return [first, last];
            }
      }
      return 'Sum is not found';       
}

// ВАРИАНТ 2

const firstSum2 = (arr, total) => {      
      let left = 0;
      let right = arr.length - 1;
    
      while (left < right) {
        const currentSum = arr[left] + arr[right];
    
        if (currentSum === total) {
          return [arr[left], arr[right]];
        } 
        if (currentSum < total) {
          left++;
        } else {
          right--;
        }
      }
      return 'Sum is not found';
    };
    

firstSum(newLocal, total);  // [4, 9]
firstSum2(newLocal, total); // [4, 9]

assert.deepStrictEqual(firstSum(newLocal, total), [4, 9], "it is false");
assert.deepStrictEqual(firstSum(newLocal, bigTotal), 'Sum is not found', "it is false");


// 2. Какая сложность у вашего алгоритма?

// сложность у функции firstSum - O(n) - "линейная сложность", функция проходит по массиву 1 раз,
// но эта функция потребит много памяти, так как каждый ее вызов создаст новый контекст выполнения.

// сложность у функции firstSum2 - O(n) - "линейная сложность", функция проходит по массиву 1 раз;
