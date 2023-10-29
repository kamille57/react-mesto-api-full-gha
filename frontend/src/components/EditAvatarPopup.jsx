import React, { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef = useRef();

    useEffect(() => {
        if (currentUser) {
            avatarRef.current.value = currentUser.avatar || "";
        }
    }, [currentUser]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    };

    return (
        <PopupWithForm
            title="Редактировать аватар"
            name="avatar"
            button={isLoading? "Сохранение..." : "Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                className="popup__input"
                ref={avatarRef}
                placeholder="Ссылка на новый аватар"
                id="avatarLink"
                minLength="2"
                required
            />
            <span id="avatarLink-error" className="error error_invalid"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;