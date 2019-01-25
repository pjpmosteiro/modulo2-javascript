# Variables

La mayoría de las veces, una aplicación JavaScript necesita trabajar con información. Aquí hay dos ejemplos:

1. Una tienda en línea -- la información puede incluir los bienes que se venden y un carrito de compras.
2. Una aplicación de chat: la información puede incluir usuarios, mensajes y mucho más.

Las variables se utilizan para almacenar esta información.

## A variable

Una [variable](<https://en.wikipedia.org/wiki/Variable_(computer_science)>) es un "almacenamiento con nombre" de datos. Podemos usar variables para almacenar golosinas, visitantes y otros datos.

Para crear una variable en JavaScript, utilice la palabra clave `let`.

La siguiente sentencia crea (en otras palabras: _declara_ o _define_) una variable con el nombre "mensaje":

```js
let message;
```

Ahora, podemos poner algunos datos en él usando el operador de asignación `=`:

```js
let message;

*!*
message = 'Hello'; // store the string
*/!*
```

La cadena se guarda ahora en el área de memoria asociada a la variable. Podemos acceder a ella utilizando el nombre de la variable:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // shows the variable content
*/!*
```

Para ser concisos, podemos combinar la declaración y asignación de variables en una sola línea:

```js run
let message = "Hello!"; // define the variable and assign the value

alert(message); // Hello!
```

También podemos declarar múltiples variables en una línea:

```js no-beautify
let user = "John",
  age = 25,
  message = "Hello";
```

Eso puede parecer más corto, pero no lo recomendamos. Para una mejor legibilidad, por favor, utiliza una sola línea por variable.

La variante multilínea es un poco más larga, pero más fácil de leer:

```js
let user = "John";
let age = 25;
let message = "Hello";
```

Algunas personas también definen múltiples variables en este estilo multilínea:

```js no-beautify
let user = "John",
  age = 25,
  message = "Hello";
```

Técnicamente, todas estas variantes hacen lo mismo. Por lo tanto, es una cuestión de gusto personal y estética.

``smart header="`var` en lugar de `let`"
En scripts más antiguos, también puedes encontrar otra palabra clave: `var` en lugar de `let`:

```js
*!*var*/!* message = 'Hello';
```

La palabra clave `var` es _casi_ lo mismo que `let`. También declara una variable, pero de una manera ligeramente diferente, de la "vieja escuela".

Hay diferencias sutiles entre `let` y `var`, pero no nos importan todavía. Los cubriremos en detalle en el capítulo <info:var>.

## A real-life analogy

Podemos comprender fácilmente el concepto de "variable" si lo imaginamos como una "caja" de datos, con una pegatina con un nombre único.

Por ejemplo, la variante `mensaje` puede ser imaginada como una caja llamada `"mensaje"` con el valor ``"Hola!"` en ella:

![](variable.png)

Podemos poner cualquier valor en la caja.

También podemos cambiarla tantas veces como queramos:

```js run
let message;

message = "Hello!";

message = "World!"; // value changed

alert(message);
```

Cuando se modifica el valor, los datos antiguos se eliminan de la variable:

![](variable-change.png)

También podemos declarar dos variables y copiar datos de una a otra.

```js run
let hello = 'Hello world!';

let message;

*!*
// copy 'Hello world' from hello into message
message = hello;
*/!*

// now two variables hold the same data
alert(hello); // Hello world!
alert(message); // Hello world!
```

Es interesante notar que [functional](https://en.wikipedia.org/wiki/Functional_programming) lenguajes de programación, como [Scala](http://www.scala-lang.org/) o [Erlang](http://www.erlang.org/), prohiben cambiar los valores de las variables.

En estos idiomas, una vez que el valor se almacena "en la caja", está ahí para siempre. Si necesitamos almacenar algo más, el lenguaje nos obliga a crear una nueva caja (declarar una nueva variable). No podemos reutilizar el viejo.

Aunque pueda parecer un poco extraño a primera vista, estos idiomas son muy capaces de desarrollarse seriamente. Más que eso, hay áreas como los cálculos paralelos donde esta limitación confiere ciertos beneficios. Se recomienda estudiar este tipo de lenguaje (incluso si no está planeando usarlo pronto) para ampliar la mente.

## Variable naming [#variable-naming]

Hay dos limitaciones en los nombres de variables en JavaScript:

1. El nombre debe contener sólo letras, dígitos o los símbolos `$` y `_`.
2. El primer carácter no debe ser un dígito.

Ejemplos de nombres válidos:

```js
let userName;
let test123;
```

Cuando el nombre contiene varias palabras, [camelCase](https://en.wikipedia.org/wiki/CamelCase) es de uso común. Es decir: las palabras van una tras otra, cada palabra empieza con una mayúscula: `myVeryLongName`.

Lo que es interesante - el signo de dólar `'$'` y el subrayado `'_'` también se pueden usar en los nombres. Son símbolos regulares, como las letras, sin ningún significado especial.

Estos nombres son válidos:

```js run untrusted
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
```

Ejemplos de nombres de variables incorrectos:

```js no-beautify
let 1a; // cannot start with a digit

let my-name; // hyphens '-' aren't allowed in the name
```

Las variable llamadas `apple` y `AppLE` son diferentes.

#####"Non-English letters are allowed, but not recommended"
Es posible usar cualquier lenguaje, incluyendo letras cirílicas o incluso jeroglíficos, como éste:

```js
let имя = "...";
let 我 = "...";
```

Técnicamente, no hay ningún error aquí, tales nombres están permitidos, pero hay una tradición internacional de usar el inglés en los nombres de variables. Incluso si estamos escribiendo un pequeño guión, puede tener una larga vida por delante. Las personas de otros países pueden necesitar leerlo alguna vez.

#####"Reserved names"
Hay una [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), que no pueden ser utilizados como nombres de variables porque son utilizados por el propio lenguaje.

Por ejemplo: `let`, `class`, `return`, y `function` son reservadas.

El siguiente código da un error de sintaxis:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```

#####"An assignment without `use strict`"

Normalmente, necesitamos definir una variable antes de usarla. Pero en los viejos tiempos, era técnicamente posible crear una variable mediante una simple asignación del valor sin usar "let". Esto todavía funciona ahora si no ponemos `use strict' en nuestros scripts para mantener la compatibilidad con los scripts antiguos.

```js run no-strict
// note: no "use strict" in this example

num = 5; // the variable "num" is created if it didn't exist

alert(num); // 5
```

Esto es una mala práctica y causaría un error en el modo estricto:

```js
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```

## Constants

Para declarar una variable constante (sin cambios), use `const` en lugar de `let`:

```js
const myBirthday = "18.04.1982";
```

Las variables declaradas utilizando `const` se denominan "constantes". No se pueden modificar. Un intento de hacerlo causaría un error:

```js run
const myBirthday = "18.04.1982";

myBirthday = "01.01.2001"; // error, can't reassign the constant!
```

Cuando un programador está seguro de que una variable nunca cambiará, puede declararlo con `const' para garantizar y comunicar claramente ese hecho a todo el mundo.

### Uppercase constants

Existe una práctica muy extendida de usar constantes como alias para valores difíciles de recordar que se conocen antes de la ejecución.

Estas constantes se nombran usando letras mayúsculas y guiones bajos.

Así:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Beneficios:

- El `COLOR_ORANGE` es mucho más fácil de recordar que el ``"#FF7F00"`.
- Es mucho más fácil escribir mal `"#FF7F00"` que `COLOR_ORANGE`.
- Al leer el código, `COLOR_ORANGE` es mucho más significativo que `#FF7F00`.

¿Cuándo debemos usar mayúsculas para una constante y cuándo debemos nombrarla normalmente? Dejemos eso claro.

Ser una "constante" sólo significa que el valor de una variable nunca cambia. Pero hay constantes que se conocen antes de la ejecución (como un valor hexadecimal para rojo) y hay constantes que se _calculan_ en tiempo de ejecución, durante la ejecución, pero que no cambian después de su asignación inicial.

Por ejemplo:

```js
const pageLoadTime = /* time taken by a webpage to load */;
```

El valor de `pageLoadTime` no se conoce antes de la carga de la página, por lo que se denomina normalmente. Pero sigue siendo una constante porque no cambia después de la asignación.

En otras palabras, las constantes con nombre de mayúscula sólo se utilizan como alias para valores "hard-coded".

## Name things right

Hablando de variables, hay una cosa más, extremadamente importante.

Por favor, nombra a tus variables con sensatez. Tómate tu tiempo para pensar en esto.

La denominación de variables es una de las habilidades más importantes y complejas en la programación. Un rápido vistazo a los nombres de las variables puede revelar qué código fue escrito por un principiante frente a un desarrollador experimentado.

En un proyecto real, la mayor parte del tiempo se dedica a modificar y ampliar un código base existente en lugar de escribir algo completamente separado desde cero. Cuando volvemos a algún código después de hacer otra cosa por un tiempo, es mucho más fácil encontrar información bien etiquetada. O, en otras palabras, cuando las variables tienen buenos nombres.

Por favor, dedica tiempo a pensar en el nombre correcto para una variable antes de declararla. Hacerlo te lo devolverá generosamente.

Algunas reglas buenas para seguir son:

- Utiliza nombres legibles para humanos como `userName` o `shoppingCart`.
- Mantente alejado de abreviaturas o nombres cortos como `a`,`b`, `c`, a menos que realmente sepas lo que está haciendo.
- Haz que los nombres sean lo más descriptivos y concisos posible. Ejemplos de malos nombres son `data` y `value`. Esos nombres no dicen nada. Sólo está bien usarlos si el contexto del código hace que sea excepcionalmente obvio a qué datos o valor hace referencia la variable.
- Acuerda los términos dentro de tu equipo y en tu propia mente. Si un visitante del sitio es llamado `user` entonces debemos nombrar variables relacionadas como `currentUser` o `newUser` en lugar de `currentVisitor` o `newManInTownNeno`.

¿Suena simple? De hecho lo es, pero la creación de nombres de variables descriptivos y concisos en la práctica no lo es.

##### "Reuse or create?"
Y la última nota. Hay algunos programadores perezosos que, en lugar de declarar nuevas variables, tienden a reutilizar las existentes.

Como resultado, sus variables son como cajas en las que la gente tira cosas diferentes sin cambiar sus pegatinas. ¿Qué hay dentro de la caja ahora? ¿Quién sabe? Tenemos que acercarnos y comprobarlo.

Estos programadores ahorran un poco en la declaración de variables, pero pierden diez veces más en la depuración.

Una variable extra es buena, no mala.

Los modernos mini-navegadores y navegadores JavaScript optimizan el código lo suficientemente bien, por lo que no creará problemas de rendimiento. El uso de diferentes variables para diferentes valores puede incluso ayudar al motor a optimizar su código.

## Summary

Podemos declarar variables para almacenar datos usando las palabras clave `var`, `let`, o `const`.

- `let` -- es una declaración variable moderna.
- `var` -- es una declaración variable de la vieja escuela. Normalmente no lo usamos en absoluto, pero cubriremos las diferencias sutiles de `let' en el capítulo <info:var>, por si acaso las necesitas.
- `const` -- es como `let`, pero el valor de la variable no puede ser cambiado.

Las variables deben ser nombradas de una manera que nos permita entender fácilmente lo que hay dentro de ellas.
