
# Map, Set, WeakMap and WeakSet

Ahora hemos aprendido acerca de las siguientes estructuras de datos complejas:

- Objetos para el almacenamiento de colecciones con clave.
- Arrays para el almacenamiento de colecciones ordenadas.

Pero eso no es suficiente para la vida real. Es por eso que `Map` y` Set` también existen.

## Map

[Map](mdn:js/Map) es una colección de elementos de datos con clave, al igual que un `Objet`. Pero la principal diferencia es que `Map` permite claves de cualquier tipo.

Los principales métodos son:

- `new Map()` -- crea el mapa.
- `map.set(key, value)` -- almacena el valor p0or la clave.
- `map.get(key)` -- devuelve el valor por la clave, `undefined` si`key` no existe en un mapa.
- `map.has(key)` -- devuelve `true` si la `key` existe, `false` en el caso contrario.
- `map.delete(key)` -- elimina el valor por la clave.
- `map.clear()` -- limpia el mapa
- `map.size` -- devuelve el recuento de elementos actual.
Por ejemplo:

```js run
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Como podemos ver, a diferencia de los objetos, las claves no se convierten en cadenas. Cualquier tipo de clave es posible.

**Map can also use objects as keys.**

Por ejemplo:
```js run
let john = { name: "John" };

// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Usar objetos como claves es una de las características más notables e importantes del `Map`. Para las claves de string, `Object` puede estar bien, pero sería difícil reemplazar el`Map` con un `Object` regular en el ejemplo anterior.

Antiguamente, antes de que existiera `Map`, las personas añadían identificadores únicos a los objetos para eso:

```js run
// we add the id field
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

// now store the value by id
visitsCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

...But `Map` is much more elegant.


##### "How `Map` compares keys"
Para probar los valores de equivalencia, `Map` usa el algoritmo [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Es aproximadamente igual a la igualdad estricta `===`, pero la diferencia es que `NaN` se considera igual a` NaN`. Así que `NaN` puede ser usado como la clave también.

Este algoritmo no se puede cambiar o personalizar.



##### "Chaining"

Cada llamada `map.set` devuelve el mapa en sí, por lo que podemos "encadenar" las llamadas:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```


## Map from Object

Cuando se crea un `Map`, podemos pasar un array (u otro iterable) con pares clave-valor así:
```js
// array of [key, value] pairs
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

Hay un método incorporado [Object.entries(obj)](mdn:js/Object/entries) que devuelve un array de pares clave/valor para un objeto exactamente en ese formato.

Entonces podemos inicializar un mapa desde un objeto como este:

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

Aquí, `Object.entries` devuelve el array de pares clave/valor:: `[ ["name","John"], ["age", 30] ]`. Eso es lo que necesita `Map` .

## Iteration over Map

Para hacer un bucle en un `mapa`, hay 3 métodos:

- `map.keys()` - devuelve un iterable para las teclas,
- `map.values()` - devuelve un iterable para los valores,
- `map.entries()` - devuelve un iterable para las entradas `[clave, valor]`, se usa por defecto en `for..of`.

Por ejemplo:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
```
##### "The insertion order is used"
La iteración va en el mismo orden en que se insertaron los valores. `Map` conserva este orden, a diferencia de un `Object` regular.

Además de eso, `Map` tiene un método `forEach` incorporado, similar a `Array`:

```js
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```


## Set

Un `Set` es una colección de valores, donde cada valor puede ocurrir solo una vez.

Sus principales métodos son:

- `new Set(iterable)` - crea el conjunto, opcionalmente a partir de un array de valores (cualquier iterable servirá).
- `set.add(valor)` - agrega un valor, devuelve el conjunto.
- `set.delete(value)` - elimina el valor, devuelve `true` si` value` existía en el momento de la llamada, de lo contrario, `false`.
- `set.has (value)` - devuelve `true` si el valor existe en el conjunto, de lo contrario,` false`.
- `set.clear ()` - elimina todo del conjunto.
- `set.size` - es el número de elementos.

Por ejemplo, tenemos visitantes que vienen y nos gustaría recordar a todos. Pero las visitas repetidas no deben llevar a duplicados. Un visitante debe ser "contado" una sola vez.
`Set` es lo correcto para eso:
```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

La alternativa a `Set` podría ser un array de usuarios, y el código para verificar duplicados en cada inserción utilizando [arr.find](mdn:js/ rray/find). Pero el rendimiento sería mucho peor, porque este método recorre todo el array comprobando cada elemento. `Set` está mucho mejor optimizado internamente para verificaciones de singularidad.
## Iteration over Set

Podemos recorrer un conjunto con `for..of` o usando `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

La función `forEach` en el `Set` tiene 3 argumentos: un valor, luego *nuevamente un valor*, y luego el objeto objetivo. De hecho, el mismo valor aparece en los argumentos dos veces.

Eso es por compatibilidad con `Map` donde `forEach` tiene tres argumentos. Parece un poco extraño, seguro. Pero puede ayudar a reemplazar `Map` con `Set` en ciertos casos con facilidad, y viceversa.

Los mismos métodos que `Map` tiene para los iteradores también son compatibles:

- `set.keys ()` - devuelve un objeto iterable para valores,
- `set.values ()` - igual que `set.keys`, por compatibilidad con `Map`,
- `set.entries ()` - devuelve un objeto iterable para las entradas `[value, value]`, existe por compatibilidad con `Map`.
## WeakMap and WeakSet

`WeakSet` es un tipo especial de `Set` que no evita que JavaScript elimine sus elementos de la memoria. `WeakMap` es lo mismo para `Map`.

Como sabemos por el capítulo <info:garbage-collection>, el motor de JavaScript almacena un valor en la memoria mientras es accesible (y potencialmente puede ser usado).

Por ejemplo:
```js
let john = { name: "John" };

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

*!*
// the object will be removed from memory
*/!*
```
Generalmente, las propiedades de un objeto o elementos de un array u otra estructura de datos se consideran accesibles y se mantienen en la memoria mientras que la estructura de datos se encuentra en la memoria.

Por ejemplo, si ponemos un objeto en un array, entonces mientras el array está vivo, el objeto también estará vivo, incluso si no hay otras referencias a ella.
Así:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // overwrite the reference

*!*
// john is stored inside the array, so it won't be garbage-collected
// we can get it as array[0]
*/!*
```

O, si usamos un objeto como clave en un `Map` regular, entonces mientras exista el `Map`, ese objeto también existe. Ocupa memoria y no puede ser recogido de basura.

Por ejemplo:
```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

*!*
// john is stored inside the map,
// we can get it by using map.keys()
*/!*
```

`WeakMap/WeakSet` son fundamentalmente diferentes en este aspecto. No evitan la recolección de basura de objetos clave.

Vamos a explicarlo comenzando con `WeakMap`.

La primera diferencia de `Map` es que las claves `WeakMap` deben ser objetos, no valores primitivos:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

*!*
// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
*/!*
```

Ahora, si usamos un objeto como clave en él, y no hay otras referencias a ese objeto, se eliminará de la memoria (y del mapa) automáticamente.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference

// john is removed from memory!
```

Compáralo con el ejemplo regular de `Map` arriba. Ahora bien, si `john` solo existe como clave de` WeakMap`, se eliminará automáticamente.

`WeakMap` no admite iteración y métodos `keys()`,`values ()`,`entries()`, por lo que no hay forma de obtener todas las claves o valores.

`WeakMap` tiene solo los siguientes métodos:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key, value)`
- `weakMap.has(key)`

¿Por qué tal limitación? Eso es por razones técnicas. Si un objeto ha perdido todas las demás referencias (como `john` en el código anterior), entonces se recolectará automáticamente. Pero técnicamente no se especifica exactamente * cuando ocurre la limpieza *.

El motor de JavaScript decide eso. Puede optar por realizar la limpieza de la memoria inmediatamente o esperar y realizar la limpieza más tarde cuando ocurran más eliminaciones. Por lo tanto, técnicamente no se conoce el recuento actual de elementos de `WeakMap`. El motor puede haberlo limpiado o no, o lo hizo parcialmente. Por esa razón, los métodos que acceden a `WeakMap` en su totalidad no son compatibles.
Ahora, ¿dónde necesitamos tal cosa?

La idea de `WeakMap` es que podemos almacenar algo para un objeto que debería existir solo mientras exista el objeto. Pero no obligamos al objeto a vivir por el mero hecho de que almacenemos algo para él.
```js
weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically
```

Eso es útil para situaciones en las que tenemos un almacenamiento principal para los objetos en algún lugar y necesitamos mantener información adicional, que solo es relevante mientras el objeto vive.

Veamos un ejemplo.

Por ejemplo, tenemos un código que mantiene un recuento de visitas para cada usuario. La información se almacena en un mapa: un usuario es la clave y el recuento de visitas es el valor. Cuando un usuario se va, ya no queremos almacenar su recuento de visitas.

Una forma sería hacer un seguimiento de los usuarios y, cuando se vayan, limpiar el mapa manualmente:

```js run
let john = { name: "John" };

// map: user => visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

// now john leaves us, we don't need him anymore
john = null;

*!*
// but it's still in the map, we need to clean it!
*/!*
alert( visitsCountMap.size ); // 1
// and john is also in the memory, because Map uses it as the key
```

Otra forma sería usar `WeakMap`:

```js
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

// now john leaves us, we don't need him anymore
john = null;

// there are no references except WeakMap,
// so the object is removed both from the memory and from visitsCountMap automatically
```

Con un `Map` regular, limpiar después de que un usuario se haya ido se convierte en una tarea tediosa: no solo necesitamos eliminar al usuario de su almacenamiento principal (ya sea una variable o un array), sino que también debemos limpiar los almacenamientos adicionales como `visitsCountMap`. Y puede volverse engorroso en casos más complejos cuando los usuarios se administran en un lugar del código y la estructura adicional está en otro lugar y no está obteniendo información sobre eliminaciones.

##### resumen
`WeakMap` puede simplificar las cosas, porque se limpia automáticamente. La información que contiene, como las visitas, cuenta en el ejemplo anterior, solo mientras el objeto clave exista.


`WeakSet` funciona similar:
- Es análogo a `Set`, pero solo podemos agregar objetos a `WeakSet` (no primitivos).
- Un objeto existe en el conjunto mientras que es accesible desde otro lugar.
- Al igual que `Set`, soporta `add`, `has` y `delete`, pero no `size`, `keys()`y no tiene iteraciones.

Por ejemplo, podemos usarlo para realizar un seguimiento de si se lee un mensaje:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// fill it with array elements (3 items)
let unreadSet = new WeakSet(messages);

// use unreadSet to see whether a message is unread
alert(unreadSet.has(messages[1])); // true

// remove it from the set after reading
unreadSet.delete(messages[1]); // true

// and when we shift our messages history, the set is cleaned up automatically
messages.shift();

*!*
// no need to clean unreadSet, it now has 2 items
*/!*
// (though technically we don't know for sure when the JS engine clears it)
```

La limitación más notable de `WeakMap` y `WeakSet` es la ausencia de iteraciones y la incapacidad de obtener todo el contenido actual. Esto puede parecer inconveniente, pero no impide que `WeakMap/WeakSet` haga su trabajo principal: ser un almacenamiento “adicional” de datos para objetos que se almacenan / administran en otro lugar.

## Summary

Colecciones regulares:
- `Map` - es una colección de valores con clave.

     Las diferencias de un `Object` regular:

     - Cualquier llave, los objetos pueden ser llaves.
     - Iterar en el orden de inserción.
     - Métodos convenientes adicionales, la propiedad `size`.

- `Set` -- Es una colección de valores únicos.

     - A diferencia de un array, no permite reordenar elementos.
     - Mantiene el orden de inserción.

Colecciones que permiten la recolección de basura:

- `WeakMap` -- una variante de `Map` que permite solo objetos como claves y los elimina una vez que se vuelven inaccesibles por otros medios.

     - No admite operaciones en la estructura como un todo: ni `size`, ni `clear()`, ni iteraciones.

- `WeakSet` -- es una variante de `Set` que solo almacena objetos y los elimina una vez que se vuelven inaccesibles por otros medios.

    - Tampoco soporta `size/clear ()` e iteraciones.

`WeakMap` y` WeakSet` se utilizan como estructuras de datos "secundarias" además del almacenamiento de objetos "principal". Una vez que el objeto se elimina del almacenamiento principal, si solo se encuentra en `WeakMap/WeakSet`, se limpiará automáticamente.