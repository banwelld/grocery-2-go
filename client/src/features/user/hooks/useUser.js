import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  updateUserThunk,
} from '../redux/userThunks';

export default function useUser() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userData);
  const sessionLoaded = useSelector((state) => state.user.sessionLoaded);
  const isPending = useSelector((state) => state.user.isPending);

  const login = useCallback(
    (credentials) => {
      return dispatch(loginThunk(credentials)).unwrap();
    },
    [dispatch],
  );

  const register = useCallback(
    (data) => {
      return dispatch(registerThunk(data)).unwrap();
    },
    [dispatch],
  );

  const logout = useCallback(
    () => {
      return dispatch(logoutThunk()).unwrap();
    },
    [dispatch],
  );

  const updateUser = useCallback(
    (data) => {
      return dispatch(updateUserThunk(data)).unwrap();
    },
    [dispatch],
  );

  return {
    user,
    isLoggedIn: !!user,
    sessionLoaded,
    isPending,
    userAuth: {
      login,
      register,
      logout,
    },
    userAdmin: {
      updateUser,
    },
  };
}
