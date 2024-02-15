// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):

// 0. Задача из сообщества телеграм;
function main() {    
    new Promise((resolve) => {
        console.log('NEW');
        resolve();
    })
    .then(() => {
        console.log(1);
    });
    
    console.log(2);

    new Promise((resolve, reject) => {
        console.log(3); // почему эот код выполняется так, как будто он ВНЕ промиса?
        setTimeout(() => {
            console.log(4);
        }, 0);
        resolve();
    })
    .then(() => {
        console.log(5);
    })

    console.log('LAST');
}

main();

// Вывод 'NEW'23'LAST'154;

// 1.

let promiseTwo = new Promise((resolve, reject) => {
   resolve("a");
});

promiseTwo
.then((res) => {
   return res + "b";
})
.then((res) => {
   return res + "с";
})
.finally((res) => {
   return res + "!!!!!!!";
})
.catch((res) => {
   return res + "d";
})
.then((res) => {
   console.log(res);
});

// Вывод abc;

// 2.
function doSmth() {
   return Promise.resolve("123");
}

doSmth()
.then(function (a) {
   console.log("1", a); //
   return a;
})
.then(function (b) {
   console.log("2", b);
   return Promise.reject("321");
})
.catch(function (err) {
   console.log("3", err);
})
.then(function (c) {
   console.log("4", c);
return c;
});

// Вывод
// 1 123
// 2 123
// 3 321
// 4 undefined

// 3. Напишите функцию, которая будет проходить через массив целых чисел и выводить индекс каждого элемента с задержкой в 3 секунды.
// Входные данные: [10, 12, 15, 21];

const numbers = [10, 12, 15, 21];

for (let i = 0; i < numbers.length; i += 1) {
    setTimeout(() => console.log(i), 3000 * i);
}

numbers.forEach((num, ind) => {
    setTimeout(() => console.log(ind), 3000 * ind)
})


// 4. Прочитать про Top Level Await (можно ли использовать await вне функции async);
// Top Level Await (TLA) — это возможность использовать оператор await вне функции async
// в модуле верхнего уровня.
// Эта функциональность была введена в ECMAScript 2022 (ES12).

// await Promise.resolve(console.log('🎉'));
// → 🎉

// Другие модули, которые импортируют Top Level Await также должны ждать его выполнения.
// То есть импортирующий модуль начнет выполнение своего тела только после завершения работы импорта с Top Level Await.
// Импортируемые модули загружаются в порядке написания (сверху вниз).
// Модуль с Top Level Await не блокирует загрузку других модулей.


// БОНУС ЗАДАНИЕ 
/* Необходимо реализовать функцию fetchUrl, которая будет использоваться следующим образом.
Внутри fetchUrl можно использовать условный метод fetch, который просто возвращает
Promise с содержимым страницы или вызывает reject */

// fetchUrl('https://google/com&#39;)
// .then(...)
// .catch(...) // сatch должен сработать только после 5 неудачных попыток
// получить содержимое страницы внутри fetchUrl


const fetchUrl = (url, trying = 5) => {
   return Promise.resolve()
   .then(() => fetch(url))
   .catch((e) => {
      trying -= 1;
      return trying ? fetchUrl(url, trying) : console.log('Fetch failed after trying number 5 -', e.message);
   });
}

const fetchUrl1 = async (url, trying = 5) => {
   try {
      let n = 0;
      while (n<5) {
         const data = await fetch(url);
         n += 1;
      }
   }
   catch (e) {
      console.log('Fetch1 failed after trying number 5 -', e.message);
   }
}

fetchUrl('URL');
fetchUrl1('URL');




