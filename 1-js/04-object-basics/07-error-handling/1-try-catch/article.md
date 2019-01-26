# Error handling, "try..catch"

No importa lo bien que estemos en la programación, a veces nuestros scripts tienen errores. Pueden ocurrir debido a nuestros errores, una entrada inesperada del usuario, una respuesta errónea del servidor y por miles de otras razones.

Generalmente, un script "muere" (se detiene inmediatamente) en caso de error, imprimiéndolo en la consola.

Pero hay una construcción de sintaxis `try..catch` que permite" detectar "errores y, en lugar de morir, hacer algo más razonable.

## The "try..catch" syntax

La construcción `try..catch` tiene dos bloques principales:` try`, y luego `catch`:  

```js
try {

  // code...

} catch (err) {

  // error handling

}
```

Funciona así:

1. Primero, se ejecuta el código en `try {...}`.
2. Si no hubo errores, se ignora `catch (err)`: la ejecución llega al final de `try` y luego salta sobre` catch`.
3. Si ocurre un error, entonces la ejecución de `try` se detiene, y el control fluye al principio de` catch (err) `. La variable `err` (puede usar cualquier nombre para ella) contiene un objeto de error con detalles sobre lo que sucedió.

![](try-catch-flow.png)

Por lo tanto, un error dentro del bloque `try {…}` no mata el script: tenemos la oportunidad de manejarlo en `catch`.

Veamos más ejemplos.

- Un ejemplo sin error: muestra `alert` `(1)` y `(2)`:

    ```js run
    try {

      alert('Start of try runs');  // *!*(1) <--*/!*

      // ...no errors here

      alert('End of try runs');   // *!*(2) <--*/!*

    } catch(err) {

      alert('Catch is ignored, because there are no errors'); // (3)

    }

    alert("...Then the execution continues");
    ```
- Un ejemplo con un error: muestra `(1)` y `(3)`:

    ```js run
    try {

      alert('Start of try runs');  // *!*(1) <--*/!*

    *!*
      lalala; // error, variable is not defined!
    */!*

      alert('End of try (never reached)');  // (2)

    } catch(err) {

      alert(`Error has occured!`); // *!*(3) <--*/!*

    }

    alert("...Then the execution continues");
    ```


Para que `try..catch` funcione, el código debe ser ejecutable. En otras palabras, debe ser JavaScript válido.

No funcionará si el código es sintácticamente incorrecto, por ejemplo, tiene llaves no coincidentes:Exploremos un caso de uso en la vida real de `try..catch`.

Como ya sabemos, JavaScript es compatible con el método [JSON.parse(str)](mdn:js/JSON/parse) para leer los valores codificados en JSON.

Por lo general, se utiliza para decodificar los datos recibidos a través de la red, desde el servidor u otra fuente.

Lo recibimos y llamamos a `JSON.parse`, así:

```js run
try {
  {{{{{{{{{{{{
} catch(e) {
  alert("The engine can't understand this code, it's invalid");
}
```

El motor de JavaScript primero lee el código y luego lo funciona. Los errores que ocurren en la frase de lectura se llaman errores de "tiempo de análisis" y son irrecuperables (desde dentro de ese código). Eso es porque el motor no puede entender el código.

Entonces, `try..catch` solo puede manejar los errores que ocurren en el código válido. Dichos errores se denominan "errores de tiempo de ejecución" o, a veces, "excepciones".

Si ocurre una excepción en el código "programado", como en `setTimeout`, entonces` try..catch` no lo detectará:

```js run
try {
  setTimeout(function() {
    noSuchVariable; // script will die here
  }, 1000);
} catch (e) {
  alert( "won't work" );
}
```

Esto se debe a que `try..catch` en realidad envuelve la llamada` setTimeout` que programa la función. Pero la función en sí mismo se enviará más tarde, cuando el motor ya haya abandonado la construcción `try..catch`.

Para intentar una excepción dentro de una función programada, `try..catch` debe estar dentro de esa función:

```js run
setTimeout(function() {
  try {    
    noSuchVariable; // try..catch handles the error!
  } catch (e) {
    alert( "error is caught here!" );
  }
}, 1000);
```

## Error object

Cuando se produce un error, JavaScript genera un objeto que contiene los detalles al respecto. El objeto se pasa como un argumento a `catch`:

```js 
try {
  // ...
} catch(err) { // <-- the "error object", could use another word instead of err
  // ...
}
```

Para todos los errores incorporados, el objeto de error dentro del bloque `catch` tiene dos propiedades principales:

`name`
: Nombre de error. Para una variable no definida que es `"ReferenceError"`.

`message`
: Mensaje de texto sobre detalles de error.

Hay otras propiedades no estándar disponibles en la mayoría de los entornos. Uno de los más utilizados y soportados es:

`stack`
: Pila de llamadas actual: una cadena con información sobre la secuencia de llamadas anidadas que llevaron al error. Se utiliza para fines de depuración.

Por ejemplo:

```js
try {
*!*
  lalala; // error, variable is not defined!
*/!*
} catch(err) {
  alert(err.name); // ReferenceError
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at ...

  // Can also show an error as a whole
  // The error is converted to string as "name: message"
  alert(err); // ReferenceError: lalala is not defined
}
```


## Using "try..catch"

Exploremos un caso de uso en la vida real de `try..catch`.

Como ya sabemos, JavaScript es compatible con el método [JSON.parse(str)](mdn:js/JSON/parse) para leer los valores codificados en JSON.

Por lo general, se utiliza para decodificar los datos recibidos a través de la red, desde el servidor u otra fuente.

Lo recibimos y llamamos a `JSON.parse`, así:

```js run
let json = '{"name":"John", "age": 30}'; // data from the server

*!*
let user = JSON.parse(json); // convert the text representation to JS object
*/!*

// now user is an object with properties from the string
alert( user.name ); // John
alert( user.age );  // 30
```
Puede encontrar información más detallada sobre JSON en el capítulo <info:json>.

**Si `json` está mal formado,` JSON.parse` genera un error, por lo que el script "muere".**

¿Deberíamos estar satisfechos con eso? ¡Por supuesto no!

De esta manera, si algo está mal con los datos, el visitante nunca lo sabrá (a menos que abra la consola del desarrollador). Y a la gente realmente no le gusta cuando algo "simplemente muere" sin ningún mensaje de error.

Usemos `try..catch` para manejar el error:

```js run
let json = "{ bad json }";

try {

*!*
  let user = JSON.parse(json); // <-- when an error occurs...
*/!*
  alert( user.name ); // doesn't work

} catch (e) {
*!*
  // ...the execution jumps here
  alert( "Our apologies, the data has errors, we'll try to request it one more time." );
  alert( e.name );
  alert( e.message );
*/!*
}
```

Aquí usamos el bloque `catch` solo para mostrar el mensaje, pero podemos hacer mucho más: enviar una nueva solicitud de red, sugerir una alternativa al visitante, enviar información sobre el error a un servicio de registro,.... Todo mucho mejor que simplemente morir.

## Throwing our own errors

¿Qué sucede si `json` es sintácticamente correcto, pero no tiene una propiedad` name` requerida?

Algo como:

```js run
let json = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- no errors
*!*
  alert( user.name ); // no name!
*/!*

} catch (e) {
  alert( "doesn't execute" );
}
```

Aquí `JSON.parse` se ejecuta normalmente, pero la ausencia de `name` es realmente un error para nosotros.

Para unificar el manejo de errores, usaremos el operador `throw`.

### "Throw" operator

El operador `throw` genera un error.

La sintaxis es:

```js
throw <error object>
```

Técnicamente, podemos usar cualquier cosa como un objeto de error. Eso puede ser incluso un elemento primitivo, como un número o una cadena, pero es mejor usar objetos, preferiblemente con las propiedades `name` y `message` (para mantenerse un tanto compatible con los errores incorporados).

JavaScript tiene muchos constructores incorporados para errores estándar: `Error`,` SyntaxError`, `ReferenceError`,` TypeError` y otros. Podemos usarlos para crear objetos de error también.

Su sintaxis es:

```js
let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

Para errores incorporados, solo para errores, la propiedad `nombre` es exactamente el nombre del constructor. Y `mensaje` se toma del argumento.

Por ejemplo:

```js run
let error = new Error("Things happen o_O");

alert(error.name); // Error
alert(error.message); // Things happen o_O
```

Veamos qué tipo de error `JSON.parse` genera:

```js run
try {
  JSON.parse("{ bad json o_O }");
} catch(e) {
*!*
  alert(e.name); // SyntaxError
*/!*
  alert(e.message); // Unexpected token o in JSON at position 0
}
```

Como podemos ver, eso es un `SyntaxError`.

Y en nuestro caso, la ausencia de `nombre` también podría tratarse como un error de sintaxis, suponiendo que los usuarios deben tener un `nombre`.

Así que vamos a tirarlo:

```js run
let json = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- no errors

  if (!user.name) {
*!*
    throw new SyntaxError("Incomplete data: no name"); // (*)
*/!*
  }

  alert( user.name );

} catch(e) {
  alert( "JSON Error: " + e.message ); // JSON Error: Incomplete data: no name
}
```

En la línea `(*)`, el operador `throw` genera un` SyntaxError` con el `message` dado, de la misma manera que JavaScript lo generaría a sí mismo. La ejecución de `try` se detiene inmediatamente y el flujo de control salta a` catch`.

Now `catch` became a single place for all error handling: both for `JSON.parse` and other cases.

## Rethrowing

En el ejemplo anterior, usamos `try..catch` para manejar datos incorrectos. Pero, ¿es posible que * otro error inesperado * ocurra dentro del bloque `try {...}`? Como una variable no está definida o algo más, no solo esa cosa de "datos incorrectos".

Como:

```js run
let json = '{ "age": 30 }'; // incomplete data

try {
  user = JSON.parse(json); // <-- forgot to put "let" before user

  // ...
} catch(err) {
  alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defined
  // (no JSON Error actually)
}
```

Por supuesto, todo es posible! Los programadores cometen errores. Incluso en las utilidades de código abierto utilizadas por millones de personas durante décadas: de repente, se puede descubrir un error loco que conduce a hacks terribles (como sucedió con la herramienta `ssh`).

En nuestro caso, `try..catch` está destinado a detectar errores de "datos incorrectos". Pero por su naturaleza, `catch` obtiene * todos * los errores de `try`. Aquí se produce un error inesperado, pero sigue mostrando el mismo mensaje `" Error JSON ". Eso está mal y también hace que el código sea más difícil de depurar.

Afortunadamente, podemos averiguar qué error recibimos, por ejemplo, a partir de su `nombre`:

```js run
try {
  user = { /*...*/ };
} catch(e) {
*!*
  alert(e.name); // "ReferenceError" for accessing an undefined variable
*/!*
}
```

La regla es simple:

**Catch should only process errors that it knows and "rethrow" all others.**

La técnica de "reenvío" se puede explicar con más detalle como:

1. Catch obtiene todos los errores.
2. En el bloque `catch (err) {...}` analizamos el objeto de error `err`.
2. Si no sabemos cómo manejarlo, entonces hacemos un 'error'.

En el código a continuación, usamos el reenvío para que `catch` solo maneje `SyntaxError`:

```js run
let json = '{ "age": 30 }'; // incomplete data
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

*!*
  blabla(); // unexpected error
*/!*

  alert( user.name );

} catch(e) {

*!*
  if (e.name == "SyntaxError") {
    alert( "JSON Error: " + e.message );
  } else {
    throw e; // rethrow (*)
  }
*/!*

}
```
El error al lanzar en la línea `(*)` desde dentro del bloque `catch` "se sale" del `try..catch` y puede ser capturado por un constructo externo `try..catch` (si existe), o mata el guión.

Así que el bloque `catch` en realidad solo maneja los errores con los que sabe cómo lidiar y "omite" todos los demás.

El ejemplo a continuación demuestra cómo dichos errores pueden ser detectados por un nivel más de `try..catch`:

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // error!
*/!*
  } catch (e) {
    // ...
    if (e.name != 'SyntaxError') {
*!*
      throw e; // rethrow (don't know how to deal with it)
*/!*
    }
  }
}

try {
  readData();
} catch (e) {
*!*
  alert( "External catch got: " + e ); // caught it!
*/!*
}
```

Aquí `readData` solo sabe cómo manejar `SyntaxError`, mientras que el `try..catch` externo sabe cómo manejar todo.

## try..catch..finally

Espera, eso no es todo.

La construcción `try..catch` puede tener una cláusula de código más: `finally`.

Si existe, se ejecuta en todos los casos:

- después de `try`, si no hubiera errores,
- Después de `catch`, si hubiera errores.

La sintaxis extendida se ve así:

```js
*!*try*/!* {
   ... try to execute the code ...
} *!*catch*/!*(e) {
   ... handle errors ...
} *!*finally*/!* {
   ... execute always ...
}
```

Intenta ejecutar este código:

```js run
try {
  alert( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (e) {
  alert( 'catch' );
} finally {
  alert( 'finally' );
}
```
El código tiene dos formas de ejecución:

1. Si responde "Sí" a "¿Cometir un error?", Entonces intente -> atrapar -> finalmente`.
2. Si dices "No", entonces `prueba -> finalmente`.

La cláusula `finally` se usa a menudo cuando comenzamos a hacer algo antes de `try..catch` y queremos finalizarlo en cualquier caso de resultado.

Por ejemplo, queremos medir el tiempo que tarda la función `fib (n)` de los números de Fibonacci. Naturalmente, podemos comenzar a medir antes de que se ejecute y terminar después. ¿Pero qué pasa si hay un error durante la llamada a la función? En particular, la implementación de `fib (n)` en el código siguiente devuelve un error para números negativos o no enteros.

La cláusula `finally` es un gran lugar para terminar las mediciones sin importar qué.

Aquí, finalmente, garantiza que el tiempo se medirá correctamente en ambas situaciones, en caso de una ejecución exitosa de `fib` y en caso de error:

```js run
let num = +prompt("Enter a positive integer number?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (e) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

alert(result || "error occured");

alert( `execution took ${diff}ms` );
```
Puede verificar ejecutando el código ingresando `35` en` prompt` - se ejecuta normalmente, `finally` después de `try`. Y luego ingrese `-1` - habrá un error inmediato, y la ejecución tomará `0ms`. Ambas medidas se realizan correctamente.

En otras palabras, puede haber dos formas de salir de una función: un `return` o un `throw`. La cláusula `finally` se ocupa de ambos.

Tenga en cuenta que las variables `result` y` diff` en el código anterior se declaran *antes de* `try..catch`.

De lo contrario, si `let` se hiciera dentro del bloque `{...} `, solo sería visible dentro de él.

La cláusula `finally` funciona para *cualquier* salir dex`try..catch`. Eso incluye un `return` explícito.

En el siguiente ejemplo, hay un `return` en `try`. En este caso, `finally` se ejecuta justo antes de que el control regrese al código externo.

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (e) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); // first works alert from finally, and then this one
```

La construcción `try..finally`, sin la cláusula `catch`, también es útil. Lo aplicamos cuando no queremos manejar los errores aquí, pero queremos estar seguros de que los procesos que iniciamos están finalizados.

```js
function func() {
  // start doing something that needs completion (like measurements)
  try {
    // ...
  } finally {
    // complete that thing even if all dies
  }
}
```
En el código anterior, un error dentro de `try` siempre se cae, porque no hay `catch`. Pero `finally` funciona antes de que el flujo de ejecución salte afuera.

## Global catch

La información de esta sección no es parte del JavaScript principal.


Imaginemos que tenemos un error fatal fuera de `try..catch`, y el script murió. Como un error de programación o algo más terrible.

¿Hay alguna manera de reaccionar ante tales ocurrencias? Es posible que queramos registrar el error, mostrarle algo al usuario (normalmente no ven mensajes de error), etc.

No hay ninguno en la especificación, pero los entornos generalmente lo proporcionan, porque es realmente útil. Por ejemplo, Node.JS tiene [process.on('uncaughtException')](https://nodejs.org/api/process.html#process_event_uncaughtexception) para eso. Y en el navegador podemos asignar una función a la propiedad especial [window.onerror](mdn:api/GlobalEventHandlers/onerror). Se ejecutará en caso de un error no capturado.

La sintaxis:

```js
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

`message`
: Mensaje de error.

`url`
: URL del script donde ocurrió el error.

`line`,`col`
: Números de línea y columna donde ocurrió el error.

`error`
: Objeto de error.

Por ejemplo:

```html run untrusted refresh height=1
<script>
*!*
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };
*/!*

  function readData() {
    badFunc(); // Whoops, something went wrong!
  }

  readData();

</script>
```

El rol del controlador global `window.onerror` generalmente no es recuperar la ejecución del script, probablemente sea imposible en caso de errores de programación, sino enviar el mensaje de error a los desarrolladores.

También hay servicios web que proporcionan registro de errores para tales casos, como <https://errorception.com> o <http://www.muscula.com>.

Funcionan así:

1. Nos registramos en el servicio y obtenemos una parte de JS (o una URL de script) de ellos para insertar en las páginas.
2. Ese script JS tiene una función personalizada `window.onerror`.
3. Cuando se produce un error, envía una solicitud de red al servicio.
4. Podemos iniciar sesión en la interfaz web del servicio y ver los errores.

## Summary

La construcción `try..catch` permite manejar errores de tiempo de ejecución. Literalmente, permite intentar ejecutar el código y detectar errores que puedan ocurrir en él.

La sintaxis es:

```js
try {
  // run this code
} catch(err) {
  // if an error happened, then jump here
  // err is the error object
} finally {
  // do in any case after try/catch
}
```

Puede que no haya una sección `catch` o ningún `finally`, así que `try..catch` y `try..finally` también son válidos.

Los objetos de error tienen las siguientes propiedades:

- `message` - el mensaje de error legible por humanos.
- `name` - la cadena con el nombre de error (error constructor name).
- `stack` (no estándar) - la pila en el momento de la creación del error.

También podemos generar nuestros propios errores utilizando el operador `throw`. Técnicamente, el argumento de `throw` puede ser cualquier cosa, pero generalmente es un objeto de error que se hereda de la clase `Error` incorporada. Más sobre extender errores en el siguiente capítulo.

El reingreso es un patrón básico de manejo de errores: un bloque `catch` generalmente espera y sabe cómo manejar el tipo de error en particular, por lo que debería volver a emitir los errores que no conoce.

Incluso si no tenemos `try..catch`, la mayoría de los entornos permiten configurar un controlador de errores "global" para detectar errores que "caen". En el navegador es `window.onerror`.