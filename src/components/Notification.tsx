import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

export const Notification = () => (
  <ToastContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
)

export { toast as Notifier }
