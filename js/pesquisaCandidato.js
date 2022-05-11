'use strict';

const getVaga = async() => {

    const urlListar = 'http://10.107.144.26:8080/candidato/listar'
    const response = await fetch(urlListar).then(resp => resp.json()).then(dados => dados.content)
    console.log(response)
    return response

}

const salvarVaga = () => {
    
}

const criarVaga = ({nome, endereco, experiencia, curso, deficiencia}) => {
 
 
        const vaga = document.createElement('div')
        vaga.classList.add("candidatos")
        vaga.innerHTML = `
        <div class="headerCandidatos">
        <div class="informacaoCandidatos">
            <div class="conteudoCandidato">
                <h1>${nome}</h1>
                <div class="localCandidato">
                    <img src="../img/local.png" alt=""> 
                    <p>${endereco && endereco.cidade+ ' - ' + endereco.sigla}</p> 
                </div>
                <div class="localCandidato">
                    <img src="../img/formacao.png" alt=""> 
                   <p> ${curso && curso.map(item => item.curso)}</p>
                </div>
            </div>
        </div>
        <div class="tipoDeficiencia">
        <h2>Deficiencia: ${deficiencia && deficiencia.map(item => item.tipoDeficiencia)}</h2>
        </div>
    </div>
    <div class="footerCandidatos">
        <div class="botaoSaibaMais">
            <button>Saiba mais</button>
        </div>
    </div>
        `

        return vaga;
}

const carregarVaga = async() => {
    const container = document.querySelector('.candidatosConteiner')
    const vagas = await getVaga();
    const colunas = vagas.map(criarVaga)
    container.replaceChildren(...colunas)
}


document.addEventListener('DOMContentLoaded', carregarVaga)