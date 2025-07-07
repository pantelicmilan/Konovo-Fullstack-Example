import axios from "axios";
import { InputField } from "../../ui/inputField/InputField";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import styles from "./Login.module.css";
import { useState } from "react";
import { getLoginEndpoint } from "../../config";
import { useNavigate } from "react-router-dom";
import { useToastProvider } from "../../ToastProvider";

function Login() {
  const [usernameInputField, setUsernameInputField] = useState("");
  const [passwordInputField, setPasswordInputField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const {publishError, publishSuccess} = useToastProvider();

  function handleUsernameChange(inputValue){
    setUsernameInputField(inputValue);
  }

  function handlePasswordChange(inputValue){
    setPasswordInputField(inputValue);
    console.log(passwordInputField)
  }

  async function handleLogin() {
    setIsLoading(true);
    try {
      const response = await axios.post(getLoginEndpoint, {
        username: usernameInputField,
        password: passwordInputField,
      });
  
      setIsLoading(false);
  
      if (response.status === 200) {
        publishSuccess("Uspesno ste se prijavili na sistem, dobrodosli nazad!");
        localStorage.setItem("accessToken", response.data.access_token);
        console.log(response);
        navigate("/products");
      }
    } catch (error) {
      setIsLoading(false);
      publishError("Neuspesan login, mozda je do korisnickog imena ili sifre")

    }
  }

  return (
    <div className={styles.loginPageWrapper}>
        <main className={styles.loginPage}>
            <img src="konovoLogo.png" alt="Konovo Logo" className='logo' />
            <h1 className={styles.title}>Dobrodosli u refurbished svet</h1>
            <InputField placeholder="Unesi korisnicko ime" onChange={handleUsernameChange} value= {usernameInputField} isWidth100={true} />
            <InputField placeholder="Unesi lozinku" onChange={handlePasswordChange} value= {passwordInputField} isPasswordField = {true} isWidth100={true}/>
            <button className={styles.loginButton} onClick={handleLogin}>Login</button>
            {isLoading && <LoadingSpinner/>}
        </main>
    </div>
  )
}

export default Login