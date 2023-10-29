import React from 'react';

function PopupWithForm({ title, name, button, isOpen, onClose, onSubmit, children }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} id={`popup${name}`}>
            <div className="popup__container">
                <button type="button" aria-label={`кнопка закрытия попапа ${name}`} className="popup__closed" id={`${name}Close`} onClick={onClose}></button>
                <form className="popup-form" method="post" action="#" id={`popup${name}Form`} name={name} onSubmit={onSubmit}>
                    <fieldset className="popup-form__set">
                        <h2 className="popup-form__heading">{title}</h2>
                        {children}
                        <button type="submit" aria-label={`кнопка сохранения ${name}`} className="popup-form__save-button popup-form__save-button_valid" id={`${name}SaveButton`}>{button}</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;