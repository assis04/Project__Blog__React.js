import { useRef } from "react"; 

function Login(){
    const email = useRef(""); 
    const senha = useRef("");

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
    
    return(
        <div>
            <h1>Login</h1>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" ref={email} id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" ref={senha} id="password" name="password" required />
                </div>
                <button type="submit" onClick={fazerLogin}>Fazer Login</button>
        </div>
    )
}

export default Login;