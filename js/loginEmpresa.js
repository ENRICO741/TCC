let idEmpresa

const recuperarDados = async() => {
    const dados = {
        login: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }
    
    await autenticar(dados)
}

const autenticar = (dados) => {
    const url = 'http://10.107.144.26:8080/auth/empresa'
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
        console.log(json)
        // if(json.status == 200) {
        //     idEmpresa = json.content.id
        //     window.location.href = `listagemCandidatos.html?id=${idEmpresa}`
        // }
    })
}


document.getElementById('btnEntrar').addEventListener('click', recuperarDados)