import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css'



const kaupat = [
  { id: 'kauppa1', nimi: 'S-Market Megakeskus Seinäjoki', sijainti: [62.7922, 22.8407], aika: 'Aukioloajat<br>Ma: 7-23<br>Ti: 7-23<br>Ke: 7-23<br>To: 7-23<br>Pe: 7-23<br>La: 7-23<br>Su: 9-23' },
  { id: 'kauppa2', nimi: 'K-Citymarket Kauhajoki', sijainti: [62.4340, 22.1793], aika: 'Aukioloajat<br> Ma: 8-21<br>Ti: 8-21<br>Ke: 8-21<br>To: 8-21<br>Pe: 8-21<br>La: 8-21<br>Su: 10-21' },
];

function KaupanValinta({ kaupat, setValittuKauppa, map }) {
  const handleKaupanValinta = (event) => {
    const kauppaId = event.target.value;
    const kauppa = kaupat.find(k => k.id === kauppaId);
    
    if (kauppa && map) {
      map.flyTo(kauppa.sijainti, 16, {
        
      });


      map.once('zoomend', () => {

        const marker = L.marker(kauppa.sijainti);

      
        marker.addTo(map).bindPopup(`<b>${kauppa.aika}</b>`).openPopup();
      });

      setValittuKauppa(kauppa);
    }
  };

  return (
    <select onChange={handleKaupanValinta} className="select-container">
      <option value="">Valitse kauppa</option>
      {kaupat.map((kauppa) => (
        <option key={kauppa.id} value={kauppa.id}>{kauppa.nimi}</option>
      ))}
    </select>
  );
}

function App() {
  const [map, setMap] = useState(null);
  const [valittuKauppa, setValittuKauppa] = useState(null);


  useEffect(() => {
    if (!map && window.L) { 
      const initializeMap = () => {
        const mapInstance = L.map('map', {
          center: [60.192059, 24.945831],
          zoom: 13,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapInstance);

        setMap(mapInstance);
      };

      initializeMap();
    }
  }, [map]); 

  return (
    <div>
      <KaupanValinta kaupat={kaupat} setValittuKauppa={setValittuKauppa} map={map} />
      <div id="map" style={{ height: '100vh', width: 'calc(100% - 250px)' }}></div>
    </div>
  );
}

export default App;
