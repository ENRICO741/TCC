'use strict';


let idBeneficio

let data = {
 titulo: document.getElementById('tituloVaga').value,

}

const limparElementos = (elemento) => {
    while(elemento.firstChild) {
        elemento.removeChild(elemento.lastChild);
    }
}

const criarBeneficio = ({beneficio, id}) => {
    const container = document.querySelector(".beneficios")
    const linha = document.createElement('div');
    linha.innerHTML = `
    <div class="checkboxBeneficios">
        <div class="checkbox">
            <input type="checkbox" id="${id}"> ${beneficio}
        </div>
    </div>`

    container.appendChild(linha)
}


const criarOptionGrau =  ({nivel , id}, event) => {
    const container = document.querySelector("#selectGrau")
    const linha = document.createElement('option');
    linha.value = id
    linha.textContent = nivel
    container.appendChild(linha)


    console.log('nivel', id)
    const nivelSelecionado = document.getElementById('selectGrau').value
    
}

const criarOptionCurso = ({curso, id}) => {
    const container = document.querySelector("#selectCurso")
    const linha = document.createElement('option');
    linha.value = id
    linha.textContent = curso
    container.appendChild(linha)
}

const getCursos = async(id) => {
    console.log('id cursos ', id)
    limparElementos(document.querySelector('#selectCurso'))
    const urlListar = `http://10.107.144.26:8080/curso/listar?idNivel=${id}`
    const options = {
        method: 'GET',
    }

    fetch(urlListar, options)
    .then(resp => resp.json())
    .then(json => {
        const conteudo = json.content
        conteudo.map(criarOptionCurso)
    })
    .catch(err => {
        console.log(err)
    })
}

const getBeneficio = async() => {
    const urlListar = 'http://10.107.144.26:8080/vaga/listar/beneficio'
    const options = {
        method: 'GET',
    }

    fetch(urlListar, options)
    .then(resp => resp.json())
    .then(json => {
        const conteudo  = json.content
        conteudo.map(criarBeneficio)
    })
    .catch(err => {
        
        console.log(err)
    })
}

const getNivel = async() => {
    limparElementos(document.querySelector('#selectGrau'))
    const urlListar = 'http://10.107.144.26:8080/curso/nivel/listar'
    const options = {
        method: 'GET',
    }

    fetch(urlListar, options)
    .then(resp => resp.json())
    .then(json => {
        const conteudo = json.content
        conteudo.map(criarOptionGrau)
    })
    .catch(err => {
        console.log(err)
    })
}

//deficiencia
const criarOptionTipoDeficiencia = ({tipo, id}) => {
    const container = document.getElementById("selectTipoDeficiencia")
    const linha = document.createElement('option');
    linha.value = id
    linha.textContent = tipo
    container.appendChild(linha)

    // console.log('tipo deficiencia',tipoDeficiencia)
}

const criarOptionDeficiencia = ({deficiencia, id}) => {
    const container = document.getElementById("selectDeficiencia")
    const linha = document.createElement('option');
    console.log( 'íd deficiencia ', id)
    linha.value = id
    linha.textContent = deficiencia
    container.appendChild(linha)
}


const getTipoDeficiencia = async() => {
    limparElementos(document.getElementById('selectTipoDeficiencia'))
    const urlListar = 'http://10.107.144.26:8080/deficiencia/listar/tipo'
    const options = {
        method: 'GET',
    }

    fetch(urlListar, options)
    .then(resp => resp.json())
    .then(json => {
        const conteudo = json.content
        conteudo.map(criarOptionTipoDeficiencia)
    })
    .catch(err => {
        console.log(err)
    })
}

const getDeficiencia = async (id) => {
    limparElementos(document.getElementById('selectDeficiencia'))
    const urlListar = `http://10.107.144.26:8080/deficiencia/listar/${1}`
    const options = {
        method: 'GET',
    }

    fetch(urlListar, options)
    .then(resp => resp.json())
    .then(json => {
        const conteudo = json.content
        conteudo.map(criarOptionDeficiencia)
    })
    .catch(err => {
        console.log('erro ', err)
    })
}

const getValueSect =  () => {
    var opcaoValor =  document.querySelector("#selectGrau").value;
    var opcaoText = document.querySelector("#selectGrau").text;

    getCursos(opcaoValor)
}


const getValueDeficiencia = () => {
    var opcaoValor =  document.getElementById('selectDeficiencia').value;
    var opcaoText = document.getElementById('selectDeficiencia').text;

   getDeficiencia(opcaoValor)
}




//informacoes vagas

console.log('titulo ', data.titulo)
   








const carregaPagina = () => {
    getBeneficio()
    getNivel()
 getTipoDeficiencia()
}

document.addEventListener("DOMContentLoaded", carregaPagina);

document.getElementById("selectGrau").addEventListener("change", getValueSect);
document.getElementById("selectTipoDeficiencia").addEventListener("change", getValueDeficiencia);

