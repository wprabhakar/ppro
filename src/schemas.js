module.exports = async db => {
  const createSchema = `
        CREATE TABLE HelloWorld
        (
          Message TEXT
        )
    `;

  try {
    await db.run(createSchema);
    return db;
  } catch (error) {
    throw Error('Could not create table');
  }
};
