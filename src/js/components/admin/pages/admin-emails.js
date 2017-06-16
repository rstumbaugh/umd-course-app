var React = require('react');

var Emails = React.createClass({
	getInitialState: function() {
		return {
			email: '',
			subject: '',
			body: ''
		}
	},

	updateParam: function(param, e) {
		var s = {};
		s[param] = e.target.value;
		this.setState(s);
	},

	getEmails: function(emails) {
		var rows = [];

		for (var key in emails) {
			rows.push(
				<tr key={key}>
					<td>{emails[key]}</td>
					<td>
						<button className='btn btn-danger' onClick={this.props.removeItem.bind(null, 'emails', key)}>
							<i className='glyphicon glyphicon-remove'></i>
						</button>
					</td>
				</tr>
			)
		}
		return rows;
	},

	sendEmail: function(e) {
		e.preventDefault(); // don't submit form
		var subject = this.state.subject;
		var body = this.state.body;

		this.setState({
			subject: '', 
			body: ''
		});
		
		this.props.sendEmail(subject, body);
	},

	addEmail: function(e) {
		e.preventDefault();
		var email = this.state.email;

		this.setState({
			email: ''
		});

		this.props.addEmail(email);
	},

	render: function() {
		return (
			<div>
				<div className='row'>
					<form>
						<h3>Send Email</h3>
						<div className='form-group col-sm-12'>
							<label>Subject</label>
							<input 
								type='text' 
								className='form-control' 
								value={this.state.subject}
								onChange={this.updateParam.bind(this, 'subject')}
							/>
						</div>
						<div className='form-group col-sm-12'>
							<label>Body</label>
							<textarea 
								rows='5' 
								cols='30' 
								className='form-control'
								value={this.state.body}
								onChange={this.updateParam.bind(this, 'body')} />
						</div>
						<div className='form-group col-sm-12'>
							<button className='btn btn-primary' onClick={this.sendEmail}>Send</button>
						</div>
					</form>
					<br/>
				</div>
				<div className='row'>
					<form>
						<h3>Add Email</h3>
						<div className='form-group col-sm-12'>
							<label>Email Address</label>
							<input
								type='text'
								className='form-control'
								value={this.state.email}
								onChange={this.updateParam.bind(this, 'email')}
							/>
						</div>
						<div className='form-group col-sm-12'>
							<button className='btn btn-primary' onClick={this.addEmail}>Add</button>
						</div>
					</form>
				</div>
				<div className='row'>
					<table className='table table-bordered'>
						<tbody>
							<tr>
								<th>{'Emails (' + Object.keys(this.props.emails).length + ' found)'}</th>
								<th></th>
							</tr>
							{this.getEmails(this.props.emails)}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
});


module.exports = Emails;