# The modern mode, "use strict"

Durante mucho tiempo, JavaScript evolucionó sin problemas de compatibilidad. Se agregaron nuevas características al idioma mientras que la funcionalidad antigua no cambió.

Eso tuvo el beneficio de no romper nunca el código existente. Pero la desventaja era que cualquier error o una decisión imperfecta tomada por los creadores de JavaScript se quedaba atascada en el lenguaje para siempre.

Este fue el caso hasta 2009, cuando apareció ECMAScript 5 (ES5). Añadió nuevas características al lenguaje y modificó algunas de las existentes. Para mantener el código antiguo funcionando, la mayoría de las modificaciones están desactivadas por defecto. Necesita habilitarlos explícitamente con una directiva especial: `"use strict"`.

## "use strict"

La directiva parece una cuerda: `"use strict"` o `'use strict'`. Cuando se encuentra en la parte superior de un guión, todo el guión funciona de la manera "moderna".

Por ejemplo:

```js
"use strict";

// this code works the modern way
...
```

Pronto aprenderemos las funciones (una forma de agrupar comandos).

Mirando hacia el futuro, notemos que el `"use strict"` se puede poner al principio de la mayoría de los tipos de funciones en lugar de en todo el script. Hacer esto permite el modo estricto sólo en esa función. Pero normalmente, la gente lo usa para todo el script.

````warn header="Ensure that "use strict" is at the top"
Please make sure that `"use strict"` is at the top of your scripts, otherwise strict mode may not be enabled.

Strict mode isn't enabled here:

```js no-strict
alert("some code");
// "use strict" below is ignored--it must be at the top

"use strict";

// strict mode is not activated
```

Only comments may appear above `"use strict"`.
````

```warn header="No hay forma de cancelar `use strict`"
No existe ninguna directiva como la `"no use strict"` que devuelve el motor a su antiguo comportamiento.

Una vez que entremos en modo estricto, no habrá vuelta atrás.

```

##  Siempre "use strict"

Todavía tenemos que cubrir las diferencias entre el modo estricto y el modo "por defecto".

En los capítulos siguientes, a medida que aprendemos las características del idioma, notaremos las diferencias entre los modos estricto y predeterminado. Afortunadamente, no hay muchos y realmente mejoran nuestras vidas.

Por ahora, basta con saberlo en general:

1. La directiva ``"use strict"` cambia el motor al modo "moderno", cambiando el comportamiento de algunas características incorporadas. Veremos los detalles más adelante en el tutorial.
2. El modo estricto se activa colocando `"use strict"` en la parte superior de un script o función. Varias características de lenguaje, como "clases" y "módulos", permiten el modo estricto automáticamente.
3. El modo estricto es soportado por todos los navegadores modernos.
4. Recomendamos siempre iniciar los scripts con `"use strict"`. Todos los ejemplos de este tutorial asumen el modo estricto a menos que (muy raramente) se especifique lo contrario.

```
