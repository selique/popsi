
# 🧰 Supabase triggers

## 📋 Init Supabase Database with Prisma

### 🖇️ 1. Supabase troubleshooting .env file on root of project with supabase keys and url API

Example .env:

```SUPBASE_URL=https://supabase.io/api/v1/supabase/<your-project-id>```<br />```SUPBASE_KEY=<your-supabase-key>```

### 📎 2. Set url database in .env file prisma folder

Example .env:

```DATABASE_URL=<your-database-name>```

### 💠 3. Init prisma tables on supabase with command

to develop:

```prisma migrate dev --skip-generate```

to production:

```prisma migrate deploy --skip-generate```

### 🏃 4. Run all triggers on terminal SQL Supabase on this sequence

	copy-users-functions.sql
	copy-users-triggers.sql
 	alter-postgres-rsl-superuser.sql

### 👍 5. check if all functions, triggers, and row level service are working Supabase

## 🤘 6. Good luck

***Remenber: Run prisma migrate dev every time you change your database schema on Supabase***
