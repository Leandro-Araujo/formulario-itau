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

O código abaixo tem o objetivo de trocar as opções do menu sem que com isso a tela seja atualizada, imitando uma tabs:

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
