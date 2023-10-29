import React from "react";
import InfoToolTips from "./InfoTooltips";
import success from '../images/Success.svg';

function ToolTipSuccess({ isOpen, onClose }) {
    
    return (
        <InfoToolTips
            title="Вы успешно зарегистрировались!"
            tooltipImg={success}
            name="toolTipSuccess"
            isOpen={isOpen}
            onClose={onClose}
        >
        </InfoToolTips>
    )
}

export default ToolTipSuccess;