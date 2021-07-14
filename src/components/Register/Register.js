import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerName:'',
			registerMail:'',
			registerPassword:'',
			displayErrorMessage:''
		}
	}
	
	onRegisterName = (event) =>{
		this.setState({registerName:event.target.value});
	}

	onRegisterEmail = (event) =>{
		this.setState({registerMail:event.target.value});
	}

	onRegisterPassword = (event) =>{
		this.setState({registerPassword:event.target.value});
	}

	onRegisterChange = () => {
		fetch("https://ronchon-saucisson-57926.herokuapp.com/register",{
			method:"post",
			headers:{"Content-Type":"application/json"},
			body: JSON.stringify({
				name:this.state.registerName,
				email:this.state.registerMail,
				password: this.state.registerPassword
			})
		}).then(response=>response.json())
		.then(user=>{
			if(user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange("home");
			}
			else {
				this.setState({displayErrorMessage:user});
			}
		})
	}

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 mw6 center shadow-5">
				<main className="pv4 black-80 w-70">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input className="ba b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onRegisterName}/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="ba b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onRegisterEmail}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="ba b--black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onRegisterPassword}/>
				      </div>
				    </fieldset>
				    <div className="b white flex justify-center">
				    	{this.state.displayErrorMessage!==""
				    	?<div className="flex items-center">
				    		{this.state.displayErrorMessage}
				    		<br />
				    		<br />
				    	</div>
				    		:<span></span>}
				    </div>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onRegisterChange}/>
				    </div>
				  </div>
				</main>
			</article>
		);	
	}
}

export default Register;