import React from 'react';
import './Eventos.css';

const Eventos = ({ titleEvent, locationEvent, dateEvent, url }) => {
  const events = [
    {
      title: titleEvent,
      location: locationEvent,
      date: dateEvent
    }
  ];

  return (
    <div className="eventos-container">
      <div className="events-grid">
        {events.map((event) => (
          <a href={url} target="_blank" rel="noopener noreferrer" key={event.title} className="event-card">
            <h2 className="event-title">{event.title}</h2>
            <p className="event-location">{event.location}</p>
            <p className="event-date">{event.date}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
