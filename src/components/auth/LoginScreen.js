import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../actions/auth';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm( {
        lEmail:'',
        lPassword:''
    });

    const [ formRegisterValues, handleInputRegisterChange ] = useForm( {
        rEmail:'',
        rName:'',
        rPassword:'',
        rPassword2:''
    });

    
    const {lEmail,lPassword} = formValues;
    const {rEmail,rName, rPassword, rPassword2} = formRegisterValues;


    const handleLogin = (e)=>{
        e.preventDefault();
        dispatch(startLogin( lEmail,lPassword ));

    }

    const handleRegisterSubmit = (e)=>{
        e.preventDefault();
        if(rPassword!==rPassword2)
            return Swal.fire('Ups!','Las contraseñas deben ser iguales','error');

        dispatch(startRegister(rEmail,rName,rPassword));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lEmail'
                                value={lEmail}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lPassword'
                                value={lPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                onChange={handleInputRegisterChange}
                                name='rName'
                                value={rName}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                onChange={handleInputRegisterChange}
                                name='rEmail'
                                value={rEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                onChange={handleInputRegisterChange}
                                name='rPassword'
                                value={rPassword}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                onChange={handleInputRegisterChange}
                                name='rPassword2'
                                value={rPassword2}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}