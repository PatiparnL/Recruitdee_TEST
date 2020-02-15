# EasyNotes Application

Build a Restful CRUD API for a simple Note-Taking application using Node.js, Express and MongoDB.

## Steps to Setup

1. Install dependencies

```bash
npm install
```

2. Run Test

```bash
npm run nyc
```

3. Run Server with pm2

```bash
pm2 start app.json --env=development
pm2 start app.json --env=iot
pm2 start app.json --env=production
```

4. Run local

npm run dev
npm run iot
npm run prod