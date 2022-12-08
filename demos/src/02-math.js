function sum(a, b) {
  return a + b;
}

function multi(a, b) {
  return a * b;
}

function div(a, b) {
  // se valida la funcion para que la prueba se ejecuta correctamente
  if (b === 0) {
    return null;
  }
  return a / b;
}
module.exports = {
  sum,
  multi,
  div,
};
