import Game			from 	'./Components/Game/Game';
import Header		from 	'./Components/Header/Header';
import Footer		from 	'./Components/Footer/Footer';
import Container	from 	'react-bootstrap/Container';
import						'./index.scss';


// fix hints not updating bomb found number

function App() {
	return (
		// <div id='fullContainer'>
		// {/* // Set container to always display the whole height */}
		// <Container id='pageContainer'>
		<>
			<Header />
			<Game />
			<Footer />
		</>
		// </Container>
		// </div>
	);
}

export default App;