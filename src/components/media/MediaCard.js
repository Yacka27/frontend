import React from 'react';
import { Link } from 'react-router-dom';

const MediaCard = (props) => {
    const { media } = props;

    return (
        <div className="col">
            <div className="card">
                <img src={media.foto} className="card-img-top" alt="Img" />
                <div className="card-body">
                    <h5 className="card-title">Características</h5>
                    <hr />
                    <p className="card-text">{`Serial: ${media.serial}`}</p>
                    <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                    <p className="card-text">{`UrlPeli: ${media.urlPeli}`}</p>
                    <p className="card-text">{`Genero: ${media.genero}`}</p>
                    <p className="card-text">{`Tipo: ${media.tipo.nombre}`}</p>
                    <p className="card-text">
                        <Link to={`medias/edit/${media._id}`}>Ver más...</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
