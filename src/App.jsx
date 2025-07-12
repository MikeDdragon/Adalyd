import React from 'react';
import './styles.css';
import './components/Integrantes.css';
import './components/Redes.css';
import MenuButton from './components/MenuButton';
import LogoHome from './components/LogoHome';
import Background from './components/Background';
import Integrante from './components/Integrante';
import Content from './components/Content';
import Redes from './components/Redes';
import Tienda from './components/Tienda';
import Eventos from './components/Eventos';
import CursorEffect from './components/CursorEffect';
import danImage from './images/danShort.png';
import mikeImage from './images/mikeShort.png';
import baldoImage from './images/BaldoShort.png';
import edgarImage from './images/edgarShort.png';
import logoImage from './images/adalyd.png';
import logoA from './images/Aloogo.png';

const App = () => {
  const menuItems = [
    { text: 'Integrantes', href: '#integrantes' },
    { text: 'Contenido', href: '#contenido' },
    { text: 'Redes', href: '#redes' },
    { text: 'Tienda', href: '#tienda' },
    { text: 'Eventos', href: '#eventos' },
    { text: 'Contacto', href: '#contacto'}
  ];

  const [activeMenu, setActiveMenu] = React.useState(null);

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    if (activeMenu === href) {
      setActiveMenu(null); // Close the current menu
      window.location.hash = '';
    } else {
      setActiveMenu(href);
      window.location.hash = href;
    }
    console.log('Menu clicked:', href, 'activeMenu:', activeMenu);
  };

  React.useEffect(() => {
    // Redirect to #home if URL is empty
    if (window.location.hash === '') {
      window.location.hash = '#home';
    }

    const handleScroll = () => {
      setActiveMenu(window.location.hash);
    };
    window.addEventListener('hashchange', handleScroll);
    return () => window.removeEventListener('hashchange', handleScroll);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <LogoHome 
          image={logoImage} 
          isActive={window.location.hash === '#home' || window.location.hash === '#contacto'}
          onClose={() => setActiveMenu(null)}
          setActiveMenu={setActiveMenu}
        />
        <nav className="nav">
          {menuItems.map((item, index) => (
            <MenuButton 
              key={index} 
              text={item.text} 
              href={item.href}
              onClick={(e) => handleMenuClick(e, item.href)}
            />
          ))}
        </nav>  
      </header>

    
      <div className="content-wrapper">
        {activeMenu === '#integrantes' ? (
          <div className="integrantes-container">
            <div className="integrantes-grid">
              <Integrante 
                name="Daniel Tamayo" 
                role="Guitarrista de varios grupos de la ciudad de Hermosillo Sonora, integrante de agrupaciones versatiles. Sus inspiraciones mas fuertes son Stratovarius, Sonata Arctica, Childer of bodom." 
                image={danImage} 
                alt="Daniel Tamayo"
              />
                <Integrante 
                  name="Miguel García" 
                  role="Baterista de diferentes grupos de trash metal, melodic metal y power metal, inspiraciones principales son Kamelot, Sonata Arctica, Avantasia, Beast in Black, etc." 
                  image={mikeImage} 
                  alt="Miguel García"
                />
                <Integrante 
                  name="Baldo" 
                  role="Bajista, guitarrista y compositor del grupo Anima Ignis, inspiraciones principales son Avantasia, Kamelot, Childer of bodom, WarCry." 
                  image={baldoImage} 
                  alt="Baldo"
                />
                <Integrante 
                  name="Edgar López" 
                  role="Cantante, parte de diferentes grupos con inspiracion en Angra, Mago de Oz, WarCry, Sonata Arctica" 
                  image={edgarImage} 
                  alt="Edgar López"
                />
              </div>
            </div>
          ) : (
            <div className="integrantes-container fade-out">
              <div className="integrantes-grid">
                <Integrante 
                  name="Daniel Tamayo" 
                  role="Guitarrista de varios grupos de la ciudad de Hermosillo Sonora, integrante de agrupaciones versatiles. Sus inspiraciones mas fuertes son Stratovarius, Sonata Arctica, Childer of bodom." 
                  image={danImage} 
                  alt="Daniel Tamayo"
                />
                <Integrante 
                  name="Miguel García" 
                  role="Baterista de diferentes grupos de trash metal, melodic metal y power metal, inspiraciones principales son Kamelot, Sonata Arctica, Avantasia, Beast in Black, etc." 
                  image={mikeImage} 
                  alt="Miguel García"
                />
                <Integrante 
                  name="Baldo" 
                  role="Bajista, guitarrista y compositor del grupo Anima Ignis, inspiraciones principales son Avantasia, Kamelot, Childer of bodom, WarCry." 
                  image={baldoImage} 
                  alt="Baldo"
                />
                <Integrante 
                  name="Edgar López" 
                  role="Cantante, parte de diferentes grupos con inspiracion en Angra, Mago de Oz, WarCry, Sonata Arctica" 
                  image={edgarImage} 
                  alt="Edgar López"
                />
              </div>
            </div>
          )}  

<div className="background-container">
        <Background isActive={window.location.hash === '#home' || window.location.hash === '#contacto'} />
      </div>


        <div className={`content-container ${activeMenu === '#contenido' ? 'active' : ''}`}>
          {activeMenu === '#contenido' && <Content />}
        </div>
        <div className={`redes-wrapper ${activeMenu === '#redes' ? 'active' : ''}`}>
          <div className="redes-container">
            <Redes logoA={logoA} />
          </div>
        </div>
        <div className={`tienda-wrapper ${activeMenu === '#tienda' ? 'active' : ''}`}>
          <div className="tienda-container">
            <Tienda />
          </div>
        </div>

        <div className={`contacto ${activeMenu === '#contacto' ? 'active' : ''}`}>
          <div className="contacto-content">
            <h1>Contacto</h1>
            <p>@Adalydpowermetal@gmail.com</p>
            <p>Teléfono: +52 123 456 7890</p>
          </div>
        </div>
        <div className={`eventos ${activeMenu === '#eventos' ? 'active' : ''}`}>
          <Eventos 
            titleEvent="La nueva sangre del rock sonorense" 
            locationEvent="La Gloriosa, Hermosillo Sonora" 
            dateEvent="1 de Marzo, 2025" 
            url="https://www.facebook.com/photo/?fbid=1220717616628969&set=a.527301735970564"
          />
          <Eventos 
            titleEvent="FORO ROCK FEST 6" 
            locationEvent="CLUB Obregon, Hermosillo Sonora" 
            dateEvent="19 de Marzo, 2025" 
            url="https://www.facebook.com/photo/?fbid=10226396161361587&set=a.1055777725906"
          />
          <Eventos 
            titleEvent="SESIONES LA BOHEMIA" 
            locationEvent="Comonfort #4 col. centenario, Hermosillo Sonora" 
            dateEvent="15 de Julio, 2025" 
            url="https://www.facebook.com/photo/?fbid=1145040257069568&set=a.544835173756749"
          />
        </div>

        
      <CursorEffect />
      </div>
    </div>
  );
};

export default App;
