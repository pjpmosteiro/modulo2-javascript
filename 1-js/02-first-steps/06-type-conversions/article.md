# Type Conversions

La mayoría de las veces, los operadores y las funciones convierten automáticamente los valores que se les dan al tipo correcto. Esto se denomina "type conversion".

Por ejemplo, `alert` convierte automáticamente cualquier valor en una cadena para mostrarlo. Las operaciones matemáticas convierten valores en números.

También hay casos en los que necesitamos convertir explícitamente un valor al tipo esperado.

#####"Aún no hablamos de objetos"
En este capítulo, no cubriremos objetos. En vez de eso, estudiaremos primero a los primitivos. Más tarde, después de aprender sobre los objetos, veremos cómo funciona la conversión de objetos en el capítulo <info:object-toprimitive>.

## ToString

La conversión de cadenas ocurre cuando necesitamos la forma de cadena de un valor.

Por ejemplo, `alert(value)` lo hace para mostrar el valor.

También podemos llamar a la función `String(value)` para convertir un valor en una cadena:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // now value is a string "true"
alert(typeof value); // string
*/!*
```

La conversión de cadenas es mayormente obvia. Un `false` se convierte en `"falso"`, `null` se convierte en `"nulo"`, etc.

## ToNumber

La conversión numérica ocurre en funciones matemáticas y expresiones automáticamente.

Por ejemplo, cuando la división `/` se aplica a los no números:

```js run
alert("6" / "2"); // 3, strings are converted to numbers
```

Podemos usar la función `Number(value)` para convertir explícitamente un `valor` en un número:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(typeof num); // number
```

La conversión explícita suele ser necesaria cuando leemos un valor de una fuente basada en cadenas, como un formulario de texto, pero esperamos que se introduzca un número.

Si la cadena no es un número válido, el resultado de tal conversión es `NaN`. Por ejemplo:

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

Numeric conversion rules:

| Value                                 | Becomes...                                                                                                                                                                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `undefined`                           | `NaN`                                                                                                                                                                                         |
| `null`                                | `0`                                                                                                                                                                                           |
| <code>true&nbsp;and&nbsp;false</code> | `1` and `0`                                                                                                                                                                                   |
| `string`                              | Se eliminan los espacios en blanco desde el principio y el final. Si la cadena restante está vacía, el resultado es `0`. De lo contrario, el número se "lee" de la cadena. Un error da `NaN`. |

Examples:

```js run
alert(Number("   123   ")); // 123
alert(Number("123z")); // NaN (error reading a number at "z")
alert(Number(true)); // 1
alert(Number(false)); // 0
```

Tenga en cuenta que `null` e `undefined` se comportan de forma diferente aquí: `null` se convierte en cero mientras que `undefined` se convierte en "NaN".

#####"Addition '+' concatenates strings"
Casi todas las operaciones matemáticas convierten valores en números. Una excepción notable es la adición `+`. Si uno de los valores añadidos es un string, el otro también se convierte en un string.

Luego, los concatena (se une):

```js run
alert(1 + "2"); // '12' (string to the right)
alert("1" + 2); // '12' (string to the left)
```

Esto sólo ocurre cuando al menos uno de los argumentos es una cadena. De lo contrario, los valores se convierten en números.

## ToBoolean

La conversión booleana es la más sencilla.

Ocurre en operaciones lógicas (más adelante cumpliremos pruebas de condición y otras cosas similares) pero también se puede realizar explícitamente con una llamada a `Boolean(value)`.

La regla de conversión:

- Los valores que son intuitivamente "vacíos", como "0", una cadena vacía, `null`, `undefined`, y `NaN`, se convierten en `false`.
- Otros valores se vuelven `true`.

Por ejemplo:

```js run
alert(Boolean(1)); // true
alert(Boolean(0)); // false

alert(Boolean("hello")); // true
alert(Boolean("")); // false
```

#####"Please note: the string with zero `\"0\"` is `true`"
Algunos lenguajes (por ejemplo PHP) treat `"0"` as `false`. Pero en JavaScript, una cadena no vacía es siempre `true`.

```js run
alert(Boolean("0")); // true
alert(Boolean(" ")); // spaces, also true (any non-empty string is true)
```

## Summary

Las tres conversiones de tipo más utilizadas son a cadena, a número y a booleano.

**`ToString`** -- Ocurre cuando emitimos algo. Puede realizarse con `String(value)`. La conversión a cadena suele ser obvia para los valores primitivos.

**`ToNumber`** -- Ocurre en operaciones matemáticas. Se puede realizar con `Number(value)`.

La conversión sigue las reglas:

| Value                               | Becomes...                                                                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `undefined`                         | `NaN`                                                                                                                                    |
| `null`                              | `0`                                                                                                                                      |
| <code>true&nbsp;/&nbsp;false</code> | `1 / 0`                                                                                                                                  |
| `string`                            | La cadena se lee "tal cual" y se ignoran los espacios en blanco de ambos lados. Una cadena vacía se convierte en "0". Un error da `NaN`. |

**`ToBoolean`** -- Ocurre en operaciones lógicas. Se puede realizar con`Boolean(value)`.

Sigue las reglas:

| Value                                 | Becomes... |
| ------------------------------------- | ---------- |
| `0`, `null`, `undefined`, `NaN`, `""` | `false`    |
| any other value                       | `true`     |

La mayoría de estas reglas son fáciles de entender y memorizar. Las excepciones en las que la gente suele cometer errores son:

- `undefined` es `NaN` como número, no `0`.
- `"0"` y la cadena de "sólo-espacio" como `" "` son true como boolean.

