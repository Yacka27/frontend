
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getDirector } from '../../services/directorService';
import { getGenero } from '../../services/generoService';
import { crearMedia } from '../../services/mediaService';
import { getProductora } from '../../services/productoraService';
import { getTipo } from '../../services/tipoService';


export const MediaNew = ({ handleOpenModal, listarMedias }) => {

    const [productoras, setProductoras ] = useState([]);
    const [generos, setGeneros ] = useState([]);
    const [tipos, setTipos ] = useState([]);
    const [dierectors, setDirectors ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState([]);
    const { serial = '', titulo = '', sinopsis = '', urlPeli = '',
            foto = '', fechaCreacion = '', fechaActualizacion = '', productora, genero, tipo, dierector } = valoresForm
    
const listarProductoras = async () => {
    try{
        const { data } = await getProductora();
        setProductoras(data);

    } catch(error) {
        console.log(error);
    }
}

useEffect(() => {
    listarProductoras();
}, []);


const listarGeneros = async () => {
    try{
        const { data } = await getGenero();
        setGeneros(data);

    } catch(error) {
        console.log(error);
    }
}

useEffect(() => {
    listarGeneros();
}, []);


const listarTipos = async () => {
    try{
        const { data } = await getTipo();
        setTipos(data);

    } catch(error) {
        console.log(error);
    }
}

useEffect(() => {
    listarTipos();
}, []);


const listarDirectors = async () => {
    try{
        const { data } = await getDirector();
        setDirectors(data);

    } catch(error) {
        console.log(error);
    }
}

useEffect(() => {
    listarDirectors();
}, []);

    
    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
            serial, titulo, sinopsis, urlPeli, foto,
            fechaCreacion, fechaActualizacion,
            productora: {
                _id: productora
            },
            genero: {
                _id: genero
            },
            tipoEquipo:{
                _id: tipo
            },
            dierectorEquipo: {
                _id: dierector
            }
        }
        console.log(media);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await crearMedia(media);
            handleOpenModal();
            listarMedias();
            Swal.close();

        } catch(error) {
            console.log(error);
            Swal.close();
        }
        
    }

  return (
    <div className='sidebar'>
        <div className='container-fluid'>
            <div className='row'>

                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Crear Media</h3>
                        <i className="fa-solid fa-xmark" onClick={ handleOpenModal }> </i>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <hr  />
                    </div>
                </div>

                <form onSubmit={(e) => handleOnSubmit(e) }>
                    <div className='row'>

                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name='serial' 
                                value= {serial}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Titulo </label>
                                <input type="text" name='titulo' 
                                value={titulo}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Sinopsis </label>
                                <input type="text" name='sinopsis' 
                                value={sinopsis}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>

                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">UrlPeli </label>
                                <input type="text" name='urlPeli' 
                                value={urlPeli}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Foto </label>
                                <input type="text" name='foto'
                                value={foto} 
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Fecha Creacion </label>
                                <input type="date" name='fechaCreacion' 
                                value={fechaCreacion}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">fecha Actualizacion </label>
                                <input type="date" name='fechaActualizacion' 
                                value={fechaActualizacion}
                                onChange={e => handleOnChange(e)}
                                required 
                                className='form-control' />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Productora </label>
                                <select className='form-select'
                                required
                                name= 'productora'
                                value={productora}
                                onChange={e => handleOnChange(e)}>
                                <option value="">--SELECCIONE--</option>
                                    {
                                        productoras.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        }) 
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Genero </label>
                                <select className='form-select'
                                required
                                name= 'genero'
                                value={genero}
                                onChange={e => handleOnChange(e)}>
                                <option value="">--SELECCIONE--</option>
                                    {
                                        generos.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        }) 
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Tipo </label>
                                <select className='form-select'
                                required
                                name= 'tipo'
                                value={tipo}
                                onChange={e => handleOnChange(e)}>
                                <option value="">--SELECCIONE--</option>
                                    {
                                        tipos.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        }) 
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label">Director</label>
                                <select className='form-select'
                                required
                                name= 'dierector'
                                value={dierector}
                                onChange={e => handleOnChange(e)}>
                                <option value="">--SELECCIONE--</option>
                                    {
                                        dierectors.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        }) 
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <button className="btn btn-primary">Guardar</button>
                        </div>
                        
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
} 