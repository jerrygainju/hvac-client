import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    useEffect(() => {
        const latitude = 27.679164;
        const longitude = 85.346262;
    
        const map = L.map('map').setView([latitude, longitude], 13);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);
    
        L.marker([latitude, longitude]).addTo(map);
        
        return () => {
          map.remove();
        };
      }, []);
  return <div id="map" className='object-center md:mx-auto mx-auto lg:mx-auto md:my-10 my-10 lg:my-0 z-0' style={{ minHeight: '350px',maxHeight:"450px",maxWidth:"300px", minWidth:'250px', borderRadius: '12px', border: '1px solid #ddd' }} />;
};

export default MapComponent;
