import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getMedias } from "../../services/mediaService";
import { MediaNew } from "./MediaNew";

export const MediaView = () => {

  const [medias, setMedias ] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  const listarMedias = async () => {
    try {
      const { data } = await getMedias();
      setMedias(data);
    } catch (error) {
      setError("Hubo un problema al cargar las medias.");
      console.log(error);
    }
  }

  useEffect(() => {
    listarMedias();
  }, []);

  return (
    <div className="container">
      <button onClick={() => setOpenModal(true)} className="btn btn-primary">
        Agregar Media
      </button>

      {openModal && (
        <MediaNew 
          handleOpenModal={() => setOpenModal(false)} 
          listarMedias={listarMedias} 
        />
      )}

      
      {error && <p className="text-danger">{error}</p>}

      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          medias.map((media) => (
            <div className="col" key={media._id}>
              <div className="card">
                <img 
                  src={media.foto ? media.foto : 'default-image-url'} 
                  className="card-img-top" 
                  alt="Img" 
                />
                <div className="card-body">
                  <h5 className="card-title">Características</h5>
                  <hr />
                  <p className="card-text">{`Serial: ${media.serial}`}</p>
                  <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                  <p className="card-text">{`UrlPeli: ${media.urlPeli}`}</p>
                  <p className="card-text">{`Genero: ${media.genero}`}</p>
                  <p className="card-text">{`Tipo: ${media.tipo}`}</p>
                  <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
                  <p className="card-text">
                    <Link to={`medias/edit/${media._id}`}>Ver más...</Link>
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
