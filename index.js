async function traerDatos(data) {
  const datosDesafio = await data;
  const resJson = await datosDesafio.json();
  const itemsJson = resJson.items;
  return itemsJson;
}

async function agregarElem(objResp) {
  // recibe una promesa
  const objContentful = await objResp;
  //Elemento html a ser rellenado
  const contenedorDeDesafiosEl = document.querySelector(
    ".contenedor-de-desafios"
  );
  for (const r of objContentful) {
    const template = document.querySelector("#template-desafio");
    //modif del titulo
    const tituloDesafioEl = template.content.querySelector(".titulo-desafio");
    tituloDesafioEl.textContent = r.fields.tituloDesafio;
    //modif del descripcion
    const descripDesafioEl = template.content.querySelector(
      ".descripcion-desafio"
    );
    descripDesafioEl.textContent =
      r.fields.descripcionDelDesafio.content[0].content[0].value;
    //modif de la imagen
    const imgDesafioEl = template.content.querySelector(".imagen-desafio");
    imgDesafioEl.src = r.fields.linkDeImg;

    //modif de la url
    const urlDesafioEl = template.content.querySelector(".url-desafio");
    urlDesafioEl.href = r.fields.url;

    const clone = document.importNode(template.content, true);
    contenedorDeDesafiosEl.appendChild(clone);
  }
}

async function main() {
  const datosDeDesafios = await fetch(
    "https://cdn.contentful.com/spaces/lru2eo6cin9q/environments/master/entries?access_token=JlPlT8g0SoQCSonw6hgCrg16S1UyPni8Ur8giQL-6LQ"
  );
  const datosParseados = await traerDatos(datosDeDesafios);

  const datosAElemHTML = await agregarElem(datosParseados);
}

main();
