
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDirector } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { actualizarMedia, getMediaPorId } from '../../services/mediaService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';

export const MediaUpdate = () => {

    const { mediaId = '' } = useParams();
    const [ media, setMedia ] = useState();
    const [directogetDirector, setDirectogetDirector ] = useState([]);
    const [generos, setGeneros ] = useState([]);
    const [tipos, setTipos ] = useState([]);
    const [productoras, setProductoras ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState([]);
    const { serial = '', modelo = '', descripcion = '', color = '',
        foto = '', fechaCompra = '', precio = '', director, genero, tipo, productora } = valoresForm

    const listarDirectogetDirector = async () => {
        try{
            const { data } = await getDirector();
            setDirectogetDirector(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarDirectogetDirector();
    }, []);

    const listarGeneros = async () => {
        try{
            const { data } = await getGeneros();
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
            const { data } = await getTipos();
            setTipos(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarTipos();
    }, []);

    const listarProductoras = async () => {
        try{
            const { data } = await getProductoras();
            setProductoras(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarProductoras();
    }, []);

    const getMedia = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getMediaPorId(mediaId);
            console.log(data);
            setMedia(data);
            Swal.close();
        } catch(error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getMedia();
    }, [mediaId]);

    useEffect(() => {
        if(media) {
            setValoresForm({
                serial: media.serial,
                modelo: media.modelo,
                descripcion: media.descripcion,
                color: media.color,
                foto: media.foto,
                fechaCompra: media.fechaCompra,
                precio: media.precio,
                director: media.director,
                genero: media.genero,
                tipo: media.tipoEquipo,
                productora: media.productora
            });
        }
    }, [ media ])

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const media = {
            serial, modelo, descripcion, color, foto,
            fechaCompra, precio,
            director: {
                _id: director
            },
            genero: {
                _id: genero
            },
            tipoEquipo:{
                _id: tipo
            },
            productora: {
                _id: productora
            }
        }
        console.log(media);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await actualizarMedia(mediaId, media);
            Swal.close();

        } catch(error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if ( error && error.response && error.response.data) {
                mensaje = error.response.data
            } else {
                mensaje = "Ocurrió un error, por favor intente de nuevo"
            }
            Swal.fire('Error', mensaje, 'error');
        }
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Media</h5>
                </div>  
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={media?.foto} />
                        </div>
                        <div className='col-md-8'>
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
                                            <label  className="form-label">Modelo </label>
                                            <input type="text" name='modelo' 
                                            value={modelo}
                                            onChange={e => handleOnChange(e)}
                                            required 
                                            className='form-control' />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label  className="form-label">Descripción </label>
                                            <input type="text" name='descripcion' 
                                            value={descripcion}
                                            onChange={e => handleOnChange(e)}
                                            required 
                                            className='form-control' />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label  className="form-label">Color </label>
                                            <input type="text" name='color' 
                                            value={color}
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
                                            <label  className="form-label">Fecha Compra </label>
                                            <input type="date" name='fechaCompra' 
                                            value={fechaCompra}
                                            onChange={e => handleOnChange(e)}
                                            required 
                                            className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label  className="form-label">Precio </label>
                                            <input type="number" name='precio' 
                                            value={precio}
                                            onChange={e => handleOnChange(e)}
                                            required 
                                            className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label  className="form-label">Director </label>
                                            <select className='form-select'
                                            required
                                            name= 'director'
                                            value={director}
                                            onChange={e => handleOnChange(e)}>
                                            <option value="">--SELECCIONE--</option>
                                                {
                                                    directogetDirector.map(({ _id, nombre }) => {
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
                                            <label  className="form-label">Género </label>
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
                                            <label  className="form-label">Tipo Equipo</label>
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
                                            <label  className="form-label">Productora</label>
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
                                        <button className="btn btn-primary">Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}
