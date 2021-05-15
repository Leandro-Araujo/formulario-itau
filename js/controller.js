// Funcao utilizada para verificar se existe algum campo vazio

var clientesGeral = [];

function verificarObrigatorios(campos){
//Ela recebe apenas os campos obrigatorios e verifica se o valor esta vazio
	let verificado = true;
	for (var i = campos.length - 1; i >= 0; i--) {
		if (Object.values(campos[i])[0] == '') {
			document.getElementById("span"+Object.keys(campos[i])[0]).innerHTML="* campo obrigatorio";  
			verificado = false;
		}
		else{
			document.getElementById("span"+Object.keys(campos[i])[0]).innerHTML="*";		
		}
	}	
	return verificado;
}

function autenticaCPF(cpf){
	let padraocpf = /[0-9]{11}/;
	let compara = padraocpf.exec(cpf.value);
	if(cpf.length != 11)	return false;
	else{
		var numeros = cpf.substring(0, 9);
		var digitos = cpf.substring(9);
		var soma = 0;
		for(var i = 10; i > 1; i--)		soma += numeros.charAt(10 - i) * i;		
		// validacao do primeiro digito
		var resultado = soma % 11 < 2 ? 0 : 11- (soma % 11);
		if(resultado != digitos.charAt(0))	return false;		
		soma = 0;
		numeros = cpf.substring(0,10);
		for(var k = 11; k > 1; k--)		soma += numeros.charAt(11 - k) * k;		
		resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
		if(resultado != digitos.charAt(1))	return false;
		return true;
	}
}

function verificaCPF(cpf){
	let padraocpf = /[0-9]{11}/;
	var compara = padraocpf.exec(cpf.value);
	if (!compara) {
		document.getElementById('aviso').classList.remove('aviso');
		document.getElementById('aviso').classList.add('avisorestricted');
	}
	else{
		document.getElementById('aviso').classList.add('aviso');
		document.getElementById('aviso').classList.remove('avisorestricted');
	}

}

function buscaCEP(cep){
	estado = {
		'AC': 'Acre',    'AL': 'Alagoas',    'AP': 'Amapá',    'AM': 'Amazonas',    'BA': 'Bahia',
    'CE': 'Ceará',    'DF': 'Distrito Federal',    'ES': 'Espírito Santo',    'GO': 'Goiás',
    'MA': 'Maranhão',    'MT': 'Mato Grosso',    'MS': 'Mato Grosso do Sul',    'MG': 'Minas Gerais',
    'PA': 'Pará',    'PB': 'Paraíba',    'PR': 'Paraná',    'PE': 'Pernambuco',    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',    'RN': 'Rio Grande do Norte',    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',    'RR': 'Roraima',    'SC': 'Santa Catarina',    'SP': 'São Paulo',
    'SE': 'Sergipe',    'TO': 'Tocantins'	};
	let url = 'http://viacep.com.br/ws/' + cep.value + '/json';
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status = 200){
				if(!JSON.parse(xhr.responseText).erro){					
					document.getElementById('endereco').value = JSON.parse(xhr.responseText).logradouro;
					document.getElementById('bairro').value = JSON.parse(xhr.responseText).bairro;
					document.getElementById('cidade').value = JSON.parse(xhr.responseText).localidade;
					document.getElementById('estado').value = estado[JSON.parse(xhr.responseText).uf];

				}
				else{
					document.getElementById('endereco').value = '';
					document.getElementById('bairro').value = '';
					document.getElementById('cidade').value = '';
					document.getElementById('estado').value = '';
				}
			}
			//console.log(JSON.parse(xhr.responseText));
                //preencheCampos(JSON.parse(xhr.responseText));
        }
    }
    xhr.send();
}

function verificaCEP(cep){
	let padraoCEP = /[0-9]{8}/;
	var compara = padraoCEP.exec(cep.value);
	if(!compara){
		document.getElementById('avisocpf').classList.remove('aviso');
		document.getElementById('avisocpf').classList.add('avisorestricted');
	}
	else{
		buscaCEP(cep);
		document.getElementById('avisocpf').classList.add('aviso');
		document.getElementById('avisocpf').classList.remove('avisorestricted');
	}
}

function enviarFormulario(evt, campos) {
    let nome =     document.getElementById('nome').value;
    let cpf =      document.getElementById('cpf').value;
    let rg =       document.getElementById('rg').value;
    let sexo =     document.getElementById('sexo').value;
    let cep =      document.getElementById('cep').value;
    let endereco = document.getElementById('endereco').value;
    let numero =   document.getElementById('numero').value;
    let bairro =   document.getElementById('bairro').value;
    let cidade =   document.getElementById('cidade').value;
    let estado =   document.getElementById('estado').value;
    let telefone = document.getElementById('telefone').value;
    let celular =  document.getElementById('celular').value;
    let dadosclie = {
    	nome, cpf, rg, sexo, cep, endereco, numero, bairro, cidade, estado, telefone, celular
    }    
    let verifica = verificarObrigatorios(
    	[{nome: dadosclie.nome}, 
    	{cpf:dadosclie.cpf}, 
    	{endereco: dadosclie.endereco}, 
    	{numero: dadosclie.numero}, 
    	{celular:dadosclie.celular}]);

    if(verifica){
    	if(autenticaCPF(cpf)){
			document.getElementById('alertaerrorcpf').style.display = "none";	
			document.getElementById('alertasucesso').style.display = "block";
			document.getElementById('alertaerror').style.display = "none";
				document.getElementById('nome').value = '';
				document.getElementById('cpf').value = '';
				document.getElementById('rg').value = '';
				document.getElementById('sexo').value = '';
				document.getElementById('cep').value = '';
				document.getElementById('endereco').value = '';
				document.getElementById('numero').value = '';
				document.getElementById('bairro').value = '';
				document.getElementById('cidade').value = '';
				document.getElementById('estado').value = '';
				document.getElementById('telefone').value = '';
				document.getElementById('celular').value = '';
				clientesGeral.push(dadosclie);
				console.log(clientesGeral);
		}
		else{
			document.getElementById('alertaerrorcpf').style.display = "block";
			document.getElementById('alertasucesso').style.display = "none";
			document.getElementById('alertaerror').style.display = "none";
		}
    }
	else{
		document.getElementById('alertaerror').style.display = "block";
		document.getElementById('alertaerrorcpf').style.display = "none";	
		document.getElementById('alertasucesso').style.display = "none";
	}	
	evt.preventDefault();
}