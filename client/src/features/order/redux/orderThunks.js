import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';
import { getData, logException, serializeError } from '../../../utils/helpers';
import { toClient } from '../../../utils/serializer';

const { Errors, Toasts } = Feedback;

export const loadOrdersThunk = createAsyncThunk(
  'orders/loadOrders',
  async (options = {}, { rejectWithValue }) => {
    const showToast = options?.showToast ?? true;

    const fetchPromise = getData(`${PATHS.BACK.ORDERS}?status=non_open&scope=shallow`)
      .then((data) => {
        const ordersArray = [].concat(toClient(data, 'order') || []);
        return ordersArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      })
      .catch((err) => {
        logException(Errors.FAILURE.RECEIVE, err);
        throw err;
      });

    try {
      if (showToast) {
        return await toast.promise(fetchPromise, {
          loading: Toasts.ORDER_LIST.LOAD.BUSY,
          error: Toasts.ORDER_LIST.LOAD.FAILURE,
        });
      }
      return await fetchPromise;
    } catch (err) {
      return rejectWithValue(serializeError(err));
    }
  }
);
