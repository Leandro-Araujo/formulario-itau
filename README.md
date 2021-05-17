# formulario-itau

Um pequeno formulario para o projeto itau tech.

## O site esta dividido em duas páginas

### Home

É onde tem o formulario e é possível cadastrar as pessoas.

#### O Formulário tem os seguintes campos:

* Nome  _Este ítem é obrigatório_
* CPF  _Este ítem é obrigatório_
* RG
* Sexo
* Endereco  _Este ítem é obrigatório_
* Numero  _Este ítem é obrigatório_
* Bairro
* Cidade
* Estado
* CEP
* Telefone Fixo
* CElular  _Este ítem é obrigatório_

### Cadastradados

Lista das pessoas já cadastradas.

## Tecnologias

Este site foi feito utilizando apenas JavaScript, CSS e HTML.

### Estrutura Básica

- index.html
- css
  - style.css
- js
  - aba.js
  - controller.js

### Vamos entender alguns códigos importantes

O código abaixo está no arquivo 'aba.js e tem o objetivo de trocar as opções do menu sem que com isso a tela seja atualizada, imitando uma tabs:

```javascript
function openAba(evt, aba) {
	if(aba == 'Home'){
		document.getElementById('home').style.display = "block";
		document.getElementById('cadastrados').style.display = "none";
	}
	else{
		document.getElementById('home').style.display = "none";
		document.getElementById('cadastrados').style.display = "block";
	}
	evt.preventDefault();
}
```

Já o seguinte está dentro de controller.js, é invocado dentro de um onblur no html e tem a função de validar se todos os números do CPF estão no formato correto, ou seja, se todos os 11 caracteres são números sem pontos e traços:

```javascript
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
```

Parte do html que chama a função verificaCPF();

```html
<input type="text" id="cpf" name="cpf" onblur="verificaCPF(this)" pattern="[0-9]{11}" placeholder="insira seu CPF (somente números)" maxlength="11" style="width: 20em" value="" required>
```

O próximo código é responsável pela autenticação do CPF de acordo com as regras da receita federal é chamado após o envio do formulário:

```javascript
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
```
Este código é chamado para verificar se os campos obrigatórios estão todos preenhcidos, é ativado ao submeter o formulário. Ele funciona de forma genérica, foi construído com laço for e para saber a qual objeto se tratar utilizei a função *Object.values().keys*:

```javascript
function verificarObrigatorios(campos){
	let verificado = true;
	for (var i = campos.length - 1; i >= 0; i--) {
		if (Object.values(campos[i])[0] == '') {
			document.getElementById("span"+Object.keys(campos[i])[0]).innerHTML="* campo obrigatorio";  
			verificado = false;
		}
		else	document.getElementById("span"+Object.keys(campos[i])[0]).innerHTML="*";		
	}	
	return verificado;
}
```

Esta função faz a busca do endereço atravéz do CEP fornecido pelo usuário, ele utiliza JavaScript puro com ajax:

```javascript
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
        }
    }
    xhr.send();
}
```

No meu código também precisei por verificar se o cliente já estava cadastrado, usei como id o cpf do mesmo:

```javascript
function verificaClienteExiste(novoCliente){
	if(clientesGeral.length == 0)	return false;
	for(var i = 0; i < clientesGeral.length; i++)
		if(novoCliente == clientesGeral[i].cpf) return true;
	return false;
}
```