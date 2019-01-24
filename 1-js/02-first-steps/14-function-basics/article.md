# Functions

Muy a menudo necesitamos realizar una acción similar en muchos lugares del script.

Por ejemplo, debemos mostrar un mensaje atractivo cuando un visitante inicia sesión, finaliza sesión y quizás en otro lugar.

Las funciones son los principales "bloques de construcción" del programa. Permiten que el código se llame muchas veces sin repetición.

Ya hemos visto ejemplos de funciones incorporadas, como `alert(message)`, `prompt(message, default)` y `confirm(question)`. Pero también podemos crear funciones propias.

## Function Declaration

Para crear una función podemos usar una _function declaration_.

Se parece a esto:

```js
function showMessage() {
  alert("Hello everyone!");
}
```

La palabra clave `function` va primero, luego va el _nombre de la función_, luego una lista de _parámetros_ entre los paréntesis (vacío en el ejemplo anterior) y finalmente el código de la función, también llamado" el cuerpo de la función ", entre llaves .

![](function_basics.png)

Nuestra nueva función se puede llamar por su nombre: `showMessage ()`.

Por ejemplo:

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

La llamada `showMessage()` ejecuta el código de la función. Aquí veremos el mensaje dos veces.

Este ejemplo demuestra claramente uno de los propósitos principales de las funciones: evitar la duplicación de código.

Si alguna vez necesitamos cambiar el mensaje o la forma en que se muestra, basta con modificar el código en un solo lugar: la función que lo genera.

## Local variables

Una variable declarada dentro de una función solo es visible dentro de esa función.

Por ejemplo:

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // local variable
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function
```

## Outer variables

Una función también puede acceder a una variable externa, por ejemplo:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

La función tiene acceso completo a la variable exterior. Puede modificarlo también.

Por ejemplo:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* before the function call

showMessage();

alert( userName ); // *!*Bob*/!*, the value was modified by the function
```

La variable externa solo se usa si no hay una local. Por lo tanto, una modificación ocasional puede suceder si olvidamos `let`.

Si se declara una variable con el mismo nombre dentro de la función, entonces _se muestra_ la externa. Por ejemplo, en el código de abajo, la función utiliza el `userName` local. El exterior se ignora:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declare a local variable
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // *!*John*/!*, unchanged, the function did not access the outer variable
```

##### "Global variables"

Las variables declaradas fuera de cualquier función, como el `userName` externo en el código anterior, se denominan _global_.

Las variables globales son visibles desde cualquier función (a menos que estén sombreadas por los locales).

Normalmente, una función declara todas las variables específicas de su tarea. Las variables globales solo almacenan datos a nivel de proyecto, por lo que cuando es importante que estas variables sean accesibles desde cualquier lugar. El código moderno tiene pocos o ningún globo. La mayoría de las variables residen en sus funciones.

## Parameters

Podemos pasar datos arbitrarios a funciones usando parámetros (también llamados _function arguments_).

En el siguiente ejemplo, la función tiene dos parámetros: `from` y`text`.

```js run
function showMessage(*!*from, text*/!*) { // arguments: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

Cuando se llama a la función en las líneas `(*)` y `(**)`, los valores dados se copian en las variables locales `from` y `text`. Entonces la función los utiliza.

Aquí hay un ejemplo más: tenemos una variable `from` y la pasamos a la función. Tenga en cuenta: la función cambia `from`, pero el cambio no se ve afuera, porque una función siempre obtiene una copia del valor:

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // make "from" look nicer
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

## Default values

Si no se proporciona un parámetro, su valor se convierte en `undefined`.

Por ejemplo, la función antes mencionada `showMessage(from, text)` puede llamarse con un solo argumento:

```js
showMessage("Ann");
```

Eso no es un error. Tal llamada daría como resultado `"Ann: undefined "`. No hay `text`, por lo que se supone que `text === undefined`.

Si queremos usar un "texto predeterminado" en este caso, podemos especificarlo después de `=`:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

Ahora, si el parámetro `text` no se pasa, obtendrá el valor`"no text given"`

Aquí `" no text given "` es una cadena, pero puede ser una expresión más compleja, que solo se evalúa y asigna si falta el parámetro. Por lo tanto, esto también es posible:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
  // its result becomes the value of text
}
```

##### "Evaluation of default parameters"

En JavaScript, un parámetro predeterminado se evalúa cada vez que se llama a la función sin el parámetro respectivo. En el ejemplo anterior, se llama a `anotherFunction()` cada vez que se llama a `showMessage()` sin el parámetro `text`. Esto contrasta con otros lenguajes como Python, donde los parámetros predeterminados se evalúan solo una vez durante la interpretación inicial.

##### "Default parameters old-style"

Las ediciones anteriores de JavaScript no soportaban los parámetros por defecto. Por lo tanto, hay formas alternativas de apoyarlos, que puede encontrar principalmente en los scripts antiguos.

Por ejemplo, una verificación explícita de ser `undefined`:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}
```

...Or the `||` operator:

```js
function showMessage(from, text) {
  // if text is falsy then text gets the "default" value
  text = text || 'no text given';
  ...
}
```

## Returning a value

Una función puede devolver un valor al código de llamada como resultado.

El ejemplo más simple sería una función que suma dos valores:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

La directiva `return` puede estar en cualquier lugar de la función. Cuando la ejecución lo alcanza, la función se detiene y el valor se devuelve al código de llamada (asignado al `result` anterior).

Puede haber muchas apariciones de `return` en una sola función. Por ejemplo:

```js run
function checkAge(age) {
  if (age > 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

Es posible utilizar `return` sin un valor. Eso hace que la función salga inmediatamente.

Por ejemplo:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

En el código anterior, si `checkAge(age)` devuelve `false`, entonces `showMovie` no procederá a la `alert`.

##### "A function with an empty `return` or without it returns `undefined`"

Si una función no devuelve un valor, es lo mismo que si devuelve `undefined`:

```js run
function doNothing() {
  /* empty */
}

alert(doNothing() === undefined); // true
```

Un `return` vacío también es lo mismo que `return undefined`:

```js run
function doNothing() {
  return;
}

alert(doNothing() === undefined); // true
```

##### "Never add a newline between `return` and the value"

Para una expresión larga en `return`, puede ser tentador ponerla en una línea separada, como esta:

```js
return;
some + long + expression + or + whatever * f(a) + f(b);
```

Eso no funciona, porque JavaScript asume un punto y coma después de `return`. Eso funcionará igual que

```js
return *!* ; */!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

Por lo tanto, efectivamente se convierte en un retorno vacío. Deberíamos poner el valor en la misma línea en su lugar.

## Naming a function [#function-naming]

Las funciones son acciones. Así que su nombre suele ser un verbo. Debe ser breve, lo más preciso posible y describir lo que hace la función, de modo que alguien que lea el código obtenga una indicación de lo que hace la función.

Es una práctica generalizada iniciar una función con un prefijo verbal que describa vagamente la acción. Debe haber un acuerdo dentro del equipo sobre el significado de los prefijos.

Por ejemplo, las funciones que comienzan con `" show "` usualmente muestran algo.

Función que comienza con ...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Ejemplos de tales nombres:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

Con los prefijos en su lugar, un vistazo al nombre de una función permite comprender qué tipo de trabajo realiza y qué tipo de valor devuelve.

##### "One function -- one action"

Una función debe hacer exactamente lo que sugiere su nombre, no más.

Dos acciones independientes por lo general merecen dos funciones, incluso si se las llama juntas (en ese caso, podemos hacer una tercera función que llame a esas dos).

Algunos ejemplos de romper esta regla:

- `getAge` -- sería malo si muestra un `alerta` con la edad (solo debería obtener).
- `createForm` -- sería malo si modifica el documento, agregándole un formulario (solo debe crearlo y devolverlo).
- `checkPermission` -- sería malo si muestra el mensaje `access granted/denied` (solo debería realizar la comprobación y devolver el resultado).

Estos ejemplos asumen significados comunes de prefijos. Lo que significan para ti está determinado por ti y tu equipo. Tal vez es bastante normal que su código se comporte de manera diferente. Pero debe tener una comprensión firme de lo que significa un prefijo, lo que una función de prefijo puede y no puede hacer. Todas las funciones con el mismo prefijo deben obedecer las reglas. Y el equipo debe compartir el conocimiento.

##### "Ultrashort function names"

Las funciones que se usan _muy a menudo_ a veces tienen nombres ultracortos.

For example, the [jQuery](http://jquery.com) framework defines a function with `$`. The [LoDash](http://lodash.com/) library has its core function named `_`.

Estas son las excepciones. En general, los nombres de las funciones deben ser concisos y descriptivos.

## Functions == Comments

Las funciones deben ser cortas y hacer exactamente una cosa. Si esa cosa es grande, tal vez valga la pena dividir la función en unas pocas funciones más pequeñas. A veces, seguir esta regla puede no ser tan fácil, pero definitivamente es algo bueno.

Una función separada no solo es más fácil de probar y depurar, su propia existencia es un gran comentario descriptivo.

Por ejemplo, compare las dos funciones `showPrimes(n)` a continuación. Cada uno genera [números primos](https://en.wikipedia.org/wiki/Prime_number) hasta `n`.

La primera variante utiliza una etiqueta:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert(i); // a prime
  }
}
```

La segunda variante utiliza una función adicional `isPrime(n)` para probar la primalidad:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

La segunda variante es más fácil de entender, ¿no es así? En lugar del código, vemos un nombre de la acción (`isPrime`). A veces las personas se refieren a dicho código como "autodescripción".

Por lo tanto, se pueden crear funciones incluso si no tenemos la intención de reutilizarlas. Estructuran el código y lo hacen legible.

## Summary

Una declaración de función se ve así:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Los valores pasados a una función como parámetros se copian a sus variables locales.
- Una función puede acceder a variables externas. Pero funciona solo de adentro hacia afuera. El código fuera de la función no ve sus variables locales.
- Una función puede devolver un valor. Si no lo hace, entonces su resultado es `undefined`.

Para que el código sea limpio y fácil de entender, se recomienda utilizar principalmente variables y parámetros locales en la función, no variables externas.

Siempre es más fácil entender una función que obtiene parámetros, trabaja con ellos y devuelve un resultado que una función que no obtiene parámetros, pero modifica las variables externas como un efecto secundario.

Denominación de funciones:

- Un nombre debe describir claramente lo que hace la función. Cuando vemos una llamada de función en el código, un buen nombre al instante nos permite comprender qué hace y qué devuelve.
- Una función es una acción, por lo que los nombres de las funciones suelen ser verbales.
- Existen muchos prefijos de funciones bien conocidas como `create ...`, `show ...`, `get ...`, `check ...` y así sucesivamente. Úsalos para insinuar lo que hace una función.

Las funciones son los principales bloques de construcción de scripts. Ahora hemos cubierto los conceptos básicos, por lo que podemos comenzar a crearlos y usarlos. Pero eso es solo el comienzo del camino. Vamos a volver a ellos muchas veces, profundizando en sus características avanzadas.
