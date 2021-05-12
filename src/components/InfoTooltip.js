import React from "react";

function InfoTooltip(props) {
  const statusIcon = props.statusInfo.statusIcon;
  const statusTitle = props.statusInfo.statusTitle;
  return (
    <div className={`popup ${props.isOpen && "popup_is-opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        />
        <div className="popup__status-icon">
          <img src={statusIcon} alt="Картинка статуса" />
        </div>
        <h2 className="popup__status-title">{statusTitle}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
