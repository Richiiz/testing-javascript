const request = require('supertest');
//  se necesita establecer una conexion a la base de datos para la prueba e2e
// primero van las importaciones de terceros
const { MongoClient } = require('mongodb');
const createApp = require('../src/app');
// nos traemos al archivo para poder jalar sus variables
const { config } = require('../src/config');

// generamos la conexion para las pruebas e2e
const DB_MAME = config.dbName;
const MONGO_URI = config.dbUrl;

describe('test for books', () => {
  let app = null;
  let server = null;
  // nos conectamos a la base de datos.
  let database = null;

  // se pone async ya que es asincrona
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3002);
    // aqui generamos al neuvo cliente para la nueva conexion
    // se necesita la url,esta se obtiene desde el archivo config que lee estas variables de entorno
    // creamos otra constante arriba donde importamos el archivo config
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // ya que tenemos el cliente lo conectamos, recuerda que es asincrono
    await client.connect();
    // la base de datos es igual al cliente y este selecciona la base de datos esperada
    database = client.db(DB_MAME);
  });

  afterAll(async () => {
    await server.close();
    // despues de que se ejecuta la prueba, se borra toda la base de datos
    // esto para evitar errores y que se generen los mismos elementos en la BD
    await database.dropDatabase();
  });

  describe('test for [GET] /api/v1/books', () => {
    // ponemos async ya que la semilla es asincrona
    test('should return list books', async () => {
      // Arran
      // le estamos dando una semilla de datos, estamos inyectando información a la base de datos
      // ya que esta vacia.
      // esta tambien es asincrona, por es ponemos el await

      // si la base de datos tiene la info que le estamos dando, va a consultarlo en la base de dato
      // y de este modo retornalos
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Book1',
          year: 1998,
          author: 'nicolas',
        },
        {
          name: 'Book1',
          year: 1998,
          author: 'nicolas',
        },
        {
          name: 'Book3',
          year: 1998,
          author: 'nicolas',
        },
      ]);
      console.log(seedData);
      // Act
      return request(app)
      // la diagonal al principio siempre va ahi, RECUERDALO.
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          // Assert
          // esperamos el body y la semilla sea de igual tamaño.
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });
});
// todo esto solamente prueba que funcione correctamente la ruta, evitando
