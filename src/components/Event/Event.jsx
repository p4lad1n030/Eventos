import React from 'react';
import { Link } from 'react-router-dom';
import './event.css';

const Event = (props) => {
  const { id, src, desc, title,  } = props;
  return (
    <>
      <div className='col-md-4 col-sm-12 my-4' id={id}>
        
        <div className='img'>
          <img className='card-img-top img-fluid' src={src} alt={desc} />
        </div>
        <div className='card-body'>
          <h5 className=''>{title}</h5>
          <p className='card-text text-justify'>{desc} </p>
          <div className='d-flex card-footer align-items-center'>
            <div className=' mr-auto align-items-center'>
              <Link to={'/detalhesevento/'+ id} className='btn btn-sm text-left'>
                <i className='fas fa-sort-down hei-line text-left'></i> detalhes
              </Link>
            </div>

            <div className='ml-auto d-flex align-items-center'>
              <i className='fa-regular fa-eye mr-1' />
               2023
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
