importance: 4

---

# ¿Por qué 6.35.toFixed(1) == 6.3?

De acuerdo con la documentación `Math.round` y `toFixed` ambos redondean al número más cercano: `0..4` lidera mientras que` 5..9` lidera.

Por ejemplo:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

En el siguiente ejemplo similar, ¿por qué se redondea `6.35` a `6.3`, no a `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

¿Cómo redondear `6.35` de la manera correcta?

