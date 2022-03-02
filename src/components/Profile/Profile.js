import React from 'react';
import './Profile.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDeleteProfile:false
		}
	}

	deleteUser = () => {
		fetch("https://ronchon-saucisson-57926.herokuapp.com/delete",{
		      method:"post",
		      headers:{"Content-Type":"application/json"},
		      body: JSON.stringify({
				id:this.props.user.id,
				name:this.props.user.name,
				email:this.props.user.email
			})
		}).then(resp=>resp.json())
		.then(status=> {
			if(status==="Successfully Removed User"){
				this.props.onRouteChange("signout");
			}
		})
	}

	togglePopup = () => {
		this.setState({confirmDeleteProfile:(!this.state.confirmDeleteProfile)});
	}

	render() {
		const {name,email,entries} = this.props.user;
		const {rank,onRouteChange} = this.props;
		return (
			<div className="alignProfile">
				<div className="f3 w-50">
					{this.props.profileImageUrl===""
						?<div><img className="profileIcon" src={require('./update_page_icon.png').default} width="200px" heigt="auto" className="styleProfilePic"/><br /></div>
						:<div><img className="profileIcon" src={this.props.profileImageUrl} width="200px" height="200px" style={{borderRadius: "100%",objectFit:"cover"}} className="styleProfilePic"/><br /></div>}
					<p className="tl"><span className="underline">Name:</span><span className="white">  {name}</span></p>
					<p className="tl "><span  className="underline">Email ID:</span><span className="white">  {email}</span></p>
					<p className="tl "><span  className="underline">Number of Image Entries:</span><span className="white">  {entries}</span></p>
					<p className="tl "><span  className="underline">Rank:</span><span className="white"> {rank}</span></p>
					<p onClick={()=>onRouteChange("updateProfile")} className="tl white underline pointer">Update Profile</p>
					{/*<p className="tl">
						<Popup trigger={<span className="ma3 ml0 white underline pointer">Delte Profile</span>} position="bottom center">
							<p className="w-100">Are You Sure you want to save the Changes?</p>
							<button onClick={this.deleteUser} className="ma2">Yes</button>
							<button onClick={()=>this.props.onRouteChange("profile")} className="ma2">No</button>
					    </Popup>
					</p>*/}
					
					{/*<p onClick={this.deleteUser} className="tl white underline pointer">Delelte Profile</p>*/}
					
					{/*<img src="http://cdn.onlinewebfonts.com/svg/img_262951.png"  width="100px" heigt="auto"/ >*/}
					<p onClick={this.togglePopup} className="tl white underline pointer">Delete Profile</p>	
				</div>
				{this.state.confirmDeleteProfile===true
				?<div className="popup-box">
				    <div className="box">
					    <span className="close-icon" onClick={this.togglePopup}>x</span>
						<p className="tl">
							<p className="w-100">Are You Sure you want to delete you Profile?</p>
							<button onClick={this.deleteUser} className="ma2">Yes</button>
							<button onClick={this.togglePopup} className="ma2">No</button>
						</p>
				    </div>
				</div>:<span></span>}
				
			</div>
		);
	}
}

export default Profile;