class CalculadoraController {
    constructor() {
        this._dataEl = document.querySelector(".data");
        this._horaEl = document.querySelector(".hora");
        this._listaExpressao = ["0"];
        this.iniciar();
        this.initAddEventosBotoes();
    }
    attDisplay(){
        const expressaoDisplay = document.querySelector("#expressao");

        expressaoDisplay.innerHTML = this._listaExpressao.join("", ".");
        expressaoDisplay.scrollBy(100, 0);
    };
    
    attData() {
        const date = new Date();
        
        this._dataEl.innerHTML = date.toLocaleDateString("pt-BR");
        this._horaEl.innerHTML = date.toLocaleTimeString("pt-BR");
    };

    allClear() {
        this._listaExpressao = ["0"];
        this.attDisplay();
    };

    delete() {
        this._listaExpressao[this._listaExpressao.length-1] =  this.retornaUltimo().slice(0, -1);

        if(this.retornaUltimo() == "") {
            if(this._listaExpressao.length == 1){
                this._listaExpressao = ["0"];
            }else{
                this._listaExpressao.pop();
            };
        };
        this.attDisplay();
    };

    retornaUltimo() {
        return this._listaExpressao[this._listaExpressao.length - 1];
    };

    verifSeOperador(val) {
        return ["+", "-", "÷", "×"].indexOf(val) > -1;
    };

    addValoresExpressao(val) {
        if (this.verifSeOperador(val)) {

            if(this.verifSeOperador(this.retornaUltimo())){
                this._listaExpressao[this._listaExpressao.length - 1] = val; 
            }else{
                this._listaExpressao.push(val);
            };
        } else {
            if (this.verifSeOperador(this.retornaUltimo())) {
                this._listaExpressao.push(val);
            } else {
                if(this.retornaUltimo() == "0" && val.toString() != "."){
                    this._listaExpressao[this._listaExpressao.length-1] = "";
                };
                if(this.retornaUltimo().indexOf(".")>-1 && val.toString() == "."){
                    return;
                };
                this._listaExpressao[this._listaExpressao.length - 1] += val.toString();
            };
        };
       this.iniciar();
       this.attData();
       
    };


    iniciar() {
        this.attData();
        setInterval(() => {
            this.attData();
        }, 1000);

       this.attDisplay();
    };

    inverse(){
        if(this.verifSeOperador(this.retornaUltimo())){
            this._listaExpressao.pop();
        };
        if(this.retornaUltimo() == "0"){
                return;
            };
            this._listaExpressao[this._listaExpressao.length-1] = (1/this.retornaUltimo()).toString();
            this.attDisplay();
    };

    initAddEventosBotoes() {
        const botoes = document.querySelectorAll("table.botoes td");

        botoes.forEach(botao => {
            botao.addEventListener("click", () => {
                const valor = botao.innerHTML;
                switch (valor) {
                    case "AC":
                        this.allClear();
                        break;
                    case "backspace":
                        this.delete();
                        break;
                    case "=":
                        break;
                    case "1/x":
                        this.inverse();
                        break;
                    case "+":
                    case "-":
                    case "÷":
                    case "×":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    case "0":
                    case ".":
                        this.addValoresExpressao(valor);
                        break;
                }
            })

        });
    };
};