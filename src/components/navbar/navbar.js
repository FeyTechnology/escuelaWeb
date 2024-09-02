'use client'
import Image from 'next/image';
import styles from './navbar.module.css'
import AlumnoForm from '../forms/alumno/alumno-form';
import { useEffect, useState } from 'react';
import Modal from '../modal/modal';
import EmpleadoForm from '../forms/empleado/empleado-form';
import { useOption } from '@/context/OptionContext';
const Navbar = () => {
    const [showModalAlumno, setShowModalAlumno] = useState(false);
    const [showModalEmpleado, setShowModalEmpleado] = useState(false);
    const [showModalAlumnoEditar, setShowModalAlumnoEditar] = useState(false);



    const {escuela, grupo, alumno} = useOption();


    return(
        <>
            <nav className={styles.navbar}>
                <div className="navbar-left">
                    <p href="/" className="logo">
                    Administración
                    </p>
                </div>
                <div className={styles.buttonContainer}> 
                    
                    <div 
                        className={escuela && grupo ? styles.button : styles.block}
                        onClick={escuela && grupo ? () => setShowModalAlumno(true) : null}>
                        <Image 
                            src="/assets/boton-mas.png"
                            width={20}
                            height={20}
                            alt="alta"
                            className={styles.iconButton}
                        />
                        Agregar Alumno
                    </div> 
                    
                    
                    
                    <div 
                        className={escuela && grupo && alumno ? styles.button : styles.block}
                        onClick={escuela && grupo && alumno  ? () => setShowModalAlumnoEditar(true) : null}
                        >
                        <Image 
                            src="/assets/editar.png"
                            width={20}
                            height={20}
                            alt="editar"
                            className={styles.iconButton}
                        />
                        Modificar Alumno
                    </div>
                    <div 
                        className={escuela ? styles.button : styles.block}
                        onClick={escuela ? () => setShowModalEmpleado(true) : null}
                        >
                        <Image 
                            src="/assets/usuario.png"
                            width={20}
                            height={20}
                            alt="empleado"
                            className={styles.iconButton}
                        />
                        Agregar Empleado
                    </div>
                    
                
                </div>
                <div className="navbar-right">
                    <span className="cart-count">Skywork</span>
                </div>
            </nav>
            {
                showModalAlumno &&
                <Modal>
                    <AlumnoForm 
                        alumno={null}
                        onClose={() => setShowModalAlumno(false)}/>
                </Modal>
            }
            {
                showModalAlumnoEditar &&
                <Modal>
                    <AlumnoForm 
                        alumno={alumno}
                        onClose={() => setShowModalAlumnoEditar(false)}/>
                </Modal>
            }
            {
                showModalEmpleado &&
                <Modal>
                    <EmpleadoForm 
                        
                        onClose={() => setShowModalEmpleado(false)}/>
                </Modal>
            }
        </>
    );
}

export default Navbar;