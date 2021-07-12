import './App.css';
import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';

const app = new Clarifai.App({
 apiKey: 'ea29a72138a5426b8da1488a8fee73ba'
});

const initialState = {
	input: ' ',
	imageUrl: ' ', 
	box:{},
	route: 'signin',
	isSignedIn: false,
	user: {
		email: ' ' ,
		name: ' ',
		id: ' ',
		entries: 0 ,
		joined: ' '
	}
}
class App extends Component{	
	constructor() {
		super()
		this.state= {
			input: ' ',
			imageUrl: ' ', 
			box:{},
			route: 'signin',
			isSignedIn: false,
			user: {
				email: ' ' ,
				name: ' ',
				id: ' ',
				entries: 0 ,
				joined: ' '
			}
		}
	}

	


	calculateFaceLocation= (data)=> {
		const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;	
		const image= document.getElementById('inputimage');
		const width= Number(image.width);
		const height= Number(image.height);
		return{
			leftCol: clarifaiFace.left_col*width,
			rightCol: width - (clarifaiFace.right_col * width),
			topRow: clarifaiFace.top_row * height,
			bottomRow:  height - (clarifaiFace.bottom_row *height)
		}
	}

	displayFaceBox = (box) => {
		this.setState({box: box});
	}

	onInputChange= (event) => {
		this.setState({input: event.target.value})
	}

	onButtonSubmit= () => {
		this.setState({imageUrl: this.state.input})
		app.models
     		.predict(
     			Clarifai.FACE_DETECT_MODEL,
     			        this.state.input)
     			      .then(response => {
     			        console.log('hi', response)
     			        if (response) {
     			          fetch('http://localhost:3000/image', {
     			            method: 'put',
     			            headers: {'Content-Type': 'application/json'},
     			            body: JSON.stringify({
     			              id: this.state.user.id
     			            })
     			          })
     			            .then(response => response.json())
     			            .then(count => {
     			              this.setState(Object.assign(this.state.user, { entries: count}))
     			            })

     			        }
     			        this.displayFaceBox(this.calculateFaceLocation(response))
     			      })
     			      .catch(err => console.log(err));
     			  }

	onRouteChange=(route) => {
		if(route === 'signout'){
			this.setState(initialState)
		} else if (route === 'home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

	loadUser = (data) =>{
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entrie: data.entries,
			joined: data.joined,
		}})
	}

	render(){
		return (
			<div className="App">
				<Navigation onRouteChange= {this.onRouteChange} isSignedIn= {this.state.isSignedIn}/>
				{ this.state.route === 'home' 
					? <div>
							<Logo/>
							<Rank name={this.state.user.name} entries={this.state.user.entries}/>
							<ImageLinkForm 
								onInputChange= {this.onInputChange} 
								onButtonSubmit= {this.onButtonSubmit}/>
							<FaceRecognition box= {this.state.box} imageUrl={this.state.imageUrl} />
						</div>
					: (
						this.state.route=== 'signin' 
							?<SignIn loadUser= {this.loadUser} onRouteChange= {this.onRouteChange}/>
							: <Register loadUser= {this.loadUser} onRouteChange= {this.onRouteChange}/>
					)
				}
			</div>
		);
	}	
}

export default App;
