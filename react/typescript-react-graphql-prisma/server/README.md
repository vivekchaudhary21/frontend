## Installing and Running Prisma

===== One time change =====

1. Npm install prisma
2. Npx prisma init
3. Change DATABASE_URL in env file
4. Add model in schema.prisma

===== Running POSTGRES SQL Instance =====

1. Go to data.heroku.com
2. Click on available db
3. Click on settings
4. Click on view credentials
5. Copy the URI and paste in env file in prisma in DATABASE_URL

===== Every time u want to update models =====

1. npx prisma db push
2. npx prisma studio

============ Run project ===============

1. generate gql types: npm run graphql:codegen
