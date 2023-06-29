import React, { useState } from 'react';
import Menu from '../../components/Header/Navbar/Menu';
import { reset } from '../../funcoes';

const Cadastrarevento = () => {
  const [publish, setPublish] = useState(0);
  const [msgpublish, setMsgpublish] = useState('sucesso');
  const [titulo, setTitulo] = useState();
  const [Tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setdata] = useState();
  const [time, setTime] = useState();
  const [foto, setFoto] = useState();
  const [mail, setMail] = useState();

  function publishEvent () {
    alert('bingo')
  }

  return (
    <>
      <Menu />
      <div className='col-12'>
        <div className='row'>
          <h3 className='mx-auto font-weight-bold'>Novo Evento</h3>
        </div>
        <form onSubmit={reset} className=''>
          <div className='form-group'>
            <label htmlFor='title' className=''>
              Titulo:
            </label>
            <input type='text' id='title' className='form-control' />
          </div>
          <div className='form-group'>
            <label htmlFor='type' className=''>
              Tipo do Evento:
            </label>
            <select type='text' id='type' className='form-control'>
              <option disabled selected>
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
          </div>
          <div className='form-group'>
            <label htmlFor='description' className=''>
              Descrição do Evento:
            </label>
            <textarea id='description' className='form-control' rows={3} />
          </div>
          <div className='form-group  row row-cols-2'>
            <div className='col-6 text-center'>
              <label htmlFor='time' className=''>
                Data do Evento
              </label>
              <br />
              <input type='time' id='time' className='' />
            </div>
            <div className=' col-6 text-center'>
              <label htmlFor='date' className=''>
                Data do Evento
              </label>
              <br />
              <input type='date' id='date' className='' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='file' className=''>
              Upload da Foto:
            </label>
            <input type='file' id='file' className='form-control' />
          </div>
          <div className='text-center'>
            <button className='btn btn-outline-success my-3' onClick={publishEvent}>
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
    </>
  );
};

export default Cadastrarevento;
