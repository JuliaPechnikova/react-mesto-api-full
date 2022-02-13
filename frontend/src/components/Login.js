import PageForm from './PageForm.js';

function Login(props) {
  return (
      <PageForm header="Вход" button="Войти" onUpdateUserAuth={props.onUpdateUserAuth}/>
    );
  }
  
export default Login;