import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="edit-profile-photo" title="Обновить аватар" buttonTitle="Сохранить" theme="" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input placeholder="Ссылка на картинку" className="popup__input" 
      id="avatar" name="avatar" type="url" required ref={avatarRef}/>
      <span id="avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
        
export default EditProfilePopup;