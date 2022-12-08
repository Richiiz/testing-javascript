/** AAA
* Arrange
* Act
* Assert */

/** AAA
* preparar
* actuar
* asertar */

const Person = require('./06-person');

describe('test para personas', () => {
  let person;
  // preparar nuestra instancia, en este caso el beforeEach
  // Arrange
  beforeEach(() => {
    person = new Person('richi', 82, 1.7);
  });

  test('should return overweight level 1', () => {
    // Arrange
    person.weight = 82;
    // cuando ejecutamos el metodo que vamos a usar, en este caso el imc
    // Act
    const imc = person.calcIMC();
    // probando el metodo que usamos, intentamos resolver la hipotesis o probamos el metodo
    // Assert
    expect(imc).toBe('overweight level 1');
  });

  test('should return normal', () => {
    person.weight = 59;
    const imc = person.calcIMC();
    expect(imc).toBe('normal');
  });
});
