import React from 'react';
import { connect } from 'react-redux';

import './cadastro.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { SpinnerRoundOutlined } from 'spinners-react';
import { Link, Navigate } from 'react-router-dom';
import Menu from '../../components/Header/Navbar/Menu';
import { logIn } from '../../store/actions/userActions';
import { reset, errorCase } from '../../funcoes';

const Cadastrar = (props) => {
  // variaveis de estado dos campos email e senha
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msgType, setMsgType] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [loading, setLoading] = useState();
  const userL = props.userLogin;
  const state = props.changeState;

  // função responsavel pelo login
  function criarusuario() {
    setLoading(1);
    setMsgType(null);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // const user = userCredential.user;
        setLoading(0);
        setMsgType('sucesso');
        setUserMsg('Usuário cadastrado com sucesso!');
        setTimeout(function () {
          state({ type: 'LOG_IN', userEmail: email });
        }, 700);
      })
      .catch((error) => { 
        const errorCode = error.code;
        setLoading(0);
        setMsgType('error');
        errorCase(errorCode, setUserMsg);
        console.log(error.message);
      })
  }

  return (
    <div className='cadastro'>
      <Menu />
      {userL > 0 ? <Navigate to='/' /> : null}

      <div className=' d-flex align-items-center justify-content-center  flex-column'>
        <span className='text-white i rounded-circle border border-white my-5'>
          &#127758;
        </span>

        <form
          onSubmit={reset}
          className='cadastro_content d-flex flex-column'
          id='authForm'>
          <input
            type='email'
            id='inputEmail'
            className='form-control mb-2'
            placeholder='Seu Email'
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            id='inputPassword'
            className='form-control mb-2'
            placeholder='Sua Senha'
            value={pass}
            onInput={(e) => setPass(e.target.value)}
          />
          {loading ? (
            <SpinnerRoundOutlined
              style={{
                margin: 'auto',
              }}
            />
          ) : (
            <button
              className='btn btn-lg br btn-outline-success btn-block mb-2'
              type='submit'
              onClick={criarusuario}>
              Cadastrar
            </button>
          )}

          <div className='text-center '>
            {msgType === 'sucesso' && (
              <p className='font-weight-bold text-white mt-2'>{userMsg}</p>
            )}
            {msgType === 'error' && (
              <p className='font-weight-bold text-white mt-2'>{userMsg}</p>
            )}
          </div>
          <div className='pcao my-4 d-flex justify-content-around w-100'>
            <small className='ml-2'>
              <Link className='nav-link' to='/login'>
                Ja tem uma conta?
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userEmail: state.isLog.userEmail,
    userLogin: state.isLog.userLogin,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeState(newState) {
      const action = logIn(newState);
      dispatch(action);
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cadastrar);