'use strict';

//let idEmpresa = 0


var url_string = window.location.href;
var url = new URL(url_string);
var idEmpresa = url.searchParams.get("id");
const limparFormulario = (endereco) =>{
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep').addEventListener('focusout',pesquisarCep);











// const getEmpresa = () => {

//     const urlListar = 'http://10.107.144.26:8080/empresa/listar'
//     const response = await fetch(urlListar).then(resp => resp.json()).then(dados => dados.content)
//     console.log(response)
//     const options = {
//         method: 'GET',
//     }

// }


const getList = (string) => {
    const variable = document.getElementById(string).value
    const array = [variable]
    return array
}

// const validacao = ({nome, email, senha, telefone}) => {

//     if(nome.length > 3 && nome.length <= 50 && email.length > 9 && email.length <= 100  && senha.length > 3 && senha.length <= 50 && telefone.length > 1 && telefone.length <= 15) {
//         return true

//     } else {
//         return false
//     }

// } 


const listarEmpresa = ({nome, email, senha, telefone, telefone2, areaAtuacao, logo, cep, numero, complemento, descricao, endereco, experiencia, curso, def}) => {
    
}

const cadastrarEmpresa = async() => {
    const empresa = {
        nome: document.getElementById('nome').value,
        email: getList('email'),
        senha: document.getElementById('senha').value,
        telefone: getList('telefone'),
        telefone2: document.getElementById('telefone2').value,
        areaAtuacao: document.getElementById('area-atuacao').value,
        logo: document.getElementById('logo').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        complemento: document.getElementById('complemento').value,
        descricao: document.getElementById('descricao').value
    }
    await postEmpresa(empresa)
}


const setId = (id) => {
    console.log(id)
    sessionStorage.setItem('id', id)
    
}



document.getElementById('btnSalvar').addEventListener('click', cadastrarEmpresa)


const postEmpresa =  async(empresa) => {
    const urlCadastro = 'http://10.107.144.26:8080/empresa/cadastrar'
    const options = {
        method: 'POST',
        body:JSON.stringify(empresa),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        }
    }

    await fetch(urlCadastro, options).then(resp => resp.json()).then(json => {
        idEmpresa = json.id
    }).catch(err => {
        alert("Houve algum erro")
        console.log(err)
    })

}

const exibir = (id) => {
    console.log(id)
}



























const putProduto = async (empresa) => {
    const urlAtualizar = 'http://10.107.144.26:8080/empresa/atualizar/'
    const options = {
        method: 'PUT',
        body: JSON.stringify(empresa),
        headers: {
            'content-Type' : 'application/json'
        }
    }

    await fetch(`${urlAtualizar}${empresa.id}`, options)
}

const deleteProduto = async (empresa) => {
    const urldeletar = 'http://10.107.144.26:8080/empresa/deletar/'
    const options = {
        method: 'DELETE',
        headers: {
            'content-Type' : 'application/json'
        }
    }

    await fetch(`${urldeletar}${empresa.id}`, options)
}




