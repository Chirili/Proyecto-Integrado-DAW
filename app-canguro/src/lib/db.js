import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_DB_CONNECTION_NAME || "mongodb://localhost/";

/**
 * Mantiene la conexión con mongo y evita que crezca el numero de conexiones
 */
let cachedConnection = global.mongoConnection;

if (!cachedConnection) {
  cachedConnection = null
}

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection
  }

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  let mongoConnection = MongoClient.connect(uri, opts).then((client) => {
    return client;
  })

  cachedConnection = await mongoConnection
  return cachedConnection
}