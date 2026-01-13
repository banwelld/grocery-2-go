// /client/src/contexts/UserController.js

import { getData, postData, patchData, deleteData, runExclusive } from "../helpers/helpers";
import { UserStatus } from "./UserContext";

export function createUserController({ setUser, setSessionLoaded, navigate, concurrencyControls, userRef }) {
  const loadSession = () => {
    const fn = () =>
      getData("/session")
        .then(setUser)
        .catch((err) => console.log("No active session:", err));
    
    return runExclusive({ fn, setIsLoaded: setSessionLoaded, ...concurrencyControls });
  };

  const login = (credentials) => {
    const fn = () => {
      return postData("/session", credentials)
        .then((data) => {
          setUser(data);
          navigate("/");
        })
        .catch((err) => console.error("Login failed:", err));
    };
    return runExclusive({ fn, setIsLoaded: setSessionLoaded, ...concurrencyControls });
  };

  const register = (data) => {
    const { fName, lName, confirmPassword, ...rest } = data;
    const payload = {
      f_name: fName,
      l_name: lName,
      ...rest,
    };
    
    const fn = () => {
      return postData("/users?action=register", payload)
        .then((data) => {
          setUser(data);
          navigate("/");
        })
        .catch((err) => console.error("Registration failed:", err));
    };
    return runExclusive({ fn, setIsLoaded: setSessionLoaded, ...concurrencyControls });
  };

  const logout = () => {
    const lastUser = userRef.current;
    
    const fn = () => {
      return deleteData("/session")
        .then(() => {
          setUser(null);
          setSessionLoaded(false);
          navigate("/");
        })
        .catch((err) => {
          console.error("Logout failed:", err);
          setUser(lastUser);
        });
    };
    return runExclusive({ fn, ...concurrencyControls });
  };

  const updateUser = (data) => {
    const user = userRef.current;
    if (!user) return;

    const fn = () => {
      const { fName, lName, ...rest } = data;
      
      setUser((prev) => ({ ...prev, ...data }));
      
      const payload = { ...rest };
      if (fName) payload.f_name = fName;
      if (lName) payload.l_name = lName;

      return patchData(`/users/${user.id}`, payload)
        .then(setUser)
        .catch((err) => {
          console.error("Fetch user (patch) failed: ", err);
          setUser(user);
        });
    };
    return runExclusive({ fn, ...concurrencyControls });
  };

  const deleteUser = () => {
    const user = userRef.current;
    if (!user) return;

    const fn = () => {
      setUser(null);
      return deleteData(`/users/${user.id}`)
        .then(() => navigate("/"))
        .catch((err) => {
          console.error("Delete user (delete) failed: ", err);
          setUser(user);
        });
    }
    return runExclusive({ fn, ...concurrencyControls });
  };

  const deactivateUser = () => updateUser({ status: UserStatus.INACTIVE });
  const activateUser = () => updateUser({ status: UserStatus.ACTIVE });

  return { 
    loadSession,
    userAuth:{login, register, logout},
    userActions:{updateUser, deleteUser, deactivateUser, activateUser }
  };
}
