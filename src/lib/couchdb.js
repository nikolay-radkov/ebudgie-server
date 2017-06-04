import CouchDb from 'node-couchdb';

const db = new CouchDb({
  host: process.env.COUCHDB_HOST,
  protocol: process.env.COUCHDB_PROTOCOL,
  auth: {
    user: process.env.COUCHDB_USER,
    pass: process.env.COUCHDB_PASS
  }
});

export const getDocument = async (docId) => {
  const document = await db.get(process.env.COUCHDB_DATABASE, docId);
  return document.data;
};

export default db;
