npm install express @prisma/client dotenv
npm i typescript @types/express ts-node --dev

TypeScript + bundler (tsup / esbuild / swc)

## Configurando Pastas e arquivos

tsconfig

    npx tsc --init

### Criando server

https://www.youtube.com/watch?v=oODlPLfnTIk&t=75s

### Config PRISMA

https://www.youtube.com/watch?v=KjZ5RmrSptI
npm install prisma @types/node --save-dev
npm install @prisma/client @prisma/adapter-mariadb dotenv

### Database

DATABASE_URL="mysql://username:password@localhost:3306/mydb"

npx tsc --init
npx prisma init
npx prisma generate
npx prisma migrate dev
npx commitizen init cz-emoji --save-dev --save-exact