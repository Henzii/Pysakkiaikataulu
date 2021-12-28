import React, { useState } from 'react';
import KyselyLoota from './components/KyselyLoota';
import Pysakkiaikataulu from './components/Pysakkiaikataulu';

function App() {
  const [stopName, setStopName] = useState('V6121');
  
  // Tila onko vaihda pysäkki -ikkuna auki
  const [modalOpen, setModalOpen] = useState(false);

  const handleStopChange = (stopName: string) => {
    setStopName(stopName);
    setModalOpen(false);
  }
  return (
    <div className="app">
      <KyselyLoota 
        open={modalOpen}
        title="Pysäkin nimi"
        text="Anna pysäkin nimi tai koodi (esim. V6121 tai Grandinkulma)"
        placeHolder='Hakusana'
        onClose={() => setModalOpen(false) }
        onSubmit={handleStopChange}
      />
      <Pysakkiaikataulu stopName={stopName} />
      <div className="setupNappi" onClick={() => setModalOpen(true)}><span>⚙️</span></div>
    </div>
  );
}

export default App;
