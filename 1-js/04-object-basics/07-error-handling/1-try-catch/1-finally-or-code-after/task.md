importance: 5

---

# Finally or just the code?

Compara los dos fragmentos de código.

1. El primero usa `finally` para ejecutar el código después de `try..catch`:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
2. El segundo fragmento pone la limpieza justo después de `try..catch`:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

Definitivamente necesitamos la limpieza después de que el trabajo haya comenzado, no importa si hubo un error o no.

¿Hay alguna ventaja aquí al usar `finally` o ambos fragmentos de código son iguales? Si existe tal ventaja, entonces dé un ejemplo cuando sea importante.
