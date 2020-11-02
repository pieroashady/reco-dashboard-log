const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;
const app = express();

const AdminController = require('./controllers/AdminController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/hello', (req, res) => {
	res.send('hello world');
});

app.post('/api/login', AdminController.login);
app.post('/api/user', AdminController.user);
app.post('/api/join', AdminController.joinChatbot);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port);

console.log('App is listening on your server with port ' + port);
