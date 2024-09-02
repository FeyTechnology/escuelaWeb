'use client'
import styles from './empleado-form.module.css'
import { useOption } from '@/context/OptionContext'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from '@/components/modal/modal'
const EmpleadoForm = ({onClose}) => {
    const {escuela} = useOption();
    const [grupos, setGrupos] = useState([]);
    const [grupo, setGrupo] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [advertencia, setAdvertencia] = useState(false);
    const [advertenciaCerrar,setAdvertenciaCerrar] = useState(false);
    const [guardo, setGuardo] = useState(false);

    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState(null);
    

    const fetchGrupo = async() => {
        
        try{
            const response = await axios.get(`${process.env.API}/grupo/escuela/${escuela}`);
            console.log(response.data.result);
            setGrupos(response.data.result);
            setLoading(false);
        }catch(error){
            console.log(error)
        }
      }

    useEffect(() => {
        setLoading(true);
        fetchGrupo();
    },[])

    const agregarEmpleado = async () => {
        try{
            if(            
                nombre.length <= 0 ||
                apellidoPaterno.length <= 0
            ){
                setAdvertencia(true);
            }else{
                const response = await axios.post(`${process.env.API}/empleado`,
                    {
                        nombre: nombre,
                        apellidoPaterno: apellidoPaterno,
                        apellidoMaterno: apellidoMaterno ,
                        grupoId: grupo,
                        escuelaId: escuela,
                        roleId: 2
                    },
                    
                );
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
                Agregar Empleado
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

            <div className={styles.formItem}>
                <p className={styles.formTitle}>Grupo:</p>
                <select 
                    value={grupo}
                    onChange={(grupo) => setGrupo(grupo.target.value)}
                    multiple={false}
                    className={styles.formInput}>
                <option  
                    value={null}></option>
                {
                    grupos.map((grupo) => (
                    <option 
                        key={grupo.id}
                        value={grupo.id}>{grupo.grupoNombre}</option>
                    ))
                }
                </select>
            </div>
            
            <div className={styles.containerButton}>
                <div 
                    className={styles.button}
                    onClick={() => agregarEmpleado()}
                > 
                    Aceptar
                </div>
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

export default EmpleadoForm;