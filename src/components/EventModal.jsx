import React from 'react';
import './EventModal.css';

function EventModal({ event, onChoice }) {
  // イベントが存在しない場合は何も表示しない
  if (!event) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{event.title}</h2>
        <p className="event-description">{event.description}</p>
        <div className="modal-choices">
          {event.choices.map((choice) => (
            <div key={choice.id} className="choice-item">
              <button onClick={() => onChoice(choice)}>{choice.text}</button>
              <p className="choice-description">{choice.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
