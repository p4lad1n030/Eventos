import React from "react";
import { useDispatch } from "react-redux";

import "./cadastro.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { SpinnerRoundOutlined } from "spinners-react";
import { Link } from "react-router-dom";
import Menu from "../../components/Header/Navbar/Menu";
const Cadastrar = () => {
  // variaveis de estado dos campos email e senha
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msgType, setMsgType] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [loading, setLoading] = useState();
  const dispatch = useDispatch()

  // const [progress, setProgress] = useState();

  const errorCase = (er) => {
    switch (er) {
      case "auth/invalid-email":
        setUserMsg(`E-mail inválido!`);
        break;
      case "auth/wrong-password":
        setUserMsg(`Senha inválida!`);
        break;
      case "auth/weak-password":
        setUserMsg(`Senha deve ter ao menos 6 caracteres!`);
        break;
      case "auth/email-already-in-use":
        setUserMsg(`Usuário já cadastrado!`);
        break;
      case "auth/popup-closed-by-user":
        setUserMsg(
          `O popup de autenticação foi fechado antes da operação ser concluída!`
        );
        break;
      case "storage/canceled":
        break;
      case "storage/unauthorized":
        setUserMsg(`Falha ao acessar o Cloud Storage!`);
        break;

      default:
        setUserMsg(`${er}`);
    }
  };

  // função responsavel pelo login
  function criarusuario() {
    setLoading(1);
    setMsgType(null);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        setLoading(0);
        const user = userCredential.user;
        console.log(user);
        setMsgType("sucesso");
        setUserMsg("Usuário cadastrado com sucesso!");
        dispatch({type:'LOG_IN', userEmail:email})

      })
      .catch((error) => {
        const errorCode = error.code;
        setLoading(0);
        setMsgType("error");
        errorCase(errorCode);
      });
  }
  function reset(def) {
    def.preventDefault();
  }

  return (
    <>
      <Menu/>
      <div className="cadastro d-flex align-items-center justify-content-center  flex-column">
        <span className="text-white i rounded-circle border border-white my-5">
          &#127758;
        </span>

        <form
          onSubmit={reset}
          className="cadastro_content d-flex flex-column"
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
              onClick={criarusuario}
            >
              Cadastrar
            </button>
          )}

          <div className="text-center ">
            {msgType === "sucesso" && (
              <p className="font-weight-bold text-white mt-2">{userMsg}</p>
            )}
            {msgType === "error" && (
              <p className="font-weight-bold text-white mt-2">{userMsg}</p>
            )}
          </div>
          <div className="pcao my-4 d-flex justify-content-around w-100">
            <small className="ml-2">
              <Link className="nav-link" to="/login">
                Ja tem uma conta?
              </Link>
            </small>
          </div>
        </form>
      </div>
    </>
  );
};

export default Cadastrar;

// Anotações
// for (let progres = 0; progress < 100; progres++) {
//   setProgress(progres)
// var aa =  document.getElementById('showProgress')
// aa.style.width = progress
// console.log(aa)
// }
// if(!email || !pass ){

//   setMsgType('erro')
//   setUserMsg('Você prescisa informar um email ou senha valido!')
// }else{

//   setMsgType('sucesso')
//   setUserMsg('Usuário criado com sucesso!')
// }
// Anotações de erro
// switch (errorCode) {
//   case "auth/invalid-email":
//     setUserMsg(`${errorCode} - E-mail inválido!`);
//     break;
//   case "auth/wrong-password":
//     setUserMsg(`${errorCode} - Senha inválida!`);
//     break;
//   case "auth/weak-password":
//     setUserMsg(
//       `${errorCode} - Senha deve ter ao menos 6 caracteres!`
//     );
//     break;
//   case "auth/email-already-in-use":
//     setUserMsg(`${errorCode} - Email já está em uso por outra conta!`);
//     break;
//   case "auth/popup-closed-by-user":
//     setUserMsg(
//       `O popup de autenticação foi fechado antes da operação ser concluída!`
//     );
//     break;
//   case "storage/canceled":
//     break;
//   case "storage/unauthorized":
//     setUserMsg(`Falha ao acessar o Cloud Storage!`);
//     break;

//   default:
//     setUserMsg(`${errorMessage}`);
// }
