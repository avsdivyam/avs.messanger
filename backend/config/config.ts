import fs from 'fs';
import yaml from 'yaml';

// Load configuration from YAML file
const configFile = fs.readFileSync('../../config/config.yaml', 'utf8');
const configData = yaml.parse(configFile);

class Config {
    public static readonly PORT: number = configData.port;
    public static readonly DB_NAME: string = configData.db.NAME;
    public static readonly DB_USER: string = configData.db.USER;
    public static readonly DB_PASSWORD: string = configData.db.PASSWORD;
    public static readonly DB_HOST: string = configData.db.HOST;
    public static readonly DB_PORT: number = configData.db.PORT;
    public static readonly DB_SCHEMA: string = configData.db.SCHEMA;
    public static readonly DB_URL: string = `postgres://${Config.DB_USER}:${Config.DB_PASSWORD}@${Config.DB_HOST}:${Config.DB_PORT}/${Config.DB_NAME}?schema=${Config.DB_SCHEMA}`;
}

export default Config;