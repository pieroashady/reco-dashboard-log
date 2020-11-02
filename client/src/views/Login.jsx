import React, { Component } from 'react';
import axios from 'axios';
import { Form, Col, FormControl, FormGroup, ControlLabel, Checkbox, Button } from 'react-bootstrap';
import { login } from 'utils';
import { useHistory } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hello: '',
			username: '',
			password: ''
		};

		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
		this.getHelloWorld();
	}

	handleLogin(e) {
		e.preventDefault();
		const url = 'http://localhost:5000/api/login';
		const creds = {
			username: this.state.username,
			password: this.state.password
		};
		console.log(creds);
		return axios
			.post(url, creds)
			.then((x) => {
				login();
				console.log(x.data);
				localStorage.setItem('sessionToken', x.data.sessionToken);
				this.props.history.push('/admin/table');
				// return useHistory().push('/admin/table');
			})
			.catch((err) => {
				console.log(err);
				return;
			});
	}

	getHelloWorld() {
		const url = 'http://localhost:5000/hello';
		axios.get(url).then(({ data }) => {
			this.setState({ hello: data });
		});
	}
	render() {
		const { hello } = this.state;

		return (
			<div className="containerz">
				<p style={{ textAlign: 'center', fontWeight: 'bolder' }}>Login first</p>
				<Form horizontal onSubmit={this.handleLogin}>
					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl
								type="text"
								placeholder="Username"
								onChange={(e) => {
									this.setState({ username: e.target.value });
									console.log(e.target.value);
								}}
							/>
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl
								type="password"
								placeholder="Password"
								onChange={(e) => {
									this.setState({ password: e.target.value });
								}}
							/>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Checkbox>Remember me</Checkbox>
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<input className="btn btn-primary" type="submit" value="Login" />
						</Col>
					</FormGroup>
				</Form>
			</div>
		);
	}
}

export default Login;
