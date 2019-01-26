
Intenta ejecutarlo:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test); 
```

Puede haber dos tipos de resultados:
1. `indefinido`
2. Un error.

¿Por qué? Repasemos lo que está pasando en la línea `(*)`:

1. Cuando se accede a una propiedad de `str`, se crea un" objeto contenedor ".
2. La operación con la propiedad se lleva a cabo en él. Por lo tanto, el objeto obtiene la propiedad `test`.
3. La operación finaliza y el "objeto contenedor" desaparece.

Entonces, en la última línea, `str` no tiene rastro de la propiedad. Un nuevo objeto contenedor para cada operación de objeto en una cadena.

Aunque algunos navegadores pueden decidir limitar aún más el programador y no permitir que se asignen propiedades a los primitivos. Es por eso que en la práctica también podemos ver errores en la línea `(*)`. Aunque está un poco más lejos de la especificación.

**Este ejemplo muestra claramente que los primitivos no son objetos.**

Simplemente no pueden almacenar datos.

Todas las operaciones de propiedad/método se realizan con la ayuda de objetos temporales.