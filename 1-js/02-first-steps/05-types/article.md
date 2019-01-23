# Data types

Una variable en JavaScript puede contener cualquier dato. Una variable puede ser en un momento dado una cadena y en otro un número:

```js
// no error
let message = "hello";
message = 123456;
```

Los lenguajes de programación que permiten estas cosas se denominan "dinámicamente mecanografiados", lo que significa que hay tipos de datos, pero las variables no están vinculadas a ninguno de ellos.

Hay siete tipos de datos básicos en JavaScript. Aquí, los cubriremos en general y en los próximos capítulos hablaremos de cada uno de ellos en detalle.

## A number

```js
let n = 123;
n = 12.345;
```

El tipo _number_ representa números enteros y de coma flotante.

Hay muchas operaciones para números, por ejemplo, multiplicación `*`, división `/`, suma `+`, resta `-`, y así sucesivamente.

Además de los números regulares, existen los llamados "valores numéricos especiales" que también pertenecen a este tipo de datos: "Infinity", "-Infinity" y "NaN".

- `Infinity` representa el valor matemático [Infinity](https://en.wikipedia.org/wiki/Infinity) ∞. Es un valor especial que es mayor que cualquier número.

  Podemos obtenerlo como resultado de la división por cero:

  ```js run
  alert(1 / 0); // Infinity
  ```

  O simplemente hacer referencia a ello directamente:

  ```js run
  alert(Infinity); // Infinity
  ```

- `NaN` representa un error de cálculo. Es el resultado de una operación matemática incorrecta o indefinida, por ejemplo:

  ```js run
  alert("not a number" / 2); // NaN, such division is erroneous
  ```

  `NaN` es pegajoso. Cualquier otra operación que le siga a `NaN` retorna `NaN`:

  ```js run
  alert("not a number" / 2 + 5); // NaN
  ```

  Por lo tanto, si hay una `NaN` en alguna parte de una expresión matemática, se propaga a todo el resultado.

#####"Mathematical operations are safe"
Hacer matemáticas es "seguro" en JavaScript. Podemos hacer cualquier cosa: dividir por cero, tratar las cadenas no numéricas como números, etc.

El script nunca se detendrá con un error fatal ("morir"). En el peor de los casos, obtendremos `NaN` como resultado.

Los valores numéricos especiales pertenecen formalmente al tipo "número". Por supuesto que no son números en el sentido común de esta palabra.

Veremos más sobre el trabajo con números en el capítulo <info:number>..

## A string

Una cadena en JavaScript debe estar rodeada de comillas.

```js
let str = "Hello";
let str2 = "Single quotes are ok too";
let phrase = `can embed ${str}`;
```

En JavaScript, hay 3 tipos de comillas.

1. Double quotes: `"Hello"`.
2. Single quotes: `'Hello'`.
3. Backticks: <code>&#96;Hello&#96;</code>.

Las comillas dobles y simples son comillas "simples". No hay diferencia entre ellos en JavaScript.

Los Backticks son citas de "funcionalidad extendida". Nos permiten incrustar variables y expresiones en una cadena envolviéndolas en `${...}`, por ejemplo:

```js run
let name = "John";

// embed a variable
alert(`Hello, ${name}`); // Hello, John!

// embed an expression
alert(`the result is ${1 + 2}`); // the result is 3
```

La expresión dentro de `${...}` se evalúa y el resultado pasa a formar parte de la cadena. Podemos poner cualquier cosa ahí: una variable como `nombre` o una expresión artística como `1 + 2` o algo más complejo.

Tenga en cuenta que esto sólo se puede hacer en los backticks. Otras citas no tienen esta funcionalidad de incrustación!

```js run
alert("the result is ${1 + 2}"); // the result is ${1 + 2} (double quotes do nothing)
```

En el capítulo <info:string> trataremos más a fondo las cadenas.

#####"There is no _character_ type."
En algunos idiomas, hay un tipo de "character" especial para un solo carácter. Por ejemplo, en el lenguaje C y en Java es `char`.

En JavaScript, no existe tal tipo. Sólo hay un tipo: `string`. Un string puede estar formado por un solo carácter o por varios de ellos.

## A boolean (logical type)

El tipo booleano tiene sólo dos valores: `true` y `false`.

Este tipo se utiliza comúnmente para almacenar valores de sí/no: `true` significa "sí, correcto", y `false` significa "no, incorrecto".

Por ejemplo:

```js
let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked
```

Los valores booleanos también son el resultado de comparaciones:

```js run
let isGreater = 4 > 1;

alert(isGreater); // true (the comparison result is "yes")
```

En el capítulo tenemos más información sobre <info:logical-operators>.

## The "null" value

El valor especial `null` no pertenece a ninguno de los tipos descritos anteriormente.

Forma un tipo propio separado que contiene sólo el valor `null`:

```js
let age = null;
```

En JavaScript, `null` no es una "referencia a un objeto inexistente" o un "puntero nulo" como en otros lenguajes.

Es sólo un valor especial que representa "nada", "vacío" o "valor desconocido".

El código anterior indica que la `edad` es desconocida o está vacía por alguna razón.

## The "undefined" value

El valor especial `undefined` también se distingue. Hace un tipo propio, igual que `null`.

El significado de `undefined` es "valor no asignado".

Si una variable es declarada, pero no asignada, entonces su valor es `undefined`:

```js run
let x;

alert(x); // shows "undefined"
```

Técnicamente, es posible asignar `undefined` a cualquier variable:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

...Pero no recomendamos hacer eso. Normalmente, usamos `null` para asignar un valor "vacío" o "desconocido" a una variable, y usamos `undefined` para comprobaciones como ver si se ha asignado una variable.

## Objects and Symbols

El tipo `object` es especial.

Todos los demás tipos se llaman "primitive" porque sus valores pueden contener una sola cosa (ya sea una cadena o un número o lo que sea). Por el contrario, los objetos se utilizan para almacenar colecciones de datos y entidades más complejas. Nos ocuparemos de ellos más adelante en el capítulo <info:object> después de aprender más sobre los primitivos.

El tipo `symbol` se utiliza para crear identificadores únicos para los objetos. Tenemos que mencionarlo aquí para completarlo, pero es mejor estudiar este tipo después de los objetos.

## The typeof operator [#type-typeof]

El operador `typeof` devuelve el tipo de argumento. Es útil cuando queremos procesar valores de diferentes tipos de forma diferente o simplemente queremos hacer una comprobación rápida.

Soporta dos formas de sintaxis:

1. Como operador: `typeof x`.
2. Como una función: `typeof(x)`.

En otras palabras, funciona con paréntesis o sin paréntesis. El resultado es el mismo.

La llamada a `typeof x` devuelve una cadena con el nombre del tipo:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Las últimas tres líneas pueden necesitar una explicación adicional:

1. `Math` es un objeto incorporado que proporciona operaciones matemáticas. Lo aprenderemos en el capítulo <info:number>. Aquí, sólo sirve como ejemplo de un objeto.
2. El resultado de `typeof null` es `"object"`. Eso está mal. Es un error oficialmente reconocido en el tipo de `typeof`, guardado para la compatibilidad. Por supuesto, `null` no es un objeto. Es un valor especial con un tipo propio separado. Así que, de nuevo, esto es un error en el lenguaje.
3. El resultado de `typeof alert` es `"function"`, porque `alert` es una función del lenguaje. Estudiaremos las funciones en los próximos capítulos donde veremos que no hay ningún tipo de "función" especial en JavaScript. Las funciones pertenecen al tipo de objeto. Pero `typeof` los trata de manera diferente. Formalmente, es incorrecto, pero muy conveniente en la práctica.

## Summary

Hay 7 tipos básicos en JavaScript.

- `number` para números de cualquier tipo: enteros o en coma flotante.
- `string` para cadenas. Una cadena puede tener uno o más caracteres, no hay un tipo de carácter único separado.
- `boolean` para `true`/`false`.
- `null` para valores desconocidos -- un tipo independiente que tiene un solo valor `null`.
- `undefined` para valores no asignados -- un tipo autónomo que tiene un único valor `undefined`.
- `object` para estructuras de datos más complejas.
- `symbol` para identificadores únicos.

El operador `typeof` nos permite ver qué tipo está almacenado en una variable.

- Dos formas: `typeof x` o `typeof(x)`.
- Devuelve una cadena con el nombre del tipo, como `"string"`.
- Para `null` devuelve `"object"` -- esto es un error en el lenguaje, en realidad no es un objeto.

En los siguientes capítulos, nos concentraremos en los valores primitivos y una vez que nos familiaricemos con ellos, pasaremos a los objetos.
