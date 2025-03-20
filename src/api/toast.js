import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'

export const notify = (isSuccess, content) => {
  if (isSuccess === true) {
    toast.success(`${content}`, {
      theme: 'colored',
      autoClose: 1000
    })
  } else {
    toast.error(`${content}`, {
      theme: 'colored',
      autoClose: 1000
    })
  }
}
