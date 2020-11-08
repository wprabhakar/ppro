module.exports = async db => {
  const createRideTableSchema = `
        CREATE TABLE HelloWorld
        (
          Message TEXT
        )
    `;

  try {
    await db.run(createRideTableSchema);
    return db;
  } catch (error) {
    throw Error('Could not create table');
  }
};
