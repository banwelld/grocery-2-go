import { createAsyncThunk } from '@reduxjs/toolkit';
import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';
import { UserRole } from '../../../config/enums';
import {
  getData,
  postData,
  patchData,
  deleteData,
  logException,
  serializeError,
} from '../../../utils/helpers';
import { toClient, toServer } from '../../../utils/serializer';
import { loadLocalCartThunk } from '../../cart/redux/cartThunks';
import { resetLocalCart } from '../../cart/redux/cartSlice';
import { loadOrdersThunk } from '../../order/redux/orderThunks';
import { resetOrders } from '../../order/redux/orderSlice';

const { Errors } = Feedback;

export const checkSessionThunk = createAsyncThunk(
  'user/checkSession',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const userData = await getData(PATHS.BACK.SESSION);
      if (!userData) return null;

      const clientUser = toClient(userData, 'user');
      if (clientUser && clientUser.role === UserRole.CUSTOMER) {
        dispatch(loadLocalCartThunk());
        dispatch(loadOrdersThunk({ showToast: false }));
      }
      return clientUser;
    } catch (err) {
      logException(Errors.FAILURE.RECEIVE, err);
      return rejectWithValue(serializeError(err));
    }
  }
);

export const loginThunk = createAsyncThunk(
  'user/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const userData = await postData(PATHS.BACK.SESSION, toServer(credentials, 'user'));
      const clientUser = toClient(userData, 'user');

      if (clientUser && clientUser.role === UserRole.CUSTOMER) {
        dispatch(loadLocalCartThunk());
        dispatch(loadOrdersThunk({ showToast: false }));
      }
      return clientUser;
    } catch (err) {
      if (err.status === 401) {
        logException(Errors.INVALID.CREDENTIALS, err);
      } else if ([400, 422].includes(err.status)) {
        logException(Errors.MISSING_CREDENTIALS, err);
      } else {
        logException(Errors.FAILURE.CREATE, err);
      }
      return rejectWithValue(serializeError(err));
    }
  }
);

export const registerThunk = createAsyncThunk(
  'user/register',
  async (data, { dispatch, rejectWithValue }) => {
    const { confirmPassword, ...rest } = data;
    const payload = toServer(rest, 'user');

    try {
      const userData = await postData(`${PATHS.BACK.USERS}?action_type=register`, payload);
      const clientUser = toClient(userData, 'user');

      if (clientUser && clientUser.role === UserRole.CUSTOMER) {
        dispatch(loadLocalCartThunk());
        dispatch(loadOrdersThunk({ showToast: false }));
      }
      return clientUser;
    } catch (err) {
      if (err.status === 422) {
        logException(Errors.MISSING_CREDENTIALS, err);
      } else {
        logException(Errors.FAILURE.CREATE, err);
      }
      return rejectWithValue(serializeError(err));
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await deleteData(PATHS.BACK.SESSION);
      dispatch(resetLocalCart());
      dispatch(resetOrders());
      return null;
    } catch (err) {
      logException(Errors.FAILURE.DELETE, err);
      return rejectWithValue(serializeError(err));
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data, { getState, rejectWithValue }) => {
    const { user } = getState();
    const currentUser = user.userData;
    if (!currentUser) return null;

    try {
      const payload = toServer(data, 'user');
      const updatedData = await patchData(PATHS.BACK.USER_ID(currentUser.id), payload);
      return toClient(updatedData, 'user');
    } catch (err) {
      logException(Errors.UPDATE_FAILURE, err);
      return rejectWithValue(serializeError(err));
    }
  }
);
