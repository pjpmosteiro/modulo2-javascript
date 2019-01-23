# Function expressions and arrows

En JavaScript, una función no es una "estructura de lenguaje mágico", sino un tipo especial de valor.

La sintaxis que usamos antes se llama _Declaración de función_:

```js
function sayHi() {
  alert("Hello");
}
```

Hay otra sintaxis para crear una función que se llama _Expresión de función_.

Se parece a esto:

```js
let sayHi = function() {
  alert("Hello");
};
```

Aquí, la función se crea y se asigna a la variable explícitamente, como cualquier otro valor. No importa cómo se defina la función, es solo un valor almacenado en la variable `sayHi`.

Incluso podemos imprimir ese valor usando `alert`:

```js run
function sayHi() {
  alert("Hello");
}

alert(sayHi); // shows the function code
```

Tenga en cuenta que la última línea no ejecuta la función, porque no hay paréntesis después de `sayHi`. Hay lenguajes de programación donde cualquier mención de un nombre de función hace que se ejecute, pero JavaScript no es así.

En JavaScript, una función es un valor, por lo que podemos tratarla como un valor. El código anterior muestra su representación de cadena, que es el código fuente.

Es un valor especial, por supuesto, en el sentido de que podemos llamarlo como `sayHi()`.

Pero sigue siendo un valor. Así que podemos trabajar con él como con otros tipos de valores.

Podemos copiar una función a otra variable:

```js run no-beautify
function sayHi() {
  // (1) create
  alert("Hello");
}

let func = sayHi; // (2) copy

func(); // Hello     // (3) run the copy (it works)!
sayHi(); // Hello    //     this still works too (why wouldn't it)
```

Esto es lo que sucede arriba en detalle:

1. La Declaración de función `(1)` crea la función y la coloca en la variable llamada `sayHi`.
2. La línea `(2)` lo copia en la variable `func`.
   Tenga en cuenta nuevamente: no hay paréntesis después de `sayHi`. Si existiera, entonces `func = sayHi()` escribiría _el resultado de la llamada_ `sayHi()` en `func`, no _la función_`sayHi` en sí.

3. Ahora la función se puede llamar como `sayHi()` y `func()`.

Tenga en cuenta que también podríamos haber utilizado una expresión de función para declarar `sayHi`, en la primera línea:

```js
let sayHi = function() { ... };

let func = sayHi;
// ...
```

Todo funcionaría igual. Aún más obvio lo que está pasando, ¿verdad?

#### "¿Por qué hay un punto y coma al final?"

Podría preguntarse, ¿por qué la expresión de la función tiene un punto y coma `;` al final, pero la declaración de la función no:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
};
```

La respuesta es simple:

- No hay necesidad de `;` al final de los bloques de código y las estructuras de sintaxis que los usan como `if {...}`, `while {}`, `function f {}` etc.
- Se usa una expresión de función dentro de la declaración: `let sayHi = ...;`, como un valor. No es un bloque de código. El punto y coma `;` se recomienda al final de las declaraciones, sin importar cuál sea el valor. Así que el punto y coma aquí no está relacionado con la Expresión de la Función de ninguna manera, simplemente termina la declaración.

## Callback functions

Veamos más ejemplos de funciones pasantes como valores y utilizando expresiones de función.

Escribiremos una función `ask (question, yes, no)` con tres parámetros:

`question`
: Texto de la pregunta.

`yes`
: Función para ejecutar si la respuesta es "Sí"

`no`
: Función para ejecutar si la respuesta es "No"

La función debe hacer la `question` y, dependiendo de la respuesta del usuario, llamar a`yes()` o `no()`:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

function showOk() {
  alert("You agreed.");
}

function showCancel() {
  alert("You canceled the execution.");
}

// uso: las funciones showOk, showCancel se pasan como argumentos para preguntar
ask("Do you agree?", showOk, showCancel);
```

Antes de explorar cómo podemos escribirlo de una manera mucho más corta, notemos que en el navegador (y en el lado del servidor en algunos casos) tales funciones son bastante populares. La principal diferencia entre una implementación de la vida real y el ejemplo anterior es que las funciones de la vida real utilizan formas más complejas de interactuar con el usuario que una simple `confirm`. En el navegador, una función de este tipo generalmente dibuja una ventana de pregunta atractiva. Pero esa es otra historia.

**The arguments of `ask` are called _callback functions_ or just _callbacks_.**

La idea es que pasemos una función y esperemos que sea "devuelta" más tarde si es necesario. En nuestro caso, `showOk` se convierte en la devolución de llamada para la respuesta" sí ", y`showCancel` para la respuesta "no".

Podemos usar Expresiones de Funciones para escribir la misma función mucho más corta:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() {
    alert("You agreed.");
  },
  function() {
    alert("You canceled the execution.");
  }
);
```

Aquí, las funciones se declaran dentro de la llamada `ask(...)`. No tienen nombre, y por eso se les llama _ anónimo _. Estas funciones no son accesibles fuera de `ask` (porque no están asignadas a variables), pero eso es lo que queremos aquí.

Dicho código aparece en nuestros scripts muy naturalmente, está en el espíritu de JavaScript.

##### "A function is a value representing an \"action\""

Los valores regulares como cadenas o números representan los _datos_.

Una función puede ser percibida como una _acción_.

Podemos pasarlo entre variables y correr cuando queramos.

## Function Expression vs Function Declaration

Vamos a formular las diferencias clave entre las Declaraciones de Funciones y Expresiones.

Primero, la sintaxis: cómo ver qué es qué en el código.

- _Function Declaration:_ una función, declarada como una declaración separada, en el flujo de código principal.

  ```js
  // Function Declaration
  function sum(a, b) {
    return a + b;
  }
  ```

- _Function Expression:_ una función, creada dentro de una expresión o dentro de otra estructura de sintaxis. Aquí, la función se crea en el lado derecho de la "expresión de asignación" `=`:
  ```js
  // Function Expression
  let sum = function(a, b) {
    return a + b;
  };
  ```

La diferencia más sutil es _cuando_ una función es creada por el motor de JavaScript.

**A Function Expression is created when the execution reaches it and is usable from then on.**

Una vez que el flujo de ejecución pasa al lado derecho de la asignación `let sum = function ...` -- aquí vamos, la función se crea y se puede usar (asignar, llamar, etc.) a partir de ahora.

Las declaraciones de funciones son diferentes.

**A Function Declaration is usable in the whole script/code block.**

En otras palabras, cuando JavaScript _se prepara_ para ejecutar el script o un bloque de código, primero busca las Declaraciones de Función en él y crea las funciones. Podemos considerarlo como una "etapa de inicialización".

Y después de que se procesan todas las Declaraciones de Función, la ejecución continúa.

Como resultado, una función declarada como Declaración de función puede llamarse antes de lo que se define.

Por ejemplo, esto funciona:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

La Declaración de función `sayHi` se crea cuando JavaScript se está preparando para iniciar el script y es visible en todas partes.

... Si fuera una expresión de función, entonces no funcionaría:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Las expresiones de función se crean cuando la ejecución las alcanza. Eso solo sucedería en la línea `(*)`. Demasiado tarde.

**Cuando una declaración de función se realiza dentro de un bloque de código, es visible en todas partes dentro de ese bloque. Pero no fuera de ella.**

A veces es útil declarar una función local que solo se necesita en ese bloque solo. Pero esa característica también puede causar problemas.

Por ejemplo, imaginemos que necesitamos declarar una función `welcome ()` dependiendo de la variable `age` que obtengamos durante el tiempo de ejecución. Y luego planeamos usarlo algún tiempo después.

El siguiente código no funciona:

```js run
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {
  function welcome() {
    alert("Hello!");
  }
} else {
  function welcome() {
    alert("Greetings!");
  }
}

// ... utilízalo más tarde

welcome(); // Error: welcome is not defined
```

Esto se debe a que una Declaración de función solo es visible dentro del bloque de código en el que reside.

Aquí hay otro ejemplo:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
  welcome(); // \   (runs)

  //  |
  function welcome() {
    //  |
    alert("Hello!"); //  |  Declaración de función está disponible
  } //  |  por todas partes en el bloque donde se declara.
  //  |

  welcome(); // /   (runs)
} else {
  function welcome() {
    //  for age = 16, this "welcome" is never created
    alert("Greetings!");
  }
}

// Aquí nos quedamos sin llaves,
// Así que no podemos ver las Declaraciones de Funciones hechas dentro de ellas.

welcome(); // Error: welcome is not defined
```

¿Qué podemos hacer para que `welcome` sea visible fuera de `if`?

El enfoque correcto sería utilizar una Expresión de función y asignar `welcome` a la variable que se declara fuera de`if` y tiene la visibilidad adecuada.

Ahora funciona según lo previsto:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {
  welcome = function() {
    alert("Hello!");
  };
} else {
  welcome = function() {
    alert("Greetings!");
  };
}

welcome(); // ok now
```

O podríamos simplificarlo aún más usando un operador de signo de interrogación `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome =
  age < 18
    ? function() {
        alert("Hello!");
      }
    : function() {
        alert("Greetings!");
      };

welcome(); // ok now
```

#### "When should you choose Function Declaration versus Function Expression?"

Como regla general, cuando tenemos que declarar una función, lo primero que debemos considerar es la sintaxis de la Declaración de función, la que usamos antes. Da más libertad en cómo organizar nuestro código, porque podemos llamar a tales funciones antes de que sean declaradas.

También es un poco más fácil buscar `function f (…) {…}` en el código que `let f = function (…) {…}`. Las declaraciones de funciones son más "llamativas".

...Pero si una Declaración de función no nos conviene por alguna razón (hemos visto un ejemplo arriba), entonces se debe usar la Expresión de función.

## Arrow functions [#arrow-functions]

Hay una sintaxis más sencilla y concisa para crear funciones, que a menudo es mejor que las Expresiones de Funciones. Se llama "funciones de flecha", porque se ve así:

```js
let func = (arg1, arg2, ...argN) => expression;
```

... Esto crea una función `func` que tiene argumentos`arg1..argN`, evalúa la `expresión` en el lado derecho con su uso y devuelve su resultado.

En otras palabras, es más o menos lo mismo que:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

... pero mucho más conciso.

Veamos un ejemplo:

```js run
let sum = (a, b) => a + b;

/* The arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3
```

Si solo tenemos un argumento, entonces los paréntesis se pueden omitir, haciendo que sea aún más corto:

```js run
// same as
// let double = function(n) { return n * 2 }

let double = n => n * 2;

alert(double(3)); // 6
```

Si solo tenemos un argumento, entonces los paréntesis se pueden omitir, haciendo que sea aún más corto:

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

Las arrow function se pueden utilizar de la misma manera que las Expresiones de función.

Por ejemplo, aquí está el ejemplo reescrito con `welcome()`:

```js run
let age = prompt("What is your age?", 18);

let welcome = age < 18 ? () => alert("Hello") : () => alert("Greetings!");

welcome(); // ok now
```

Las arrow functions pueden parecer poco familiares y poco legibles al principio, pero eso cambia rápidamente a medida que los ojos se acostumbran a la estructura.

Son muy convenientes para acciones simples de una línea, cuando somos demasiado perezosos para escribir muchas palabras.

##### "Multiline arrow functions"

Los ejemplos anteriores tomaron los argumentos de la izquierda de `=>` y evaluaron la expresión del lado derecho con ellos.

A veces necesitamos algo un poco más complejo, como expresiones o declaraciones múltiples. También es posible, pero deberíamos encerrarlos entre llaves. Luego usa un `return` normal dentro de ellos.

Como esto:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, use return to get results
*/!*
};

alert( sum(1, 2) ); // 3
```

##### "More to come"

Aquí alabamos las funciones de flecha por brevedad. ¡Pero eso no es todo! Las funciones de flecha tienen otras características interesantes. Volveremos a ellos más adelante en el capítulo <info:arrow-functions>.

Por ahora, ya podemos usarlos para acciones de una línea y devoluciones de llamada.

## Summary

- Las funciones son valores. Se pueden asignar, copiar o declarar en cualquier lugar del código.
- Si la función se declara como una declaración separada en el flujo de código principal, se llama "Declaración de función".
- Si la función se crea como parte de una expresión, se llama "Expresión de función".
- Las declaraciones de funciones se procesan antes de que se ejecute el bloque de código. Son visibles en todas partes en el bloque.
- Las expresiones de función se crean cuando el flujo de ejecución las alcanza.

En la mayoría de los casos, cuando necesitamos declarar una función, es preferible una Declaración de función, ya que es visible antes de la declaración en sí. Eso nos da más flexibilidad en la organización del código, y generalmente es más legible.

Por lo tanto, deberíamos usar una Expresión de función solo cuando una Declaración de función no es adecuada para la tarea. Hemos visto un par de ejemplos de eso en este capítulo, y veremos más en el futuro.

Las funciones de flecha son útiles para las de una sola línea. Vienen en dos sabores:

1. Sin llaves: `(...args) => expresión` - el lado derecho es una expresión: la función lo evalúa y devuelve el resultado.
2. Con llaves: `(...args) => {body}` - los corchetes nos permiten escribir varias declaraciones dentro de la función, pero necesitamos un `return` explícito para devolver algo.
