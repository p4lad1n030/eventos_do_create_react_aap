import { React } from 'react';
import { auth } from '../../config/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { reset, errorCase } from '../../funcoes';
import Menu from '../../components/Header/Navbar/Menu';
import { useState } from 'react';

const Recuperar = () => {
  const [email, setEmail] = useState('');
  const [msgType, setMsgType] = useState('');
  const [userMsg, setUserMsg] = useState('');

  const recoveryPass = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // alert('Email enviado com sucesso!');
        setMsgType('sucesso');
        setUserMsg('Email enviado com sucesso, verifique seu email e span!');
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(`errorCode ${errorCode}`);
        setMsgType('error');
        errorCase(errorCode, setUserMsg);
      });
  };
  return (
    <div className=' h-100 text-center'>
      <Menu />

      <div className='d-flex flex-column align-items-center mt-3'>
        <h1 className='font-weight-lighter'>
          Informe um email para recuperar a sua senha
        </h1>
        <form onSubmit={reset} className='form-group'>
          <input
            type='email'
            className='mx-auto '
            placeholder='Digite um Email valido'
            onInput={(e) => setEmail(e.target.value)}
          />
          <br />
        <h3 className='font-weight-light my-3'>O Email abaixo esta correto?</h3>
        <h6 className='font-weight-bold my-3'>{email}</h6>
          <button className='btn btn-outline-info' type='submit' onClick={recoveryPass}>
            <i className='fa fa-send'> </i> Enviar
          </button>
        </form>
        <div className='text-center '>
        {msgType === 'sucesso' && (
              <p className='font-weight-bold  mt-2'>{userMsg}</p>
            )}
            {msgType === 'error' && (
              <p className='font-weight-bold  mt-2'>{userMsg}</p>
            )}
          
        </div>
      </div>
    </div>
  );
};

export default Recuperar;
