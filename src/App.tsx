import React from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Video from './components/Video/Video';
import Voice from './components/Voice/Voice';


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Video />
        <Voice />
      </main>
      <Footer />
    </div>
  );
}

export default App;
