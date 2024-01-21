import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react"
import Home from './Home';
import Contact from './Contact';
import About from './About';
import { Route, Link, Routes, useNavigate } from "react-router-dom"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"

function App() {
  const commands = [
    {
      command: ["go to *"],
      callback: (navigateToPage)=>handleNavigation(navigateToPage),
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const navigate = useNavigate();
  const pages = ["home", "about", "contact"];
  const urls = {
    home: "/",
    about: "/about",
    contact: "/contact",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
  }

  const handleNavigation = (requestedPage) => {
   console.log("requestedPage",requestedPage)
    // Perform any necessary transformations or validations here
    const formattedPage = requestedPage.toLowerCase();

    if (pages.includes(formattedPage)) {
      console.log("formattedPage >>",formattedPage)
      navigate(urls[formattedPage]);
    } else {
      console.error(`Could not find page: ${formattedPage}`);
    }
  };
  const listenContinously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    })};

  return (
    <div className="App">
      <div id="links">
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
        <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
        <Navbar.Brand><Link to="/about">About</Link></Navbar.Brand>
        <Navbar.Brand><Link to="/contact">Contact</Link></Navbar.Brand>
      </Container>
      </Navbar>
      </div>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <p id="transcript">Transcript: {transcript}</p>
      
      <button onClick={listenContinously}>
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
    </div>
  );
}

export default App