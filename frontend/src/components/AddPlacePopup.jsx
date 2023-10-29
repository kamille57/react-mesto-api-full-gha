import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
// import {useForm} from "./../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [place, setPlace] = useState("");
    // const [formValues, setFormValues] = useForm();
    
    const [link, setLink] = useState("");
    // const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
            setPlace(value);
        } else if (name === "link") {
            setLink(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // setIsLoading(true);

        const newCard = {
            name: place,
            link: link,
        };

        onAddPlace(newCard);
    };

    useEffect(() => {
        if (isOpen) {
            setPlace("");
            setLink("");
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            title="Новое место"
            name="addPlace"
            button={isLoading ? "Создание..." : "Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isFormLoading={isLoading}
        >
            <input
                type="text"
                className="popup__input"
                name="name"
                placeholder="Название"
                id="placeName"
                minLength="2"
                maxLength="30"
                required
                value={place}
                onChange={handleInputChange}
            />
            <span id="placeName-error" className="error error_invalid"></span>
            <input
                type="url"
                className="popup__input"
                name="link"
                placeholder="Ссылка на картинку"
                id="placeLink"
                required
                value={link}
                onChange={handleInputChange}
            />
            <span id="placeLink-error" className="error error_invalid"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;