import React from 'react';

const TodosDetalhes = (props) => {
  const {  titulo, data, hora, tipo, descricao, foto, views } = props;
  return (
    <>

    {/* {console.log(user)} */}
      <h1 className='text-center mt-2'>
        {titulo}
      </h1>
      <div className='container-fluid mb-3 text-center'>
        <img src={foto} alt={descricao} className='img-fluid ' />
        <div className='mr-auto d-flex align-items-center'>
              <i className='fa-regular fa-eye mr-1 ' />
               {views}
            </div>
      </div>
      <div className='container-fluid text-center'>
        <div className=' d-flex justify-content-around align-items-center'>
          <div className='bg-details flex-grow-1'>
            <i className='fa-brands fa-slack fa-2x' />
            <h5 className='text-center text-light'>Tipo:</h5>
            <h6 className='text-center text-light'>{tipo}</h6>
          </div>
          <div className='bg-details flex-grow-1'>
            <i className='fa-regular fa-clock fa-2x' />
            <h5 className='text-center text-light'>Evento marcado para:</h5>
            <h6 className='text-center text-light'>{hora}</h6>
          </div>
          <div className='bg-details flex-grow-1'>
            <i className='fa-regular fa-calendar-days fa-2x' />
            <h5 className='text-center text-light'>Data</h5>
            <h6 className='text-center text-light'>{data}</h6>
          </div>
        </div>
        <div className='text-center my-4'>
          <h3 className='font-weight-light font-italic'>Descrição do Evento</h3>
          <p className='text-justify text-center'>{descricao}</p>
        </div>
      </div>
    </>
  );
};
export default TodosDetalhes;
