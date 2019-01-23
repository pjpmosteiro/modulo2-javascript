# The "switch" statement

Una instrucción `switch` puede reemplazar múltiples cheques `if`.

Proporciona una forma más descriptiva de comparar un valor con múltiples variantes.

## The syntax

El `switch` tiene uno o más bloques `case` y un valor predeterminado opcional.

Se parece a esto:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- El valor de `x` se comprueba para una igualdad estricta con el valor del primer `case` (es decir, `value1`) luego al segundo (`value2`) y así sucesivamente.
- Si se encuentra la igualdad, `switch` comienza a ejecutar el código a partir del `case` correspondiente, hasta el `break` más cercano (o hasta el final de`switch`).
- Si no coincide ningún caso, se ejecuta el código `default` (si existe).

## An example

Un ejemplo de `switch` (el código ejecutado está resaltado):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too large' );
    break;
  default:
    alert( "I don't know such values" );
}
```

Aquí el `switch` comienza a comparar `a` de la primera variante `case` que es `3`. El partido falla.

Entonces `4`. Eso es una coincidencia, por lo que la ejecución comienza desde `case 4` hasta el `break` más cercano.

**If there is no `break` then the execution continues with the next `case` without any checks.**

Un ejemplo sin `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

En el ejemplo anterior veremos la ejecución secuencial de tres `alert`s:

```js
alert("Exactly!");
alert("Too big");
alert("I don't know such values");
```

##### "Any expression can be a `switch/case` argument"

Tanto `switch` como `case` permiten expresiones arbitrarias.

Por ejemplo:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;
*/!*

  default:
    alert("this doesn't run");
}
```

Aquí `+a` da `1`, que se compara con `b + 1` en `case`, y se ejecuta el código correspondiente.

## Grouping of "case"

Se pueden agrupar varias variantes de `case` que comparten el mismo código.

Por ejemplo, si queremos que se ejecute el mismo código para `case 3` y `case 5`:

```js run no-beautify
let a = 2 + 2;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3:                    // (*) grouped two cases
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

The ability to "group" cases is a side-effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there's no `break`.

Ahora ambos `3` y`5` muestran el mismo mensaje.

La capacidad de "agrupar" casos es un efecto secundario de cómo `switch/case` funciona sin `break`. Aquí la ejecución de`case 3`comienza desde la línea `(*)` y pasa por `case 5`, porque no hay `break`.

## Type matters

Hagamos hincapié en que el control de igualdad siempre es estricto. Los valores deben ser del mismo tipo para que coincidan.

Por ejemplo, consideremos el código:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case "0":
  case "1":
    alert("One or zero");
    break;

  case "2":
    alert("Two");
    break;

  case 3:
    alert("Never executes!");
    break;
  default:
    alert("An unknown value");
}
```

1. Para `0`, `1`, se ejecuta la primera `alert`.
2. Para `2` se ejecuta el segundo `alert`.
3. Pero para `3`, el resultado del `prompt` es una cadena `"3"`, que no es estrictamente igual `===` al número `3`. Así que tenemos un código muerto en `case 3`! La variante `default` se ejecutará.
