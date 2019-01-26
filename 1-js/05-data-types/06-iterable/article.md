
# Iterables

Objetos *Iterable * es una generalización de arrays. Ese es un concepto que permite hacer que cualquier objeto sea utilizable en un bucle `for..of`.

Por supuesto, las matrices son iterables. Pero hay muchos otros objetos incorporados, que también son iterables. Por ejemplo, las cadenas son iterables también. Como veremos, muchos operadores y métodos integrados dependen de ellos.

Si un objeto representa una colección (lista, conjunto) de algo, entonces `for..of` es una gran sintaxis para recorrerlo, así que veamos cómo hacerlo funcionar.


## Symbol.iterator

Podemos comprender fácilmente el concepto de iterables haciendo uno de los nuestros.

Por ejemplo, tenemos un objeto, que no es un array, pero parece adecuado para `for..of`.

Como un objeto `range` que representa un intervalo de números:
```js
let range = {
  from: 1,
  to: 5
};

// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5
```

Para hacer que el `rango` sea iterable (y así dejar que` for..of` funcione) necesitamos agregar un método al objeto llamado `Symbol.iterator` (un símbolo especial incorporado solo para eso).

1. Cuando se inicia `for..of`, llama a ese método una vez (o errores si no se encuentra). El método debe devolver un * iterator * - un objeto con el método `next`.
2. En adelante, `for..of` funciona *solo con el objeto devuelto*.
3. Cuando `for..of` quiere el siguiente valor, llama a `next ()`en ese objeto.
4. El resultado de `next()` debe tener la forma `{done: Boolean, value: any}`, donde `done=true` significa que la iteración ha finalizado, de lo contrario, `value` debe ser el nuevo valor.

Aquí está la implementación completa para `range`:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

  // ...it returns the iterator object:
  // 2. Onward, for..of works only with this iterator, asking it for next values
  return {
    current: this.from,
    last: this.to,      

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// now it works!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Tenga en cuenta la característica principal de iterables: una importante separación de inquietudes:

- El `rango` en sí mismo no tiene el método `next()`.
- En su lugar, otro objeto, un llamado "iterator" se crea mediante la llamada a `range[Symbol.iterator]()`, y maneja toda la iteración.

Por lo tanto, el objeto iterador está separado del objeto sobre el que se itera.

Técnicamente, podemos combinarlos y usar `range` en sí mismo como el iterador para simplificar el código.
Así:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Ahora `range[Symbol.iterator]()` devuelve el objeto `range` en sí mismo: tiene el método `next()`necesario y recuerda el progreso de la iteración actual en `this.current`. ¿Más corta? Sí. Y a veces eso también está bien.

Lo malo es que ahora es imposible tener dos bucles `for..of` que se ejecuten sobre el objeto simultáneamente: compartirán el estado de iteración, porque solo hay un iterador: el objeto en sí. Pero dos for-ofs paralelos es una cosa rara, factible con algunos escenarios asíncronos.

##### "Infinite iterators"
Los iteradores infinitos también son posibles. Por ejemplo, `range` se vuelve infinito para`range.to = Infinity`. O podemos hacer un objeto iterable que genere una secuencia infinita de números pseudoaleatorios. También puede ser útil.

No hay limitaciones en `next`, puede devolver más y más valores, eso es normal.

Por supuesto, el bucle `for..of` sobre un tal iterable sería interminable. Pero siempre podemos detenerlo usando `break`.




## String is iterable

Los  los iterables  más  utilizados son arrays y strings.

Para un string, `for..of` se desplaza sobre sus caracteres:

```js run
for (let char of "test") {
  // triggers 4 times: once for each character
  alert( char ); // t, then e, then s, then t
}
```

¡Y funciona correctamente con pares sustitutos!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}
```

## Calling an iterator explicitly

Normalmente, las partes internas de iterables están ocultas del código externo. Hay un bucle `for..of`, que funciona, eso es todo lo que necesita saber.

Pero para comprender un poco más las cosas, veamos cómo crear un iterador explícitamente.

Recorreremos un string de la misma manera que `for..of`, pero con llamadas directas. Este código obtiene un iterador de cadena y lo llama "manualmente":

```js run
let str = "Hello";

// does the same as
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // outputs characters one by one
}
```

Rara vez es necesario, pero nos da más control sobre el proceso que `for..of`. Por ejemplo, podemos dividir el proceso de iteración: iterar un poco, luego detenernos, hacer otra cosa y luego reanudar más tarde.

## Iterables and array-likes [#array-like]

Hay dos términos oficiales que parecen similares, pero son muy diferentes. Por favor, asegúrese de que los entienden bien para evitar la confusión.

- * Iterables * son objetos que implementan el método `Symbol.iterator`, como se describe anteriormente.
- * Array-likes * son objetos que tienen índices y `lenght`, por lo que se ven como arrays.

Naturalmente, estas propiedades se pueden combinar. Por ejemplo, strings son tanto iterables (`for..of` funciona en ellas) como de tipo array (tienen índices numéricos y `lenght`).

Pero un iterable puede no ser como un array. Y viceversa, algo parecido a un array puede no ser iterable.

Por ejemplo,`range` en el ejemplo anterior es iterable, pero no como una matriz, porque no tiene propiedades indexadas y `lenght`.

Y aquí está el objeto que es similar a un array, pero no iterable:

```js run
let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

¿Qué tienen en común? Tanto iterables como parecidos a arrays no son normalmente arrays, no tienen `push`,` pop`, etc. Eso es bastante inconveniente si tenemos un objeto de este tipo y queremos trabajar con él como con un array.
## Array.from

Hay un método universal [Array.from](mdn:js/Array/from) que los une. Toma un valor iterable o similar a un array y crea un "array" "real" a partir de ella. Entonces podemos llamar a los métodos de matriz en él.

Por ejemplo:
```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (method works)
```

`Array.from` en la línea `(*) `toma el objeto, lo examina para que sea un iterable o similar a un array, luego crea un nuevo array y copia allí todos los elementos.

Lo mismo sucede con un iterable:

```js
// assuming that range is taken from the example above
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString conversion works)
```

La sintaxis completa para `Array.from` permite proporcionar una función de "mapeo" opcional:
```js
Array.from(obj[, mapFn, thisArg])
```

El segundo argumento `mapFn` debe ser la función que se aplique a cada elemento antes de agregarlo a la matriz, y `thisArg` permite configurar `this` para ello.

Por ejemplo:
```js
// assuming that range is taken from the example above

// square each number
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Aquí usamos `Array.from` para convertir un string en un array de caracteres:

```js run
let str = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

A diferencia de `str.split`, se basa en la naturaleza iterable de la cadena y así, al igual que `for..of`, funciona correctamente con pares sustitutos.

Técnicamente aquí hace lo mismo que:

```js run
let str = '𝒳😂';

let chars = []; // Array.from internally does the same loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...Pero es más corto.    

Incluso podemos construir `slice` para el sustituto:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
```


## Summary

Los objetos que se pueden usar en `for..of` se llaman *iterable*.

- Técnicamente, los iterables deben implementar el método denominado. `Symbol.iterator`.
    - El resultado de `obj[Symbol.iterator]` se llama un *iterator*. Maneja el proceso de iteración posterior.
    - Un iterador debe tener el método llamado `next()` que devuelve un objeto `{done: Boolean, value: any}`, here `done:true` denota el final de la ieteración, de lo contrario,`value` es el siguiente valor.
- El método `Symbol.iterator` es llamado automáticamente por` for..of`, pero también podemos hacerlo directamente.
- Los iterables incorporados como strings o arrays, también implementan `Symbol.iterator`.
- El iterador de strings sabe acerca de los pares sustitutos.

Los objetos que tienen propiedades indexadas y `length` se denominan *array-like*. Dichos objetos también pueden tener otras propiedades y métodos, pero carecen de los métodos integrados de los arreglos.

Si miramos dentro de la especificación, veremos que la mayoría de los métodos incorporados suponen que funcionan con iterables o de tipo array en vez de arrays "reales", porque es más abstracto.

`Array.from(obj[, mapFn, thisArg])` hace un `Array` real de un `obj` iterable o similar a un array, y luego podemos usar métodos de array en él. Los argumentos opcionales `mapFn` y`thisArg` nos permiten aplicar una función a cada elemento.
