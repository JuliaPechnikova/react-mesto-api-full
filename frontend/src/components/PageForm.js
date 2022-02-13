import React from 'react';

function PageForm(props) {
  
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUserAuth({
      password,
      login
    });
  }

  function handleLoginChange(e) {
    setLogin(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="page-form">
      <h2 className="page-form__header">{props.header}</h2>
      <form className="page-form__form" action="#" method="POST" onSubmit={handleSubmit}>
        <input type="email" value={login} placeholder="Email" className="page-form__input" id="email" 
          name="email" minLength="2" maxLength="40" required onChange={handleLoginChange}/>
        <span id="login-error" className="page-form__error"></span>
        <input type="password" value={password} placeholder="Пароль" className="page-form__input" id="description" 
          name="password" minLength="2" maxLength="40" required onChange={handlePasswordChange}/>
        <span id="password-error" className="page-form__error"></span>
        <button type="submit" className="page-form__button">{props.button}</button>
        {props.children}
      </form>
    </section>
    );
  }
  
export default PageForm;