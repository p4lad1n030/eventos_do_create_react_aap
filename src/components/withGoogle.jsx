import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { connect } from 'react-redux';
import { logIn } from '../store/actions/userActions';
import { SpinnerRoundOutlined } from 'spinners-react';
import { errorCase } from '../funcoes';

const provider = new GoogleAuthProvider();
auth.languageCode = auth.useDeviceLanguage();

const WithGoogle = (props) => {
  // const userL = props.userLogin;
  const state = props.changeState;
  const [msgType, setMsgType] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [loading, setLoading] = useState();

  // função que loga com o google
  function loginWithGoogle() {
    setLoading(1);
    auth.languageCode = 'pt-BR';
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setMsgType('sucesso');
        setUserMsg('Login efetuado com sucesso');
        setLoading(0);
        setTimeout(() => {
          state({ type: 'LOG_IN', userEmail: user.email });
        }, 1000);

        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(user);
        // console.log(credential);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setLoading(0);
        setMsgType('error');
        errorCase(errorCode, setUserMsg);
        console.log(errorCode);
      });
  }
  return (
    <>
      <div>
        {loading ? (
          <SpinnerRoundOutlined
            style={{
              margin: 'auto',
            }}
          />
        ) : (
          <button
            className='btn br btn-outline-success btn-block my-2'
            type='submit'
            onClick={loginWithGoogle}>
            <i className='fab fa-google'></i>
          </button>
        )}
      </div>
      <div className='text-center '>
        {msgType === 'sucesso' && (
          <p className='font-weight-bold text-white mt-2'>{userMsg}</p>
        )}
        {msgType === 'error' && (
          <p className='font-weight-bold text-white mt-2'>{userMsg}</p>
        )}
      </div>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(WithGoogle);
