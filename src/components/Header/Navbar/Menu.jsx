import React from 'react';
import './menu.css';
import { Link } from 'react-router-dom';
import { logOut } from '../../../store/actions/userActions';
import { connect } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from '../../../config/firebaseConfig';

const Menu = (props) => {
  const userL = props.userLogin;
  const state = props.changeState;
  const email = props.userEmail
  
  function logout() {
    state({ type: 'LOG_OUT' });
    signOut(auth)
  }
  return (
    <nav className='navbar navbar-expand-md bg-blue navbar-dark'>
      {/* Brand */}
      {userL >0 ? <Link className='navbar-brand' to='/meuseventos'>
        <h3 className="text-light font-weight-light">{email}</h3> 
      </Link> :<Link className='navbar-brand' to='/'>
        Eventos
      </Link>}

      {/* Toggler/collapsibe Button */}
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#collapsibleNavbar'>
        <span className='navbar-toggler-icon' />
      </button>

      {/* Navbar links */}
      <div className='collapse navbar-collapse ' id='collapsibleNavbar'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Home
            </Link>
          </li>
          {userL < 1 ? (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to='/cadastro'>
                  Cadastrar
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to='/cadastrarevento'>
                  Cadastrar Eventos
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/meuseventos'>
                  Meus Eventos
                </Link>
              </li>
              <li className='nav-item btn btn-outline-danger'>
                <Link className='nav-link' onClick={logout}>
                  Sair
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
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
      const action = logOut(newState);
      dispatch(action);
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
