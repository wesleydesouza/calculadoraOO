class CalculadoraController {
    constructor() {
        this._dataEl = document.querySelector(".data");
        this._horaEl = document.querySelector(".hora");
        this._listaExpressao = ["0"];
        this.iniciar();
        this.initAddEventosBotoes();
    }

    attData() {
        const date = new Date();

        this._dataEl.innerHTML = date.toLocaleDateString("pt-BR");
        this._horaEl.innerHTML = date.toLocaleTimeString("pt-BR");
    };

    iniciar() {
        this.attData();
        setInterval(() => {
            this.attData();
        }, 1000);

    };

    initAddEventosBotoes() {
        const botoes = document.querySelectorAll("table.botoes td");

        botoes.forEach(botao => {
            botao.addEventListener("click", () => {
                const valor = botao.innerHTML;
                switch (valor) {
                    case "AC":
                        //apaga td
                        break;
                    case "backspace":
                        //apaga 1
                        break;
                    case "=":
                        break;
                    case "1/x":
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
                        //adicionar na lista da expressao
                        break;
                }
            })

        });
    };
};