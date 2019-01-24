# Operators

Conocemos muchos operadores de la escuela. Son cosas como la suma `+`, la multiplicación `*`, la resta `-`, y así sucesivamente.

En este capítulo, nos concentraremos en aspectos de los operadores que no están cubiertos por la aritmética escolar.

## Terms: "unary", "binary", "operand"

Antes de continuar, vamos a comprender algunos términos comunes.

- _An operand_ - es a lo que se aplican los operadores. Por ejemplo, en la multiplicación de `5 * 2` hay dos operandos: el operando izquierdo es`5` y el operando derecho es `2`. A veces, la gente llama a estos "argumentos" en lugar de "operandos".
- Un operador es _unario_ si tiene un solo operando. Por ejemplo, la negación unaria `-` invierte el signo de un número:

Before we move on, let's grasp some common terminology.

```js run
let x = 1;

*!*
x = -x;
*/!*
alert( x ); // -1, unary negation was applied
```

- Un operador es _binario_ si tiene dos operandos. El mismo menos existe también en forma binaria:

  ```js run no-beautify
  let x = 1,
    y = 3;
  alert(y - x); // 2, binary minus subtracts values
  ```

Formalmente, estamos hablando de dos operadores diferentes aquí: la negación unaria (operando único: invierte el signo) y la resta binaria (dos operandos: resta).

## String concatenation, binary +

Ahora, veamos las características especiales de los operadores de JavaScript que están más allá de la aritmética escolar.

Por lo general, el operador más `+` suma números.

Pero, si el binario `+` se aplica a cadenas, las fusiona (concatena):

```js
let s = "my" + "string";
alert(s); // mystring
```

Ten en cuenta que si uno de los operandos es una cadena, el otro también se convierte en una cadena.

Por ejemplo:

```js run
alert("1" + 2); // "12"
alert(2 + "1"); // "21"
```

No importa si el primer operando es una cadena o el segundo. La regla es simple: si cualquiera de los operandos es una cadena, el otro también se convierte en una cadena.

Sin embargo, tenga en cuenta que las operaciones se ejecutan de izquierda a derecha. Si hay dos números seguidos por una cadena, los números se agregarán antes de convertirse en una cadena:

```js run
alert(2 + 2 + "1"); // "41" and not "221"
```

La concatenación y conversión de cadenas es una característica especial del binario más `+`. Otros operadores aritméticos trabajan solo con números y siempre convierten sus operandos en números.

Por ejemplo, resta y división:

```js run
alert(2 - "1"); // 1
alert("6" / "2"); // 3
```

## Numeric conversion, unary +

El símbolo de más `+` existe en dos formas: la forma binaria que usamos arriba y la forma unaria.

El plus unario o, en otras palabras, el operador plus `+` aplicado a un solo valor, no hace nada a los números. Pero si el operando no es un número, el unario más lo convierte en un número.

Por ejemplo:

```js run
// No effect on numbers
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

En realidad, hace lo mismo que `Number(...)`, pero es más corto.

La necesidad de convertir cadenas en números surge muy a menudo. Por ejemplo, si obtenemos valores de campos de formulario HTML, generalmente son cadenas.

¿Y si queremos sumarlos?

El binario plus los agregaría como cadenas:

```js run
let apples = "2";
let oranges = "3";

alert(apples + oranges); // "23", the binary plus concatenates strings
```

Si queremos tratarlos como números, necesitamos convertirlos y luego sumarlos:

```js run
let apples = "2";
let oranges = "3";

*!*
// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5
*/!*

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5
```

Desde el punto de vista de un matemático, la abundancia de ventajas puede parecer extraña. Pero desde el punto de vista de un programador, no hay nada especial: las ventajas unarias se aplican primero, convierten las cadenas en números y luego el binario más las resume.

¿Por qué se aplican ventajas unarias a los valores antes que a los binarios? Como veremos, eso se debe a su mayor precedencia.

## Operator precedence

Si una expresión tiene más de un operador, el orden de ejecución se define por su precedencia, o, en otras palabras, el orden de prioridad implícito de los operadores.

Desde la escuela, todos sabemos que la multiplicación en la expresión `1 + 2 * 2` debe calcularse antes de la suma. Eso es exactamente lo de la precedencia. Se dice que la multiplicación tiene una prioridad más alta que la suma.

Los paréntesis anulan cualquier precedencia, por lo que si no estamos satisfechos con el orden implícito, podemos usarlos para cambiarlo. Por ejemplo: `(1 + 2) * 2`.

Hay muchos operadores en JavaScript. Cada operador tiene un número de precedencia correspondiente. El que tiene el número más grande se ejecuta primero. Si la prioridad es la misma, el orden de ejecución es de izquierda a derecha.

Aquí hay un extracto de la [tabla de precedencia](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence) (no necesita recordar esto, pero tenga en cuenta que los operadores únicos son más altos que los binarios correspondientes):

| Precedence | Name           | Sign |
| ---------- | -------------- | ---- |
| ...        | ...            | ...  |
| 16         | unary plus     | `+`  |
| 16         | unary negation | `-`  |
| 14         | multiplication | `*`  |
| 14         | division       | `/`  |
| 13         | addition       | `+`  |
| 13         | subtraction    | `-`  |
| ...        | ...            | ...  |
| 3          | assignment     | `=`  |
| ...        | ...            | ...  |

Como podemos ver, el "plus unario" tiene una prioridad de `16` que es mayor que el`13` de "adición" (binario plus). Por eso, en la expresión `" +apples + +oranges"`, las ventajas unarias funcionan antes de la adición.

## Assignment

Notemos que una asignación `=` es también un operador. Aparece en la tabla de precedencia con la prioridad muy baja de `3`.

Por eso, cuando asignamos una variable, como `x = 2 * 2 + 1`, los cálculos se realizan primero y luego se evalúa el `=`, almacenando el resultado en `x`.

```js
let x = 2 * 2 + 1;

alert(x); // 5
```

It is possible to chain assignments:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Las tareas encadenadas se evalúan de derecha a izquierda. Primero, se evalúa la expresión más a la derecha `2 + 2` y luego se asigna a las variables de la izquierda: `c`, `b` y `a`. Al final, todas las variables comparten un solo valor.

##### El operador de asignación "=" devuelve un valor

Un operador siempre devuelve un valor. Eso es obvio para la mayoría de ellos como la suma `+` o la multiplicación `*`. Pero el operador de asignación sigue esta regla también.

La llamada `x = value` escribe el `valor` en `x` _y luego lo devuelve_.

Aquí hay una demostración que usa una tarea como parte de una expresión más compleja:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

En el ejemplo anterior, el resultado de `(a = b + 1)` es el valor que se asigna a `a` (que es `3`). Luego se usa para restar de `3`.

Debemos entender cómo funciona, porque a veces lo vemos en bibliotecas de terceros, pero no deberíamos escribir nada de eso por nosotros mismos. Tales trucos definitivamente no hacen que el código sea más claro o legible.

## Remainder %

El operador restante `%`, a pesar de su apariencia, no está relacionado con los porcentajes.

El resultado de `a % b` es el resto de la división entera de `a` por `b`.

Por ejemplo:

```js run
alert(5 % 2); // 1 is a remainder of 5 divided by 2
alert(8 % 3); // 2 is a remainder of 8 divided by 3
alert(6 % 3); // 0 is a remainder of 6 divided by 3
```

## Exponentiation \*\*

El operador exponencial `**` es una adición reciente al lenguaje.

Para un número natural `b`, el resultado de `a ** b` es `a` multiplicado por sí mismo `b` veces.

Por ejemplo:

```js run
alert(2 ** 2); // 4  (2 * 2)
alert(2 ** 3); // 8  (2 * 2 * 2)
alert(2 ** 4); // 16 (2 * 2 * 2 * 2)
```

El operador también trabaja para números no enteros de `a` y `b`.

Por ejemplo:

```js run
alert(4 ** (1 / 2)); // 2 (power of 1/2 is the same as a square root, that's maths)
alert(8 ** (1 / 3)); // 2 (power of 1/3 is the same as a cubic root)
```

## Increment/decrement

<!-- Can't use -- in title, because built-in parse turns it into – -->

Aumentar o disminuir un número en uno es una de las operaciones numéricas más comunes.

Por lo tanto, hay operadores especiales para ello:

- **Increment** `++` inincrementa una variable en 1:

  ```js run no-beautify
  let counter = 2;
  counter++; // works the same as counter = counter + 1, but is shorter
  alert(counter); // 3
  ```

- **Decrement** `--` disminuye la variable en 1:

  ```js run no-beautify
  let counter = 2;
  counter--; // works the same as counter = counter - 1, but is shorter
  alert(counter); // 1
  ```

##### Incremento / decremento solo se puede aplicar a variables. Intentar usarlo en un valor como `5++` dará un error.

Los operadores `++` y `--` se pueden colocar antes o después de una variable.

- Cuando el operador persigue la variable, está en "forma de postfix": `counter++`.
- La "forma de prefijo" es cuando el operador va delante de la variable: `++counter`.

Ambas declaraciones hacen lo mismo: aumentar `contador` por `1`.

¿Hay alguna diferencia? Sí, pero solo podemos verlo si usamos el valor devuelto de `++/--`.

Vamos a aclarar. Como sabemos, todos los operadores devuelven un valor. Incremento / decremento no es una excepción. El formulario de prefijo devuelve el nuevo valor, mientras que el formulario de postfix devuelve el valor anterior (antes del incremento / decremento).

Para ver la diferencia, aquí hay un ejemplo:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

En la línea `(*)`, _prefix_ `++counter` incrementa `counter` y devuelve el nuevo valor, `2`. Por lo tanto, la 'alerta' muestra `2`.

Ahora, vamos a utilizar el formulario postfix:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

En la línea `(*)`, el _postfix_ `counter++` también incrementa el `counter` pero devuelve el valor _old_ (antes del incremento). Por lo tanto, la 'alerta' muestra `1`.

Para resumir:

- Si no se utiliza el resultado de incremento / decremento, no hay ninguna diferencia en qué forma usar:

  ```js run
  let counter = 0;
  counter++;
  ++counter;
  alert(counter); // 2, the lines above did the same
  ```

- Si queremos aumentar un valor _y_ usar inmediatamente el resultado del operador, necesitamos el formulario de prefijo:

  ```js run
  let counter = 0;
  alert(++counter); // 1
  ```

- Si nos gustaría incrementar un valor pero usar su valor anterior, necesitamos el formulario de postfix:

  ```js run
  let counter = 0;
  alert(counter++); // 0
  ```

#####"Increment/decrement among other operators"

Los operadores `++/--` también pueden usarse dentro de expresiones. Su precedencia es más alta que la mayoría de las otras operaciones aritméticas.

Por ejemplo:

```js run
let counter = 1;
alert(2 * ++counter); // 4
```

Comparar con:

```js run
let counter = 1;
alert(2 * counter++); // 2, because counter++ returns the "old" value
```

Aunque técnicamente está bien, tal notación generalmente hace que el código sea menos legible. Una línea hace varias cosas, no es bueno.

Mientras se lee el código, una exploración ocular "vertical" rápida puede pasar fácilmente por alto algo como `counter++` y no será obvio que la variable haya aumentado.

Aconsejamos un estilo de "una línea -- una acción":

```js run
let counter = 1;
alert(2 * counter);
counter++;
```

## Bitwise operators

Los operadores bitwise tratan los argumentos como números enteros de 32 bits y trabajan en el nivel de su representación binaria.

Estos operadores no son específicos de JavaScript. Son compatibles en la mayoría de los lenguajes de programación.

La lista de operadores:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Estos operadores se utilizan muy raramente. Para comprenderlos, debemos profundizar en la representación de números de bajo nivel y no sería óptimo hacerlo ahora mismo, especialmente porque no los necesitaremos en el corto plazo. Si tiene curiosidad, puede leer el artículo [Operadores de Bitwise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) en MDN. Sería más práctico hacer eso cuando surge una necesidad real.

## Modify-in-place

A menudo necesitamos aplicar un operador a una variable y almacenar el nuevo resultado en esa misma variable.

Por ejemplo:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Esto se puede acortar usando los operadores `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert(n); // 14
```

Existen operadores cortos de "modificar y asignar" para todos los operadores aritméticos y bitwise: `/=`, `-=`, etc.

Dichos operadores tienen la misma prioridad que una asignación normal, por lo que se ejecutan después de la mayoría de los otros cálculos:

```js run
let n = 2;

n *= 3 + 5;

alert(n); // 16  (right part evaluated first, same as n *= 8)
```

## Comma

El operador de coma `,` es uno de los operadores más raros e inusuales. A veces, se utiliza para escribir código más corto, por lo que necesitamos saberlo para comprender qué está pasando.

El operador de coma nos permite evaluar varias expresiones, dividiéndolas con una coma `,`. Cada uno de ellos se evalúa pero solo se devuelve el resultado del último.

Por ejemplo:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

Aquí, la primera expresión `1 + 2` se evalúa y su resultado se desecha. Luego, se evalúa y se devuelve `3 + 4` como resultado.

##### "Comma has a very low precedence"

Tenga en cuenta que el operador de coma tiene una prioridad muy baja, inferior a `=`, por lo que los paréntesis son importantes en el ejemplo anterior.

Sin ellos: `a = 1 + 2, 3 + 4` evalúa`+`primero, sumando los números en`a = 3, 7`, luego el operador de asignación `=` asigna `a = 3`, y finalmente el número después de la coma, `7`, no se procesa, por lo que se ignora.

¿Por qué necesitamos un operador que tire todo excepto la última parte?

A veces, la gente lo usa en construcciones más complejas para poner varias acciones en una línea.

Por ejemplo:

```js
// three operations in one line
for (a = 2, b = 4, c = a * b; a < 10; a++) {
 ...
}
```

Tales trucos se utilizan en muchos marcos de JavaScript. Por eso los mencionamos. Pero, por lo general, no mejoran la legibilidad del código, por lo que debemos pensar bien antes de usarlos.
