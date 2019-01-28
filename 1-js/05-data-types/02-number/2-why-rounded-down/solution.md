Internamente, la fracción decimal `6.35` es un binario sin fin. Como siempre en tales casos, se almacena con una pérdida de precisión.

Veamos:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

La pérdida de precisión puede causar tanto el aumento como la disminución de un número. En este caso particular, el número se vuelve un poco menos, por eso se redondea hacia abajo.

¿Y qué hay de `1.35`?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Aquí, la pérdida de precisión hizo que el número fuera un poco mayor, por lo que se redondea.

**¿Cómo podemos solucionar el problema con `6.35` si queremos que se redondee de la manera correcta?**

Deberíamos acercarlo a un entero antes del redondeo:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Tenga en cuenta que `63.5` no tiene ninguna pérdida de precisión. Eso es porque la parte decimal `0.5` es en realidad `1/2`. Las fracciones divididas por potencias de `2` están representadas exactamente en el sistema binario, ahora podemos redondearlo:


```js run
alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(rounded) -> 6.4
```

