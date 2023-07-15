import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fireStore } from '../../config/firebaseConfig';
import TodosDetalhes from '../../components/Event/TodosDetalhes';
import Menu from '../../components/Header/Navbar/Menu';
import Modal from '../../components/Event/UpdateEvent';
import './detalhesevento.css';
import { connect } from 'react-redux';
const Detalhesevento = (props) => {
  const [info, setInfo] = useState([]);
  const [obj, setObj] = useState({});
  const key = useParams();
  const idRef = key.id;
  const isLoged = props.userEmail;
  useEffect(() => {
     async function getInfo () {
      
      let dataInfo = [];
      onSnapshot(doc(fireStore, 'eventos', idRef), (doc) => {
        let refDoc = doc.data();
        dataInfo.push({ id: doc.id, ...refDoc });
        setInfo(dataInfo)
        setObj(refDoc)
      });
    };
    getInfo()
    
    
  }, [idRef, info, isLoged]);


  return (
    <section className=''>
      <header>
        <Menu />
      </header>
     
      
         {info.map((i) => {
          return (
            <TodosDetalhes
              key={i.id}
              id={i.id}
              titulo={i.titulo}
              data={i.data}
              hora={i.hora}
              descricao={i.detalhes}
              tipo={i.tipo}
              foto={i.foto}
              user ={i.usuario}
              views={i.visualizacoes}
            />
          );
        })}
        
        <div className='d-flex justify-content-end fixed-bottom'>
          {isLoged === obj.usuario ? <button
              className='btn btn-outline-success mr-2 mb-5'
              data-toggle='modal'
              data-target='#myModal'>
              Atualizar
              <br /> 
              <i className='fa-regular fa-pen-to-square'></i>
            </button>:''}  
            
          
        </div>
        {info.map((i) => {
          return (
            <Modal
              key={i.usuario}
              id={i.id}
              titulo={i.titulo}
              tituloLowerCase={i.tituloLowerCase}
              data={i.data}
              hora={i.hora}
              descricao={i.detalhes}
              tipo={i.tipo}
              foto={i.foto}
            />
          );
        })}
        
    
   
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    userEmail: state.isLog.userEmail,
  };
};

export default connect(mapStateToProps)(Detalhesevento);
