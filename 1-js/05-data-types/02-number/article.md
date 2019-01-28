# Numbers

Todos los números en JavaScript se almacenan en formato de 64 bits [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985), también conocido como "doble precisión".

Recapitulemos y ampliemos lo que sabemos actualmente sobre ellos.

## More ways to write a number

Imagina que necesitamos escribir 1 billón. La forma obvia es:

```js
let billion = 1000000000;
```

Pero en la vida real usualmente evitamos escribir una larga cadena de ceros, ya que es fácil de escribir mal. Además, somos perezosos. Por lo general, escribiremos algo así como "1 mil millones" por mil millones o "7,3 mil millones" por 7 mil millones 300 millones. Lo mismo es cierto para la mayoría de los números grandes.

En JavaScript, acortamos un número agregando la letra `"e"` al número y especificando el recuento de ceros:

```js run
let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes

alert( 7.3e9 );  // 7.3 billions (7,300,000,000)
```

En otras palabras, `"e"` multiplica el número por `1` con el recuento de ceros dado.

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000 
```

Ahora vamos a escribir algo muy pequeño. Digamos, 1 microsegundo (una millonésima de segundo): 

```js
let ms = 0.000001;
```

Al igual que antes, usar `"e"` puede ayudar. Si quisiéramos evitar escribir los ceros explícitamente, podríamos decir:

```js
let ms = 1e-6; // six zeroes to the left from 1 
```

Si contamos los ceros en `0.000001`, hay 6 de ellos. Así que, naturalmente, es `1e-6`.

En otras palabras, un número negativo después de `"e"` significa una división por 1 con el número dado de ceros:

```js
// -3 divides by 1 with 3 zeroes
1e-3 = 1 / 1000 (=0.001)

// -6 divides by 1 with 6 zeroes
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

### Hex, binary and octal numbers
Los números [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) se usan ampliamente en JavaScript para representar colores, codificar caracteres y para muchas otras cosas. Así que, naturalmente, existe una forma más corta de escribirlos: `0x` y luego el número.

Por ejemplo:
```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (the same, case doesn't matter)
```

Los sistemas de numeración binario y octal rara vez se utilizan, pero también son compatibles con los prefijos `0b` y `0o`:

```js run
let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

alert( a == b ); // true, the same number 255 at both sides
```

Sólo hay 3 sistemas de numeración con tal apoyo. Para otros sistemas de numeración, deberíamos usar la función `parseInt` (que veremos más adelante en este capítulo).

## toString(base)

El método `num.toString (base)` devuelve una representación de cadena de `num` en el sistema numérico con el `base` dado.

Por ejemplo:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```
El `base` puede variar de` 2` a `36`. Por defecto es `10`.

Los casos de uso comunes para esto son:

- **base=16** se usa para colores hexadecimales, codificaciones de caracteres, etc., los dígitos pueden ser `0..9` o `A..F`.
- **base=2** es principalmente para depurar operaciones a nivel de bits, los dígitos pueden ser `0` o `1`.
- **base=36** es el máximo, los dígitos pueden ser `0..9` o `A..Z`. El alfabeto latino entero se usa para representar un número. Un caso divertido, pero útil para `36` es cuando necesitamos convertir un identificador numérico largo en algo más corto, por ejemplo, para hacer una url corta. Simplemente puede representarlo en el sistema numérico con base `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

Tenga en cuenta que dos puntos en `123456..toString (36)` no es un error tipográfico. Si queremos llamar a un método directamente en un número, como `toString` en el ejemplo anterior, entonces tenemos que colocar dos puntos `..` después.

Si colocamos un solo punto: `123456.toString (36)`, entonces habría un error, porque la sintaxis de JavaScript implica la parte decimal después del primer punto. Y si colocamos un punto más, JavaScript sabe que la parte decimal está vacía y ahora pasa el método.

También podría escribir `(123456) .toString (36)`.

## Rounding

Una de las operaciones más utilizadas cuando se trabaja con números es el redondeo.

Hay varias funciones incorporadas para el redondeo:

`Math.floor`
: Redondea hacia abajo: `3.1` se convierte en `3`, y `-1.1` se convierte en` -2`.

`Math.ceil`
: Redondea: `3.1` se convierte en `4`, y `-1.1` se convierte en `-1`.

`Math.round`
: Redondea al entero más cercano: `3.1` se convierte en` 3`, `3.6` se convierte en` 4` y `-1.1` se convierte en` -1`.

`Math.trunc` (no es compatible con Internet Explorer)
: Elimina cualquier cosa después del punto decimal sin redondear: `3.1` se convierte en `3`, `-1.1` se convierte en `-1`.

Aquí está la tabla para resumir las diferencias entre ellos:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Estas funciones cubren todas las formas posibles de lidiar con la parte decimal de un número. Pero, ¿qué pasa si nos gustaría redondear el número a un dígito "n-th" después del decimal?

Por ejemplo, tenemos `1.2345` y queremos redondearlo a 2 dígitos, obteniendo solo` 1.23`.

Hay dos formas de hacerlo:

1. Multiplica y divide.

    Por ejemplo, para redondear el número al segundo dígito después del decimal, podemos multiplicar el número por `100`, llamar a la función de redondeo y luego dividirlo.
    
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. El método [toFixed (n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) redondea el número a los dígitos `n` después del punto y devuelve Una representación en cadena del resultado.
        
    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

   Esto se redondea hacia arriba o hacia abajo al valor más cercano, similar a `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Tenga en cuenta que el resultado de `toFixed` es una cadena. Si la parte decimal es más corta de lo requerido, los ceros se agregan al final:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits 
    ```

    Podemos convertirlo a un número usando el plus unario o una llamada a `Number ()`: `+ num.toFixed (5)`.

## Imprecise calculations

Internamente, un número se representa en formato de 64 bits [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985), por lo que hay exactamente 64 bits para almacenar un número: se utilizan 52 de ellos para almacenar los dígitos, 11 de ellos almacenan la posición del punto decimal (son cero para los números enteros), y 1 bit es para el signo.

Si un número es demasiado grande, desbordaría el almacenamiento de 64 bits, lo que potencialmente daría un infinito:

```js run
alert( 1e500 ); // Infinity 
```

Lo que puede ser un poco menos obvio, pero sucede muy a menudo, es la pérdida de precisión.

Considera esta prueba (¡falsa!):

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Así es, si verificamos si la suma de `0.1` y `0.2` es `0.3`, obtenemos `false`.

¡Extraño! ¿Qué es entonces si no es `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

¡Ay! Hay más consecuencias que una comparación incorrecta aquí. Imagine que está haciendo un sitio de compras electrónicas y el visitante coloca en su cuadro productos de `$0,10` y `$0,20`. El total del pedido será de `$0.30000000000000004`. Eso sorprendería a cualquiera.

Pero ¿por qué sucede esto?

Un número se almacena en la memoria en su forma binaria, una secuencia de unos y ceros. Pero las fracciones como `0.1`, `0.2` que parecen simples en el sistema numérico decimal son en realidad fracciones interminables en su forma binaria.

En otras palabras, ¿qué es `0.1`? Es uno dividido por diez `1/10`, un décimo. En el sistema de numeración decimal, tales números son fácilmente representables. Compáralo con un tercio: `1/3`. Se convierte en una fracción sin fin `0.33333(3)`.

Entonces, se garantiza que la división por potencias `10` funciona bien en el sistema decimal, pero la división por `3` no lo está. Por la misma razón, en el sistema de numeración binaria, la división por potencias de `2` está garantizada para funcionar, pero` 1/10` se convierte en una fracción binaria sin fin.

Simplemente no hay manera de almacenar *exactamente 0.1* o *exactamente 0.2* utilizando el sistema binario, al igual que no hay manera de almacenar un tercio como fracción decimal.

El formato numérico IEEE-754 resuelve esto al redondearlo al número más cercano posible. Estas reglas de redondeo normalmente no nos permiten ver esa "pequeña pérdida de precisión", por lo que el número aparece como `0.3`. Pero cuidado, la pérdida todavía existe.

Podemos ver esto en acción:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

Y cuando sumamos dos números, sus "pérdidas de precisión" se suman.

Es por eso que `0.1 + 0.2` no es exactamente `0.3`.

El mismo problema existe en muchos otros lenguajes de programación.

PHP, Java, C, Perl, Ruby dan exactamente el mismo resultado, ya que se basan en el mismo formato numérico.

¿Podemos solucionar el problema? Claro, hay varias maneras:

1. Podemos redondear el resultado con la ayuda de un método [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

    ```js run
    let sum = 0.1 + 0.2;
    alert( sum.toFixed(2) ); // 0.30
    ```

    Tenga en cuenta que `toFixed` siempre devuelve una cadena. Asegura que tiene 2 dígitos después del punto decimal. Eso es realmente conveniente si tenemos una compra electrónica y necesitamos mostrar `$0.30`. Para otros casos, podemos usar el plus unario para convertirlo en un número:

    ```js run
    let sum = 0.1 + 0.2;
    alert( +sum.toFixed(2) ); // 0.3
    ```

2. Podemos convertir temporalmente los números en números enteros para las matemáticas y luego revertirlos. Funciona así:

    ```js run
    alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
    ```

    Esto funciona porque cuando hacemos `0.1 * 10 = 1` y `0.2 * 10 = 2`, ambos números se convierten en números enteros, y no hay pérdida de precisión. 

3. Si estuviéramos tratando con una tienda, entonces la solución más radical sería almacenar todos los precios en centavos y no usar fracciones en absoluto. Pero ¿y si aplicamos un descuento del 30%? En la práctica, rara vez es posible evadir fracciones por completo, por lo que las soluciones anteriores ayudan a evitar este escollo.


Intenta ejecutar esto:

```js run
// Hello! I'm a self-increasing number! 
alert( 9999999999999999 ); // shows 10000000000000000
```
Esto tiene el mismo problema: una pérdida de precisión. Hay 64 bits para el número, 52 de ellos se pueden usar para almacenar dígitos, pero eso no es suficiente. Así desaparecen los dígitos menos significativos.

JavaScript no dispara un error en tales eventos. Hace todo lo posible para ajustar el número al formato deseado, pero desafortunadamente, este formato no es lo suficientemente grande.

Otra consecuencia divertida de la representación interna de los números es la existencia de dos ceros: `0` y `-0`.

Esto se debe a que un signo está representado por un solo bit, por lo que cada número puede ser positivo o negativo, incluido un cero.

En la mayoría de los casos, la distinción es imperceptible, ya que los operadores están preparados para tratarlos de la misma manera.


## Tests: isFinite and isNaN

¿Recuerdas estos dos valores numéricos especiales?

- `Infinito` (e `-Infinito`) es un valor numérico especial que es mayor (menor) que cualquier otra cosa.
- `NaN` representa un error.

Pertenecen al tipo `número`, pero no son números "normales", por lo que hay funciones especiales para verificarlos:

- `isNaN (valor)` convierte su argumento en un número y luego lo prueba para que sea `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    ¿Pero necesitamos esta función? ¿No podemos usar la comparación `=== NaN`? Lo siento, pero la respuesta es no. El valor `NaN` es único en el sentido de que no es igual a nada, incluyéndose a sí mismo:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(valor)` convierte su argumento en un número y devuelve `true` si es un número regular, no` NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, because a special value: NaN
    alert( isFinite(Infinity) ); // false, because a special value: Infinity
    ```

A veces, `isFinite` se usa para validar si un valor de cadena es un número regular:

```js run
let num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );
```

Tenga en cuenta que una cadena vacía o un solo espacio se trata como `0` en todas las funciones numéricas, incluyendo `isFinite`.

Existe un método especial incorporado [Object.is](mdn:js/Object/is) que compara valores como `===`, pero es más confiable para dos casos de borde:

1. Funciona con `NaN`: `Object.is (NaN, NaN) === true`, eso es algo bueno.
2. Los valores `0` y `-0` son diferentes: `Object.is (0, -0) === false`, rara vez importa, pero estos valores técnicamente son diferentes.

En todos los demás casos, `Object.is (a, b)` es lo mismo que `a === b`.

Esta forma de comparación se utiliza a menudo en la especificación de JavaScript. Cuando un algoritmo interno necesita comparar dos valores por ser exactamente el mismo, utiliza `Object.is` (llamado internamente [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).


## parseInt and parseFloat

La conversión numérica utilizando un signo más `+` o ` Number()` es estricta. Si un valor no es exactamente un número, falla:

```js run
alert( +"100px" ); // NaN
```
La única excepción son los espacios al principio o al final de la cadena, ya que se ignoran.

Pero en la vida real a menudo tenemos valores en unidades, como `"100px"` o `"12pt"` en CSS. También en muchos países, el símbolo de moneda va después de la cantidad, por lo que tenemos `"19€"` y nos gustaría extraer un valor numérico de eso.

Eso es para lo que son `parseInt` y `parseFloat`.

Ellos "leen" un número de una cuerda hasta que no pueden. En caso de error, se devuelve el número recogido. La función `parseInt` devuelve un entero, mientras que `parseFloat` devolverá un número de punto flotante:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
```

Hay situaciones en las que `parseInt/parseFloat` devolverá `NaN`. Ocurre cuando no se pudo leer ningún dígito:

```js run
alert( parseInt('a123') ); // NaN, the first symbol stops the process
```

La función `parseInt()` tiene un segundo parámetro opcional. Especifica la base del sistema de numeración, por lo que `parseInt` también puede analizar cadenas de números hexadecimales, números binarios, etc.

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 123456
```

## Other math functions

JavaScript tiene un objeto [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) que contiene una pequeña biblioteca de funciones matemáticas y constantes.

Algunos ejemplos:

`Math.random()`
: Devuelve un número aleatorio de 0 a 1 (sin incluir 1)

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (any random numbers)
    ```

`Math.max(a, b, c ...)`/`Math.min(a, b, c ...)`
: Devuelve el mayor/menor del número arbitrario de argumentos.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, poder)`
: Devuelve `n` elevado el poder dado

    ```js run
    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024
    ```

Hay más funciones y constantes en el objeto `Math`, incluida la trigonometría, que puede encontrar en [docs for the Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Matemáticas) objeto.

## Summary

Para escribir grandes números:

- Agregue `"e"` con los ceros al número. Como: `123e6` es `123` con 6 ceros.
- Un número negativo después de `"e"` hace que el número se divida por 1 con ceros dados. Eso es por una millonésima o tal.

Para diferentes sistemas de numeración:

- Puede escribir números directamente en sistemas hexadecimales (`0x`), octales (`0o`) y binarios (`0b`)
- `parseInt(str, base)` analiza un número entero de cualquier sistema numérico con base: `2 ≤ base ≤ 36`.
- `num.toString(base)` convierte un número en una cadena en el sistema numérico con el `base` dado.

Para convertir valores como `12pt` y `100px` en un número:

- Use `parseInt/parseFloat` para la conversión "suave", que lee un número de una cadena y luego devuelve el valor que pudieron leer antes del error.

Para fracciones:

- Redondee usando `Math.floor`, `Math.ceil`, `Math.trunc`,`Math.round` o `num.toFixed(precision)`.
- Asegúrese de recordar que hay una pérdida de precisión cuando se trabaja con fracciones.

Más funciones matemáticas:

- Vea el objeto [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) cuando los necesite. La biblioteca es muy pequeña, pero puede cubrir necesidades básicas.