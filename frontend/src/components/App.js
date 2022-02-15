import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditPlacePopup from './AddPlacePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import apiAuth from '../utils/ApiAuth.js';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js'

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =  React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddInfoTooltipPopupOpen, setIsAddInfoTooltipPopupOpen] = React.useState(false);
  const [popupType, setPopupType] = React.useState();
  
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  const [currentUser, setCurrentUser] = React.useState({name: '', avatar: '', about: ''});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");

  
  const [loggedIn, setLoggedIn] = React.useState(false);

  //Читаем данные из запроса по API
  React.useEffect(() => {
 if (loggedIn===true) {
    api.getAllInfo()
    .then(([cards, profileData]) => {
      setCurrentUser(profileData);
      setCards(cards);
    })
    .catch(err => console.log(`Ошибка инициализации данных: ${err}`));
}
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  // Cекция реализует открытие и закрытие попап форм

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на карточке
    const isLiked = card.likes.some(i => i === currentUser._id);


    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked === false) {
      api.putCardLikes(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка добавления лайка: ${err}`));
    }
    else {
      api.deleteCardLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка удаления лайка: ${err}`));
    }
  }


  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;
    
    if (isOwn === true) {
      api.deleteCard(card._id, isOwn)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(`Ошибка удаления карточки: ${err}`));
    }
  }

  function handleUpdateUser(currentUser){
    api.setUserProfile(currentUser.name, currentUser.about)
    .then((profileData) => {
      setCurrentUser(profileData);
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка изменения параметров профиля: ${err}`));
  }

  function handleUpdateAvatar(currentUser){
    api.setUserAvatar(currentUser.avatar)
    .then((profileData) => {
      setCurrentUser(profileData);
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка изменения аватара: ${err}`));
  }

  function handleAddPlaceSubmit(card){
    api.setCard(card.link, card.name)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка создания карточки: ${err}`));
  }

  function handleUpdateUserRegister(userAuth){
    apiAuth.register(userAuth)
    .then((res) => {
      if(res){
        setPopupType('accept');
        setIsAddInfoTooltipPopupOpen(true);
        navigate('/signin');
      } else {
        console.log("Что-то пошло не так!");
      }
    })
    .catch(err => {
      setPopupType('decline');
      setIsAddInfoTooltipPopupOpen(true);
      return console.log(`Ошибка регистрации: ${err}`);
    });
  }

  function handleUpdateUserLogin(userAuth){
    apiAuth.auth(userAuth)
    .then((authData) => {
      if (authData.token){
        localStorage.setItem('token', authData.token);
        setLoggedIn(true);
        setEmail(userAuth.login);
        navigate('/');
      }
    })
    .catch(err => {
      setPopupType('decline');
      setIsAddInfoTooltipPopupOpen(true);
      return console.log(`Ошибка авторизации: ${err}`);
    });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    if (token){
      // проверим токен
      apiAuth.emailInfo(token).then((res) => {
        if (res){
          // авторизуем пользователя
          setLoggedIn(true);
          navigate('/');
          setEmail(res.email);
        }
      })
      .catch(err => {
        return console.log(`Неудалось проверить токен: ${err}`)}
      ); 
    }
  } 

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddInfoTooltipPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  //Открытие попап с картинкой
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Routes>
              <Route path="/" element = {
                <>
                  <Header title="Выйти" link="signin" userEmail={true} email={email}/>
                  <ProtectedRoute
                    path="/"
                    loggedIn={loggedIn}
                    component={Main}  
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onEditAvatar = {handleEditAvatarClick}
                    onCardClick = {handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    email={email}/>
                  <Footer />
                </>}/>
              <Route path="/signup" element = {
              <>
                <Header title="Войти" link="/signin"/>
                <Register onUpdateUserAuth={handleUpdateUserRegister}/>
              </>} />
              <Route path="/signin" element = {
              <>
                <Header title="Регистрация" link="/signup"/>
                <Login onUpdateUserAuth={handleUpdateUserLogin}/>
              </>} />
              <Route exact path="*" element = {loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
            </Routes>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <EditPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit}/>
          <PopupWithForm name="add-card" title="Вы уверены?" buttonTitle="Да" theme="popup__button_theme_delete-card"/>
          <InfoTooltip popupType={popupType} isOpen={isAddInfoTooltipPopupOpen} onClose={closeAllPopups}/>
          <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
