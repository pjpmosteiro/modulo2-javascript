# Array methods

Las matrices proporcionan muchos métodos. Para facilitar las cosas, en este capítulo se dividen en grupos.
## Add/remove items

Ya conocemos métodos que agregan y eliminan elementos desde el principio o el final:

- `arr.push(...items)` -- añade elementos al final,
- `arr.pop()` -- extrae elementos del final,
- `arr.shift()` -- extrae elementos del principio,
- `arr.unshift(...items)` -- añade elementos al principio.

Aquí hay algunos otros.

### splice

¿Cómo eliminar un elemento del array?

Las matrices son objetos, así que podemos intentar usar `delete`:
```js run
let arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
```


Se eliminó el elemento, pero el array todavía tiene 3 elementos, podemos ver que `arr.length == 3`.

Eso es natural, porque `delete obj.key` elimina un valor con la tecla`. Es todo lo que hace. Bien para objetos. Pero para los arreglos generalmente queremos que el resto de elementos se desplacen y ocupen el lugar liberado. Esperamos tener una matriz más corta ahora.

Por lo tanto, deben utilizarse métodos especiales.

EL método [arr.splice(str)](mdn:js/Array/splice) es una navaja suiza para arrays. Puede hacer de todo: añadir, eliminar e insertar elementos.

La sintaxis es:

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```

Comienza desde la posición `index`: elimina los elementos` deleteCount` y luego inserta `elem1, ..., elemN` en su lugar. Devuelve el array de elementos eliminados.

Este método es fácil de comprender mediante ejemplos.

Vamos a empezar con la eliminación:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // from index 1 remove 1 element
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Fácil, ¿verdad? A partir del índice `1` se eliminó el elemento `1`.

En el siguiente ejemplo, eliminamos 3 elementos y los reemplazamos con los otros dos:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now [*!*"Let's", "dance"*/!*, "right", "now"]
```

Aquí podemos ver que `splice` devuelve la matriz de elementos eliminados:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array of removed elements
```

El método `splice` también puede insertar los elementos sin ningún tipo de eliminación. Para eso necesitamos establecer `deleteCount` en` 0`:

```js run
let arr = ["I", "study", "JavaScript"];

// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

##### "Negative indexes allowed"
Aquí y en otros métodos de array se permiten índices negativos. Especifican la posición desde el final del array, como aquí:

```js run
let arr = [1, 2, 5];

// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```


### slice

EL método [arr.slice](mdn:js/Array/slice) mucho más simple que `arr.splice`.

LA sintaxis es:

```js
arr.slice(start, end)
```

Devuelve un array que contiene todos los elementos del índice `"start"` a `"end "` (sin incluir `"end"`). Tanto `start` como` end` pueden ser negativos, en ese caso se asume la posición desde el final de la matriz.

Funciona como `str.slice`, pero crea subarrays en lugar de subcadenas.

Por ejemplo:

```js run
let str = "test";
let arr = ["t", "e", "s", "t"];

alert( str.slice(1, 3) ); // es
alert( arr.slice(1, 3) ); // e,s

alert( str.slice(-2) ); // st
alert( arr.slice(-2) ); // s,t
```

### concat


El método [arr.concat](mdn: js / Array / concat) une el array con otros arrays y/o elementos.

La sintaxis es:

```js
arr.concat(arg1, arg2...)
```

Acepta cualquier número de argumentos, ya sea arrays o valores.

El resultado es un nuevo array que contiene elementos de `arr`, luego` arg1`, `arg2` etc.

Si un argumento es un array o tiene la propiedad `Symbol.isConcatSpreadable`, todos sus elementos se copian. De lo contrario, el argumento en sí se copia.

Por ejemplo:

```js run
let arr = [1, 2];

// merge arr with [3,4]
alert( arr.concat([3, 4])); // 1,2,3,4

// merge arr with [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// merge arr with [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```

Normalmente, solo copia los elementos de los arrays (los "extiende"). Otros objetos, incluso si parecen arrays, agregados en conjunto:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
//[1, 2, arrayLike]
```

... Pero si un objeto similar a un array tiene la propiedad `Symbol.isConcatSpreadable`, sus elementos se agregan en su lugar:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## Iterate: forEach

El método [arr.forEach](mdn:js/Array/forEach) permite ejecutar una función para cada elemento del array.

La sintaxis:
```js
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

Por ejemplo, esto muestra cada elemento del array:

```js run
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

Y este código es más elaborado sobre sus posiciones en el array de destino:
```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

El resultado de la función (si se devuelve) se desecha y se ignora.

## Searching in array

Estos son métodos para buscar algo en un array.

### indexOf/lastIndexOf and includes

LOs métodos [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) y [arr.includes](mdn:js/Array/includes) tienen la misma sintaxis y hacen esencialmente lo mismo que sus homólogos de string, pero operan en elementos en lugar de en caracteres:

- `arr.indexOf(item, from)` busca `item` a partir del índice `from`, y devuelve el índice donde se encontró, de lo contrario, `-1`.
- `arr.lastIndexOf(item, from)` -- igual, pero mira de derecha a izquierda.
- `arr.includes(item, from)` -- busca `item` a partir del índice` from`, devuelve `true` si se encuentra.

POr ejemplo:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Tenga en cuenta que los métodos usan `===` comparación. Entonces, si buscamos `false`, encuentra exactamente `false` y no el cero.

Si queremos verificar su inclusión y no queremos saber el índice exacto, entonces se prefiere `arr.includes`.

Además, una diferencia muy pequeña de `include` es que maneja correctamente` NaN`, a diferencia de `indexOf / lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (should be 0, but === equality doesn't work for NaN)
alert( arr.includes(NaN) );// true (correct)
```

### find and findIndex

Imagina que tenemos una variedad de objetos. ¿Cómo encontramos un objeto con la condición específica?

Aquí el método [arr.find](mdn:js/Array/find) es útil.

La sintaxis es:
```js
let result = arr.find(function(item, index, array) {
  // should return true if the item is what we are looking for
});
```

La función se llama repetitivamente para cada elemento del array:

- `item` es el elemento.
- `index` es su índice.
- `array` es el propio array.

Si devuelve `true`, la búsqueda se detiene, se devuelve el` item`. Si no se encuentra nada, se devuelve `undefined`.
For example, we have an array of users, each with the fields `id` and `name`. Let's find the one with `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

En la vida real, los arreglos de objetos son una cosa común, por lo que el método `find` es muy útil.

Tenga en cuenta que en el ejemplo proporcionamos a `find` la función `item => item.id == 1` con un argumento. Otros argumentos de esta función son raramente utilizados.

El método [arr.findIndex](mdn:js/Array/findIndex) es esencialmente el mismo, pero devuelve el índice donde se encontró el elemento en lugar del elemento en sí.

### filter

El método `find` busca un único elemento (el primero) que hace que la función devuelva `true`.

Si puede haber muchos, podemos usar [arr.filter (fn)](mdn:js/Array/filter).

La sintaxis es aproximadamente igual a `find`, pero devuelve un array de elementos coincidentes:

```js
let results = arr.filter(function(item, index, array) {
  // should return true if the item passes the filter
});
```

Por ejemplo:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Transform an array

Esta sección trata sobre los métodos para transformar o reordenar el array.


### map

El método [arr.map](mdn:js/Array/map)es uno de los más usados y útiles.
The syntax is:

```js
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
})
```

Llama a la función para cada elemento del array y devuelve el array de resultados.

Por ejemplo, aquí transformamos cada elemento en su longitud:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)
EL método [arr.sort](mdn:js/Array/sort) ordena el array *en su lugar*

Por ejemplo:

```js run
let arr = [ 1, 2, 15 ];

// the method reorders the content of arr (and returns it)
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

¿Notaste algo extraño en el resultado?

El orden se convirtió en `1, 15, 2`. Incorrecto. ¿Pero por qué?
**The items are sorted as strings by default.**

Literalmente, todos los elementos se convierten en strings y luego se comparan. Por lo tanto, se aplica el ordenamiento lexicográfico y, de hecho, `" 2 ">" 15 "`.

Para usar nuestro propio orden de clasificación, necesitamos proporcionar una función de dos argumentos como el argumento de `arr.sort ()`.

La función debería funcionar así:
```js
function compare(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
```

POr ejemplo:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Ahora funciona según lo previsto.

Pongámonos a un lado y pensemos qué está pasando. El `arr` puede ser un array de cualquier cosa, ¿verdad? Puede contener números o strings o elementos html o lo que sea. Tenemos un conjunto de *algo*. Para clasificarlo, necesitamos una *función de ordenación* que sepa comparar sus elementos. El valor predeterminado es un orden de string.

EL método `arr.sort(fn)` tiene una implementación incorporada de algoritmo de clasificación. No es necesario que nos importe cómo funciona exactamente (un [quicksort] optimizado (https://en.wikipedia.org/wiki/Quicksort) la mayor parte del tiempo). Recorrerá el array, comparará sus elementos usando la función provista y los reordenará, todo lo que necesitamos es proporcionar el `fn` que hace la comparación.
Por cierto, si alguna vez queremos saber qué elementos se comparan, nada impide alertarlos:


```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```

El algoritmo puede comparar un elemento varias veces en el proceso, pero trata de hacer la menor cantidad de comparaciones posible.

##### "A comparison function may return any number"
En realidad, solo se requiere una función de comparación para devolver un número positivo para decir "mayor" y un número negativo para decir "menos".

Eso permite escribir funciones más cortas:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```


##### "Arrow functions for the best"
Recuerdas [arrow functions](info:function-expressions-arrows#arrow-functions)? Podemos usarlos aquí para una clasificación más ordenada:

```js
arr.sort( (a, b) => a - b );
```

Esto funciona exactamente igual que la otra versión más larga, más arriba.

### reverse

El método [arr.reverse](mdn:js/Array/reverse) invierte el orden de los elementos en `arr`.
Por ejemplo:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

También devuelve el array `arr` después de la reversión.

### split and join

Aquí está la situación de la vida real. Estamos escribiendo una aplicación de mensajería, y la persona ingresa a la lista de receptores delimitados por comas: `John, Pete, Mary`. Pero para nosotros una serie de nombres sería mucho más cómoda que una sola cadena. ¿Cómo conseguirlo?

El método [str.split (delim)](mdn:js/String/split) hace exactamente eso. Divide la cadena en una matriz por el delimitador dado `delim`.

En el siguiente ejemplo, nos dividimos por una coma seguida de espacio:
```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
```

El método `split` tiene un segundo argumento numérico opcional: un límite en la longitud del array. Si se proporciona, los elementos adicionales se ignoran. En la práctica, rara vez se utiliza:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

##### "Split into letters"
La llamada a `split (s)` con un `s` vacío dividiría el string en unarray de letras:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```

La llamada [arr.join (separador)](mdn:js/Array/join) hace lo contrario a `split`. Crea una cadena de elementos `arr` pegados por` separator` entre ellos.
Por ejemplo:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

Cuando necesitamos iterar sobre una matriz, podemos usar `forEach`,` for` o `for..of`.

Cuando necesitamos iterar y devolver los datos para cada elemento, podemos usar `map`.

Los métodos [arr.reduce](mdn:js/Array/reduce) y [arr.reduceRight](mdn:js/Array/reduceRight) también pertenecen a esa raza, pero son un poco más intrincados. Se utilizan para calcular un valor único basado en la matriz.

La sintaxis es:

```js
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, initial);
```

La función se aplica a los elementos. Puedes notar los argumentos familiares, comenzando desde el segundo:

- `item` - es el elemento del array actual.
- `index` - es su posición.
- `array` - es el array.

Hasta ahora, como `forEach/map`. Pero hay un argumento más:

- `previousValue` - es el resultado de la llamada de función anterior,` initial` para la primera llamada.

La forma más fácil de comprender esto es con el ejemplo.

Aquí obtenemos una suma de array en una línea:
```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

Aquí usamos la variante más común de `reduce` que usa solo 2 argumentos.

Veamos los detalles de lo que está pasando.

1. En la primera ejecución, `sum` es el valor inicial (el último argumento de `reduce`), es igual a `0`, y` current` es el primer elemento del array, es igual a `1`. Entonces el resultado es `1`.
2. En la segunda ejecución, `sum = 1`, le agregamos el segundo elemento del array (` 2`) y regresamos.
3. En la tercera ejecución, `sum = 3` y le agregamos un elemento más, y así sucesivamente ...

El flujo de cálculo:
![](reduce.png)

O en la forma de una tabla, donde cada fila representa es una llamada de función en el siguiente elemento del array:
|   |`sum`|`current`|`result`|
|---|-----|---------|---------|
|primera llamada|`0`|`1`|`1`|
|segunda llamada|`1`|`2`|`3`|
|tercera llamda|`3`|`3`|`6`|
|cuarta llamada|`6`|`4`|`10`|
|quinta llamada|`10`|`5`|`15`|


Como podemos ver, el resultado de la llamada anterior se convierte en el primer argumento de la siguiente.

También podemos omitir el valor inicial:

```js run
let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

El resultado es el mismo. Eso es porque si no hay una inicial, entonces `reduce` toma el primer elemento del array como el valor inicial y comienza la iteración desde el segundo elemento.

La tabla de cálculo es la misma que la anterior, menos la primera fila.

Pero tal uso requiere un cuidado extremo. Si el array está vacíao entonces la llamada `reduce` sin valor inicial genera un error.

Aquí hay un ejemplo:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value
// if the initial value existed, reduce would return it for the empty arr.
arr.reduce((sum, current) => sum + current);
```


Por eso se aconseja especificar siempre el valor inicial.

El método [arr.reduceRight](mdn:js/Array/reduceRight) hace lo mismo, pero va de derecha a izquierda.


## Array.isArray

Las matrices no forman un tipo de idioma separado. Se basan en objetos.

Así que `typeof` no ayuda a distinguir un objeto plano de un array:

```js run
alert(typeof {}); // object
alert(typeof []); // same
```

... Pero los arreglos se usan tan a menudo que hay un método especial para eso: [Array.isArray(value)](mdn:js/Array/isArray). Devuelve `true` si el `value` es una matriz, y `false` de lo contrario.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Most methods support "thisArg"

Casi todos los métodos de array que llaman a funciones, como `find`,` filter`, `map`, con una notable excepción de` sort`, aceptan un parámetro adicional opcional `thisArg`.

Ese parámetro no se explica en las secciones anteriores, porque rara vez se usa. Pero para ser completos tenemos que cubrirlo.

Aquí está la sintaxis completa de estos métodos:
```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument
```
El valor del parámetro `thisArg` se convierte en `this` para `func`.

Por ejemplo, aquí usamos un método de objeto como filtro y `thisArg` es muy útil:

```js run
let user = {
  age: 18,
  younger(otherUser) {
    return otherUser.age < this.age;
  }
};

let users = [
  {age: 12},
  {age: 16},
  {age: 32}
];

*!*
// find all users younger than user
let youngerUsers = users.filter(user.younger, user);
*/!*

alert(youngerUsers.length); // 2
```

En la llamada anterior, usamos `user.younger` como filtro y también proporcionamos a `user` como el contexto para ello. Si no proporcionáramos el contexto, `users.filter(user.younger)` llamaría a `user.younger` como una función independiente, con `this=undefined`. Eso significaría un error instantáneo.

## Summary

Una hoja de trucos de los métodos de arrays:

- Para añadir/eliminar elementos:
  - `push(...items)` -- añade elementos al final,
  - `pop()` --  extrae un elemento del final,
  - `shift()` -- extrae un elemento del principio,
  - `unshift(...items)` -- añade elementos al principio.
  - `splice(pos, deleteCount, ...items)` -- en el índice `pos` deleteborra los elementos `deleteCount` e inserte `items`.
  - `slice(start, end)` -- crea un nuevo array, copia elementos de la posicion `start` hasta `end` (no incluido) en el.
  - `concat(...items)` -- devuelve un array: copia todos los miembros de la actual y le agrega `items`. Si cualquiera de `items` es un array, entonces se toman sus elementos.


- Para buscar entre los elementos:
  - `indexOf/lastIndexOf(item, pos)` -- busca `item` comenzando desde la posición `pos`,devuelve el índice o `-1` si no lo encuentra.
  - `includes(value)` -- devuelve `true` si el array tiene `value`, de lo contrario `false`.
  - `find/filter(func)` -- filtra elementos a través de la función, devuelve el primero a todos los valores que hacen que devuelva `true`.
  - `findIndex` es como `find`, pero devuelve el índice en lugar de un valor.
  
- Para iterar sobre los elementos:
  - `forEach(func)` -- llama `func` para cada elemento, no devuelve nada.

- PAra transformar un array:
  - `map(func)` -- crea un nuevo array a partir de los resultados de la llamada a `func` por cada elemento.
  - `sort(func)` --ordena el array en el lugar, luego lo devuelve.
  - `reverse()` -- invierte el array en el lugar, y luego la devuelve.
  - `split/join` -- cconvierte un string en un array y viceversa.
  - `reduce(func, initial)` --calcula un valor único sobre la matriz llamando a`func` para cada elemento y pasando un resultado intermedio entre las llamadas.

- Adicionalmente:
  - `Array.isArray(arr)` comprueba que `arr` es un array.

Tenga en cuenta que los métodos `sort`, `reverse` y `splice` modifican el array.

Estos métodos son los más utilizados, cubren el 99% de los casos de uso. Pero hay pocos más

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) comprueba el array.

  La función `fn` se llama en cada elemento del array similar a `map`. Si alguno/todos los resultados son `true`, devuelve` true`, de lo contrario `false`.
- [arr.fill(value, start, end)](mdn:js/Array/fill) -- llena el array con la repetición de `value` desde el índice `start` hasta `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copia los elementos desde la posición `start` hasta la posición `end` en *si mismo*, en la posición `target` (sobrescribe la existentee).

Para la lista completa, vea [manual](mdn:js/Array).

From the first sight it may seem that there are so many methods, quite difficult to remember. But actually that's much easier than it seems.

Mira a través de la hoja de trucos para estar al tanto de ellos. Luego resuelva las tareas de este capítulo para practicar, de modo que tenga experiencia con los métodos de array.

Luego, cada vez que necesite hacer algo con un array y no sepa cómo, venga aquí, mire la hoja de trucos y encuentre el método correcto. Los ejemplos te ayudarán a escribirlo correctamente. Pronto recordarás automáticamente los métodos, sin esfuerzos específicos de tu parte.