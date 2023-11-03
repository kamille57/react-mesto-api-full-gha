import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;


  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <img className="element__pic" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__caption">
        <h3 className="element__text">{card.name}</h3>
        <div className="element__like-counter">
          <button type="button" className={cardLikeButtonClassName} aria-label="Лайк" onClick={handleLikeClick}></button>
          <div className="element__counter">{card.likes.length}</div>
        </div>
      </div>
      {isOwn && <button className="element__trash" aria-label="Корзина" onClick={handleDeleteClick}></button>}
    </article>
  );
}

export default Card;