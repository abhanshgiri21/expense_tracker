module.exports = {
  databaseConfig: {
    client: 'pg',
    useNullAsDefault: true,
    // connection: process.env.DB_URL
    connection: process.env.DB_URL || {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'binarysort',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'expensetracker'
    }
  }
};
