import React from 'react';

function InfoToolTips({ title, name, tooltipImg, isOpen, onClose }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={`popup${name}`}>
            <div className="popup__container">
                <button type="button" aria-label={`кнопка закрытия попапа ${name}`} className="popup__closed" id={`${name}Close`} onClick={onClose}></button>
                <div className="tooltips">
                    <fieldset className="popup-form__set">
                        <img className="tooltips__img" src={tooltipImg} alt="Статус регистрации." />
                        <h2 className="popup-form__heading">{title}</h2>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default InfoToolTips;