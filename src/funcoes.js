// função usada nos formularios da aplicação
export const reset = (e) => {
  e.preventDefault();
};

export const errorCase = (er, callback) => {
  switch (er) {
    case 'auth/invalid-email':
      callback(`E-mail inválido!`);
      break;
    case 'auth/missing-email':
      callback(`Digite um E-mail!`);
      break;
    case 'auth/missing-password':
      callback(`Digite uma senha valida!`);
      break;
    case 'auth/weak-password':
      callback(`Digite uma senha com no minino 6 caracteres!`);
      break;
    case 'auth/wrong-password':
      callback(`Senha inválida!`);
      break;
    case 'auth/email-already-in-use':
      callback(`Usuário já cadastrado!`);
      break;
    case 'auth/user-not-found':
      callback(`Usuário não cadastrado!`);
      break;
    case 'auth/popup-closed-by-user':
      callback(
        `O popup de autenticação foi fechado antes da operação ser concluída!`
      );
      break;
    default:
      callback(`${er}`);
  }
};
