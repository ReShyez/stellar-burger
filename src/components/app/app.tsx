import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protecte-router/protected-rout';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredients';
import { AppDispatch, useSelector, useDispatch } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);
  //Вопрос к ревьюеру - печему если мы выносим роутер компоненты отедельно ( как сейчас ) - все работает, а если мы пишем все вместе не вынося роутер компоенты то сайт перестаёт работать и появляется вот такая ошибка
  // вот такая  useLocation() may be used only in the context of a <Router> component
  const RouterComponent = () => {
    const location = useLocation();
    const background = location.state && location.state.background;
    const navigate = useNavigate();
    const onCloseModal = () => navigate(-1);

    return (
      <>
        <Routes location={background || location}>
          <Route path='*' element={<NotFound404 />} />
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute requiresAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute requiresAuth={false}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute requiresAuth={false}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute requiresAuth={false}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute requiresAuth>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute requiresAuth>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute requiresAuth>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='Order Info' onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Ingredient Details' onClose={onCloseModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute requiresAuth>
                  <Modal title='Order Info' onClose={onCloseModal}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </>
    );
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <RouterComponent />
      </BrowserRouter>
    </div>
  );
};
export default App;
//для коммита2//
