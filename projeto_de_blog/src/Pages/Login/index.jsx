import { useRef, useState } from "react"; 

function Login(){
    const email = useRef(""); 
    const senha = useRef("");

    const [ emailInputFocusState, setEmailInputFocusState ] = useState(false);
    const [ senhaInputFocusState, setSenhaInputFocusState ] = useState(false);
  
    function fazerLogin(){
        const emailValue = email.current.value;
        const senhaValue = senha.current.value;

        if(emailValue === "thiagoassis@gmail.com" && senhaValue === "123456"){
            alert("Login realizado com sucesso!");
            window.localStorage.setItem("Logado", true);
            window.location.href = "/Admin";
        } else {
            alert("Email ou senha inválidos!");
        }
    }

    function focusEmailInput () {
        setEmailInputFocusState(true);
        console.log('Input em foco:', true);
    };
    function blurEmailInput () {
        if (email.current.value != null && email.current.value != ""){
            return
        } 
        setEmailInputFocusState(false);
        console.log('Input perdeu foco:', false);
    };

    function focusSenhaInput () {
        setSenhaInputFocusState(true);
        console.log('Input em foco:', true);
    };
    function blurSenhaInput () {
        if (email.current.value != null && email.current.value != ""){
            return
        }   
        setSenhaInputFocusState(false);
        console.log('Input perdeu foco:', false);
    };

    return(
        <div className="login__container">
            <div className="login__box">
                <h1>Login</h1>
                <div>
                    <label className={emailInputFocusState ? 'login__label__focus' : 'login__label'}  htmlFor="email">Email:</label>
                    <br />
                    <input className="login__input"
                        onFocus={focusEmailInput}
                        onBlur={blurEmailInput}
                        type="email" ref={email} id="email"
                        name="email" required />
                </div>
                <div>
                    <label className={senhaInputFocusState ? 'login__label__focus' : 'login__label'} htmlFor="password">Senha:</label>
                    <br />
                    <input className="login__input"
                        onFocus={focusSenhaInput}
                        onBlur={blurSenhaInput}
                        type="password" ref={senha} id="password"
                        name="password" required />
                </div>
                <button className="button btn-purple mt-20" type="submit" onClick={fazerLogin}>Fazer Login</button>
            </div>
        </div>
    )
}

export default Login;