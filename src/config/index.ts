if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  dev: process.env.NODE_ENV !== 'production',
  test: process.env.NODE_ENV === 'test',
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  publicUrl: process.env.PUBLIC_URL,
  defaultAdminUsername: process.env.DEFAULT_ADMIN_USERNAME,
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  jwtTimeExpire: process.env.JWT_TIME_EXPIRE,
  cloudApiSecret: process.env.CLOUD_API_SECRET,
  cloudApiKey: process.env.CLOUD_API_KEY,
  cloudName: process.env.CLOUD_NAME,
  urlFrontend: process.env.URL_FRONTEND,
};

export default config;
