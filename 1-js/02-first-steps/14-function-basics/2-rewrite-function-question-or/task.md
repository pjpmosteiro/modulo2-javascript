importance: 4

---

# Rewrite the function using '?' or '||'

La siguiente función devuelve `true` si el parámetro `age` es mayor que `18`.

De lo contrario, solicita una confirmación y devuelve su resultado.

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm("Do you have your parents permission to access this page?");
  }
}
```

Vuelva a escribirlo, para realizar lo mismo, pero sin `if`, en una sola línea.

Haz dos variantes de `checkAge`:

1. Usando un operador de signo de interrogación `?`
2. Utilizando OR `||`
