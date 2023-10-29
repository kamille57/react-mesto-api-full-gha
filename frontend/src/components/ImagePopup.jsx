import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup ${props.card && props.card.link ? 'popup_opened' : ''}`} id="popupCard">
      <div className="popup__container">
        <button type="button" aria-label="кнопка закрытия попапа с развернутым изображением" className="popup__closed"
          id="cardClose" onClick={props.onClose}></button>
        {props.card && props.card.link && (
          <figure className="popup__figure">
            <img className="popup__pic" src={props.card.link} alt={props.card.name} />
            <figcaption className="popup__text">{props.card.name}</figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;