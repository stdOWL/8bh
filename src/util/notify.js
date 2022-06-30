import { toast } from 'react-toastify'

const toastIt = (type, message) => {
  if (!toast.isActive(message)) {
    toast[type](message, {
      toastId: message,
      autoClose: 4000,
    })
  } else {
    toast.update(message, {
      render: message,
      type: toast.TYPE[type.toUpperCase()],
    })
  }
}

export const notify = {
  success: message => {
    toastIt('success', message)
  },
  error: message => {
    toastIt('error', message)
  },
}
