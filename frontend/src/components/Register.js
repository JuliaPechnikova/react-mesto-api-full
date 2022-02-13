import PageForm from './PageForm.js';
import { Link } from 'react-router-dom';

function Register(props) {
  return (
      <PageForm header="Регистрация" button="Зарегистрироваться" onUpdateUserAuth={props.onUpdateUserAuth}>
        <Link className="page-form__caption" to="/signin">Уже зарегистрированы? Войти</Link>
      </PageForm>
    );
  }
  
export default Register;