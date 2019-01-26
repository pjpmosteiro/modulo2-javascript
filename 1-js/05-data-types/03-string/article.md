# Strings

En JavaScript, los datos textuales se almacenan como string. No hay un tipo separado para un solo carácter.

El formato interno para string es siempre [UTF-16](https://en.wikipedia.org/wiki/UTF-16), No está ligado a la codificación de la página.

## Citas

Recordemos los tipos de citas.

Las string pueden incluirse entre comillas simples, comillas dobles o comillas invertidas:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Las comillas simples y dobles son esencialmente las mismas. Backticks, sin embargo, nos permite incrustar cualquier expresión en la cadena, incluidas las llamadas a funciones:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Otra ventaja de usar backticks es que permiten que una cadena abarque varias líneas:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // a list of guests, multiple lines
```

Si intentamos usar comillas simples o dobles de la misma manera, habrá un error:
```js run
let guestList = "Guests:  // Error: Unexpected token ILLEGAL
  * John";
```

Las comillas simples y dobles provienen de tiempos antiguos de creación de lenguaje cuando no se tuvo en cuenta la necesidad de string multilínea. Backticks aparecieron mucho más tarde y por lo tanto son más versátiles.

Backticks también nos permite especificar una "función de plantilla" antes del primer backtick. La sintaxis es: <code>func&#96;string&#96;</code>. La función `func` Se llama automáticamente, recibe la cadena y las expresiones incrustadas y puede procesarlas. Puedes leer más sobre esto en el [docs](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals). Esto se llama "plantillas etiquetadas". Esta característica hace que sea más fácil envolver las string en plantillas de personalización u otras funciones, pero rara vez se utiliza.


## Caracteres especiales

Todavía es posible crear string de varias líneas con comillas simples utilizando el llamado "carácter de nueva línea", escrito como `\n`, el cual denota una rotura de linea:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // a multiline list of guests
```

Por ejemplo, estas dos lineas describen lo mismo:

```js run
alert( "Hello\nWorld" ); // two lines using a "newline symbol"

// two lines using a normal newline and backticks
alert( `Hello
World` );
```

También hay otros caracteres "especiales" menos comunes. Aquí está la lista:

| Character | Description |
|-----------|-------------|
|`\b`|Retroceso|
|`\f`|Form feed|
|`\n`|nueva linea|
|`\r`|retorno del carro|
|`\t`|Tab|
|`\uNNNN`|Un simbolo unicode con el codigo hexadecimal `NNNN`, por ejemplo `\u00A9` -- es un unicode para el simpoblo copyright `©`. Debe ser exactamente 4 digitos hexadecimales. |
|`\u{NNNNNNNN}`|SAlgunos caracteres raros están codificados con dos símbolos Unicode, que ocupan hasta 4 bytes. Este unicode largo requiere llaves a su alrededor.|

Ejemplos con unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare chinese hieroglyph (long unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long unicode)
```

Todos los caracteres especiales comienzan con un carácter de barra diagonal inversa `\`. También se le llama un "caracter de escape".

También lo usaríamos si queremos insertar una cita en la cadena.

Por ejemplo:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Como puede ver, tenemos que anteponer la comilla interna con la barra invertida `\'`,  porque de lo contrario indicaría el final de la cadena.

Por supuesto, eso se refiere solo a las citas que son iguales a las que se adjuntan. Entonces, como una solución más elegante, podríamos cambiar a comillas dobles o backticks en su lugar:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

Tenga en cuenta que la barra diagonal inversa `\` sirve para la lectura correcta de la cadena por JavaScript, luego desaparece. La cadena en memoria no tiene `\`. Puedes verlo claramente en `alert` de los ejemplos anteriores.

¿Pero qué pasa si necesitamos mostrar una barra invertida real `\` dentro de la cadena?

Eso es posible, pero necesitamos duplicarlo como `\\`:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## Longitud de la cadena


La propiedad `length` muestra la longitud de la cadena:

```js run
alert( `My\n`.length ); // 3
```

tenga en cuenta que `\n` es un caracer especial simple, por lo que la longitud es `3`.

```warn header="`length` es una propiedad"
Personas que hablan otros idiomas a veces se equivocan al escribir `str.length()` en lugar de `str.length`. Esto no funciona.

Por favor, tenga en cuenta que `str.length` es una propiedad numerica, no una funcion. No se necesita incluir parentesis despues de ella.
```

## Acceso a caracteres

Para obtener un caracter en la posicion `pos`, usamos corchetes `[pos]` o llamamos al metodo [str.charAt(pos)](mdn:js/String/charAt). El primer caracter comienza desde la posicion zero:

```js run
let str = `Hello`;

// El primer caracter alerta( str[0] ); // H
alert( str.charAt(0) ); // H

// El ultimo caracter alerta( str[str.length - 1] ); // o
```

Los corchetes son una forma moderna de obtener caracteres, miestra que `charAt` existe mayormente por razones históricas.

La unica diferencia entre ellos es que si un caracter no es encontrado, `[]` devuelve `undefined`, y `charAt` devuelve una cadena vacía:

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (an empty string)
```

También podemos iterar sobre los personajes usando `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}
```

## Las string son inmutables

Las string no se pueden cambiar JavaScript. Es imposible cambiar un caracter.

Vamos a probarlo para mostrar que no se puede hacer:

```js run
let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // no funciona
```

La solución habitual es crear una cadena completamente nueva y asignarla a `str` en lugar de la vieja.

Por ejemplo:

```js run
let str = 'Hi';

str = 'h' + str[1];  // replace the string

alert( str ); // hi
```

En las siguientes secciones veremos mas ejemplos de esto.

## Cambiando el caso

Methods [toLowerCase()](mdn:js/String/toLowerCase) y [toUpperCase()](mdn:js/String/toUpperCase) cambian el caso:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

o, si queremos un solo caracter en minusculas:

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Buscando una subcadena

Hay varias formas de buscar una subcadena dentro de una cadena.

### str.indexOf

El primer metodo es [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Busca `substr` en `str`, empezando por la posicion dada `pos`, y devuelve la posicion donde fue econtado o notifica `-1` si no se encuentra nada.

Por ejemplo:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive

alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)
```

El segundo parámetro opcional nos permite buscar a partir de la posición dada.

Por ejemplo, la primera aparición de `" id "` está en la posición `1`. Para buscar la próxima aparición, comencemos la búsqueda desde la posición `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```


Si estamos interesados en todas las ocurrencias, podemos ejecutar `indexOf` en un bucle. Cada nueva llamada se realiza con la posición después del partido anterior:


```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // let's look for it

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue the search from the next position
}
```

El mismo algoritmo puede ser más corto.:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
tambien hay un metodo similar [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) que busca desde el final de una cadena hasta su inicio.

Enumeraría las ocurrencias en orden inverso.
```

Hay un pequeño inconveniente con `indexOf` en la prueba `if`. No podemos ponerlo en el 'if' como este:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // doesn't work!
}
```

La `alerta` en el ejemplo anterior no se muestra porque` str.indexOf ("Widget") `devuelve` 0` (lo que significa que encontró la coincidencia en la posición inicial). Correcto, pero `if` considera que` 0` es `falso`

Por lo tanto, deberíamos comprobar '-1', así:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // works now!
}
```

````Encabezado inteligente="The bitwise NOT trick"
Uno de los viejos trucos utilizados aquí es el operador [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` . Este comvierte el numero a un numero entero de 32-bit (elimina la parte decimal si esta existiese) y luego invierte todos los bits en su representación binaria.

Para enteros de 32 bits, la llamada `~ n` significa exactamente lo mismo que` - (n + 1) `(debido al formato IEEE-754).

Por ejemplo:

```js run
alert( ~2 ); // -3, the same as -(2+1)
alert( ~1 ); // -2, the same as -(1+1)
alert( ~0 ); // -1, the same as -(0+1)
*!*
alert( ~-1 ); // 0, the same as -(-1+1)
*/!*
```

Como se puede ver `~n` es zero solo si `n == -1`.

Por lo tanto, la prueba `if (~ str.indexOf (" ... "))` es verdad que el resultado de `indexOf` no es` -1`. En otras palabras, cuando hay una coincidencia.

La gente lo usa para acortar las comprobaciones de `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // works
}
```

Generalmente no se recomienda usar las características del lenguaje de una manera no obvia, pero este truco en particular se usa ampliamente en el código antiguo, por lo que debemos entenderlo.

Recuerda: `if (~str.indexOf(...))` lee "if found".
````

### Incluye, comienzaCon, terminaCon

El metodo mas moderno [str.includes(substr, pos)](mdn:js/String/includes) devuelve `true/false` dependiendo de si `str` contiene `substr` dentro.

Es la elección correcta si necesitamos probar el partido, pero no necesitamos su posición:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

El segundo argumento opcional de `str.includes` es la posición para comenzar la búsqueda desde:

```js run
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, from position 3 there is no "id"
```

Los metodos [str.startsWith](mdn:js/String/startsWith) y [str.endsWith](mdn:js/String/endsWith) hacen exactamente lo que dicen:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") );   // true, "Widget" ends with "get"
```

## Obteniendo una subcadena

Hay 3 métodos en JavaScript para obtener una subcadena: `substring`,` substr` y `slice`.

`str.slice(start [, end])`
: Devuelve la parte de la cadena de `start` a (pero sin incluir)` end`.

    Por ejemplo:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
    ```

    Si no hay un segundo argumento, entonces `slice` va hasta el final de la cadena: 

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, from the 2nd position till the end
    ```

    Los valores negativos para `inicio / final` también son posibles. Significan que la posición se cuenta desde el final de la cadena:

    ```js run
    let str = "strin*!*gif*/!*y";

    // empieza en la 4ª posición desde la derecha, termina en la 1ª desde la derecha
    alert( str.slice(-4, -1) ); // gif
    ```


`str.substring(start [, end])`
: Devuelve la parte de la cadena *entre* `start` y `end`.

    Esto es casi lo mismo que `slice`, pero permite que` start` sea mayor que `end`.

     Por ejemplo:


    ```js run
    let str = "st*!*ring*/!*ify";

    // these are same for substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...but not for slice:
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)

    ```

    Los argumentos negativos no son compatibles (a diferencia de slice), se tratan como `0`.


`str.substr(start [, length])`
: devuelve la parte de la cadena desde `start`, con lo dado `length`.

    En contraste con los métodos anteriores, este nos permite especificar la longitud en lugar de la posición final:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, from the 2nd position get 4 characters
    ```

    El primer argumento puede ser negativo, para contar desde el final:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, from the 4th position get 2 characters
    ```

Vamos a resumir estos métodos para evitar cualquier confusión:

| method | selects... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` | negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |


```smart header="Cual escoger?"
Todos ellos pueden hacer el trabajo. Formalmente, `substr` tiene un inconveniente menor: se describe no en la especificación de JavaScript principal, sino en el Anexo B, que cubre las características exclusivas del navegador que existen principalmente por razones históricas. Por lo tanto, los entornos que no son de navegador pueden no admitirlo. Pero en la práctica funciona en todas partes.

El autor se encuentra usando `slice` casi todo el tiempo.
```

## Comparando string

Como vimos en el capitulo <info:comparison>, strings se comparan carácter por carácter en orden alfabético.

Aunque, hay algunas rarezas.

1. Una letra minúscula siempre es mayor que la mayúscula:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Las letras con signos diacríticos están "fuera de orden":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Esto puede llevar a resultados extraños si ordenamos estos nombres de países. Por lo general, la gente espera que 'Zealand' venga después de 'Österreich' en la lista.

Para comprender lo que sucede, revisemos la representación interna de cadenas en JavaScript.

Todas las cadenas están codificadas usando [UTF-16](https://en.wikipedia.org/wiki/UTF-16).Es decir: cada carácter tiene un código numérico correspondiente. Hay métodos especiales que permiten obtener el carácter para el código y volver.

`str.codePointAt(pos)`
: Devuelve el código del caracter en la posición. `pos`:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Crea un carácter por su numérico. `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    También podemos agregar caracteres Unicode por sus códigos usando `\ u` seguido del código hexadecimal:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Ahora veamos los caracteres con códigos `65..220` (el alfabeto latino y un poco más) haciendo una cadena de ellos:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

¿Ver? Los caracteres en mayúsculas van primero, luego algunos especiales, luego los en minúsculas.

Ahora se vuelve obvio por qué `a> Z`.

Los caracteres se comparan por su código numérico. El código mayor significa que el personaje es mayor. El código para `a` (97) es mayor que el código para` Z` (90).

- Todas las letras minúsculas van detrás de las letras mayúsculas porque sus códigos son mayores.
- Algunas letras como `Ö` se distinguen del alfabeto principal. Aquí, su código es mayor que cualquier cosa desde `a` a` z`.


### Comparaciones correctas

El algoritmo "correcto" para hacer comparaciones de cadenas es más complejo de lo que parece, porque los alfabetos son diferentes para diferentes idiomas. La misma letra se puede ubicar de manera diferente en diferentes alfabetos.

Por lo tanto, el navegador necesita saber el idioma para comparar.

Por suerte, todos los navegadores modernos (IE10- requieren la biblioteca adicional [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) Apoyar el estándar de internacionalización. [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Proporciona un método especial para comparar cadenas en diferentes idiomas, siguiendo sus reglas.

la llamada [str.localeCompare(str2)](mdn:js/String/localeCompare):

- devuelve `1` si `str` es mayor que `str2` de acuerdo con las reglas de lenguaje.
- decueve `-1` si `str` es menor que `str2`.
- devuelve `0` si son iguales.

por ejemplo:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Este método en realidad tiene dos argumentos adicionales especificados en [the documentation](mdn:js/String/localeCompare), lo que le permite especificar el idioma (por defecto, tomado del entorno) y configurar reglas adicionales, como la sensibilidad a las mayúsculas, o si "" a "` y `" á "` se deben tratar de la misma manera, etc.

## Internals, Unicode

```advertir encabezado = "Conocimiento avanzado"
La sección profundiza en los internos de la cadena. Este conocimiento será útil para usted si planea lidiar con emoji, caracteres matemáticos raros de jeroglíficos u otros símbolos raros.

Puede omitir la sección si no planea apoyarlos.
```

### Surrogate pairs

La mayoría de los símbolos tienen un código de 2 bytes. Las letras en la mayoría de los idiomas europeos, los números e incluso la mayoría de los jeroglíficos tienen una representación de 2 bytes.

Pero 2 bytes solo permiten 65536 combinaciones y eso no es suficiente para cada símbolo posible. Así que los símbolos raros se codifican con un par de caracteres de 2 bytes llamados "un par suplente".

La longitud de tales símbolos es `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare chinese hieroglyph
```

Tenga en cuenta que los pares sustitutos no existían en el momento en que se creó JavaScript, por lo que el idioma no los procesa correctamente.

En realidad, tenemos un solo símbolo en cada una de las cadenas anteriores, pero la "longitud" muestra una longitud de `2`.

`String.fromCodePoint` y `str.codePointAt` Son pocos los métodos raros que tratan los pares sustitutos a la derecha. Recientemente aparecieron en el idioma. Ante ellos, sólo había [String.fromCharCode](mdn:js/String/fromCharCode) y [str.charCodeAt](mdn:js/String/charCodeAt). Estos métodos son en realidad los mismos que`fromCodePoint/codePointAt`, 
pero no trabajes con parejas sustitutas.

Pero, por ejemplo, obtener un símbolo puede ser complicado, porque los pares sustitutos se tratan como dos caracteres:

```js run
alert( '𝒳'[0] ); // strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Tenga en cuenta que las piezas de la pareja sustituta no tienen ningún significado sin la otra. Así que las alertas en el ejemplo anterior realmente muestran basura.

Técnicamente, los pares sustitutos también son detectables por sus códigos: si un personaje tiene el código en el intervalo de `0xd800..0xdbff`, entonces es la primera parte del par suplente. El siguiente carácter (segunda parte) debe tener el código en el intervalo `0xdc00..0xdfff`. Estos intervalos están reservados exclusivamente para pares sustitutos por el estándar.

En el caso anterior:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

Encontrará más formas de lidiar con pares sustitutos más adelante en el capítulo. <info:iterable>. Probablemente hay bibliotecas especiales para eso también, pero nada lo suficientemente famoso como para sugerir aquí.

### Diacritical marks and normalization

En muchos idiomas hay símbolos que se componen del carácter base con una marca arriba / debajo.

Por ejemplo, la letra `a` puede ser el carácter base para:` àáâäãåāā`. El carácter "compuesto" más común tiene su propio código en la tabla UTF-16. Pero no todas, porque hay demasiadas combinaciones posibles.

Para admitir composiciones arbitrarias, UTF-16 nos permite usar varios caracteres Unicode. El carácter base y uno o varios caracteres de "marca" que lo "decoran".

Por ejemplo, si tenemos `S` seguido del carácter especial" punto arriba "(código` \ u0307`), se muestra como Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Si necesitamos una marca adicional encima de la letra (o debajo de ella) - no hay problema, solo agregue el carácter de marca necesario.

Por ejemplo, si agregamos un carácter "punto abajo" (código `\ u0323`), entonces tendremos" S con puntos arriba y abajo ":` Ṩ`.

Por ejemplo:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Esto proporciona una gran flexibilidad, pero también un problema interesante: dos personajes pueden parecer visualmente iguales, pero estar representados con diferentes composiciones de Unicode.

Por ejemplo:

```js run
alert( 'S\u0307\u0323' ); // Ṩ, S + dot above + dot below
alert( 'S\u0323\u0307' ); // Ṩ, S + dot below + dot above

alert( 'S\u0307\u0323' == 'S\u0323\u0307' ); // false
```

Para resolver esto, existe un algoritmo de "normalización de Unicode" que lleva a cada cadena a la única forma "normal".

Es implementado por [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Es gracioso que en nuestra situación `normalize ()` en realidad reúna una secuencia de 3 caracteres en uno: `\ u1e68` (S con dos puntos).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

En realidad, este no es siempre el caso. La razón es que el símbolo `Ṩ` es" suficientemente común ", por lo que los creadores de UTF-16 lo incluyeron en la tabla principal y le dieron el código.

Si desea obtener más información sobre las reglas y variantes de normalización, se describen en el apéndice del estándar de Unicode: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), pero para los propósitos más prácticos, la información de esta sección es suficiente.


## Summary

- Hay 3 tipos de citas. Las comillas invertidas permiten que una cadena abarque varias líneas e incrustar expresiones.
- Las cadenas en JavaScript se codifican utilizando UTF-16.
- Podemos usar caracteres especiales como `\ n` e insertar letras por su código Unicode usando` \ u ... `.
- Para obtener un personaje, usa: `[]`.
- Para obtener una subcadena, use: `slice` o` substring`.
- Para minúsculas / mayúsculas en una cadena, use: `toLowerCase / toUpperCase`.
- Para buscar una subcadena, use: `indexOf`, o` includes / startsWith / endsWith` para verificaciones simples.
- Para comparar cadenas según el idioma, use: `localeCompare`, de lo contrario se comparan por códigos de caracteres.

Hay varios otros métodos útiles en cadenas:

- `str.trim ()` - elimina ("recorta") espacios desde el principio y el final de la cadena.
- `str.repeat (n)` - repite la cadena `n` veces.
- ...y más. Ver el [manual](mdn:js/String) para detalles.

Las cadenas también tienen métodos para hacer búsqueda / reemplazo con expresiones regulares. Pero ese tema merece un capítulo aparte, por lo que volveremos más adelante.
