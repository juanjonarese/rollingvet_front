 const urlUsuarios = "http://localhost:8080/usuarios";

const loginUsuario = async (datos) => {
  const resp = await fetch (urlUsuarios+"/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const data = await resp.json();
  
  return data

};




const registrarUsuario = async (datos) =>{
  const resp = await fetch (urlUsuarios + "/", {
     method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos)
})
const data = await resp.json();
return {...data,
  status: resp.status
}
}


export { loginUsuario, registrarUsuario };