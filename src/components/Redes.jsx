import React from 'react';

const Redes = ({ logoA }) => {
  return (
    <div className="redes-container">
      <div className="cube-container">
        <div className="cube">
          <img src={logoA} alt="Logo" className="cube-image" />
        </div>
      </div>
      <h2 className="redes-title"> ¿Eres de los que aún creen en los solos de guitarra, las armonías épicas y las letras que cuentan historias?
Entonces Adalyd es tu nuevo grito de guerra.
Estamos construyendo algo grande, y tú puedes ser parte de ello desde el inicio.
🔥 Síguenos, comparte y déjanos tu comentario.</h2>
     
      <div className="redes-grid">
        <a href="https://www.instagram.com/adalydpowermetal/" target="_blank" rel="noopener noreferrer" className="redes-link">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png" alt="Instagram" className="redes-logo" />
        </a>
        <a href="https://open.spotify.com/intl-es/artist/6SDV7DNvQS3fLqmhEhjuL1" target="_blank" rel="noopener noreferrer" className="redes-link">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" alt="Spotify" className="redes-logo" />
        </a>
        <a href="https://www.tiktok.com/@adalyd.power.meta" target="_blank" rel="noopener noreferrer" className="redes-link">
          <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" className="redes-logo" />
        </a>
        <a href="https://www.youtube.com/@Adalydpowermetal" target="_blank" rel="noopener noreferrer" className="redes-link">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png" alt="YouTube" className="redes-logo" />
        </a>
      </div>
       <div className="cube-container">
        
      </div>
    </div>
  );
};

export default Redes;
