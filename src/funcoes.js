// função usada nos formularios da aplicação
export const reset = (e) => {
  e.preventDefault();
};
// tratamento de erros da aplicação
export const errorCase = (er, callback) => {
  switch (er) {
    case 'auth/network-request-failed':
      callback(`Parece que a conexão com a internet foi perdida!`);
      break;
    case 'storage/unauthenticated':
      callback(`O usuário não está autenticado. Faça a autenticação e tente novamente!`);
      break;
    case 'storage/unknown':
      callback(`Ocorreu um erro desconhecido!`);
      break;
    case 'auth/invalid-email':
      callback(`E-mail inválido!`);
      break;
    case 'storage/unauthorized':
      callback(`O usuário não está autorizado a executar a ação desejada!`);
      break;
    case 'storage/canceled':
      callback(`Upload cancelado pelo usuário!`);
      break;
    case 'auth/unauthorized-domain':
      callback(
        `Não é permitido utilizar esta aplicação por este dominio, erro interno!`
      );
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

