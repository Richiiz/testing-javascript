// creamos una constante en la que guardamos y requerimos la clase de BooksServices
// que viene del archivo books.service
const { generateManyBook } = require('../fakes/book.fake');
const BooksServices = require('./books.service');

// variable Fake que simula el arreglo de la base de datos
// se borran esta constante ya que ya tenemos nuestro generador de libros dinamicos
// const FakeBooks = [
//   {
//     _id: 1,
//     name: 'El principito',
//   },
// ];

// se crea una constante para una prueba de comportamiento, mejor conocida como espia
const mockGetAll = jest.fn();

// este es una variable stub que es reemplazada por la libreria original.
// prepara una respuesta predefinida que viene de una variable Fake
// cuando se usa una suplantacion se tiene que suplantar todo el comportamiento, en este caso
// son dos getAll y create
// const MongoLibStub = {
// getAll: () => [...FakeBooks], // ahor getAll es igual a la constante espia osea, mockGetAll
//   getAll: mockGetAll,
//   create: () => {},
// };

// cuando estamos utuilizando una dependencia (en este caso MongoLib del archivo books.service.js),
// la usamos a partir de la importacion.
// cuando se llame a la libreria, se genera una suplantacion con respuestas preparadas
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

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
      const fakeBooks = generateManyBook(20);
      // se ponen los libros dentro del metodo para poder espiar como es que vienen
      mockGetAll.mockResolvedValue(fakeBooks);

      // creamos una constante donde va a guardar el metodo getBooks de la variable editable
      // service,ponemos async ya que es un metodo asincrono
      // act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      // compara la cantidad de libros que son 20
      expect(books.length).toEqual(fakeBooks.length);
      // pregunta si la variable espia fue llamada
      expect(mockGetAll).toHaveBeenCalled();
      // pregunta si la variable espia fue llamada tantas veces
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      // pregunta si la variable espia fue llamada con ciertos argumentos
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });
    test('should return a list book', async () => {
      // Arrange
      const fakeBooks = generateManyBook(4);
      // se ponen los datos que se estan exportando de nuestro generador de libros
      mockGetAll.mockResolvedValue(fakeBooks);

      // act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      // comprobamos si dentro del array, nuestro elemento en la posicion 0
      // fue llamado correctamente el nombre del libro.
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });
  });
});
