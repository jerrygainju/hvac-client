import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    useEffect(() => {
        const latitude = 27.6792;
        const longitude = 85.3464;
    
        const map = L.map('map').setView([latitude, longitude], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);
    
        L.marker([latitude, longitude]).addTo(map);
        
        return () => {
          map.remove();
        };
      }, []);

  return <div id="map" className='md:mx-auto mx-auto h-dvh md:my-10 my-10' style={{ height: '450px', width:'400px', borderRadius: '12px', border: '1px solid #ddd', }} />;
};

export default MapComponent;
