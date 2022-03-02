import React from 'react';
import './Update.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from 'axios';
import {Image} from 'cloudinary-react';

class Update extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			updateName:"",
			updateEmail:"",
			selectedFile:"",
			showImageUploader:false,
			confirmSaveChanges:false
		}
	}

	onChangeName = (event) => {
		this.setState({updateName:event.target.value});
	}

	onChangeEmail = (event) => {
		this.setState({updateEmail:event.target.value});
	}

	submitChanges = () => {
		fetch("https://ronchon-saucisson-57926.herokuapp.com/update",{
	      method:"post",
	      headers:{"Content-Type":"application/json"},
	      body: JSON.stringify({
	        id:this.props.user.id,
	        name:this.state.updateName,
	        email:this.state.updateEmail,
	        oldEmail:this.props.user.email
	    	})
	      }).then(resp=>resp.json())
	      .then(user=>{
	      	if(user.id) {
	      		this.props.loadUser(user);
	      		this.props.onRouteChange("profile");
	      	}
	      })
	}

	onFileChange = (event) => {
		// console.log("inside function",event.target.files[0]);
      	this.setState({ selectedFile: event.target.files[0]});
    };

    onFileUpload = () => {
    	const formData = new FormData();
    	console.log("inside fileupload",this.state.selectedFile);
		formData.append("file", this.state.selectedFile);
		formData.append("upload_preset","ux44agcf");

		Axios.post("https://api.cloudinary.com/v1_1/dl8jaiwkt/image/upload",formData)
		.then(resp=>{
			console.log(resp);
			fetch("https://ronchon-saucisson-57926.herokuapp.com/profileimage",{
				method:"post",	
			    headers:{"Content-Type":"application/json"},
			    body: JSON.stringify({
					email:this.props.user.email,
					imageUrl:resp.data.secure_url
				})
			}).then(response=>response.json())
			.then(data=>{
				this.props.setProfileImage(data);
			})
		});
		this.togglePopup("uploadProfileImage");
    }

    togglePopup = (target) => {
    	if(target==="uploadProfileImage") {
    		this.setState({showImageUploader:(!this.state.showImageUploader)});	
    	}
    	else if(target==="saveProfileChanges") {
    		this.setState({confirmSaveChanges:(!this.state.confirmSaveChanges)});
    	}
    }

	componentDidMount() {
		this.setState({updateName:this.props.user.name});
		this.setState({updateEmail:this.props.user.email});
	}

	render() {
		const {name,email} = this.props.user;
		console.log("popup t/f",this.state.showImageUploader);
		return (
			<div className="alignProfile">
				<div className="f3 w-50">
					<div className="parent">
						{this.props.profileImageUrl===""
						?<div><img className="profileIcon" src={require('./update_page_icon.png').default} width="200px" heigt="auto" className="styleProfilePic"/><br /></div>
						:<div><img className="profileIcon" src={this.props.profileImageUrl} width="200px" height="200px" style={{borderRadius: "100%",objectFit:"cover"}} className="styleProfilePic"/><br /></div>}
						<p className="pointer" onClick={()=>this.togglePopup("uploadProfileImage")}><img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/camera-1564671-1325543.png" width="60px" height="auto" style={{borderRadius:"100%"}} className="updateProfileIcon"/></p>
					</div>
					<p className="tl flex items-center">
						<span class="underline">Name:</span>
						<input className="ma2 white styleInputBox hideOverflow" value={this.state.updateName} onChange={this.onChangeName}/>
						<img src="https://cdn2.iconfinder.com/data/icons/web-mobile/24/edit-512.png" width="50px" height="auto" className="hideOverflow"/>
					</p>
					<p className="tl flex items-center">
						<span class="underline">Email:</span>
						<input className="ma2 white styleInputBox hideOverflow" value={this.state.updateEmail} onChange={this.onChangeEmail}/>
						<img src="https://cdn2.iconfinder.com/data/icons/web-mobile/24/edit-512.png" width="50px" height="auto" className="hideOverflow"/>
					</p>
					<p onClick={()=>this.togglePopup("saveProfileChanges")} className="tl white underline pointer">Save Changes</p>	
					{/*<p className="tl">
						<Popup trigger={<span className="ma3 ml0 white underline pointer">Save Changes</span>} position="bottom center">
							<p className="w-100">Are You Sure you want to save the Changes?</p>
							<button onClick={this.submitChanges} className="ma2">Yes</button>
							<button onClick={()=>this.props.onRouteChange("updateProfile")} className="ma2">No</button>
				    	</Popup>
					</p>		*/}
					<p onClick={()=>this.props.onRouteChange("profile")} className="tl"><span className="white underline pointer">⏎ Go Back</span></p>		
				</div>
				{this.state.confirmSaveChanges===true
				?<div className="popup-box">
			      <div className="box">
			        <span className="close-icon" onClick={()=>this.togglePopup("saveProfileChanges")}>x</span>
				        <p className="tl">
							<p className="w-100">Are You Sure you want to save the Changes?</p>
							<button onClick={this.submitChanges} className="ma2">Yes</button>
							<button onClick={()=>this.togglePopup("saveProfileChanges")} className="ma2">No</button>
						</p>	
			      </div>
			    </div>:<span></span>}
				
				{this.state.showImageUploader===true
				?<div className="popup-box">
			      <div className="box">
			        <span className="close-icon" onClick={()=>this.togglePopup("uploadProfileImage")}>x</span>
				        <div>
				        	<h3>Profile photo requirements</h3>
				        	<ul className="tl">
				        		<li>Select Image Files Only Ex:JPEG, PNG,...</li>
								<li>The maximum file size is 5 MB</li>
				        	</ul>
				        	<p>Are you sure you want to change the Profile Icon? If so, select an Image File and click on Upload</p>
			                <input type="file" name="file" accept="image/*" onChange={this.onFileChange} />
			                <button onClick={this.onFileUpload}>
			                  Upload!
		                	</button>
		            	</div>
			      </div>
			    </div>:<span></span>}
				
				
			</div>
		);
	}
}

export default Update;