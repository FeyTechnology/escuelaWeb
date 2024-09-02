'use client'
import styles from './alumno-form.module.css'
import { useOption } from '@/context/OptionContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '@/components/modal/modal'
const AlumnoForm = ({alumno, onClose}) => {
    const {escuela, grupo} = useOption();

    const [advertencia, setAdvertencia] = useState(false);
    const [advertenciaCerrar,setAdvertenciaCerrar] = useState(false);
    const [guardo, setGuardo] = useState(false);

    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState(null);
    const [telefono, setTelefono] = useState(null);
    const [estado, setEstado] = useState(null);
    const [estados, setEstados] = useState([]);

    const fetchEstado = async() => {
        try{

            const response = await axios.get(`${process.env.API}/estado`);
            setEstados(response.data.result);
            
        }catch(error){
            console.log(error)
        }
    }
    const fetchAlumno = async() => {
        
        try{

            const response = await axios.get(`${process.env.API}/alumno/${alumno}`);
            setNombre(response.data.result.nombre);
            setApellidoPaterno(response.data.result.apellidoPaterno);
            setApellidoMaterno(response.data.result.apellidoMaterno);
            setTelefono(response.data.result.telefono);
            setEstado(response.data.result.estadoId);
            
        }catch(error){
            console.log(error)
        }
      }

    useEffect(() => {
        if(alumno){
            fetchEstado();
            fetchAlumno();
        }
        
    },[])

    const agregarAlumno = async () => {
        try{
            if(            
                nombre.length <= 0 ||
                apellidoPaterno.length <= 0
            ){
                setAdvertencia(true);
            }else{
                const response = await axios.post(`${process.env.API}/alumno`,
                    {
                        nombre: nombre,
                        apellidoPaterno: apellidoPaterno,
                        apellidoMaterno: apellidoMaterno ,
                        telefono: telefono,
                        grupoId: grupo,
                        escuelaId: escuela,
                       
                    },
                    
                );
                setGuardo(true);
            }
        }catch(error){
            console.log(error);
        }
    }
    const editarAlumno = async () => {
        try{
            if(            
                nombre.length <= 0 ||
                apellidoPaterno.length <= 0
            ){
                setAdvertencia(true);
            }else{
                const response = await axios.put(`${process.env.API}/alumno/${alumno}`,
                    {
                        id: alumno,
                        nombre: nombre,
                        apellidoPaterno: apellidoPaterno,
                        apellidoMaterno: apellidoMaterno,
                        telefono: telefono,
                        grupoId: grupo,
                        estadoId: estado
                       
                    },
                    
                );
                console.log(response.data.result);
                setGuardo(true);
            }
        }catch(error){
            console.log(error);
        }
    }
    return(
    <div className={styles.formWrapper}>
        {
            advertenciaCerrar ? 
            <Modal>
                <p className={styles.titulo}>Seguro deseas cancelar la alta?</p>
                <div className={styles.containerButton}>
                    <div 
                        className={styles.button}
                        onClick={onClose}
                    > 
                        Si, deseo salir
                    </div>
                    <div 
                        className={styles.button}
                        onClick={() => setAdvertenciaCerrar(false)}
                    > 
                        No, me quedo
                    </div>
                </div>
            </Modal> : null
        }
        {
            guardo ? 
            <Modal>
                <p className={styles.titulo}>Se guardo correctamente</p>
                <div className={styles.containerButton}>
                    
                    <div 
                        className={styles.button}
                        onClick={onClose}
                    > 
                        Cerrar
                    </div>
                </div>
            </Modal> : null
        }
        <div className={styles.formContainer}>
            <div className={styles.titulo}>
                {
                    alumno ? "Editar alumno" : "Agregar Alumno"
                }
                
            </div>

            <div className={styles.formItem}>
                <p className={styles.formTitle}>Nombre:</p>
                <input 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className={advertencia && nombre == ""? styles.formError : styles.formInput} />
                {
                    advertencia && nombre.length <= 0 ? <p className={styles.error}>*Obligatorio</p> : null
                }
                
            </div>

            <div className={styles.formItem}>
                <p className={styles.formTitle}>Apellido paterno:</p>
                <input
                    value={apellidoPaterno}
                    onChange={(e) => setApellidoPaterno(e.target.value)}
                    className={advertencia && apellidoPaterno === ""? styles.formError : styles.formInput} />
                {
                    advertencia && apellidoPaterno.length <= 0 ? <p className={styles.error}>*Obligatorio</p> : null
                }
            </div>

            <div className={styles.formItem}>
                <p className={styles.formTitle}>Apellido materno:</p>
                <input 
                    value={apellidoMaterno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                    className={styles.formInput} />
            </div>
            <div className={styles.containerInput}>
                <div className={styles.formItem}>
                    <p className={styles.formTitle}>Telefono:</p>
                    <input 
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        type={"number"}
                        className={styles.formInput} />
                </div>
                {
                    alumno ? 
                    <div className={styles.formItem}>
                        <p className={styles.formTitle}>Estado:</p>
                        <select 
                            
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className={styles.formInput}>
                            {
                                estados.map((item) => (
                                <option 
                                    key={item.id}
                                    value={item.id}>{item.estadoNombre}</option>
                                ))
                            }
                        </select>
                    </div> : null
                }
                
            </div>
            <div className={styles.containerButton}>
                {
                    alumno ? 
                    <div 
                        className={styles.button}
                        onClick={() => editarAlumno()}
                    > 
                        Editar
                    </div> :
                    <div 
                        className={styles.button}
                        onClick={() => agregarAlumno()}
                    > 
                        Aceptar
                    </div>
                }
                
                <div 
                    className={styles.button}
                    onClick={() => setAdvertenciaCerrar(true)}
                > 
                    Cancelar
                </div>
            </div>
            
        </div>  
    </div>
    );
}

export default AlumnoForm;