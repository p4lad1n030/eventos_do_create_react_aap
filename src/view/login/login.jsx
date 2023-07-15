import React from 'react';
import './login.css';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { SpinnerRoundOutlined } from 'spinners-react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from '../../store/actions/userActions';
import WithGoogle from '../../components/withGoogle';
import Menu from '../../components/Header/Navbar/Menu';
import { reset, errorCase } from "../../funcoes";
// primeiro comit criado

const Login = (props) => {
  // variaveis de estado dos campos email e senha
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [successLogin, setSuccessLogin] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [loading, setLoading] = useState();
  const userL = props.userLogin;
  const state = props.changeState;

  // função responsavel pelo login
  function logIn() {
    setLoading(1);
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        setLoading(0);
        setSuccessLogin('sucesso');
        // const user = userCredential.user;
        setTimeout(function () {
          state({ type: 'LOG_IN', userEmail: email });
        }, 700);
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoading(0);
        setSuccessLogin('error');
        errorCase(errorCode, setUserMsg);
      });
  }

  return (
    <div className='login'>
      <Menu />
      <div className=' d-flex align-items-center justify-content-center  flex-column p-2'>
        {userL > 0 ? <Navigate to='/' /> : null}
        <h4 className='font-weight-light font-italic text-center text-white'>
          bem vindo
        </h4>
        <h1 className='text-center text-white '>Acesse para continuar</h1>
        <form
          onSubmit={reset}
          className='d-flex flex-column my-3'
          id='authForm'>
          <input
            type='email'
            className='form-control mb-2'
            placeholder='Seu Email'
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
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
              onClick={logIn}>
              Entrar
            </button>
          )}
          <div className='text-center '>
            {successLogin === 'sucesso' && (
              <p className='font-weight-bold text-white mt-2'>
                Sucesso! Login efetuado com sucesso
              </p>
            )}
            {successLogin === 'error' && (
              <p className='font-weight-bold text-white mt-2'>{userMsg}</p>
            )}
          </div>
          <div className='pcao my-4 '>
            <small className=' '>
              <Link className='nav-link' to='/recuperarsenha'>
                Esqueceu a senha?
              </Link>
            </small>
            <span className='text-white rounded-circle border border-white mx-5'>
              &#127758;
            </span>
            <small className=''>
              <Link className='nav-link' to='/cadastro'>
                Quero me cadastrar!
              </Link>
            </small>
          </div>
        </form>
        <div className='d-flex flex-column'>
          <h4 className='text-center text-white font-weight-light font-italic'>
            ou acesse usando:
          </h4>
          <div className='text-center'>
            <WithGoogle />
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
