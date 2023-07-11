import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fireStore } from '../../config/firebaseConfig';
import TodosDetalhes from '../../components/Event/TodosDetalhes';
import Menu from '../../components/Header/Navbar/Menu';
import Modal from '../../components/Event/UpdateEvent';
import './detalhesevento.css';
const Detalhesevento = (props) => {
  const [info, setInfo] = useState([]);
  const key = useParams();
  const idRef = key.id;

  useEffect(() => {
    const getInfo = async () => {
      let dataInfo = [];
      onSnapshot(doc(fireStore, 'eventos', idRef), (doc) => {
        let refDoc = doc.data();
        dataInfo.push({ id: doc.id, ...refDoc });
        return setInfo(dataInfo);
      });
      
    };
    getInfo();
  }, [idRef,info]);
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
          /> 
        ); 
      })}
      <div className='d-flex justify-content-end fixed-bottom'>
        <button
          className='btn btn-outline-success mr-2 mb-5'
          data-toggle='modal'
          data-target='#myModal'>
          Atualizar
          <br />
          <i className='fa-regular fa-pen-to-square'></i>
        </button>
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

export default Detalhesevento;
