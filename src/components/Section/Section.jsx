import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import EventCard from '../Event/Event';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { fireStore } from '../../config/firebaseConfig';
import { reset } from '../../funcoes';
import { useParams } from 'react-router-dom';

const Section = (props) => {
  const { param } = useParams();
  const [eventData, setEventData] = useState([]);
  const [search, setSearch] = useState('');
  const email = props.userEmail;
  // const user = props.userLogin;
  useEffect(() => {
    const getData = async () => {
      let eventList = [];
      if (param) {
        if (search !== '') {
          setEventData([])
          let searchLowerCase = search.toLowerCase();
          const docRef = collection(fireStore, 'eventos');
          const searchQuery = query(
            docRef,

            where('tituloLowerCase', '==', searchLowerCase),
            orderBy('data')
          );
          const querySnapshot = await getDocs(searchQuery);

          querySnapshot.forEach((doc) => {
            let arr = doc.data();
            return eventList.push({ id: doc.id, ...arr });
          });
          setEventData(eventList)
        } else {
          const docRef = collection(fireStore, 'eventos');
          const searchQuery = query(
            docRef,
            where('usuario', '==', email),
            orderBy('data')
          );
          const querySnapshot = await getDocs(searchQuery);
          querySnapshot.forEach((doc) => {
            let arr = doc.data();
            eventList.push({ id: doc.id, ...arr });
          });
         return setEventData(eventList);
        }
      } else {
        if (search !== '') {          
          let searchLowerCase = search.toLowerCase();
          const docRef = collection(fireStore, 'eventos');
          const searchQuery = query(
            docRef,

            where('tituloLowerCase', '==', searchLowerCase),
            orderBy('data')
          );
          const querySnapshot = await getDocs(searchQuery);

          querySnapshot.forEach((doc) => {
            let arr = doc.data();
            return eventList.push({ id: doc.id, ...arr });
          });
          setEventData(eventList)
        } else {
          let eventList = [];
          const querySnapshot = await getDocs(collection(fireStore, 'eventos'));
          querySnapshot.forEach((doc) => {
            let arr = doc.data();
  
            return eventList.push({ id: doc.id, ...arr });
          });
          setEventData(eventList);
        }
      }
    };
    getData();
  }, [email, param, search]);

  return (
    <section className='container-fluid'>
      <h3 className='text-center my-3'>Eventos Publicados </h3>
      <article className='mx-auto text-center p-3'>
        <form onSubmit={reset} className=''>
          <input
            data-toggle='tooltip'
            title='Dica: Digite o nome completo do evento para busca-lo!'
            type='text'
            className='w-75'
            placeholder='Pesquise um evento pelo título'
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </article>
      <div className='row justify-content-around'>
        {eventData.map((i) => (
          <EventCard
            id={i.id}
            src={i.foto}
            desc={i.detalhes}
            title={i.titulo}
            key={i.id}
          />
        ))}
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    userEmail: state.isLog.userEmail,
    userLogin: state.isLog.userLogin,
  };
}

export default connect(mapStateToProps)(Section);