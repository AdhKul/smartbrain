
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';

const particleOptions={
	 polygon: {
          enable: true,
          type: 'inside',
          move: {
          	radius: 10
		},
		url: 'path/to/svg.svg'
	}                     
}

function App() {
	return (
		<div className="App">
			<Particles params={ particleOptions}  />
			<Navigation />
			<Logo />
			<Rank/>
			<ImageLinkForm />
			{/*<FaceRecognition />*/}
		</div>
	);
}

export default App;
