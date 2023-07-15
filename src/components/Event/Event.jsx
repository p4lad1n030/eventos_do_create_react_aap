import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './event.css';
import { fireStore } from '../../config/firebaseConfig';
import { deleteDoc, doc, increment, setDoc } from 'firebase/firestore';
import { connect } from 'react-redux';

// visualizacoes

const Event = (props) => {
  const { id, src, desc, title, views, user } = props;
  const [mail, setMail] = useState(props.userEmail);
  const updateViews = () => {
    const viewsRef = doc(fireStore, 'eventos/', id);
    setDoc(viewsRef, { visualizacoes: increment(+1) }, { merge: true });
  };
  const deleteEvent = async () => {
    await deleteDoc(doc(fireStore, 'eventos/', id));
    document.querySelector(`#${id}`).style.display = 'none'
  }; 
  // document.querySelector('#deleteEvent').onclick = function() {
  //   alert('iiii')  
  // }
  return (
    <>
      <div className='col-md-4 col-sm-12 my-4' id={id}>
        <div className='img position-relative'>
          {mail === user ? (
            <button
              
              className='btn btn-danger position-absolute deletebtn'
              data-toggle='tooltip'
              title='Dica: Click para excluir um evento permanentemente!'
              onClick={deleteEvent}>
              <i className='fa-regular fa-trash-can' />
            </button>
          ) : (
            ' '
          )}

          <img className='card-img-top img-fluid' src={src} alt={desc} />
        </div>
        <div className='card-body'>
          <h5 className='text-center'>{title}</h5>
          <p className='card-text text-justify'>{desc} </p>
          <div className='d-flex card-footer align-items-center'>
            <div className=' mr-auto align-items-center'>
              <Link
                to={'/detalhesevento/' + id}
                className='btn btn-sm text-left'
                onClick={updateViews}>
                <i className='fa-solid fa-circle-info' /> detalhes
              </Link>
            </div>

            <div className='ml-auto d-flex align-items-center'>
              <i className='fa-regular fa-eye mr-1' />
              {views}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userEmail: state.isLog.userEmail,
  };
};

export default connect(mapStateToProps)(Event);
