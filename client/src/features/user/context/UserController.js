import {
  getData,
  postData,
  patchData,
  deleteData,
  runExclusive,
  logException,
} from '../../../utils/helpers';
import Feedback from '../../../config/feedback';
import { toClient, toServer } from '../../../utils/serializer';

const { Errors } = Feedback;

export function createUserController({
  setUser,
  setSessionLoaded,
  navigate,
  concurrencyControls,
  userRef,
}) {
  const checkSession = () =>
    runExclusive({
      doFetch: () =>
        getData('/session')
          .then((data) => setUser(toClient(data, 'user')))
          .catch((err) => logException(Errors.FAILURE.RECEIVE, err)),
      setIsLoaded: setSessionLoaded,
      ...concurrencyControls,
    });

  const login = (credentials) =>
    runExclusive({
      doFetch: () =>
        postData('/session', toServer(credentials, 'user'))
          .then((userData) => {
            const user = toClient(userData, 'user');
            setUser(user);
            return user;
          })
          .catch((err) => {
            if (err.status === 401) {
              logException(Errors.INVALID.CREDENTIALS, err);
              throw err;
            } else if ([400, 422].includes(err.status)) {
              logException(Errors.MISSING_CREDENTIALS, err);
              throw err;
            } else {
              logException(Errors.FAILURE.CREATE, err);
              throw err;
            }
          }),
      setIsLoaded: setSessionLoaded,
      ...concurrencyControls,
    });

  const register = (data) => {
    // remove confirmPassword from the payload
    const { confirmPassword, ...rest } = data;
    const payload = {
      ...toServer(rest, 'user'),
    };

    return runExclusive({
      doFetch: () =>
        postData('/users?action_type=register', payload)
          .then((user) => {
            const clientUser = toClient(user, 'user');
            setUser(clientUser);
            return clientUser;
          })
          .catch((err) => {
            if (err.status === 422) {
              logException(Errors.MISSING_CREDENTIALS, err);
              throw err;
            } else {
              logException(Errors.FAILURE.CREATE, err);
              throw err;
            }
          }),
      setIsLoaded: setSessionLoaded,
      ...concurrencyControls,
    });
  };

  const logout = () =>
    runExclusive({
      doFetch: () => {
        const lastUser = userRef.current;
        return deleteData('/session')
          .then(() => {
            setUser(null);
            setSessionLoaded(false);
            navigate('/', { replace: true });
          })
          .catch((err) => {
            logException(Errors.FAILURE.DELETE, err);
            setUser(lastUser);
            throw err;
          });
      },
      ...concurrencyControls,
    });

  const updateUser = (data) =>
    runExclusive({
      doFetch: () => {
        const user = userRef.current;
        if (!user) return Promise.resolve();

        const payload = toServer(data, 'user');

        setUser((prev) => ({ ...prev, ...data }));

        return patchData(`/users/${user.id}`, payload)
          .then((updatedUser) => {
            const clientUser = toClient(updatedUser, 'user');
            setUser(clientUser);
            return clientUser;
          })
          .catch((err) => {
            setUser(user);
            logException(Errors.UPDATE_FAILURE, err);
            throw err;
          });
      },
      ...concurrencyControls,
    });

  return {
    checkSession,
    userAuth: { login, register, logout },
    userActions: { updateUser },
  };
}
