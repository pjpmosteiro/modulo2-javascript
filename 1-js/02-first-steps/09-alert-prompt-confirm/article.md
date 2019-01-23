# Interaction: alert, prompt, confirm

Esta parte del tutorial pretende cubrir JavaScript "como está", sin ajustes específicos del entorno.

Pero seguiremos usando el navegador como nuestro entorno de demostración, por lo que deberíamos conocer al menos algunas de sus funciones de interfaz de usuario. En este capítulo, nos familiarizaremos con las funciones del navegador `alert`,`prompt` y `confirm`.

## alert

Syntax:

```js
alert(message);
```

Esto muestra un mensaje y detiene la ejecución del script hasta que el usuario presione "OK".

Por ejemplo:

```js run
alert("Hello");
```

La mini-ventana con el mensaje se llama _modal window_. La palabra "modal" significa que el visitante no puede interactuar con el resto de la página, presionar otros botones, etc. hasta que haya tratado con la ventana. En este caso - hasta que presionen "OK".

## prompt

La función `prompt` acepta dos argumentos:

```js no-beautify
result = prompt(title[, default]);
```

Muestra una ventana modal con un mensaje de texto, un campo de entrada para el visitante y los botones OK/CANCEL.

`title`
: El texto para mostrar al visitante.

`default`
: Un segundo parámetro opcional, el valor inicial para el campo de entrada.

El visitante puede escribir algo en el campo de entrada de solicitud y presionar OK. O pueden cancelar la entrada presionando CANCEL o presionando la tecla `key:Esc`.

La llamada a `prompt` devuelve el texto del campo de entrada o`null` si la entrada fue cancelada.

Por ejemplo:

```js run
let age = prompt("How old are you?", 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

##### "In IE: always supply a `default`"

El segundo parámetro es opcional, pero si no lo suministramos, Internet Explorer insertará el texto `"undefined"` en el indicador.

Ejecute este código en Internet Explorer para ver:

```js run
let test = prompt("Test");
```

Por lo tanto, para que las indicaciones se vean bien en IE, recomendamos proporcionar siempre el segundo argumento:

```js run
let test = prompt("Test", ""); // <-- for IE
```

## confirm

The syntax:

```js
result = confirm(question);
```

La función `confirm` muestra una ventana modal con una`question` y dos botones: Aceptar y CANCELAR.

El resultado es `true` si se presiona OK y`false` de lo contrario.

Por ejemplo:

```js run
let isBoss = confirm("Are you the boss?");

alert(isBoss); // true if OK is pressed
```

## Summary

Cubrimos 3 funciones específicas del navegador para interactuar con los visitantes:

`alert`
: muestra un mensaje.

`prompt`
: muestra un mensaje pidiendo al usuario que ingrese texto. Devuelve el texto o, si se pulsa CANCEL o `key: Esc`,`null`.

`confirm`
: muestra un mensaje y espera a que el usuario presione "OK" o "CANCEL". Devuelve `true` para OK y `false` para CANCEL / `key:Esc`.

Todos estos métodos son modales: pausan la ejecución del script y no permiten que el visitante interactúe con el resto de la página hasta que la ventana haya sido cerrada.

Hay dos limitaciones compartidas por todos los métodos anteriores:

1. La ubicación exacta de la ventana modal está determinada por el navegador. Por lo general, está en el centro.
2. El aspecto exacto de la ventana también depende del navegador. No podemos modificarlo.

Ese es el precio por la simplicidad. Hay otras formas de mostrar ventanas más agradables y una interacción más rica con el visitante, pero si las "campanas y los silbidos" no importan mucho, estos métodos funcionan bien.
