La solución simple podría ser:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Eso funciona un poco, porque `Math.random() - 0.5` es un número aleatorio que puede ser positivo o negativo, por lo que la función de clasificación reordena los elementos al azar.

Pero debido a que la función de clasificación no debe usarse de esta manera, no todas las permutaciones tienen la misma probabilidad.

Por ejemplo, considere el siguiente código. Ejecuta `shuffle` 1000000 veces y cuenta las apariencias de todos los resultados posibles:
```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// counts of appearances for all possible permutations
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Un resultado de ejemplo (para V8, julio de 2017):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Podemos ver el sesgo claramente: `123` y` 213` aparecen mucho más a menudo que otros.

El resultado del código puede variar entre los motores de JavaScript, pero ya podemos ver que el enfoque no es confiable.

¿Por qué no funciona? En términos generales, `sort` es una" caja negra ": lanzamos un array y una función de comparación en ella y esperamos que el array se clasifique. Pero debido a la absoluta aleatoriedad de la comparación, la caja negra se vuelve loca, y cómo exactamente se vuelve loca depende de la implementación concreta que difiera entre los motores.

Hay otras buenas maneras de hacer la tarea. Por ejemplo, hay un gran algoritmo llamado [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). La idea es recorrer la matriz en el orden inverso e intercambiar cada elemento por uno aleatorio antes de él:
```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}
```

Vamos a probarlo de la misma manera:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// counts of appearances for all possible permutations
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```
El ejemplo de salida:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```
Se ve bien ahora: todas las permutaciones aparecen con la misma probabilidad.

Además, en cuanto al rendimiento, el algoritmo de Fisher-Yates es mucho mejor, no hay gastos generales de "clasificación".