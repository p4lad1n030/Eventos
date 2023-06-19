import React from "react";
import "./login.css";
import { useState } from "react";
import {
  //onAuthStateChanged,
  //GoogleAuthProvider,
  //signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { SpinnerRoundOutlined } from "spinners-react";
import { Link } from "react-router-dom";

const Login = () => {
  // variaveis de estado dos campos email e senha
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [successLogin, setSuccessLogin] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [loading, setLoading] = useState();

  const errorCase = (er) => {
    switch (er) {
      case "auth/invalid-email":
        setUserMsg(`E-mail inválido!`);
        break;
      case "auth/wrong-password":
        setUserMsg(`Senha inválida!`);
        break;
      case "auth/email-already-in-use":
        setUserMsg(`Usuário já cadastrado!`);
        break;
      case "auth/user-not-found":
        setUserMsg(`Usuário não cadastrado!`);
        break;
      case "auth/popup-closed-by-user":
        setUserMsg(
          `O popup de autenticação foi fechado antes da operação ser concluída!`
        );
        break;
      default:
        setUserMsg(`${er}`);
    }
  };
  // função responsavel pelo login
  function logIn() {
    setLoading(1);
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        setLoading(0);
        setSuccessLogin("sucesso");
        const user = userCredential.user;
        console.log(user.uid);

        // alert(`logou  bem vindo ${user}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoading(0);
        setSuccessLogin("error");
        errorCase(errorCode);
      });
  }
  function reset(e) {
    e.preventDefault();
  }

  return (
    <div className="login d-flex align-items-center justify-content-center  flex-column">
      <h1 className="text-center text-white">Acesse para continuar</h1>
      <h4 className="font-weight-light font-italic text-center text-white">
        bem vindo
      </h4>
      <form
        onSubmit={reset}
        className="login_content d-flex flex-column"
        id="authForm"
      >
        <input
          type="email"
          id="inputEmail"
          className="form-control mb-2"
          placeholder="Seu Email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-2"
          placeholder="Sua Senha"
          value={pass}
          onInput={(e) => setPass(e.target.value)}
        />
        {loading ? (
          <SpinnerRoundOutlined
            style={{
              margin: "auto",
            }}
          />
        ) : (
          <button
            className="btn btn-lg br btn-outline-success btn-block mb-2"
            type="submit"
            onClick={logIn}
          >
            Entrar
          </button>
        )}

        <div className="text-center ">
          {successLogin === "sucesso" && (
            <p className="font-weight-bold text-white mt-2">
              Sucesso! Login efetuado com sucesso
            </p>
          )}
          {successLogin === "error" && (
            <p className="font-weight-bold text-white mt-2">{userMsg}</p>
          )}
        </div>
        <div className="pcao my-4 d-flex justify-content-around w-100">
          <small className=" mr-2">
            <a href="#" className="">
              Esqueceu a senha?
            </a>
          </small>
          <span className="text-white rounded-circle border border-white">
            &#127758;
          </span>
          <small className="ml-2">
            <Link className="nav-link" to="/cadastro">
              Quero me cadastrar!
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;
