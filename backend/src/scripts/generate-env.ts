import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
const configPath = path.resolve(__dirname, '../../config/config');

(async () => {
  const { default: Config } = await import(configPath);
  fs.writeFileSync(envPath, `DATABASE_URL="${Config.DB_URL}"\n`);
  console.log('✅ .env generated');
})();
