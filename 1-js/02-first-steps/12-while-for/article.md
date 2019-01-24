# Loops: while and for

A menudo necesitamos repetir acciones. Por ejemplo, emitir productos de una lista uno tras otro o simplemente ejecutar el mismo código para cada uno Número del 1 al 10. Los bucles son una forma de repetir el mismo código varias veces.

## The "while" loop

El bucle `while` tiene la siguiente sintaxis:

```js
while (condition) {
  // code
  // so-called "loop body"
}
```

Mientras que la `condition` sea `true`, el `code` del _loop body_ es ejecutado.

Por ejemplo, el siguiente bucle general `i` mientras que `i < 3`:

```js run
let i = 0;
while (i < 3) {
  // shows 0, then 1, then 2
  alert(i);
  i++;
}
```

Una sola ejecución del cuerpo del bucle se llama _an iteration_. El bucle en el El ejemplo anterior hace tres iteraciones

Si `i++` faltaba en el ejemplo anterior, el bucle se repetiría (en teoría) para siempre. En la práctica, el navegador proporciona formas de detener dichos bucles y, en el lado del servidor, podemos detener el proceso.

Cualquier expresión o variable puede ser una condición de bucle, no solo comparaciones: la condición se evalúa y se convierte en un valor booleano con `while`.

Por ejemplo, una forma más corta de escribir. `while (i != 0)` es `while (i)`:

```js run
let i = 3;
while (i) {
  // when i becomes 0, the condition becomes falsy, and the loop stops
  alert(i);
  i--;
}
```

##### "Brackets are not required for a single-line body"

Si el cuerpo del bucle tiene una sola declaración, podemos omitir los corchetes `{…}`:

```js run
let i = 3;
while (i) alert(i--);
```

## The "do..while" loop

La verificación de condición se puede mover a continuación del cuerpo del bucle usando la sintaxis `do..while`:

```js
do {
  // loop body
} while (condition);
```

El bucle ejecutará primero el cuerpo, luego verificará la condición y, si bien es cierto, lo ejecutará una y otra vez.

Por ejemplo:

```js run
let i = 0;
do {
  alert(i);
  i++;
} while (i < 3);
```

Esta forma de sintaxis solo se debe utilizar cuando desee que el cuerpo del bucle se ejecute **al menos una vez**, independientemente de que la condición sea verdadera. Por lo general, se prefiere la otra forma: `while(...) {...}`.

## The "for" loop

El bucle `for` loop es el bucle más utilizado.

Se parece a esto:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

Aprendamos el significado de estas partes con el ejemplo. El siguiente bucle ejecuta `alert(i)` para `i` desde `0` hasta (pero sin incluir) `3`:
Se parece a esto:

```js run
for (let i = 0; i < 3; i++) {
  // shows 0, then 1, then 2
  alert(i);
}
```

Examinemos la declaración `for` parte por parte:
| part | | |
| --------- | ---------- | ------------------------------------------------------------------------- |
| begin | `i = 0` | Se ejecuta una vez al entrar en el bucle. |
| condition | `i < 3` | Comprobado antes de cada iteración de bucle. Si es falso, el bucle se detiene. |
| step | `i++` | Se ejecuta después del cuerpo en cada iteración pero antes de la verificación de la condición. |
| body | `alert(i)` | Corre una y otra vez mientras la condición sea veraz. |

El algoritmo de bucle general funciona así:

```
Run begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

Si no está familiarizado con los bucles, podría ser útil volver al ejemplo y reproducir cómo se ejecuta paso a paso en un papel.

Aquí es exactamente lo que sucede en nuestro caso:

```js
// for (let i = 0; i < 3; i++) alert(i)

// run begin
let i = 0;
// if condition → run body and run step
if (i < 3) {
  alert(i);
  i++;
}
// if condition → run body and run step
if (i < 3) {
  alert(i);
  i++;
}
// if condition → run body and run step
if (i < 3) {
  alert(i);
  i++;
}
// ...finish, because now i == 3
```

##### "Inline variable declaration"

Aquí, la variable "contador" `i` se declara justo en el bucle. Esto se llama una declaración de variable "en línea". Tales variables son visibles solo dentro del bucle.

```js run
for (let i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no such variable
```

En lugar de definir una variable, podríamos usar una existente:

```js run
let i = 0;

for (i = 0; i < 3; i++) {
  // use an existing variable
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop
```

### Skipping parts

Cualquier parte de `for` se puede omitir.

Por ejemplo, podemos omitir `begin` si no necesitamos hacer nada en el inicio del bucle.

Como aquí:

```js run
let i = 0; // we have i already declared and assigned

for (; i < 3; i++) {
  // no need for "begin"
  alert(i); // 0, 1, 2
}
```

También podemos eliminar la parte `step`:

```js run
let i = 0;

for (; i < 3; ) {
  alert(i++);
}
```

Esto hace que el bucle sea idéntico a `while(i < 3)`.

Podemos eliminar todo, creando un bucle infinito:

```js
for (;;) {
  // repeats without limits
}
```

Tenga en cuenta que los dos `for` punto y coma `;` deben estar presentes. De lo contrario, habría un error de sintaxis.

## Breaking the loop

Normalmente, un bucle sale cuando su condición se vuelve falsa.

Pero podemos forzar la salida en cualquier momento usando la directiva especial `break`.

Por ejemplo, el siguiente bucle le pide al usuario una serie de números, "breaking" cuando no se ingresa ningún número:

```js
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

La directiva `break` se activa en la línea `(*)`si el usuario ingresa una línea vacía o cancela la entrada. Detiene el bucle inmediatamente, pasando el control a la primera línea después del bucle. A saber, `alert`.

La combinación "infinite loop + `break` as needed" es excelente para situaciones en las que la condición de un bucle se debe verificar no al principio o al final del bucle, sino en el medio o incluso en varios lugares de su cuerpo.

## Continue to the next iteration [#continue]

La directiva `continue` es una "versión más ligera" de `break`. No detiene todo el bucle. En su lugar, detiene la iteración actual y obliga al bucle a iniciar una nueva (si la condición lo permite).

Podemos usarlo si hemos terminado con la iteración actual y nos gustaría pasar a la siguiente.

El siguiente bucle usa `continue` para generar solo valores impares:

```js run no-beautify
for (let i = 0; i < 10; i++) {
  // if true, skip the remaining part of the body
  if (i % 2 == 0) continue;

  alert(i); // 1, then 3, 5, 7, 9
}
```

Para valores pares de `i`, la directiva `continue` deja de ejecutar el cuerpo y pasa el control a la siguiente iteración de `for` (con el siguiente número). Así que la `alert` solo se llama para valores impares.

##### "The `continue` directive helps decrease nesting"

Un bucle que muestra valores impares podría verse así:

```js
for (let i = 0; i < 10; i++) {
  if (i % 2) {
    alert(i);
  }
}
```

Desde un punto de vista técnico, esto es idéntico al ejemplo anterior. Seguramente, podemos simplemente envolver el código en un bloque `if` en lugar de usar `continue`.

Pero como efecto secundario, esto creó un nivel más de anidamiento (la llamada `alert` dentro de las llaves). Si el código dentro de`if` es más largo que unas pocas líneas, eso puede disminuir la legibilidad general.

##### "No `break/continue` to the right side of '?'"

Tenga en cuenta que las construcciones de sintaxis que no son expresiones no se pueden usar con el operador ternario `?`. En particular, las directivas como `break/continue` no están permitidas allí.

Por ejemplo, si tomamos este código:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

... y reescribirlo usando un signo de interrogación:

```js no-beautify
(i > 5) ? alert(i) : continue; // continue isn't allowed here
```

... deja de funcionar. Código como este dará un error de sintaxis:

Esta es solo otra razón para no usar el operador de signo de interrogación `?` En lugar de `if`.

## Labels for break/continue

A veces necesitamos salir de varios bucles anidados a la vez.

Por ejemplo, en el código a continuación, hacemos un bucle sobre `i` y `j`, solicitando las coordenadas `(i, j)` de `(0,0)` a `(3,3)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value at coords (${i},${j})`, "");

    // what if I want to exit from here to Done (below)?
  }
}

alert("Done!");
```

Necesitamos una forma de detener el proceso si el usuario cancela la entrada.

El `break` ordinario después de `input` solo rompería el bucle interno. Eso no es suficiente - pero tenemos etiquetas al rescate!

Una _label_ es un identificador con dos puntos antes de un bucle:

```js
labelName: for (...) {
  ...
}
```

La declaración `break <labelName>` en el siguiente bucle se rompe en la etiqueta:

```js run no-beautify
outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}
alert('Done!');
```

En el código anterior, `break outer` busca la etiqueta denominada `outer` y sale de ese bucle.

Por lo tanto, el control pasa directamente de `(*)` a `alert('¡Listo!')`.

También podemos mover la etiqueta a una línea separada:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

La directiva `continue` también se puede utilizar con una etiqueta. En este caso, la ejecución del código salta a la siguiente iteración del bucle etiquetado.

##### "Labels are not a "goto""

Las etiquetas no nos permiten saltar a un lugar arbitrario en el código.

Por ejemplo, es imposible hacer esto:

```js
break label;  // jumps to label? No.

label: for (...)
```

Una llamada a `break/continue` solo es posible dentro de un bucle y la etiqueta debe estar en algún lugar por encima de la directiva.

## Summary

Cubrimos 3 tipos de bucles:

- `while` - La condición se verifica antes de cada iteración.
- `do..while` - La condición se verifica después de cada iteración.
- `for (;;)` - La condición se verifica antes de cada iteración, configuraciones adicionales disponibles.

Para hacer un bucle "infinito", usualmente se usa la construcción `while(true)`. Dicho bucle, como cualquier otro, puede detenerse con la directiva `break`.

Si no queremos hacer nada en la iteración actual y nos gustaría reenviar a la siguiente, podemos usar la directiva `continue`.

`break / continue` admite etiquetas antes del bucle. Una etiqueta es la única forma en que `break / continue` para escapar de un bucle anidado para ir a uno externo.
