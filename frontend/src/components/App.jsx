import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import ToolTipSuccess from "./ToolTipSuccess";
import ToolTipFail from "./ToolTipFail";
import Auth from '../utils/Auth';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isToolTipSuccessOpen, setIsToolTipSuccessOpen] = useState(false);
    const [isToolTipFailOpen, setIsToolTipFailOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isAppLoading, setIsAppLoading] = useState(false);
    const api = new Api();
    const auth = new Auth();
    const navigate = useNavigate();

    useEffect(() => {
        checkContent();
    }, []);

    useEffect(() => {
        api.getUserInfo()
          .then(userData => {
            setCurrentUser(userData);
          })
          .catch(console.error);

        api.getInitialCards()
          .then(cardsData => {
            setCards(cardsData);
          })
          .catch(console.error);
      }, []);

    function closeAllPopups() {
        setIsToolTipSuccessOpen(false);
        setIsToolTipFailOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({ name: "", link: "" });
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(id => id === currentUser._id);

        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch(console.error);
    }

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch(console.error);
    }

    function handleUpdateUser(data) {
        setIsAppLoading(true);
        api
            .setUserInfo(data)
            .then((updatedUserData) => {
                setCurrentUser(updatedUserData);
                closeAllPopups();
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsAppLoading(false);
            });

    }

    function handleUpdateAvatar(avatar) {
        setIsAppLoading(true);
        api
            .updateAvatar(avatar)
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
                closeAllPopups(); // Закрываем попап после успешного обновления аватара пользователя
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsAppLoading(false);
            });
    }

    function handleAddPlaceSubmit(card) {
        setIsAppLoading(true);
        api
            .addCard(card)
            .then((createdCard) => {
                setCards((prevCards) => [createdCard, ...prevCards]);
                closeAllPopups(); // Закрываем попап после успешного добавления карточки
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsAppLoading(false);
            });
    }

    function onRegister() {
        setIsToolTipSuccessOpen(true);
    }

    function onError() {
        setIsToolTipFailOpen(true);
    }

    function checkContent() {
        const token = localStorage.getItem('jwt');
        console.log(token);
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    setEmail(res.email);
                    setLoggedIn(true);
                    navigate("/");
                })
                .catch(err => console.log(err));
        }
    }

    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then(res => {
                localStorage.setItem('jwt', res.token);
                navigate("/")
                checkContent();

            })
            .catch(err => {
                onError();
                console.log(err);
            });
    }

    function handleRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                console.log({ email });

                navigate("/sign-in");
                onRegister();
            })
            .catch(err => {
                onError();
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    email={email}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                element={Main}
                                cards={cards}
                                loggedIn={loggedIn}
                                onEditProfile={handleEditProfileClick}
                                onEditAvatar={handleEditAvatarClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                        }
                    />
                    <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
                    <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
                    <Route
                        path="*"
                        element={
                            <Navigate to={loggedIn ? "/" : "/sign-in"} />
                        }
                    />
                </Routes>
                {loggedIn && <Footer />}
                <ToolTipSuccess
                    isOpen={isToolTipSuccessOpen}
                    onClose={closeAllPopups}
                />
                <ToolTipFail
                    isOpen={isToolTipFailOpen}
                    onClose={closeAllPopups}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isAppLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isAppLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isAppLoading}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;