'use strict';


    var url_string = window.location.href;
    var url = new URL(url_string);
    var idCandidato = url.searchParams.get("id");

    const getVaga = async() => {

    const urlListar = `http://10.107.144.22:8080/vaga/listar/vagas/status?idCandidato=${idCandidato}&idStatus=2`
    const response = await fetch(urlListar).then(resp => resp.json()).then(dados => dados.content)
    return response

    }



    const criarVaga = ({titulo, empresa, localTrabalho, id, deficiencia}) => {
        const vaga = document.createElement('div')
        vaga.classList.add("vagas")
        vaga.innerHTML = `
                <div class="headerVagas">
                    <div class="informacaoVaga">
                        <div class="imgEmpresa">
                            <img src="../img/logoEmpresa.png" alt="">
                        </div>
                        <div class="conteudoVaga">
                            <div class="tituloVaga">
                                <h1>${titulo}</h1>
                                <button></button>
                            </div>
                            <div class="empresaVaga">
                                <img src="../img/empresa.png" alt=""> 
                                <p>${empresa.empresa}</p> 
                            </div>
                            <div class="empresaVaga">
                                <img src="../img/local.png" alt=""> 
                                <p>${localTrabalho.cidade} - ${localTrabalho.sigla}</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footerVagas">
                    <div class="tipoDeficiencia">
                        <h2>Deficiencia: ${deficiencia.map(item => item.tipoDeficiencia)}</h2>
                    </div>
                    <div class="botaoSaibaMais">
                        <button id="btnSaibaMais" onClick="abrirModal(${id})"><p>Saiba mais</p></button>
                    </div>
                </div>
        `

        return vaga;
    }

    const carregarVaga = async() => {
    const container = document.querySelector('.vagasConteiner')
    const vagas = await getVaga();
    const colunas = vagas.map(criarVaga)
    container.replaceChildren(...colunas)
    }

// document.querySelector("#btnSaibaMais").addEventListener("click", abrirModal);

carregarVaga();