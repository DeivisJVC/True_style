try {
  fetch("/db.json")
    .then((respuesta) => {
      respuesta.json();
      return respuesta.json();
    })
    .then((datos) => {
      console.log(datos[0]);
    });
} catch (error) {
  console.log(error);
}
