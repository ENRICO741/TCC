'use strict';

let statusReturn = 0

const validacao = ({nome, email, senha}) => {

    if(nome.length > 3 && nome.length <= 50 && email.length > 9 && email.length <= 100  && senha.length > 3 && senha.length <= 50) {
        return true

    } else {
        return false
    }

} 

const verificaEmail = () => {
    const url = 'http://10.107.144.22:8080/email/candidato'
    const emailBody = {
        email: document.getElementById('email').value
    }
    const options = {
        method: 'POST',
        body:JSON.stringify(emailBody),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        }
    }
    fetch(url, options).then(resp => {
        cadastrarCandidato(resp.status)

    }).catch(error => {
        console.log("Tudo errado né meu filhoe" + error)
    })
}

const cadastrarCandidato = async(status) => {
    const candidato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        genero: "PREFIRO_NAO_INFORMAR"
    }

    if(status == 200) {
        if(validacao(candidato)) {
            await postCandidato(candidato)

        } else {
            alert("preencha os campos vazios")
        }
    } else {
        alert("Email já em uso")
    }
}

document.getElementById('btnCadastro').addEventListener('click', verificaEmail)


const postCandidato =  async(candidato) => {
    const urlCadastro = 'http://10.107.144.22:8080/candidato/cadastrar'
    const options = {
        method: 'POST',
        body:JSON.stringify(candidato),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        }
    }

    fetch(urlCadastro, options).then(resp => resp.json()).then(json => {
        console.log(json)
    })
   

}

const getCandidato = () => {

    const urlListar = 'http://10.107.144.22:8080/candidato/listar'
    const options = {
        method: 'GET',
    }
    fetch(urlListar, options).then(resp=>console.log(resp))

}

const putProduto = async (candidato) => {
    const urlAtualizar = 'http://10.107.144.22:8080/candidato/atualizar/'
    const options = {
        method: 'PUT',
        body: JSON.stringify(candidato),
        headers: {
            'content-Type' : 'application/json'
        }
    }

    await fetch(`${urlAtualizar}${candidato.id}`, options)
}

const deleteProduto = async (candidato) => {
    const urldeletar = 'http://10.107.144.22:8080/candidato/deletar/'
    const options = {
        method: 'DELETE',
        headers: {
            'content-Type' : 'application/json'
        }
    }

    await fetch(`${urldeletar}${candidato.id}`, options)
}


