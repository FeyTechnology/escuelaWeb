'use client'
import Image from "next/image";
import styles from "./page.module.css";
import AlumnoForm from "@/components/forms/alumno/alumno-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useOption } from "@/context/OptionContext";
const Home = () => {
  const {
    escuela, 
    setEscuela, 
    grupo, 
    setGrupo,
    alumno,
    setAlumno
    } = useOption();

  const [escuelas, setEscuelas] = useState([]);
  const [director, setDirector] = useState(null);
  const [grupos, setGrupos] = useState([]);

  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  const [isLoading, setLoading] = useState(false);
  
  const fetchEscuela = async() => {
      try{
          const response = await axios.get(`${process.env.API}/escuela`);
          setEscuelas(response.data.result);
          setLoading(false)
      }catch(error){
          setLoading(false);
          console.log(error)
      }
  }

  useEffect(() => {
    setLoading(true)
    fetchEscuela();

  }, [])

  const onSelectEscuela = async(escuela) => {
    setEscuela(escuela.target.value);
    try{
        const dataDirector = await axios.get(`${process.env.API}/empleado/director/${escuela.target.value}`);
        setDirector(dataDirector.data.result);
        
        const fetchGroup = await axios.get(`${process.env.API}/grupo/escuela/${escuela.target.value}`);
        setGrupos(fetchGroup.data.result);

    }catch(error){
        setLoading(false);
        setDirector("");
        setGrupos([]);
        setProfesores([]);
        setAlumnos([]);

        setGrupo(null);
        setAlumno(null);
        console.log(error)
    }
  }

  const onSelectGrupo = async(grupo) => {
    setGrupo(grupo.target.value);
    try{
        const dataProfesor = await axios.get(`${process.env.API}/empleado/profesor/${grupo.target.value}`);
        setProfesores(dataProfesor.data.result);

        const dataAlumnos = await axios.get(`${process.env.API}/alumno/grupo/${grupo.target.value}`);
        console.log(dataAlumnos.data.result)
        setAlumnos(dataAlumnos.data.result);
    }catch(error){
        setLoading(false);
        console.log(error)
    }
  }

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
    
  if (isLoading) return <p>Cargando...</p>
  return (
    <main className={styles.main}>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>

          <div className={styles.formItem}>
            <p className={styles.formTitle}>Escuela:</p>
            <select 
              multiple={false}
              className={styles.formInput} 
              value={escuela} 
              onChange={(escuela) => onSelectEscuela(escuela)}>
              <option  
                  value={""}></option>
              {
                escuelas.map((escuela) => (
                  <option 
                    key={escuela.id}
                    value={escuela.id}>{escuela.nombreEscuela}</option>
                ))
              }
              
            </select>
          </div>

          <div className={styles.formItem}>
            <p className={styles.formTitle}>Director:</p>
            <p className={styles.formTitle}>
              {director ? 
              `${director.nombre} ${director.apellidoPaterno}` 
              : "Sin seleccionar"}
            </p>
          </div>

          <div className={styles.formItem}>
            <p className={styles.formTitle}>Grupo:</p>
            <select 
              value={grupo}
              onChange={(grupo) => onSelectGrupo(grupo)}
              multiple={false}
              className={styles.formInput}>
              <option  
                  value={""}></option>
              {
                grupos.map((grupo) => (
                  <option 
                    key={grupo.id}
                    value={grupo.id}>{grupo.grupoNombre}</option>
                ))
              }
            </select>
          </div>

          <div className={styles.formItem}>
            <p className={styles.formTitle}>Profesor:</p>
            <select 
              multiple={false}
              className={styles.formInput}>
              {
                profesores.map((profesor) => (
                  <option 
                    key={profesor.id}
                    value={profesor.id}>{profesor.nombre} {profesor.apellidoPaterno}</option>
                ))
              }
            </select>
          </div>

          <div className={styles.tableContainer}>
            {/* Header table */}
            <div className={styles.tableHeader}>
              <div className={styles.tableTitle}>
                <p>Nombre</p>
              </div>
              <div className={styles.tableTitle}>
                <p>Telefono</p>
              </div>
              <div className={styles.tableTitle}>
                <p>Estado</p>
              </div>
            </div>

            {/* Items table */}
            
            {
              alumnos == null || alumnos?.length == 0
              
              ? <p className={styles.formTitle}>Sin resultado</p> : 
              
              alumnos?.map((value) => (
                <div 
                  key={value.id}
                  onClick={() => setAlumno(value.id)}
                  className={value.id == alumno ? styles.tableItemContainerSelect : styles.tableItemContainer}>
                  <div className={styles.tableItem}>
                    <p>{value.nombre} {value.apellidoPaterno}</p>
                  </div>
                  <div className={styles.tableItem}>
                    <p>{value.telefono}</p>
                  </div>
                  <div className={styles.tableItem}>
                    <p>{value.estadoNombre}</p>
                  </div>
                </div>  
              ))
            }
            


          </div>

        </div>  
      </div>
    </main>
  );
}
export default Home;