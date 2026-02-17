import dotenv from 'dotenv';

/**
 * Charge les variables d'environnement depuis le fichier .env
 */
dotenv.config();

/**
 * Vérification minimale des variables essentielles
 */
const requiredEnvVars = [
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET'
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

/**
 * Export des variables pour un usage propre dans l'app
 */
export const env = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development'
};
