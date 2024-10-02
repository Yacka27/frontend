import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getMedias } from "../../services/mediaService";

export const MediaView = () => {

  const [medias, setMedias ] = useState([]);
  //const [ openModal, setOpenModal ] = useState(false);//
  

  const listarMedias = async () => {
    try {
      /*Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();*/
      const { data } = await getMedias();
      console.log(data);
      //Swal.close();//
      setMedias(data);
      
    } catch (error) {
      console.log(error);
      //Swal.close();//
    }
  }

  useEffect(() => {
    listarMedias();
  }, []);

  return (
    
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          medias.map((media) => {
            return (
    
              <div className="col">
                  <div className="card">
                      <img src={media.foto} className="card-img-top" alt="Img" />
                      <div className="card-body">
                          <h5 className="card-title">Características</h5>
                          <hr />
                          <p className="card-text">{`Serial: ${media.serial}`}</p>
                          <p className="card-text">{`Marca: ${media.marca.nombre}`}</p>
                          <p className="card-text">{`Descripcion: ${media.descripcion}`}</p>
                          <p className="card-text">{`Marca: ${media.precio}`}</p>
                          <p className="card-text">{`Usuario: ${media.usuario.nombre}`}</p>
                          <p className="card-text">
                              <Link to = {`medias/edit/${media._id}`}>Ver más...</Link>
                          </p>
                      </div>
                  </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}
