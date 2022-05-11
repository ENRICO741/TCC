'use strict';

let idCandidato

const recuperarDados = async() => {
    const dados = {
        login: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }
    
    await autenticar(dados)
}

const autenticar = (dados) => {
    const url = 'http://10.107.144.22:8080/auth/candidato'
    const options = {
        method: 'POST',
        body:JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        }
    }
    fetch(url, options)
    .then(resp => resp.json())
    .then(json => {
        idCandidato = json.id
        if(idCandidato != null) {
            console.log(idCandidato)
            window.location.href = `vagasSalvas.html?id=${idCandidato}`
        }
    })
}


document.getElementById('btnEntrar').addEventListener('click', recuperarDados)