import { toast } from 'react-toastify';

export const ShowToast = (msg: string, state: string) => {
  toastify(state)(msg, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const toastify = (state: string) =>
  state === 'success' ? toast.success : toast.error;
