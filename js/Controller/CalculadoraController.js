class CalculadoraController {
    constructor() {
        this._dataEl = document.querySelector(".data");
        this._horaEl = document.querySelector(".hora");
        this._prevEl = document.querySelector(".previa");
        this._displayEl = document.querySelector(".expressao");
        this._listaExpressao = ["0"];
        this._prev = 0;
        this.iniciar();
        this.initAddEventosBotoes();
        this.initAddEventosTeclado();
        this._ifResult = false;
    }
    attDisplay() {

        this._displayEl.innerHTML = this._listaExpressao.join("", ".");
        this._prevEl.innerHTML = this._prev;
        this._displayEl.scrollBy(100, 0);
    };

    attData() {
        const date = new Date();

        this._dataEl.innerHTML = date.toLocaleDateString("pt-BR");
        this._horaEl.innerHTML = date.toLocaleTimeString("pt-BR");
    };

    allClear() {
        this._listaExpressao = ["0"];
        this._prev = "0"
        this.attDisplay();
    };

    delete() {
        this._listaExpressao[this._listaExpressao.length - 1] = this.retornaUltimo().slice(0, -1);

        if (this.retornaUltimo() == "") {
            if (this._listaExpressao.length == 1) {
                this._listaExpressao = ["0"];
            } else {
                this._listaExpressao.pop();
            };
        };
        this.attDisplay();
    };

    error() {
        this._displayEl.innerHTML = "Error";
        this._prevEl.innerHTML = "";
        this._ifResult = true;
    };

    retornaUltimo() {
        return this._listaExpressao[this._listaExpressao.length - 1];
    };

    verifSeOperador(val) {
        return ["+", "-", "÷", "×"].indexOf(val) > -1;
    };

    addValoresExpressao(val) {
        if (this.verifSeOperador(val)) {

            if (this.verifSeOperador(this.retornaUltimo())) {
                this._listaExpressao[this._listaExpressao.length - 1] = val;
            } else {
                this._listaExpressao.push(val);
            };
        } else {
            if (this.verifSeOperador(this.retornaUltimo())) {
                this._listaExpressao.push(val);
            } else {
                if (this.retornaUltimo() == "0" && val.toString() != ".") {
                    this._listaExpressao[this._listaExpressao.length - 1] = "";
                };
                if (this.retornaUltimo().indexOf(".") > -1 && val.toString() == ".") {
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

    inverse() {
        if (this.verifSeOperador(this.retornaUltimo())) {
            this._listaExpressao.pop();
        };
        if (this.retornaUltimo() == "0") {
            return;
        };
        this._listaExpressao[this._listaExpressao.length - 1] = (1 / this.retornaUltimo()).toString();
        this._ifResult = true;
        this.attDisplay();
    };

    calculate(arr) {

        for (let i = 0; i < arr.length; i += 2) {
            arr[i] = parseFloat(arr[i]);
        };


        while (this.multIndexOf(arr, ["÷", "×"])[0] > -1) {
            let operation = this.multIndexOf(arr, ["÷", "×"]);
            let result;
            switch (operation[1]) {
                case "÷":
                    result = arr[operation[0] - 1] / arr[operation[0] + 1];
                    break;
                case "×":
                    result = arr[operation[0] - 1] * arr[operation[0] + 1];
                    break;
            };

            arr.splice(operation[0] - 1, 3, result);
        };


        while (this.multIndexOf(arr, ["+", "-"])[0] > -1) {
            let operation = this.multIndexOf(arr, ["+", "-"]);
            let result;
            switch (operation[1]) {
                case "+":
                    result = arr[operation[0] - 1] + arr[operation[0] + 1];
                    break;
                case "-":
                    result = arr[operation[0] - 1] - arr[operation[0] + 1];
                    break;
            };

            arr.splice(operation[0] - 1, 3, result);
        };
        this._ifResult = true;
        arr[0] = arr[0].toString();
        this.attDisplay();
    };

    calcPrev() {
        let listPrev = [];
        this._listaExpressao.forEach((value) => {
            listPrev.push(value);
        })
        this.calculate(listPrev);
        this._ifResult = false;
        if (isNaN(listPrev[0])) {
            return;
        };
        this._prev = listPrev.join("");
        this.attDisplay();
    };

    multIndexOf(mainArr, arr) {
        for (let i = 0; i < mainArr.length; i++) {
            let value = mainArr[i];

            for (let i2 = 0; i2 < arr.length; i2++) {
                let value2 = arr[i2];
                if (value == value2) {
                    return [i, value2];
                };
            };
        };
        return [-1, ""];
    };

    initAddEventosTeclado() {
        document.addEventListener("keyup", (e) => {

            switch (e.key) {
                case "c":
                    this.allClear();
                    break;
                case "Backspace":
                    if (this._ifResult == true) {
                        this.allClear();

                    };
                    this.delete();
                    this.calcPrev();
                    break;
                case "Enter":
                    if (this._ifResult == true) {
                        return;
                    };
                    this._prev = "";
                    this.calculate(this._listaExpressao);

                    break;
                case "+":
                case "-":
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
                    if (this._ifResult == true) {
                        this.allClear();
                        this._ifResult = false;
                    };
                    this.addValoresExpressao(e.key);
                    this.calcPrev();
                    break;
                case "/":
                    if (this._ifResult == true) {
                        this.allClear();
                        this._ifResult = false;
                    };
                    this.addValoresExpressao("÷");
                    this.calcPrev();
                    break;

                case "*":
                    if (this._ifResult == true) {
                        this.allClear();
                        this._ifResult = false;
                    };
                    this.addValoresExpressao("×");
                    this.calcPrev();
                    break;
            };
        })
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
                        if (this._ifResult == true) {
                            this.allClear();

                        };
                        this.delete();
                        this.calcPrev();
                        break;
                    case "=":
                        if (this._ifResult == true) {
                            return;
                        };
                        this._prev = "";
                        this.calculate(this._listaExpressao);

                        break;
                    case "1/x":
                        this.inverse();
                        this.calcPrev();
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
                        if (this._ifResult == true) {
                            this.allClear();
                            this._ifResult = false;
                        };
                        this.addValoresExpressao(valor);
                        this.calcPrev();
                        break;
                };

                if (isNaN(this._listaExpressao[0])) {
                    this.error();
                };
            })

        });
    };
};