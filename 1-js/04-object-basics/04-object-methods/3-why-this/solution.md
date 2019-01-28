Aquí están las explicaciones.

1. Eso es una llamada de método de objeto regular.

2. Lo mismo, los paréntesis no cambian el orden de las operaciones aquí, el punto es el primero de todos modos.

3. Aquí tenemos una llamada más compleja `(expresión).method()`. La llamada funciona como si estuviera dividida en dos líneas:

   ```js no-beautify
   f = obj.go; // calculate the expression
   f(); // call what we have
   ```

Aquí `f()` se ejecuta como una función, sin `this`.

4. Lo similar a `(3)`, a la izquierda del punto `.` tenemos una expresión.

Para explicar el comportamiento de `(3)` y `(4)` necesitamos recordar que los accesores de propiedad (punto o corchetes) devuelven un valor del Tipo de referencia.

Cualquier operación en él, excepto una llamada de método (como la asignación `=` o `||`) lo convierte en un valor ordinario, que no lleva la información que permite configurar `this`.
