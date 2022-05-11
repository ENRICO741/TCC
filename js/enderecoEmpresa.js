'use strict';

// let idEmpresa = URLSearchParams.get('id')

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




const validacao = ({rua, numero, bairro, cidade, estado, cep}) => {

    if(rua.length > 3 && rua.length <= 100 && numero.length > 1 && numero.length <= 5  && bairro.length > 6 && bairro.length <= 100 && cidade.length > 5 && cidade.length <= 100 && estado.length > 1 && estado.length < 3 && cep.length >= 8 && cep.length <= 10) {
        return true

    } else {
        return false
    }

} 


const cadastrarEnderecoEmpresa = async() => {
    const endereco = {
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value
    }
    // await postEnderecoEmpresa(endereco, getId())
    if(validacao(endereco)) {
        await postEnderecoEmpresa(endereco, getId())
        
    } else {
        alert("preencha os campos vazios")
    }
}


const getId = () => {
    return idEmpresa
}
document.getElementById('btnCadastro').addEventListener('click', cadastrarEnderecoEmpresa)


const postEnderecoEmpresa =  async(endereco, id) => {
    const urlCadastro = `http://10.107.144.26:8080/empresa/cadastrar/endereco/${id}`
    const options = {
        method: 'POST',
        body:JSON.stringify(endereco),
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
        }
    }

    await fetch(urlCadastro, options).then(resp => {
        window.location.href = 'login.html'
    }).catch(err => {
        console.log('Ocorreu um erro ' + err)
    })

}
