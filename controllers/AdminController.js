require('dotenv').config();
const Parse = require('parse/node');
const twilio = require('twilio');
const generator = require('generate-password');

Parse.initialize(process.env.APP_ID, process.env.JAVASCRIPT_KEY, process.env.MASTER_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.User.enableUnsafeCurrentUser();

class AdminController {
	static async login(req, res) {
		const username = req.body.username;
		const password = req.body.password;

		const user = await Parse.User.logIn(username, password);

		if (user) {
			const userData = await Parse.User.currentAsync();
			console.log(userData);
			return res.send(userData);
		} else {
			return res.json({ status: 0, message: 'Username not found' });
		}
	}

	static async user(req, res) {
		const sessionToken = req.body.token;
		const user = await Parse.User.become(sessionToken);

		if (user) {
			return res.send(user);
		}
	}

	static joinChatbot(req, res) {
		const accountSid = 'AC87ea945f52eed1569056525d44db5e8a';
		const authToken = '059d19ded4d03cfa6c5c7c68cb7e4d7c';
		const client = twilio(accountSid, authToken);

		const password = generator.generate({
			length: 4,
			numbers: true
		});

		client.messages
			.create({
				from: 'whatsapp:+14155238886',
				body: `Verification code : ${password}`,
				to: 'whatsapp:+6288977502463'
			})
			.then((message) => res.send(message))
			.catch((err) => console.log(err));
	}
}

module.exports = AdminController;
