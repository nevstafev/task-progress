import app from './src/app.js';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('App listen on port: ', port);
});
