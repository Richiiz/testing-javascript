const Person = require('./06-person');

/** encerramos todos los casos de prueba dentro de un describe para evitar interferencias
 * lo que se esta haciendo aca es crear una estancia para cada caso de prueba,
 * antes cada caso, se tenia lo siguiente: const person = new Person('richi', 82, 1.7)
 * ahora con el let, creamos una variable que se puede modificar para cada caso
 * dentro del beforeEach se llevara a cabo la instancia que se volvera a ejecutar antes de cada caso
 * esto es buena practica para ahorrar configuraciones en cada escenario donde se repitan */

describe('test para personas', () => {
  let person;
  beforeEach(() => {
    person = new Person('richi', 82, 1.7);
  });
  test('should return overweight level 1', () => {
    person.weight = 82;
    const imc = person.calcIMC();
    expect(imc).toBe('overweight level 1');
  });

  test('should return normal', () => {
    person.weight = 59;
    const imc = person.calcIMC();
    expect(imc).toBe('normal');
  });
});
