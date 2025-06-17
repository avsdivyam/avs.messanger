
# Prisma Integration Setup Guide for AVS-MESSANGER Backend

## ✅ Prerequisites

Ensure you have:
- PostgreSQL running
- Node.js and TypeScript installed
- Prisma installed:
  ```bash
  npm install prisma --save-dev
  npm install @prisma/client
  ```

---

## 🚀 Initial Setup

### 1. Create `config.yaml`

```yaml
port: 3001
db:
  NAME: postgres
  USER: postgres
  PASSWORD: 12345
  HOST: localhost
  PORT: 5555
  SCHEMA: avs-messanger
```

---

### 2. Read YAML and Generate `.env`

#### `backend/config/config.ts`

```ts
import fs from 'fs';
import yaml from 'yaml';

const configFile = fs.readFileSync('./config/config.yaml', 'utf8');
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
```

---

#### `backend/src/scripts/generate-env.ts`

```ts
import Config from '../../config/config';
import fs from 'fs';

fs.writeFileSync('.env', `DATABASE_URL="${Config.DB_URL}"\n`);
console.log('✅ .env generated');
```

---

### 3. Run Script to Generate `.env`

```bash
npx ts-node src/scripts/generate-env.ts
```

---

## 🔧 Prisma Setup

### 4. Initialize Prisma

```bash
npx prisma init
```

This creates:
- `prisma/schema.prisma`
- `.env` (you will overwrite with the above script)

---

### 5. Configure `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

---

### 6. Generate Prisma Client

```bash
npx prisma generate
```

---

### 7. Run Migrations (Initial DB setup)

```bash
npx prisma migrate dev --name init
```

This:
- Creates tables in DB
- Updates Prisma Client

---

## 💡 Using Prisma Client

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUsers = async () => {
  return await prisma.user.findMany();
};
```

---

## 🆕 What to Do When Adding a New Model

### Steps to Follow

1. **Update `schema.prisma`**

```prisma
model Product {
  id    Int    @id @default(autoincrement())
  name  String
  price Float
}
```

2. **Run Migration**

```bash
npx prisma migrate dev --name add-product
```

3. **(Optional)** Rerun client generation:

```bash
npx prisma generate
```

---

## ✅ Tips

- Use `.env` for all database connections.
- Keep `config.yaml` as the central config source.
- Regenerate `.env` using:
  ```bash
  npx ts-node src/scripts/generate-env.ts
  ```
- Use Prisma Studio to view your DB:
  ```bash
  npx prisma studio
  ```
