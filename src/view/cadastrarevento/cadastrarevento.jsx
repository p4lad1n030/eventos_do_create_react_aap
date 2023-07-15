import React, { useState } from 'react';
import Menu from '../../components/Header/Navbar/Menu';
import { reset, errorCase } from '../../funcoes';
import { fireStore, storage } from '../../config/firebaseConfig';
import {
  uploadBytes,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { connect } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';

const Cadastrarevento = (props) => {
  const [publish, setPublish] = useState();
  const [msgpublish, setMsgpublish] = useState();
  const [titulo, setTitulo] = useState();
  const [Tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setdata] = useState();
  const [time, setTime] = useState();
  const [foto, setFoto] = useState();
  const [mail, setMail] = useState(props.userEmail);
  const [uploadProgress, setUploadProgress] = useState(0);

  const publishEvent = () => {
    setMail(props.userEmail);
    setPublish(null);
    const pictureNamed = foto.name;
    const dirPath = ref(storage, 'imagens/' + pictureNamed);
    uploadBytes(dirPath)
      .then(() => {
        const uploadTask = uploadBytesResumable(dirPath, foto);
        trackUpload(uploadTask);
      })
      .catch((err) => {
        console.log(err);
        setPublish('error');
        errorCase(err, setMsgpublish);
      });
  };
  const trackUpload = (task) => {
    task.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        document.getElementById('pause').onclick = function () {
          task.pause();
        };
        document.getElementById('play').onclick = function () {
          task.resume();
        };
        document.getElementById('stop').onclick = function () {
          task.cancel();
          setPublish('error');
          setUploadProgress(0);
        };
      },
      (error) => {
        errorCase(error, setMsgpublish);

        setPublish('error');
        setUploadProgress(0);
      },
      () => {
        setPublish('sucesso');
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          setUploadProgress(0);
          addDoc(collection(fireStore, 'eventos'), {
            titulo: titulo,
            tituloLowerCase: titulo.toLowerCase(),
            tipo: Tipo,
            detalhes: detalhes,
            data: data,
            hora: time,
            usuario: mail,
            visualizacoes: 0,
            foto: downloadURL,
            publico: 1,
            criacao: new Date(),
          })
            .then(() => {
              setPublish('sucesso');
            })
            .catch((err) => {
              console.log(err);
              setPublish('error');
            });
        });
      }
    );
  };

  return (
    <>
      <Menu />
      <h1 className='text-center'>
        <p className='text-break'>{mail}</p>
      </h1>
      <div className='col-12'>
        <div className='row'>
          <h3 className='mx-auto font-weight-bold'>Novo Evento</h3>
        </div>
        <form onSubmit={reset} className=''>
          <div className='form-group'>
            <label htmlFor='title' className=''>
              Titulo:
            </label>
            <input
              type='text'
              id='title'
              className='form-control'
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='type' className=''>
              Tipo do Evento:
              <select
                defaultValue='-- Selecione um tipo --'
                type='text'
                id='type'
                className='form-control'
                onChange={(e) => setTipo(e.target.value)}>
                <option value='-- Selecione um tipo --' disabled>
                  -- Selecione um tipo --
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
          </div>

          <div className='form-group'>
            <label htmlFor='description' className=''>
              Descrição do Evento:
            </label>
            <textarea
              id='description'
              className='form-control'
              rows={3}
              onChange={(e) => setDetalhes(e.target.value)}
            />
          </div>

          <div className='form-group  row row-cols-2'>
            <div className='col-6 text-center'>
              <label htmlFor='time' className=''>
                Hora do Evento
              </label>
              <br />
              <input
                type='time'
                id='time'
                className=''
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className=' col-6 text-center'>
              <label htmlFor='date' className=''>
                Data do Evento
              </label>
              <br />
              <input
                type='date'
                id='date'
                className=''
                onChange={(e) => setdata(e.target.value)}
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='file' className=''>
              Upload da Foto:
            </label>
            <input
              type='file'
              id='file'
              className='form-control'
              onChange={(e) => setFoto(e.target.files[0])}
              accept='image/*'
            />
            {/* ///////////////////////////// */}
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
          </div>

          <div className='text-center'>
            <button
              className='btn btn-outline-success my-3'
              onClick={publishEvent}>
              Publicar Eventos
            </button>
          </div>
        </form>

        {publish === 'sucesso' && (
          <p className='text-center mt-4 display-4 font-weight-bold'>
            Evento publicado com sucesso
          </p>
        )}
        {publish === 'error' && (
          <p className='text-center mt-4 display-4 font-weight-bold'>
            {msgpublish}
          </p>
        )}
      </div>
      <div className='text-center'></div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userEmail: state.isLog.userEmail,
  };
};
export default connect(mapStateToProps)(Cadastrarevento);

/**
 * Anotações
 * const cityRef = doc(db, 'cities', 'BJ');
 * setDoc(cityRef, { capital: true }, { merge: true });
 */
