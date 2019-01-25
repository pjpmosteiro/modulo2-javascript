importance: 3

---

# Check the login

Escriba el código que solicita un inicio de sesión con `prompt`.

Si el visitante ingresa `"Admin"`, luego `prompt` para una contraseña, si la entrada es una línea vacía o `key: Esc` - muestra "Canceled.", Si es otra cadena - entonces muestra "No te conozco".

La contraseña se verifica de la siguiente manera:

- Si es igual a "TheMaster", entonces muestra "Welcome!",
- Otra cadena - mostrar "Wrong password",
- Para una cadena vacía o entrada cancelada, muestre "Canceled".

El schema:

![](ifelse_task.png)

Por favor, use los bloques `if` anidados. Tenga en cuenta la legibilidad general del código.

Sugerencia: pasar una entrada vacía a un prompt devuelve una cadena vacía `''`. Al presionar la tecla `key: ESC` durante un aviso, se devuelve `null`.

[demo]
