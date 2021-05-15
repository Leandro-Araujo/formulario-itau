// Funcao utilizada para verificar se existe algum campo vazio
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

function autenticaCPF(strCPF){

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
    	console.log(autenticaCPF(cpf));
    }
	
	evt.preventDefault();

}