import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser, isOpen]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "about") {
      setDescription(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({ name, about: description });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfile"
      button={isLoading? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        name="name"
        placeholder="Введите свое имя"
        id="name"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleInputChange}
      />
      <span id="name-error" className="error error_invalid"></span>
      <input
        type="text"
        className="popup__input"
        name="about"
        placeholder="О себе"
        id="about"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleInputChange}
      />
      <span id="about-error" className="error error_invalid"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;