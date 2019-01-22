importance: 4

---

# Uppercase const?

Examina el siguiente código

```js
const birthday = "18.04.1982";

const age = someCode(birthday);
```

Aquí tenemos una fecha constante de `birthday` y la `age` se calcula a partir de `birthday` con la ayuda de algún código (no se proporciona para la brevedad, y porque los detalles no importan aquí).

¿Sería correcto usar mayúsculas para `birthday` ? ¿Y para la `age`? ¿O incluso para ambos?

```js
const BIRTHDAY = "18.04.1982"; // make uppercase?

const AGE = someCode(BIRTHDAY); // make uppercase?
```
