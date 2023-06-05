import { useState } from "react"
import { actualizarCasa, verCasa } from "../../data/data"
import { useEffect } from "react"

function Registro({id}) {
    const [updateCasa, setNewCasa] = useState({
        tipo_casa: "",
         direccion: "", 
         costo: "", 
         medidas:{
            largo:0,
            ancho:0
        }, 
         num_pisos: "", 
         descripcion: "", 
         capacida_max_personas: "", 
         estado: ""
      })

      useEffect(() => { 
       (async()=>{
        const casa = await verCasa(id)
        setNewCasa(casa)
    })()
      }, [id])
      

 
    const handleTarget = ({ target }) => {
        const { name, value } = target;
      
        if (name.includes("medidas.")) {
          const [parentName, childName] = name.split(".");
          setNewCasa({...updateCasa, medidas: { ...updateCasa.medidas, [childName]: value}});
        } else {
          setNewCasa({...updateCasa,[name]: value});
        }
      };
      
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await  actualizarCasa(id,updateCasa)
    }

    return (
        <div>


            <div className="modal " id="actualizarCasa" tabIndex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalTitleId">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit    }>
                            <div className="modal-body">

                                <div className="form mb-3">
                                    <select className="form-select form-select-sm" aria-label=".form-select-sm example" name="tipo_casa" value={updateCasa.tipo_casa} id="formId1" onChange={handleTarget}>
                                        <option selected >Tipo Casa...</option>
                                        <option value="Casa Ecologica">Casa Ecologica</option>
                                        <option value="Cabaña">Cabaña</option>
                                        <option value="Casa Industrial">Casa Industrial</option>
                                    </select>
                                    
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control" name="direccion" value={updateCasa.direccion}  id="formId1" onChange={handleTarget}  />
                                    <label htmlFor="formId1">Direccion</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text" className="form-control" name="costo" value={updateCasa.costo} onChange={handleTarget} id="formId1"  />
                                    <label htmlFor="formId1">Costo</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="number" className="form-control" name="medidas.ancho" value={updateCasa?.medidas?.ancho}   onChange={handleTarget} id="formId1"  />
                                    <label htmlFor="formId1">Medidas Ancho</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="number" className="form-control" name="medidas.largo" value={updateCasa?.medidas?.largo}   onChange={handleTarget} id="formId1"  />
                                    <label htmlFor="formId1">Medidas Largo</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="Number" className="form-control" name="num_pisos" value={updateCasa.num_pisos}  onChange={handleTarget} id="formId1"  />
                                    <label htmlFor="formId1">Numero de Pisos</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text" className="form-control"  onChange={handleTarget} value={updateCasa.descripcion} name="descripcion" id="formId1"  />
                                    <label htmlFor="formId1">Descripcion</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text" className="form-control"  onChange={handleTarget} value={updateCasa.capacida_max_personas} name="capacida_max_personas" id="formId1"  />
                                    <label htmlFor="formId1">Capacidad maxima de personas</label>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>







        </div>
    )
}

export default Registro
