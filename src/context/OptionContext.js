'use client'
import { createContext,useState,useContext } from "react";

const OptionContext = createContext(null);

export function useOption() {
  return useContext(OptionContext);
}


export function OpcionProvider(props) {
    const [escuela, setEscuela] = useState(null);
    const [grupo, setGrupo] = useState(null);
    const [profesor, setProfesor] = useState(null);
    const [alumno, setAlumno] = useState(null);

    return (
        <OptionContext.Provider
            value={{
                escuela,
                setEscuela: (e) => setEscuela(e),
                grupo,
                setGrupo: (e) => setGrupo(e),
                profesor,
                setProfesor: (e) => setProfesor(e),
                alumno,
                setAlumno:(e) => setAlumno(e)
            }}
        >
        {props.children}
        </OptionContext.Provider>
    );
}