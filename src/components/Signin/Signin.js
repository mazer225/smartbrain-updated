import React from 'react';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail:"",
			signInPassword:"",
			incorrectDataEntry:""
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}	

	onSubmitChange = () => {
		fetch("https://ronchon-saucisson-57926.herokuapp.com/signin",{
			method:"post",
			headers:{"Content-Type":"application/json"},
			body: JSON.stringify({
				email:this.state.signInEmail,
				password: this.state.signInPassword
			})
		}).then(response=>response.json())
		.then(data=>{
			if(data.id){
				this.props.loadUserSignin(data);
				this.props.onRouteChange("home")
			}
			else if(data==="Wrong Crendentials") {
				this.setState({incorrectDataEntry:"Incorrect Email or PassWord"});
			}
		})
	}
	render() {
		const {onRouteChange} = this.props;
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 mw6 center shadow-5">
				<main className="pv4 black-80 w-70">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3 w-100">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="ba b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="ba b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
				      </div>
				    </fieldset>
				    <div className="b white flex justify-center">
				    	{this.state.incorrectDataEntry!==""
				    	?<div className="flex items-center">
				    		{this.state.incorrectDataEntry}
				    		<img src="https://static.thenounproject.com/png/207666-200.png" width="30px" className="ml1"/><br />
				    		<br />
				    		<br />
				    	</div>
				    		:<span></span>}
				    </div>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitChange}/>
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={()=>onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>
		);	
	}
} 

export default Signin;