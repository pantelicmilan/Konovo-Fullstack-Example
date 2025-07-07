import { createContext, useContext } from "react";
import toast from 'react-hot-toast';

const ToastContext = createContext({
  publishError: (errorDescription) => {console.log(errorDescription)},
  publishSuccess: (successDescription) => {console.log(successDescription)}
});

export const useToastProvider = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {

  const publishError = (errorDescription) => {
    toast.error(errorDescription)
  };

  const publishSuccess = (successDescription) => {
    toast.success(successDescription)
  }

  return (
    <ToastContext value={{ publishError, publishSuccess }}>
      {children}
    </ToastContext>
  );
};