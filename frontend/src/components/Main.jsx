import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile-info">
                    <img
                        className="profile-info__avatar"
                        src={currentUser.avatar}
                        alt="Ваш аватар."
                    />
                    <h1 className="profile-info__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        aria-label="кнопка открытия попапа с информацией о профиле"
                        className="profile-info__edit-button"
                        onClick={onEditProfile}
                    ></button>
                    <button
                        type="button"
                        aria-label="кнопка открытия аватара"
                        className="profile-info__edit-avatar-button"
                        onClick={onEditAvatar}
                    ></button>
                    <p className="profile-info__profession">{currentUser.about}</p>
                    <button
                        type="button"
                        aria-label="кнопка открытия попапа для добавления карточек"
                        className="profile-info__add-button"
                        onClick={onAddPlace}
                    ></button>
                </div>
            </section>
            <section className="elements-container">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
            </section>
        </main>
    );
}

export default Main;