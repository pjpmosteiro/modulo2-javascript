# Logical operators

Hay tres operadores lógicos en JavaScript: `||` (OR), `&&` (AND), `!` (NOT).

Aunque se llaman "lógicos", se pueden aplicar a valores de cualquier tipo, no solo booleanos. Su resultado también puede ser de cualquier tipo.

Veamos los detalles.

## || (OR)

El operador "OR" se representa con dos símbolos de línea vertical:

```js
result = a || b;
```

En la programación clásica, el OR lógico está destinado a manipular únicamente valores booleanos. Si alguno de sus argumentos es `true`, devuelve `true`, de lo contrario devuelve `false`.

En JavaScript, el operador es un poco más complicado y poderoso. Pero primero, veamos que pasa con los valores booleanos.

Hay cuatro combinaciones lógicas posibles:

```js run
alert(true || true); // true
alert(false || true); // true
alert(true || false); // true
alert(false || false); // false
```

Como podemos ver, el resultado es siempre `true`, excepto en el caso de que ambos operandos sean `false`.

Si un operando no es un booleano, se convierte en un booleano para la evaluación.

Por ejemplo, el número `1` se trata como `true`, el número `0` como `false`:

```js run
if (1 || 0) {
  // works just like if( true || false )
  alert("truthy!");
}
```

La mayoría de las veces, OR `||` se usa en una declaración `if` para probar si alguna de las condiciones dadas es `true`.

Por ejemplo:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

Podemos pasar más condiciones:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert("The office is closed."); // it is the weekend
}
```

## OR finds the first truthy value

La lógica descrita anteriormente es algo clásica. Ahora, vamos a traer las características "extra" de JavaScript.

El algoritmo extendido funciona de la siguiente manera.

Dados múltiples valores OR:

```js
result = value1 || value2 || value3;
```

El operador OR `||` hace lo siguiente:

- Evalúa los operandos de izquierda a derecha.
- Para cada operando, lo convierte en booleano. Si el resultado es `true`, detiene y devuelve el valor original de ese operando.
- Si todos los operandos han sido evaluados (es decir, todos fueron `false`), devuelve el último operando.

Se devuelve un valor en su forma original, sin la conversión.

En otras palabras, una cadena de OR `"||"` devuelve el primer valor verdadero o el último si no se encuentra dicho valor.

Por ejemplo:

```js run
alert(1 || 0); // 1 (1 is truthy)
alert(true || "no matter what"); // (true is truthy)

alert(null || 1); // 1 (1 is the first truthy value)
alert(null || 0 || 1); // 1 (the first truthy value)
alert(undefined || null || 0); // 0 (all falsy, returns the last value)
```

Esto conduce a un uso interesante en comparación con un "OR puro, clásico, solo booleano".

1. **Getting the first truthy value from a list of variables or expressions.**

   Imagina que tenemos varias variables que pueden contener datos o ser `null/undefined`. ¿Cómo podemos encontrar el primero con datos?

   Podemos usar OR `||`:

   ```js run
   let currentUser = null;
   let defaultUser = "John";

   *!*
   let name = currentUser || defaultUser || "unnamed";
   */!*

   alert( name ); // selects "John" – the first truthy value
   ```

   If both `currentUser` and `defaultUser` were falsy, `"unnamed"` would be the result.

2. **Short-circuit evaluation.**

Los operandos pueden ser no solo valores, sino expresiones arbitrarias. O evalúa y prueba de izquierda a derecha. La evaluación se detiene cuando se alcanza un valor verdadero y se devuelve el valor. Este proceso se denomina "a short-circuit evaluation" porque es lo más corto posible.

Esto se ve claramente cuando la expresión dada como segundo argumento tiene un efecto secundario como una asignación de variable.

En el siguiente ejemplo, `x` no se asigna:

```js run no-beautify
let x;

*!*true*/!* || (x = 1);

alert(x); // undefined, because (x = 1) not evaluated
```

Si, en cambio, el primer argumento es `false`, `||` evalúa el segundo, ejecutando así la asignación:

```js run no-beautify
let x;

*!*false*/!* || (x = 1);

alert(x); // 1
```

Una asignación es un caso simple. Otros efectos secundarios también pueden estar involucrados.

Como podemos ver, tal caso de uso es una "forma más corta de hacer `if` ". El primer operando se convierte a booleano. Si es falso, se evalúa el segundo.

Most of time, it's better to use a "regular" `if` to keep the code easy to understand, but sometimes this can be handy.

La mayoría de las veces, es mejor usar un `if` "regular" para mantener el código fácil de entender, pero a veces esto puede ser útil.

## && (AND)

El operador AND se representa con dos símbolos `&&`:

```js
result = a && b;
```

En la programación clásica, AND devuelve `true` si ambos operandos son veraces y `false` 'de lo contrario:

```js run
alert(true && true); // true
alert(false && true); // false
alert(true && false); // false
alert(false && false); // false
```

Un ejemplo con `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert("The time is 12:30");
}
```

Al igual que con OR, cualquier valor se permite como un operando de AND:

```js run
if (1 && 0) {
  // evaluated as true && false
  alert("won't work, because the result is falsy");
}
```

## AND finds the first falsy value

Dados múltiples valores AND:

```js
result = value1 && value2 && value3;
```

El operador AND `&&` hace lo siguiente:

- Evalúa los operandos de izquierda a derecha.
- Para cada operando, lo convierte en un booleano. Si el resultado es `false`, detiene y devuelve el valor original de ese operando.
- Si todos los operandos han sido evaluados (es decir, todos fueron veraces), devuelve el último operando.

En otras palabras, AND devuelve el primer valor falsy o el último valor si no se encontró ninguno.

Las reglas anteriores son similares a OR. La diferencia es que AND devuelve el primer valor _falsy_ mientras que OR devuelve el primero _truthy_ uno.

Ejemplos:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert(1 && 0); // 0
alert(1 && 5); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert(null && 5); // null
alert(0 && "no matter what"); // 0
```

También podemos pasar varios valores en una fila. Vea cómo se devuelve la primera falsa:

```js run
alert(1 && 2 && null && 3); // null
```

Cuando todos los valores son veraces, se devuelve el último valor:

```js run
alert(1 && 2 && 3); // 3, the last one
```

#####"Precedence of AND `&&` is higher than OR `||`"

La precedencia del operador AND `&&` es mayor que OR `||`.

Entonces el código `a && b || c && d` es esencialmente lo mismo que si las expresiones `&&` estuvieran entre paréntesis: `(a && b) || (c && d)`.

Al igual que OR, el operador AND `&&` a veces puede reemplazar a `if`.

Por ejemplo:

```js run
let x = 1;

x > 0 && alert("Greater than zero!");
```

La acción en la parte derecha de `&&` se ejecutaría solo si la evaluación lo alcanza. Es decir, solo si `(x > 0)` es verdadero.

Así que básicamente tenemos un análogo para:

```js run
let x = 1;

if (x > 0) {
  alert("Greater than zero!");
}
```

La variante con `&&` aparece más corta. Pero `if` es más obvio y tiende a ser un poco más legible.

Por lo tanto, recomendamos usar cada construcción para su propósito: use `if` si queremos si y usamos `&&` si queremos AND.

## ! (NOT)

El operador booleano NOT se representa con un signo de exclamación `!`.

La sintaxis es bastante simple:

```js
result = !value;
```

El operador acepta un solo argumento y hace lo siguiente:

1. Convierte el operando a tipo booleano: `true/false`.
2. Devuelve el valor inverso.

Por ejemplos:

```js run
alert(!true); // false
alert(!0); // true
```

Un doble NOT `!!` se usa a veces para convertir un valor a tipo booleano:

```js run
alert(!!"non-empty string"); // true
alert(!!null); // false
```

Es decir, el primer NOT convierte el valor a booleano y devuelve el inverso, y el segundo NO lo invierte nuevamente. Al final, tenemos una conversión simple de valor a booleano.

Hay una forma un poco más detallada de hacer lo mismo, una función `Boolean` incorporada:

```js run
alert(Boolean("non-empty string")); // true
alert(Boolean(null)); // false
```

La prioridad de NOT `!` Es la más alta de todos los operadores lógicos, por lo que siempre se ejecuta primero, antes de `&&` o `||`.
