import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Update from './components/Update/Update';
import Particles from 'react-particles-js';


const particlesOption = {
                particles: {
                  number:{
                    value:80,
                  density: {
                    enable: true,
                    value_area: 800
                  }
              }
            }
          }

const initialState = {
      input:"",
      imageUrl:"",
      box:[],
      route:"signin",
      user:{
        id:"",
        name:"",
        email:"",
        password:"",
        entries:0,
        joined:""
      },
      rank:"",
      profileImageUrl:""
    };
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
    }})
  }

  loadUserSignin = (data) => {
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
    }}) 
    console.log(data.url);
    this.setState({profileImageUrl:data.url});
  }

  calculateFaceLocation = (resp) => {
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    const cF = resp.outputs[0].data.regions.map(item=> {
      let objTemp = {
        leftCol: item.region_info.bounding_box.left_col * width,
        topRow : item.region_info.bounding_box.top_row * height,
        rightCol: width - (item.region_info.bounding_box.right_col * width),
        bottomRow: height - (item.region_info.bounding_box.bottom_row * height)
      };
      return objTemp;
    })
    return cF;
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
    fetch("https://ronchon-saucisson-57926.herokuapp.com/imageurl",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
      input:this.state.input
      })
    })
    .then(response=>response.json())
    .then(response => {
      if(response) {
        fetch("https://ronchon-saucisson-57926.herokuapp.com/image",{
          method:"put",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            id:this.state.user.id
          })
        }).then(response=>response.json())
        .then(counts=>{
          this.setState(Object.assign(this.state.user,{entries:counts}));
        })
        .catch(console.log)
      }
      this.setState({box:this.calculateFaceLocation(response)})
    })
    .catch(err=>console.log(err));
  }

  setProfileImage = (imageUrl) => {
    this.setState({profileImageUrl:imageUrl});
  }

  onRequestProfile = () => {
    fetch("https://ronchon-saucisson-57926.herokuapp.com/rank",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        name:this.state.user.name
      })
    }).then(response=>response.json())
    .then(rank=>{
      this.setState({rank:rank.count});
    })
    console.log(this.state.rank);
    this.onRouteChange("profile");
  }

  onRouteChange = (redirectingPage) => {
    if(redirectingPage==='signout') {
      this.setState(initialState);
      this.setState({route:'signin'});  
    }
    else {
      this.setState({route:redirectingPage});
    }
  }

  render() {
    return (
      <div className="App">
        <Particles className="particlesCss" params={particlesOption}/>
        <Navigation className="NavCss" onRequestProfile={this.onRequestProfile} route={this.state.route} onRouteChange={this.onRouteChange}/>
        {this.state.route==="home"
        ?<div>
          <Logo />
          <Rank userName={this.state.user.name} userEntries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        :(this.state.route==="signin"
          ?<Signin loadUserSignin={this.loadUserSignin} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :(this.state.route==="profile"
            ?<Profile profileImageUrl={this.state.profileImageUrl} user={this.state.user} rank={this.state.rank} onRouteChange={this.onRouteChange}/>              
            :(this.state.route==="updateProfile"
              ?<Update profileImageUrl={this.state.profileImageUrl} setProfileImage={this.setProfileImage} loadUser={this.loadUser} user={this.state.user} onRouteChange={this.onRouteChange}/>
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)))}
      </div>
    );  
  }
  
}

export default App;
