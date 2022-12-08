// creamos una constante en la que guardamos y requerimos la clase de BooksServices
// que viene del archivo books.service
const BooksServices = require('./books.service');

// variable Fake que simula el arreglo de la base de datos
const FakeBooks = [
  {
    _id: 1,
    name: 'El principito',
  },
];

// este es una variable stub que es reemplazada por la libreria original.
// prepara una respuesta predefinida que viene de una variable Fake
// cuando se usa una suplantacion se tiene que suplantar todo el comportamiento, en este caso
// son dos getAll y create
const MongoLibStub = {
  getAll: () => [...FakeBooks],
  create: () => {},
};

// cuando estamos utuilizando una dependencia (en este caso MongoLib del archivo books.service.js),
// la usamos a partir de la importacion.
// cuando se llame a la libreria, se genera una suplantacion con respuestas preparadas
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => MongoLibStub));

describe('Test for BooksServices', () => {
  // se crea una variable editable llamada service
  let service;
  beforeEach(() => {
    // en la varibale editable le metemos la constante BooksServices que viene
    // del archivo que requerimos
    service = new BooksServices();
    // la siguiente linea de codigo limpia todos los mocks que se hayan hecho ANTES de cada prueba
    // esto es asi ya que esta dentro del beforeEach.
    jest.clearAllMocks();
  });

  describe('test for getbooks', () => {
    test('should return a list book', async () => {
      // Arrange

      // creamos una constante donde va a guardar el metodo getBooks de la variable editable
      // service,ponemos async ya que es un metodo asincrono
      // act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(1);
    });
  });
});
