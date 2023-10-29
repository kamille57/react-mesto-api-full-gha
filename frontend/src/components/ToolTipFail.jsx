import React from "react";
import InfoToolTips from "./InfoTooltips";
import fail from '../images/Fail.svg';

function ToolTipFail({ isOpen, onClose }) {
    
    return (
        <InfoToolTips
            title="Что-то пошло не так! Попробуйте еще раз"
            tooltipImg={fail}
            name="toolTipFail"
            isOpen={isOpen}
            onClose={onClose}
        >
        </InfoToolTips>
    )
}

export default ToolTipFail;