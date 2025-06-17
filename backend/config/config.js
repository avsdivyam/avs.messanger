"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
// Load configuration from YAML file
const configFile = fs_1.default.readFileSync('../../config/config.yaml', 'utf8');
const configData = yaml_1.default.parse(configFile);
class Config {
}
Config.PORT = configData.port;
Config.DB_NAME = configData.db.NAME;
Config.DB_USER = configData.db.USER;
Config.DB_PASSWORD = configData.db.PASSWORD;
Config.DB_HOST = configData.db.HOST;
Config.DB_PORT = configData.db.PORT;
Config.DB_SCHEMA = configData.db.SCHEMA;
Config.DB_URL = `postgres://${Config.DB_USER}:${Config.DB_PASSWORD}@${Config.DB_HOST}:${Config.DB_PORT}/${Config.DB_NAME}?schema=${Config.DB_SCHEMA}`;
exports.default = Config;
