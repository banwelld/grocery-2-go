import { createContext, useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserController } from './UserController';
import { useModal } from '../../../hooks/useModal';

export const UserContext = createContext(null);

export const UserStatus = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive',
});

/**
 * @typedef {Object} UserProviderReturn
 * @property {Object} user - current user object
 * @property {boolean} isLoggedIn - whether the user is currently logged in
 * @property {boolean} isPending - whether a user action is currently in progress
 * @property {{
 *   login: function(Object): Promise<void>,
 *   register: function(Object): Promise<void>,
 *   logout: function(): Promise<void>
 * }} userAuth - authentication methods
 * @property {{
 *   updateUser: function(Object): Promise<void>,
 *   deleteUser: function(): Promise<void>,
 * }} userActions - user management methods
 */

/**
 * @returns {UserProviderReturn}
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);
  const lastUserRef = useRef(null);
  const navigate = useNavigate();
  const { openModal, resetModal } = useModal();

  // create controller (useMemo prevents loops when controller functions used as dependencies)
  const { checkSession, userAuth, userActions } = useMemo(() => {
    const concurrencyControls = {
      lockRef: isBusyRef,
      setPending: setIsPending,
    };

    return createUserController({
      setUser,
      setSessionLoaded,
      navigate,
      concurrencyControls,
      userRef: lastUserRef,
      openModal,
      resetModal,
    });
  }, [navigate, openModal, resetModal]);

  // Load session on mount
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Update lastUserRef on user change
  useEffect(() => {
    lastUserRef.current = user;
  }, [user]);

  const ctx = useMemo(() => {
    return {
      user,
      isLoggedIn: !!user,
      userAuth,
      userActions,
      isPending,
      sessionLoaded,
    };
  }, [user, isPending, userAuth, userActions, sessionLoaded]);

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
}
