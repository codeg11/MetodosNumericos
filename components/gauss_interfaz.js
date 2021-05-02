Vue.component("gauss_interfaz", {
  data() {
    return {
        matrix1: [],
        matrix2: [],
        ls1:0,
        ls2:0,
        ls3:0,
        
        lista1:[],
        lista2:[],
        lista3:[],

        l1num1:0,
        l1num2:0,
        l1num3:0,

        l2num1:0,
        l2num2:0,
        l2num3:0,

        l3num1:0,
        l3num2:0,
        l3num3:0,

        metodo: "",

        resultados:[]
    };
  },
  methods: {
    add_item_to_list(value){
        this.lista1.push(value)
    },
    metodo_g(metodo) {
      this.metodo = metodo;
    },
    async metodo_g_result() {
      const get_results = await fetch(`https://germancodeg.pythonanywhere.com/${this.metodo}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            matrix1:[
                [this.l1num1,this.l1num2,this.l1num3],
                [this.l2num1,this.l2num2,this.l2num3],
                [this.l3num1,this.l3num2,this.l3num3]
            ],
            matrix2:[
                [this.ls1],
                [this.ls2],
                [this.ls3]
            ]
        })
      })
      const get_json = await get_results.json() 
      console.log(get_json.resultado)
      this.resultados = get_json.resultado
      /*
        .then(function (response) {
          if (response.ok) {
            return response.text();
          } else {
            throw "Error en la llamada Ajax";
          }
        })
        .then(function (resultados) {
          this.resultados = resultados
          console.log("resultados ")
          console.log(this.resultados)
        })
        .catch(function (err) {
          console.log(err);
        });
        */
    },
  },
  template: `
    <div class="row justify-content-center">
        <h3 class="col-12 text-center mb-3"> Gauss y Gauss Jordan </h3>
        <div class="form-check form-check-inline col-auto mb-3 mr-3">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" @click="metodo_g('gauss')">
            <label class="form-check-label" for="inlineRadio1">Gauss</label>
        </div>
        <div class="form-check form-check-inline col-auto mb-3">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" @click="metodo_g('gauss_jordan')">
            <label class="form-check-label" for="inlineRadio2">Gauss Jordan</label>
        </div>
        <div class="col-12"></div>
        <div class="col-8">
            <div class="row justify-content-between">
                <input type="number" v-model="l1num1" class="form-control col-2 mt-3"> 
                <input type="number" v-model="l1num2" class="form-control col-2 mt-3"> 
                <input type="number" v-model="l1num3" class="form-control col-2 mt-3"> 
                <input type="number" v-model="ls1" class="form-control col-2 mt-3"> 
                <div class="col-12"></div> 
                <input type="number" v-model="l2num1" class="form-control col-2 mt-3"> 
                <input type="number" v-model="l2num2" class="form-control col-2 mt-3"> 
                <input type="number" v-model="l2num3" class="form-control col-2 mt-3"> 
                <input type="number" v-model="ls2" class="form-control col-2 mt-3">
                <div class="col-12"></div> 
                <input type="number" v-model="l3num1" class="form-control col-2 mt-3"> 
                <input type="number" v-model="l3num2" class="form-control col-2 mt-3"> 
                <input type="number" v-model="l3num3" class="form-control col-2 mt-3">
                <input type="number" v-model="ls3" class="form-control col-2 mt-3">
            </div>
        </div>
        <div class="col-3">
            <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Resultados</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res in resultados" :key="res">
                <td>{{res}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-block btn-success col-11 mt-4" @click="metodo_g_result">Enviar</button>
    </div>
    `,
});
