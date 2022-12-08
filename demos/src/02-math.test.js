// traemos las variables del archivo asociado a este test
const { sum, multi, div } = require('./02-math');

// test corre una prueba en especifico, se pone un mensaje donde se
// pone el escenario de prueba que estamos haciendo
test('adds 1 + 3 should be 4', () => {
  // ponemos valores a nuestra funcion
  const rta = sum(1, 3);

  // expect soluciona la hipotesis y confirma si es correcta la prueba o no
  expect(rta).toBe(4);
});

test('adds 2 * 2 should be 4', () => {
  const rta = multi(2, 2);
  expect(rta).toBe(4);
});

// una division entre 0 no existe, no envia un null si no que en javascript manda un infinite,
// para corregir esto se necesita validar la funcion
test('adds 4 / 0 should be zero', () => {
  const rta = div(4, 0);
  expect(rta).toBeNull();
});
