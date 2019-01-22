# Code structure

Lo primero que estudiaremos son los bloques de construcción del código.

## Statements

Las sentencias son construcciones sintácticas y comandos que realizan acciones.

Ya hemos visto una declaración, `alert('Hello, world!')`, que muestra el mensaje "Hello world!".

Podemos tener tantas declaraciones en nuestro código como queramos. Las frases se pueden separar con punto y coma.

Por ejemplo, aquí dividimos "Hello World" en dos alertas:

```js run no-beautify
alert("Hello");
alert("World");
```

Por lo general, las declaraciones se escriben en líneas separadas para que el código sea más legible:

```js run no-beautify
alert("Hello");
alert("World");
```

## Semicolons [#semicolon]

Un punto y coma puede omitirse en la mayoría de los casos cuando existe un salto de línea.

Esto también funcionaría:

```js run no-beautify
alert("Hello");
alert("World");
```

Aquí, JavaScript interpreta el salto de línea como un punto y coma "implícito". Esto se denomina [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**En la mayoría de los casos, una nueva línea implica un punto y coma. Pero "en la mayoría de los casos" no significa "siempre"!**

Hay casos en los que una nueva línea no significa punto y coma. Por ejemplo:

```js run no-beautify
alert(3 + 1 + 2);
```

El código produce `6` porque JavaScript no inserta punto y coma aquí. Es intuitivamente obvio que si la línea termina con un más `"+"`, entonces es una "expresión incompleta", por lo que el punto y coma no es necesario. Y en este caso eso funciona según lo previsto.

**Pero hay situaciones en las que JavaScript "falla" al asumir un punto y coma en las que es realmente necesario.**

Los errores que se producen en estos casos son bastante difíciles de encontrar y corregir.

````smart header="Un ejemplo de un error"
Si tienes curiosidad por ver un ejemplo concreto de tal error, comprueba este código:

```js run
[1, 2].forEach(alert)
```


No hay necesidad de pensar en el significado de los corchetes `[]` y `forEach` todavía. Los estudiaremos más tarde. Por ahora, sólo recuerda el resultado del código: muestra `1` y luego `2`.

Ahora, agreguemos una `alert` antes del código y *no* terminemos con un punto y coma:

```js run no-beautify
alert("There will be an error")

[1, 2].forEach(alert)
```

Ahora bien, si ejecutamos el código, sólo se muestra la primera `alert` y entonces tenemos un error!

Pero todo está bien de nuevo si añadimos un punto y coma después de `alert`:
```js run
alert("Furula!");

[1, 2].forEach(alert)
```

Ahora tenemos el mensaje "Furula!


El error en la variante no-semicolon ocurre porque JavaScript no asume un punto y coma antes de los corchetes `[...]`.

Por lo tanto, dado que el punto y coma no se inserta automáticamente, el código del primer ejemplo se trata como una única sentencia. Así es como lo ve el motor:


```js run no-beautify
alert("There will be an error")[1, 2].forEach(alert)
```

Pero deberían ser dos declaraciones separadas, no una. Tal fusión en este caso es simplemente errónea, de ahí el error. Esto puede suceder en otras situaciones.
````

Recomendamos poner punto y coma entre las frases, incluso si están separadas por líneas nuevas. Esta regla es ampliamente adoptada por la comunidad. Observemos una vez más -- _es posible_ omitir los puntos y coma la mayor parte del tiempo. Pero es más seguro, especialmente para alguien empezando, usarlos.

## Comments

A medida que pasa el tiempo, los programas se vuelven más y más complejos. Es necesario añadir _comentarios_ que describan qué hace el código y por qué.

Los comentarios se pueden poner en cualquier lugar de un script. No afectan a su ejecución porque el motor simplemente las ignora.

**Los comentarios de una línea comienzan con dos caracteres de barra oblicua `//`.**

El resto de la línea es un comentario. Puede ocupar una línea completa propia o seguir una declaración.

Como aquí:

```js run
// This comment occupies a line of its own
alert("Hello");

alert("World"); // This comment follows the statement
```

**Los comentarios multilínea comienzan con una barra oblicua y un asterisco<code>/\*</code> y terminan con un asterisco y una barra oblicua <code>\*/</code>.**

Por ejemplo:

```js run
/* An example with two messages.
This is a multiline comment.
*/
alert("Hello");
alert("World");
```

El contenido de los comentarios es ignorado, así que si ponemos código dentro <code>/\* ... \*/</code>, no se ejecutará.

A veces puede ser útil desactivar temporalmente una parte del código:

```js run
/* Commenting out the code
alert('Hello');
*/
alert("World");
```

```smart header="Use hotkeys!"
En la mayoría de los editores, una línea de código puede ser comentada presionando la tecla `key:Ctrl+/` para un comentario de una sola línea y algo como `key:Ctrl+Shift+/` -- para comentarios multilínea (seleccione un fragmento de código y presione la tecla de acceso directo).
```

````warn header="Los comentarios anidados no son compatibles!"
No puede haber `/*...*/` dentro de otro `/*...*/`.


Tal código morirá con un error:

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````

Por favor, no dude en comentar su código.

Los comentarios aumentan la huella general del código, pero eso no es un problema en absoluto. Hay muchas herramientas que minimizan el código antes de publicarlo en un servidor de producción. Eliminan los comentarios, por lo que no aparecen en los scripts de trabajo. Por lo tanto, los comentarios no tienen ningún efecto negativo en la producción.
