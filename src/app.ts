import { notification } from 'antd';
import { Dispatch } from 'react';

export const dva = {
  config: {
    onError(err, dispatch) {
      err.preventDefault();
      console.error('OnError', err, err.message);

      if (err.message === 'Failed to fetch') {
        notification.error({
          message: '网络出错，请重试或者联系IT',
        });
      } else if (err.type == '401') {
        dispatch({ type: 'user/redirectToLogin' });
        notification.error({
          message: '用户未登录',
        });
      } else {
        notification.error({
          message: err.message,
        });
      }
    },

    initialState: {},
  },
};
