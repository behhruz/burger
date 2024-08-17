const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Handle POST requests and ensure ID generation works
server.post('/users', (req, res) => {
  const users = router.db.get('users').value();
  const newUser = req.body;
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1; // Simple ID generation
  router.db.get('users').push(newUser).write();
  res.status(201).json(newUser);
});

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running');
});
