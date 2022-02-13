import popupDecline from '../images/popup-decline.svg';
import popupAccept from '../images/popup-accept.svg';
import editFormImage from '../images/edit-form-image.svg';

const acceptMessage = "Вы успешно зарегистировались!";
const declineMessage = "Что-то пошло не так! Попробуйте ещё раз.";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container popup__container_alert">
      <img className="popup__alert-img" src={props.popupType === 'decline' ? popupDecline : popupAccept} alt={props.popupType === 'decline' ? "decline" : "accept"}/>
      <h2 className="popup__header popup__header_alert">{props.popupType === 'decline' ? declineMessage : acceptMessage}</h2>
      <button className="popup__close-btn" type="reset" onClick={props.onClose}>
        <img className="popup__close-btn-image popup__close-btn-image_alert" src={editFormImage} alt="X"/>
      </button>
    </div>
    </div>
  );
}

export default InfoTooltip;
