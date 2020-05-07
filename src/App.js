import React, {
	Component
} from 'react';
import SingIn from './components/singin/signin';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import Rank from './components/rank/rank';
import FaceRecognition from './components/facerecognation/facerecognation'
import './App.css';
import Particles from 'react-particles-js';
// import clarifai API
import Clarifai from 'clarifai';
import Register from './components/register/register';


const app = new Clarifai.App({
	apiKey: 'def3b770747d4085918134df8a94624a'
});
const particlesOption = {
	particles: {
		number: {
			value: 80,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignnedIn : false
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onButtonSubmit = this.onButtonSubmit.bind(this);
	}

	// Set connection between Front-end and Back End -> testing purpose
	// componentDidMount(){
	// 	fetch("http://localhost:3000").then(response => response.json()).then(data=>console.log(data))
	// }

	// set input
	onInputChange(event) {
		this.setState({
			input: event.target.value
		});
		console.log("on input change: ", event.target.value)
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width ,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)

		}
	}

	displayFaceBox = (data) => {
		console.log(data)
		this.setState({box: data})
	}

	onButtonSubmit = () => {
		// set state for input
		this.setState({
			imageUrl: this.state.input
		});
		console.log('button dectect clicked');
		app.models.predict(Clarifai.FACE_DETECT_MODEL,
			this.state.input
		).then((response) => {
				// grap face box
				this.displayFaceBox(this.calculateFaceLocation(response)) 
				

			}
		).catch(err=>console.log(err));
	};

	onRouteChange = (route) => {
		if( route ==='signout'){
			this.setState({isSignnedIn: false})
		}else if (route === 'home'){
			this.setState({isSignnedIn	:true})
		}
		this.setState({route: route})
	}

	render() {
		const {isSignnedIn, imageUrl, route, box} = this.state;
		return ( <div className = "App" >
			<Particles className = "particles"
			params = {
				particlesOption
			}
			/> <Navigation onRouteChange={this.onRouteChange} isSignnedIn={isSignnedIn} />
			
			{/* Condition check route */}
			{route === 'home' 
			?
			 <div>
				<Logo />
			<Rank />
			<ImageLinkForm onInputChange = {
				this.onInputChange
			}
			onButtonSubmit = {
				this.onButtonSubmit
			}
			/>

			<FaceRecognition 
			box = {box}
			imageUrl = {
				imageUrl
			}
			/>
			</div>
			:(route==='signin'
			?<SingIn onRouteChange={this.onRouteChange}/>
			:<Register onRouteChange={this.onRouteChange}/>
			)
			}	
				
			 </div>
		);
	}
}

export default App;