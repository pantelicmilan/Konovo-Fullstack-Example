import { useEffect, useState } from 'react'
import { NoInternet } from './ui/noInternet/NoInternet';

export const RequireOnline = ({children}) => {

    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
  
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
  
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }, []);
  
    if (!isOnline) {
      return <NoInternet/>;
    }
    
  return (
    <>
        {children}
    </>
  )
}
