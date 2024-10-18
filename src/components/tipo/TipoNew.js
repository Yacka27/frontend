import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { crearTipo } from '../../services/tipoService'; // Cambia a tu servicio de tipo


export const TipoNew = ({ handleOpenModal, listarTipos }) => {  // Cambia a listarTipos


    const [valoresForm, setValoresForm] = useState([]);
    const { nombre = '', estado = '', fechaCreacion = '', fechaActualizacion = '' } = valoresForm;

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const tipo = {  // Cambia "director" a "tipo"
            nombre, estado, fechaCreacion, fechaActualizacion
        };
        console.log(tipo);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await crearTipo(tipo);  // Cambia a crearTipo
            handleOpenModal();
            listarTipos();  // Cambia a listarTipos
            Swal.close();

        } catch (error) {
            console.log(error);
            Swal.close();
        }
    };

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>

                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Crear Tipo</h3> {/* Cambia el título a "Crear Tipo" */}
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}> </i>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <hr />
                        </div>
                    </div>

                    <form onSubmit={(e) => handleOnSubmit(e)}>
                        <div className='row'>

                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name='nombre'
                                        value={nombre}
                                        onChange={e => handleOnChange(e)}
                                        required
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Estado </label>
                                    <select required name='estado' value={estado} className="form-select" onChange={(e) => handleOnChange(e)} >
                                        <option value="">--SELECCIONE--</option> {/* Elimina "selected" */}
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>

                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Fecha Creación </label>
                                    <input type="date" name='fechaCreacion'
                                        value={fechaCreacion}
                                        onChange={e => handleOnChange(e)}
                                        required
                                        className='form-control' />
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
    );
};