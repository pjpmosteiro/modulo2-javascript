# Comparisons

Conocemos muchos operadores de comparación de matemáticas:

- Mayor/menor que: <code> a &gt; b </code>, <code> a &lt; b </code>.
- Mayor/menor que o igual: <code> a &gt; = b </code>, <code> a &lt; = b </code>.
- Igual a: `a == b` (tenga en cuenta que el doble signo de igual`=`. Un solo símbolo`a = b` significaría una asignación).
- No es igual. En matemáticas, la notación es <code> &ne; </code>, pero en JavaScript está escrita como una asignación con un signo de exclamación: <code> a != B </code>.

## Boolean is the result

Como todos los demás operadores, una comparación devuelve un valor. En este caso, el valor es un booleano.

- `true` - significa "sí", "correcto" o "la verdad".
- `false` - significa "no", "incorrecto" o "no es la verdad".

Por ejemplo:

```js run
alert(2 > 1); // true (correct)
alert(2 == 1); // false (wrong)
alert(2 != 1); // true (correct)
```

Se puede asignar un resultado de comparación a una variable, al igual que cualquier valor:

```js run
let result = 5 > 4; // assign the result of the comparison
alert(result); // true
```

## String comparison

Para ver si una cadena es mayor que otra, JavaScript usa el orden denominado "diccionario" o "lexicográfico".

En otras palabras, las cadenas se comparan letra por letra.

Por ejemplo:

```js run
alert("Z" > "A"); // true
alert("Glow" > "Glee"); // true
alert("Bee" > "Be"); // true
```

El algoritmo para comparar dos cadenas es simple:

1. Compara el primer carácter de ambas cadenas.
2. Si el primer carácter de la primera cadena es mayor (o menor) que el de la otra cadena, entonces la primera cadena es mayor (o menor) que la segunda. Hemos terminado
3. De lo contrario, si los primeros caracteres de ambas cadenas son iguales, compare los segundos caracteres de la misma manera.
4. Repita hasta el final de cualquiera de las cadenas.
5. Si ambas cadenas terminan en la misma longitud, entonces son iguales. De lo contrario, la cadena más larga es mayor.

En los ejemplos anteriores, la comparación `'Z' > 'A'` obtiene un resultado en el primer paso, mientras que las cadenas `"Glow"` y `"Glee"` se comparan carácter por carácter:

1. `G` es lo mismo que `G`.
2. `l` es lo mismo que `l`.
3. `o` es mayor que `e`. Acabamos aquí. El primer String es mayor.

##### "Not a real dictionary, but Unicode order"

El algoritmo de comparación dado anteriormente es aproximadamente equivalente al que se usa en los diccionarios o guías telefónicas, pero no es exactamente el mismo.

Por ejemplo, el caso importa. Una letra mayúscula `"A"` no es igual a la minúscula `"a"`. ¿Cuál es mayor? La minúscula `"a"`. ¿Por qué? Debido a que el carácter en minúscula tiene un índice mayor en la tabla de codificación interna que usa JavaScript (Unicode). Volveremos a los detalles específicos y las consecuencias de esto en el capítulo <info:string>.

## Comparison of different types

Al comparar valores de diferentes tipos, JavaScript convierte los valores en números.

Por ejemplo:

```js run
alert("2" > 1); // true, string '2' becomes a number 2
alert("01" == 1); // true, string '01' becomes a number 1
```

Para los valores booleanos, `true` se convierte en`1` y `false` se convierte en`0`.

Por ejemplo:

```js run
alert(true == 1); // true
alert(false == 0); // true
```

Es posible que al mismo tiempo:

- Dos valores son iguales.
- Uno de ellos es `true` como booleano y el otro es`false` como boolean.

Por ejemplo:

```js run
let a = 0;
alert(Boolean(a)); // false

let b = "0";
alert(Boolean(b)); // true

alert(a == b); // true!
```

Desde el punto de vista de JavaScript, este resultado es bastante normal. Una verificación de igualdad convierte los valores usando la conversión numérica (por lo que `"0 "` se convierte en `0`), mientras que la conversión explícita`Boolean` usa otro conjunto de reglas.

## Strict equality

Un control de igualdad regular `==` tiene un problema. No puede diferenciar `0` de`false`:

```js run
alert(0 == false); // true
```

Lo mismo sucede con una cadena vacía:

```js run
alert("" == false); // true
```

Esto sucede porque el operador de igualdad `==` convierte los operandos de diferentes tipos en números. Una cadena vacía, al igual que `false`, se convierte en cero.

¿Qué hacer si queremos diferenciar `0` de `false`?

**A strict equality operator `===` checks the equality without type conversion.**

En otras palabras, si `a` y`b` son de diferentes tipos, entonces `a === b` devuelve inmediatamente `false` sin intentar convertirlos.

Vamos a intentarlo:

```js run
alert(0 === false); // false, because the types are different
```

También hay un operador "strict non-equality" `!==` análogo a `!=`.

El operador de igualdad estricta es un poco más largo para escribir, pero hace que sea obvio lo que está pasando y deja menos espacio para errores.

## Comparison with null and undefined

Veamos más casos de borde.

Existe un comportamiento no intuitivo cuando se compara `null` o `undefined` con otros valores.

Para una verificación de igualdad estricta `===`
: Estos valores son diferentes, porque cada uno de ellos es un tipo diferente.

    ```js run
    alert( null === undefined ); // false
    ```

Para una verificación no estricta `==`
: Hay una regla especial Estos dos son una "pareja dulce": son iguales entre sí (en el sentido de `==`), pero no con ningún otro valor.

    ```js run
    alert( null == undefined ); // true
    ```

Para matemáticas y otras comparaciones `< > <= >=`
: `null/undefined` se convierten en números: `null` se convierte en `0`, mientras que `undefined` se convierte en `NaN`.

Ahora veamos algunas cosas divertidas que suceden cuando aplicamos estas reglas. Y, lo que es más importante, cómo no caer en una trampa con ellos.

### Strange result: null vs 0

Comparemos `null` con un cero:

```js run
alert(null > 0); // (1) false
alert(null == 0); // (2) false
alert(null >= 0); // (3) *!*true*/!*
```

Matemáticamente, eso es extraño. El último resultado indica que "`null` es mayor o igual que cero ", por lo que una de las comparaciones anteriores debe ser correcta, pero ambas son falsas.

La razón es que una verificación de igualdad `==` y comparaciones `> < >= <=` funcionan de manera diferente. Las comparaciones convierten `null` en un número, tratándolo como `0`. Por eso (3) `null> = 0` es verdadero y (1) `null > 0` es falso.

Por otro lado, la verificación de igualdad `==` para `undefined` y`null` se define de tal manera que, sin conversiones, se igualan entre sí y no son iguales a ninguna otra cosa. Es por eso que (2) `null == 0` es falso.

### An incomparable undefined

El valor `undefined` no debe compararse con otros valores:

```js run
alert(undefined > 0); // false (1)
alert(undefined < 0); // false (2)
alert(undefined == 0); // false (3)
```

¿Por qué no le gusta tanto el cero? Siempre falso!

Obtenemos estos resultados porque:

- Las comparaciones `(1)` y `(2)` devuelven `false` porque`undefined` se convierte a `NaN` y`NaN` es un valor numérico especial que devuelve `false` para todas las comparaciones.
- La verificación de igualdad `(3)` devuelve `false` porque `undefined` solo es igual a `null` y ningún otro valor.

### Evade problems

¿Por qué repasamos estos ejemplos? ¿Debemos recordar estas peculiaridades todo el tiempo? Bueno en realidad no. En realidad, estas cosas difíciles se irán familiarizando con el tiempo, pero hay una manera sólida de evadir problemas con ellos:

Simplemente trate cualquier comparación con `undefined/null` excepto la igualdad estricta`===`con un cuidado excepcional.

No use comparaciones `>= > < <=` con una variable que puede ser `null/undefined`, a menos que esté realmente seguro de lo que está haciendo. Si una variable puede tener estos valores, verifíquelos por separado.

## Summary

- Los operadores de comparación devuelven un valor booleano.
- Las cadenas se comparan letra por letra en el orden de "diccionario".
- Cuando se comparan valores de diferentes tipos, se convierten en números (con la exclusión de una verificación de igualdad estricta).
- Los valores `null` y `undefined` son iguales`==`entre yes and no son iguales a ningún otro valor.
- Tenga cuidado al usar comparaciones como `>` o `<` con variables que ocasionalmente pueden ser `null/undefined`. La comprobación de `null/undefined` por separado es una buena idea.
