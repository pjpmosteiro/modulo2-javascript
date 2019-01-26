# Custom errors, extending Error

Cuando desarrollamos algo, a menudo necesitamos nuestras propias clases de error para reflejar cosas específicas que pueden salir mal en nuestras tareas. Para errores en las operaciones de red podemos necesitar `HttpError`, para operaciones de base de datos` DbError`, para buscar operaciones `NotFoundError` y así sucesivamente.

Nuestros errores deben admitir propiedades de error básicas como `message`, `name` y, preferiblemente, `stack`. Pero también pueden tener otras propiedades propias, por ejemplo, Los objetos `HttpError` pueden tener la propiedad `statusCode` con un valor como `404` o `403` o `500`.

JavaScript permite utilizar `throw` con cualquier argumento, por lo que técnicamente nuestras clases de error personalizadas no necesitan heredar de `Error`. Pero si heredamos, entonces es posible usar `obj instanceof Error` para identificar los objetos de error. Así que es mejor heredar de ella.

A medida que construimos nuestra aplicación, nuestros propios errores forman naturalmente una jerarquía, por ejemplo, `HttpTimeoutError` puede heredar de` HttpError`, y así sucesivamente.

## Extending Error

Como ejemplo, consideremos una función `readUser (json)` que debería leer JSON con los datos del usuario.

Aquí hay un ejemplo de cómo puede verse un `json` válido:

```js
let json = `{ "name": "John", "age": 30 }`;
```
Internamente, usaremos `JSON.parse`. Si recibe un `json` malformado, entonces lanza un `SyntaxError`.

Pero incluso si `json` es sintácticamente correcto, eso no significa que sea un usuario válido, ¿verdad? Puede pasar por alto los datos necesarios. Por ejemplo, si no tiene propiedades `name` y `age` que son esenciales para nuestros usuarios.

Nuestra función `readUser (json)` no solo leerá JSON, sino que también verificará ("validar") los datos. Si no hay campos obligatorios, o el formato es incorrecto, es un error. Y eso no es un `sintax error`, porque los datos son sintácticamente correctos, pero otro tipo de error. Lo llamaremos `ValidationError` y crearemos una clase para ello. Un error de ese tipo también debería llevar la información sobre el campo ofensivo.

Nuestra clase `ValidationError` debe heredar de la clase incorporada `Error`.

Esa clase está incorporada, pero deberíamos tener su código aproximado ante nuestros ojos, para entender lo que estamos extendiendo.

Así que aquí estás:

```js
// The "pseudocode" for the built-in Error class defined by JavaScript itself
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (different names for different built-in error classes)
    this.stack = <nested calls>; // non-standard, but most environments support it
  }
}
```

Ahora vamos a continuar y heredar `ValidationError` de ella:

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // a list of nested calls with line numbers for each
}

```
Por favor, eche un vistazo al constructor:

1. En la línea `(1)` llamamos al constructor padre. JavaScript requiere que llamemos `super` en el constructor hijo, por lo que es obligatorio. El constructor padre establece la propiedad `message`.
2. El constructor principal también establece la propiedad `name` en` "Error" `, por lo que en la línea` (2) `lo restablecemos al valor correcto.

Intentemos usarlo en `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it (**)
  }
}
```

El bloque `try..catch` en el código anterior maneja tanto nuestro `ValidationError` como el `SyntaxError` incorporado de `JSON.parse`.

Eche un vistazo a cómo usamos `instanceof` para verificar el tipo de error específico en la línea`(*)`.

También podríamos ver `err.name`, así:

```js
// ...
// instead of (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```  

La versión `instanceof` es mucho mejor, porque en el futuro vamos a extender `ValidationError`, hacer subtipos de ella, como `PropertyRequiredError`. Y `instanceof` check continuará trabajando para nuevas clases heredadas. Así que eso es a prueba de futuro.

También es importante que si `catch` encuentra un error desconocido, entonces lo vuelva a emitir en la línea `(**) `. El `catch` solo sabe cómo manejar los errores de validación y de sintaxis, otros tipos (debido a un error tipográfico en el código o similares) deberían fallar.

## Further inheritance

La clase `ValidationError` es muy genérica. Muchas cosas pueden salir mal. La propiedad puede estar ausente o puede estar en un formato incorrecto (como un valor de cadena para `age`). Hagamos una clase más concreta `PropertyRequiredError`, exactamente para propiedades ausentes. Llevará información adicional sobre la propiedad que falta.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

La nueva clase `PropertyRequiredError` es fácil de usar: solo necesitamos pasar el nombre de la propiedad: `new PropertyRequiredError(property)`. El 'mensaje' legible por humanos es generado por el constructor.

Tenga en cuenta que `this.name` en el constructor `PropertyRequiredError` se asigna de nuevo manualmente. Esto puede volverse un poco tedioso: asignar `this.name = <nombre de clase>` al crear cada error personalizado. Pero hay una salida. Podemos crear nuestra propia clase de "error básico" que elimina esta carga de nuestros hombros mediante el uso de `this.constructor.name` para `this.name` en el constructor. Y luego heredar de ella.

Llamémoslo `MyError`.

Aquí está el código con `MyError` y otras clases de error personalizadas, simplificadas:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Ahora los errores personalizados son mucho más cortos, especialmente `ValidationError`, ya que nos deshicimos de la línea `"this.name = ..."` en el constructor.

## Wrapping exceptions

El propósito de la función `readUser` en el código anterior es "leer los datos del usuario", ¿verdad? Pueden ocurrir diferentes tipos de errores en el proceso. En este momento tenemos `SyntaxError` y `ValidationError`, pero en el futuro la función `readUser` puede crecer: el nuevo código probablemente generará otros tipos de errores.

El código que llama a `readUser` debe manejar estos errores. En este momento usa varios `if` en el bloque `catch` para verificar diferentes tipos de errores y volver a lanzar los desconocidos. Pero si la función `readUser` genera varios tipos de errores, deberíamos preguntarnos: ¿realmente queremos verificar todos los tipos de error uno por uno en cada código que llama a `readUser`?

A menudo la respuesta es "No": el código externo quiere ser "un nivel por encima de todo eso". Quiere tener algún tipo de "error de lectura de datos". ¿Por qué sucedió exactamente? A menudo es irrelevante (el mensaje de error lo describe). O, mejor aún, si hay una manera de obtener detalles de error, pero solo si es necesario.

Entonces, hagamos una nueva clase `ReadError` para representar tales errores. Si ocurre un error dentro de `readUser`, lo capturaremos allí y generaremos `ReadError`. También mantendremos la referencia al error original en su propiedad `cause`. Entonces, el código externo solo tendrá que verificar `ReadError`.

Aquí está el código que define `ReadError` y demuestra su uso en `readUser` y `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

En el código anterior, `readUser` funciona exactamente como se describe: detecta la sintaxis y los errores de validación y, en su lugar, arroja los errores de `ReadError` (los errores desconocidos se vuelven a detectar de la forma habitual).

Así que el código externo comprueba `instanceof ReadError` y eso es todo. No es necesario enumerar todos los tipos de error posibles.

El enfoque se denomina "excepciones de ajuste", porque tomamos "excepciones de bajo nivel" y las "envolvemos" en "ReadError" que es más abstracto y más conveniente de usar para el código de llamada. Es ampliamente utilizado en la programación orientada a objetos.

## Summary

- Podemos heredar de `Error` y otras clases de error integradas normalmente, solo necesitamos cuidar la propiedad `name` y no olvidemos llamar `super`.
- La mayoría de las veces, deberíamos usar `instanceof` para verificar errores particulares. También funciona con herencia. Pero a veces tenemos un objeto de error proveniente de la biblioteca de terceros y no hay una manera fácil de obtener la clase. Entonces, la propiedad `name` puede usarse para tales controles.
- Ajustar excepciones es una técnica generalizada cuando una función maneja excepciones de bajo nivel y crea un objeto de nivel superior para informar sobre los errores. Las excepciones de bajo nivel a veces se convierten en propiedades de ese objeto como `err.cause` en los ejemplos anteriores, pero eso no es estrictamente necesario.