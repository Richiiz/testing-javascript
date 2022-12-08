/** En Jest hay cláusulas para isolar las pruebas, donde un escenario de pruebas no afecte a otro,
 * para ello se agrupan los casos con describe().
*/

describe('grupo 1', () => {
  /**  Estos son Teardown, como su traduccion indica, trata de demoler o quitar los casos de
   * pruebas anteriores para que no interfieran con otro mas actual
  */

  beforeAll(() => {
    // en pruebas estaticas en produccion, es mala practica poner console.log
    console.log('beforeAll');
    // es una sentencia que corre antes de todas las pruebas
    // sirve en casos de pruebas en donde necesitamos un setup
    // despues de esto levantara una base de datos
  });
  afterAll(() => {
    console.log('afterAll');
    // se ejecuta despues de que se llevaron a cabo todos los casos de prueba
    // esto baja la base de datos
  });
  beforeEach(() => {
    console.log('beforeEach');
    // este corre antes de CADA UNA
  });

  afterEach(() => {
    console.log('afterEach');
    // este corre despues de CADA UNA
  });

  test('case 1', () => {
    console.log('caso 1');
    expect(1 + 1).toBe(2);
  });
  test('case 2', () => {
    console.log('caso 2');
    expect(1 + 3).toBe(4);
  });

  describe('grupo 2', () => {
    beforeAll(() => {
      console.log('beforeAll');
    // este beforeAll respeta el alcance del conjunto en el que esta, n este caso del grupo 2
    });
    test('case 3', () => {
      console.log('caso 3');
      expect(1 + 1).toBe(2);
    });
    test('case 4', () => {
      console.log('caso 4');
      expect(1 + 3).toBe(4);
    });
  });
});
