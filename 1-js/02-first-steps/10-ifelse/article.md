# Conditional operators: if, '?'

A veces, tenemos que realizar diferentes acciones basadas en diferentes condiciones.

Para hacer eso, usamos la instrucción `if` y el operador condicional (ternario) al que nos referiremos como operador de “signo de interrogación ” `?` por simplicidad.

## The "if" statement

La instrucción `if` evalúa una condición y, si el resultado de la condición es`true`, ejecuta un bloque de código.

Por ejemplo:

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

En el ejemplo anterior, la condición es un simple control de igualdad (`year == 2015`), pero puede ser mucho más complejo.

Si queremos ejecutar más de una declaración, tenemos que envolver nuestro bloque de código entre llaves:

```js
if (year == 2015) {
  alert("That's correct!");
  alert("You're so smart!");
}
```

Recomendamos envolver su bloque de código con llaves `{}` cada vez que use una instrucción `if`, incluso si solo hay una instrucción que ejecutar. Hacerlo mejora la legibilidad.

## Boolean conversion

La instrucción `if (...)` evalúa la expresión entre paréntesis y convierte el resultado en un valor booleano.

Recordemos las reglas de conversión del capítulo <info:type-conversions>:

- Un número `0`, una cadena vacía`""`,`null`, `undefined` y`NaN` se convierten en `false`. Por eso se les llama valores "falsy".
- Otros valores se convierten en "verdaderos", por lo que se denominan "truthy".

Entonces, el código bajo esta condición nunca se ejecutaría:

```js
if (0) { // 0 is falsy
  ...
}
```

... y dentro de esta condición - siempre será:

```js
if (1) { // 1 is truthy
  ...
}
```

También podemos pasar un valor booleano preevaluado a `if`, como este:

```js
let cond = (year == 2015); // equality evaluates to true or false

if (cond) {
  ...
}
```

## The "else" clause

La instrucción `if` puede contener un bloque `else` opcional. Se ejecuta cuando la condición es falsa.

Por ejemplo:

```js run
let year = prompt(
  "In which year was the ECMAScript-2015 specification published?",
  ""
);

if (year == 2015) {
  alert("You guessed it right!");
} else {
  alert("How can you be so wrong?"); // any value except 2015
}
```

## Several conditions: "else if"

A veces, nos gustaría probar varias variantes de una condición. La cláusula `else if` nos permite hacer eso.

Por ejemplo:

```js run
let year = prompt(
  "In which year was the ECMAScript-2015 specification published?",
  ""
);

if (year < 2015) {
  alert("Too early...");
} else if (year > 2015) {
  alert("Too late");
} else {
  alert("Exactly!");
}
```

En el código anterior, JavaScript primero comprueba `year < 2015`. Si eso es falso, pasa a la siguiente condición `year > 2015`. Si eso también es falso, muestra la última `alert`.

Puede haber más bloques `else if`. El `else` final es opcional.

## Ternary operator '?'

A veces, necesitamos asignar una variable dependiendo de una condición.

Por ejemplo:

```js run no-beautify
let accessAllowed;
let age = prompt('How old are you?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

El operador llamado "ternario" o "signo de interrogación" nos permite hacerlo de una manera más breve y sencilla.

El operador está representado por un signo de interrogación `?`. El término formal "ternario" significa que el operador tiene tres operandos. En realidad, es el único operador en JavaScript que tiene tantos.

La sintaxis es:

```js
let result = condition ? value1 : value2;
```

La `condition` se evalúa: si es veraz, entonces se devuelve `value1`, de lo contrario - `value2`.

Por ejemplo:

```js
let accessAllowed = age > 18 ? true : false; // interpretar que tiene parentesis (prettier me los quita)
```

Técnicamente, podemos omitir los paréntesis alrededor de `age > 18`. El operador de signo de interrogación tiene una prioridad baja, por lo que se ejecuta después de la comparación `>`.

Este ejemplo hará lo mismo que el anterior:

```js
// the comparison operator "age > 18" executes first anyway
// (no need to wrap it into parentheses)
let accessAllowed = age > 18 ? true : false;
```

Pero los paréntesis hacen que el código sea más legible, por lo que recomendamos su uso.

En el ejemplo anterior, puede evitar usar el operador de signo de interrogación porque la comparación misma devuelve `true/false`:

```js
// the same
let accessAllowed = age > 18;
```

## Multiple '?'

Una secuencia de operadores de signo de interrogación `?` Puede devolver un valor que depende de más de una condición.

Por ejemplo:

```js run
let age = prompt("age?", 18);

let message =
  age < 3
    ? "Hi, baby!"
    : age < 18
    ? "Hello!"
    : age < 100
    ? "Greetings!"
    : "What an unusual age!";

alert(message);
```

Puede ser difícil al principio comprender lo que está pasando. Pero después de un análisis más detallado, podemos ver que es solo una secuencia ordinaria de pruebas:

1. El primer signo de interrogación comprueba si `age < 3`.
2. Si es verdadero, devuelve `'Hi, baby!'`. De lo contrario, continúa con la expresión después de los dos puntos '":"', verificando `age < 18`.
3. Si eso es cierto, devuelve `'Hello!'`. De lo contrario, continúa con la expresión después de los siguientes dos puntos '":"', verificando `age < 100`.
4. Si eso es cierto, devuelve `'Greetings!'`. De lo contrario, continúa con la expresión después de los últimos dos puntos '":"', devolviendo `'What an unusual age!'`.

Así es como se ve esto usando `if..else`:

```js
if (age < 3) {
  message = "Hi, baby!";
} else if (age < 18) {
  message = "Hello!";
} else if (age < 100) {
  message = "Greetings!";
} else {
  message = "What an unusual age!";
}
```

## Non-traditional use of '?'

A veces, el signo de interrogación `?` Se usa como reemplazo de `if`:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

Depending on the condition `company == 'Netscape'`, either the first or the second expression after the `?` gets executed and shows an alert.

We don't assign a result to a variable here. Instead, we execute different code depending on the condition.

Dependiendo de la condición `company == 'Netscape'`, la primera o la segunda expresión después de que se ejecute`?` mostrará una alerta.

No asignamos un resultado a una variable aquí. En su lugar, ejecutamos diferentes códigos dependiendo de la condición.

**We don't recommend using the question mark operator in this way.**

La notación es más corta que la instrucción `if` equivalente, que atrae a algunos programadores. Pero es menos legible.

Aquí está el mismo código usando `if` para comparación:

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

Nuestros ojos escanean el código verticalmente. Los bloques de código que abarcan varias líneas son más fáciles de entender que un conjunto de instrucciones largo y horizontal.

El propósito del operador de signo de interrogación `?` Es devolver un valor u otro dependiendo de su condición. Por favor utilízalo para exactamente eso. Utilice `if` cuando necesite ejecutar diferentes ramas de código.
