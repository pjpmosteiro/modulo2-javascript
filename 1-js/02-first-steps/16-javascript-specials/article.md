# JavaScript specials

Este capítulo resume brevemente las características de JavaScript que hemos aprendido hasta ahora, prestando especial atención a los momentos sutiles.

## Code structure

Las declaraciones se delimitan con un punto y coma:

```js run no-beautify
alert("Hello");
alert("World");
```

Por lo general, un salto de línea también se trata como un delimitador, por lo que también funcionaría:

```js run no-beautify
alert("Hello");
alert("World");
```

Eso se llama "inserción automática de punto y coma". A veces no funciona, por ejemplo:

```js run
alert("There will be an error after this message")[(1, 2)].forEach(alert);
```

La mayoría de las guías de estilo de código están de acuerdo en que deberíamos poner un punto y coma después de cada declaración.

No se requieren puntos y coma después de los bloques de código `{...}` y la sintaxis se construye con ellos como bucles:

```js
function f() {
  // no semicolon needed after function declaration
}

for (;;) {
  // no semicolon needed after the loop
}
```

... Pero incluso si podemos poner un punto y coma "extra" en algún lugar, eso no es un error. Será ignorado.

Más en: <info:estructure>.

## Strict mode

Para habilitar completamente todas las funciones de JavaScript moderno, deberíamos iniciar los scripts con `" use strict "`.

```js
'use strict';

...
```

La directiva debe estar en la parte superior de un script o al principio de una función.

Sin `"use strict"`, todo sigue funcionando, pero algunas características se comportan de la manera tradicional, "compatible". Generalmente preferimos el comportamiento moderno.

Algunas características modernas del lenguaje (como las clases que estudiaremos en el futuro) permiten el modo estricto implícitamente.

Más en: <info:strict-mode>.

## Variables

Puede ser declarado usando:

- `let`
- `const` (constante, no se puede cambiar)
- `var` (estilo antiguo, veremos más adelante)

Un nombre de variable puede incluir:

- Letras y dígitos, pero el primer carácter no puede ser un dígito.
- Los caracteres `$` y `_` son normales, a la par con las letras.
- También se permiten alfabetos y jeroglíficos no latinos, pero comúnmente no se utilizan.

Las variables se escriben dinámicamente. Pueden almacenar cualquier valor:

```js
let x = 5;
x = "John";
```

Hay 7 tipos de datos:

- `number` para números de punto flotante y enteros,
- `string` para cuerdas,
- `boolean` para valores lógicos:`true/false`,
- `null` - un tipo con un solo valor `null`, que significa "vacío" o "no existe",
- `undefined` - un tipo con un solo valor`undefined`, que significa "no asignado",
- `object` y `symbol` - para estructuras de datos complejas e identificadores únicos, todavía no los hemos aprendido.

El operador `typeof` devuelve el tipo para un valor, con dos excepciones:

```js
typeof null == "object"; // error in the language
typeof function() {} == "function"; // functions are treated specially
```

Más en: <info:variables> y <info:types>.

## Interaction

Estamos utilizando un navegador como entorno de trabajo, por lo que las funciones básicas de la interfaz de usuario serán:

[`prompt (question[, default])`] (mdn: api / Window / prompt)
: Haga una `question` y devuelva lo que ingresó el visitante o `null` si presionó "cancelar".

[`confirm(question)`] (mdn: api/Window/confirm)
: Haga una `question` y sugiera elegir entre Aceptar y Cancelar. La elección se devuelve como `true/false`.

[`alert(message)`] (mdn: api / Window / alert)
: Salida un `message`.

Todas estas funciones son _modales_, pausan la ejecución del código y evitan que el visitante interactúe con la página hasta que responda.

Por ejemplo:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert("Visitor: " + userName); // Alice
alert("Tea wanted: " + isTeaWanted); // true
```

More in: <info:alert-prompt-confirm>.

## Operators

JavaScript soporta los siguientes operadores:

Aritmético
: Regular: `* + - /`, también `%` para el resto y `**` para la potencia de un número.

    El binario más `+` concatena cadenas. Y si alguno de los operandos es una cadena, el otro también se convierte en cadena:


    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Asignaciones
: Hay una tarea simple: `a = b` y las combinadas como`a * = 2`.

Bitwise
: Los operadores bitwise trabajan con enteros en el nivel bit: vea los [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) cuando sean necesarios.

Ternario
: El único operador con tres parámetros: `cond ? resultA: resultB`. Si `cond` es veraz, devuelve`resultA`, de lo contrario, `resultB`.

Operadores logicos
: Logical AND `&&` and OR `||` realiza una evaluación de cortocircuito y luego devuelve el valor donde se detuvo. El NOT `!` Lógico convierte el operando a tipo booleano y devuelve el valor inverso.

Comparaciones
: La verificación de igualdad `==` para valores de diferentes tipos los convierte en un número (excepto `null` y`undefined` que son iguales entre sí y nada más), por lo que estos son iguales:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

Otras comparaciones se convierten a un número también.

    El operador de igualdad estricta `===` no hace la conversión:
    diferentes tipos siempre significan valores diferentes para él, así que:

    Los valores `null` y `undefined` son especiales: y no son iguales a ninguna otra cosa.

    Las comparaciones mayores / menores comparan las cadenas carácter por carácter, otros tipos se convierten en un número.

Otros operadores
: Hay pocos más, como un operador de coma.

More in: <info:operators>, <info:comparison>, <info:logical-operators>.

## Loops

- Cubrimos 3 tipos de bucles:

  ```js
  // 1
  while (condition) {
    ...
  }

  // 2
  do {
    ...
  } while (condition);

  // 3
  for(let i = 0; i < 10; i++) {
    ...
  }
  ```

- La variable declarada en el bucle `for(let...)` es visible solo dentro del bucle. Pero también podemos omitir `let` y reutilizar una variable existente.
- Las directivas `break/continue` permiten salir de todo el bucle / iteración actual. Use etiquetas para romper los bucles anidados.

Details in: <info:while-for>.

Más adelante estudiaremos más tipos de bucles para tratar con objetos.

## The "switch" construct

La construcción "switch" puede reemplazar múltiples cheques `if`. Utiliza `===` (igualdad estricta) para las comparaciones.

Por ejemplo:

```js run
let age = prompt("Your age?", 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Details in: <info:switch>.

## Functions

Cubrimos tres formas de crear una función en JavaScript:

1. Declaración de la función: la función en el flujo de código principal

   ```js
   function sum(a, b) {
     let result = a + b;

     return result;
   }
   ```

2. Expresión de función: la función en el contexto de una expresión.

   ```js
   let sum = function(a, b) {
     let result = a + b;

     return result;
   };
   ```

   Las expresiones de función pueden tener un nombre, como `sum = function name (a, b)`, pero ese `name` solo es visible dentro de esa función.

3. Arrow functions:

   ```js
   // expression at the right side
   let sum = (a, b) => a + b;

   // or multi-line syntax with { ... }, need return here:
   let sum = (a, b) => {
     // ...
     return a + b;
   };

   // without arguments
   let sayHi = () => alert("Hello");

   // with a single argument
   let double = n => n * 2;
   ```

- Las funciones pueden tener variables locales: las declaradas dentro de su cuerpo. Tales variables solo son visibles dentro de la función.
- Los parámetros pueden tener valores predeterminados: `function sum(a = 1, b = 2) {...}`.
- Las funciones siempre devuelven algo. Si no hay una declaración de `return`, entonces el resultado es `undefined`.

| Declaración de funciones            | Expresión de la función                                  |
| ----------------------------------- | -------------------------------------------------------- |
| visible en todo el bloque de código | creado cuando la ejecución lo alcanza                    |
| -                                   | puede tener un nombre, visible solo dentro de la función |

More: see <info:function-basics>, <info:function-expressions-arrows>.

## More to come

Esa fue una breve lista de características de JavaScript. A partir de ahora solo hemos estudiado lo básico. Además, en el tutorial encontrará más ofertas especiales y funciones avanzadas de JavaScript.
