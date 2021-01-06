//bloqueio de envio
//executa a função quando há um botão de submit, parando o comportamento padrão
let Validator = {
    handleSubmit: (event) => {
        event.preventDefault();

        //validação caso os campos estiver preenchido conforme as regras estabelecidas no formulario
        let send = true;

        //pegando todos os inputs que há no formulario 
        let inputs = form.querySelectorAll('input');

        //chamando função para limpar os erros
        Validator.clearErrors();

        //loop para verificar cada um dos campos individualmentes 
        for(let i=0; i<inputs.length;i++){
            let input = inputs[i];
            let check = Validator.checkInput(input);
            if(check !== true){
                send = false;
                Validator.showError(input,check);
            }
        }

        if(send){
            form.submit();
        }
    },
     //função para campo especifico e verificar a regra de cada input
     checkInput:(input) => {
         let rules = input.getAttribute('data-rules');

         //verificando cada regra separadamente 
         if(rules !== null){
             rules = rules.split('|');
             
             for(let r in rules){
                 let Details = rules[r].split('=');

                 switch(Details[0]){
                    case 'required':
                         if(input.value == ''){
                             return 'Required field';
                         }
                    break;

                    case 'min': 

                    break;
                 }
             }
         }
         return true;
     },

     //função para exibir o erro na tela 
     showError: (input, error) => {
         input.style.borderColor = '#FF0000';

         let errorElement = document.createElement('div');
         errorElement.classList.add('error');
         errorElement.innerHTML = error;

         //adicionando a div  abaixo do input
         input.parentElement.insertBefore(errorElement, input.ElementSibling);
     },

     //função para limpar os erros
     clearErrors: () => {

        //removendo a border 
        let inputs = form.querySelectorAll('input');
         for(let i=0; i<inputs.length; i++){
             inputs[i].style = '';
         }

         let errorElements = document.querySelectorAll('.error');
         for(let i=0; i<errorElements.length; i++){
             errorElements[i].remove();
         }
     }
};

//pegando do formulario a class necessaria 
let form = document.querySelector('.validator')


//submit é para monitorar o formulario que estiver com submit e irá fazer alguma ação
form.addEventListener('submit', Validator.handleSubmit);