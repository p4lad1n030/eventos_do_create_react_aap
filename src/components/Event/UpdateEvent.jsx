import React, { useState } from 'react';
import { reset } from '../../funcoes';
import './UpdateEvent.css';
import { doc, updateDoc } from 'firebase/firestore';
import { fireStore, storage } from '../../config/firebaseConfig';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

const UpdateEvent = (props) => {
  const { id, titulo, tituloLowerCase, data, hora, tipo, descricao, foto } =
    props;
  const [updateTitle, setupdateTitle] = useState();
  const [updatetype, setUpdatetype] = useState();
  const [updateTime, setUpdateTime] = useState();
  const [updateDate, setUpdateDate] = useState();
  const [pic, setpic] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  const updateEvent = async () => {
    const refPic = pic.name;
    const storageRef = ref(storage, 'imagens/' + refPic);
    uploadBytes(storageRef, pic)
      .then((_) => {
        const uploadTask = uploadBytesResumable(storageRef, pic);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(snapshot.bytesTransferred);
            setUploadProgress(progress);
            document.getElementById('pause').onclick = function () {
              uploadTask.pause();
            };
            document.getElementById('play').onclick = function () {
              uploadTask.resume();
            };
            document.getElementById('stop').onclick = function () {
              uploadTask.cancel();
              // setPublish('error');
              setUploadProgress(0);
            };
          },
          (error) => {
            // an error
            setUploadProgress(0);
          },
          () => {
            // an finaly
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUploadProgress(0);

              const docRef = doc(fireStore, 'eventos', id);
              updateDoc(docRef, {
                titulo: updateTitle ? updateTitle : titulo,
                tituloLowerCase: updateTitle
                  ? updateTitle.toLowerCase()
                  : tituloLowerCase,
                tipo: updatetype ? updatetype : tipo,
                detalhes: updateDescription ? updateDescription : descricao,
                data: updateDate ? updateDate : data,
                hora: updateTime ? updateTime : hora,
                foto: downloadURL ? downloadURL : foto,
              });
            });
            // setUploadProgress(0);
            console.log('finaly');
          }
        );
        // console.log(uploadTask);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='modal' id='myModal'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          {/* Modal Header */}
          <div className='modal-header'>
            <h2 className='modal-title text-center'>
              Gostaria de atualizar os dados do Evento?
            </h2>
            <button type='button' className='close' data-dismiss='modal'>
              ×
            </button>
          </div>
          {/* Modal body */}
          <div className='modal-body text-center'>
            <h3 className='text-center'>
              Titulo atual: <br />
              {titulo}
            </h3>
            {/* titulo */}
            <div className='form-group   '>
              <form onSubmit={reset} className='d-flex flex-column'>
                <label
                  htmlFor='title'
                  className='text-center font-weight-bold font-italic'>
                  Atualizar título do Evento:
                </label>
                <input
                  id='title'
                  type='text'
                  className=''
                  placeholder={titulo}
                  onChange={(e) => setupdateTitle(e.target.value)}
                />
                <hr />
                {/* tipo */}
                <label htmlFor='type' className='font-weight-bold font-italic'>
                  Atualizar Tipo do Evento:
                  <select
                    defaultValue={tipo}
                    type='text'
                    id='type'
                    className='form-control'
                    onChange={(e) => setUpdatetype(e.target.value)}>
                    <option value={`${tipo}`} disabled>
                      {tipo}
                    </option>
                    <option value='festa' className=''>
                      Festa
                    </option>
                    <option value='teatro' className=''>
                      Teatro
                    </option>
                    <option value='show' className=''>
                      Show
                    </option>
                    <option value='evento' className=''>
                      Evento
                    </option>
                  </select>
                </label>
                {/* descrição */}
                <label
                  htmlFor='description'
                  className='font-weight-bold font-italic'>
                  Atualizar Descrição do Evento:
                </label>
                <textarea
                  id='description'
                  className='form-control'
                  rows={3}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  placeholder={descricao}
                />
                {/* hora */}
                <label
                  htmlFor='time'
                  className='font-weight-bold font-italic mt-3'>
                  Atualizar Hora do Evento
                </label>
                <p className='text-center'>Foi marcado para: {hora}</p>
                <input
                  type='time'
                  id='time'
                  className='mx-auto w-50'
                  onChange={(e) => setUpdateTime(e.target.value)}
                  placeholder={hora}
                />
                {/* data */}
                <label
                  htmlFor='date'
                  className='font-weight-bold font-italic mt-3'>
                  Atualizar Data do Evento
                </label>
                <p className='text-center'>Foi marcado para: {data}</p>{' '}
                <input
                  type='date'
                  id='date'
                  className='mx-auto w-50'
                  onChange={(e) => setUpdateDate(e.target.value)}
                />
                <label
                  htmlFor='file'
                  className='font-weight-bold font-italic mt-3'>
                  Atualizar Foto do Evento:
                </label>
                <p className='text-center'>
                  Foi publicado com esta foto: <br />
                </p>
                <img src={foto} alt={descricao} className='pic' />
                <input
                  type='file'
                  id='file'
                  className='form-control'
                  onChange={(e) => setpic(e.target.files[0])}
                  accept='image/*'
                />
                <div className='d-flex flex-column text-center '>
                  <label htmlFor='pgr' className='mt-3 font-weight-bold '>
                    {`${parseInt(uploadProgress)}%`}
                  </label>
                  <progress
                    id='pgr'
                    className='mx-auto w-50 progress-bar bg-dark progress-bar-striped'
                    value={uploadProgress}
                    max={100}></progress>

                  <div className='d-flex justify-content-center mt-3'>
                    {/* pause */}
                    <button className='btn btn-outline-info' id='pause'>
                      <i className='fas fa-pause-circle'></i>
                    </button>
                    {/* play */}
                    <button className='btn btn-outline-success mx-4' id='play'>
                      <i className='fas fa-play-circle'></i>
                    </button>
                    {/* stop */}
                    <button className='btn btn-outline-danger' id='stop'>
                      <i className='fas fa-stop-circle'></i>
                    </button>
                  </div>
                </div>
                <div className=''>
                  <button
                    type='submit'
                    className='btn btn-outline-info my-3'
                    onClick={updateEvent}>
                    Atualizar Evento
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Modal footer */}
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-danger'
              data-dismiss='modal'>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
