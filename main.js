let formulario = document.getElementById("formulario"); 

//botones
let botonAgregar = document.getElementById("agregarButton");
let botonBuscar = document.getElementById("buscarxCodigo");
let botonEliminar = document.getElementById("elminarxCodigo");
let botonListar = document.getElementById("listadoTexto");
let botonExtraer = document.getElementById("extraerPrimero");

let codigo = document.getElementById("codigo").value;
let nombre = document.getElementById("nombre").value;
let cantidad = document.getElementById("cantidad").value;
let costo = document.getElementById("costo").value;

//divs para mostrar texto
let informes = document.querySelector(".informes");
let elementos = document.querySelector(".mostrarElementos");
let accciones = document.querySelector(".mostrarAcciones");

function actualizar(){
    codigo = document.getElementById("codigo").value;
    nombre = document.getElementById("nombre").value;
    cantidad = document.getElementById("cantidad").value;
    costo = document.getElementById("costo").value;
}
class listaProductos {
    constructor() {
        this.pri = null;
    }

    ultimo(){
        if (this.pri == null){
            return null;
        }
        else{
            let aux = this.pri;
            while(aux.sig != null){
                aux = aux.sig;
            }
            return aux;
        }
    }
    agregar(nuevo){
        actualizar();
        let ultimo = this.ultimo();
        if(this.pri == null){
            this.pri = nuevo;
        }
        else if (ultimo.codigo <= nuevo.codigo){
            ultimo.sig = nuevo;
            nuevo.ant = ultimo;
        }
        else if (this.pri.codigo >= nuevo.codigo){
            nuevo.sig = this.pri;
            this.pri.ant = nuevo;
            this.pri = nuevo;   
        }
        else {
            let aux = this.pri;
            while(aux.codigo < nuevo.codigo){
                aux = aux.sig;
            }
            nuevo.sig = aux;
            nuevo.ant = aux.ant;
            aux.ant = nuevo;
            nuevo.ant.sig = nuevo;
        }
    }
    buscar(codigo){
        let ult = this.ultimo();
        if (this.pri == null){
            return null;
        }
        else if (this.pri.codigo > codigo){
            return null;
        }
        else if (ult.codigo < codigo){
            return null;
        }
        else{
            let aux = this.pri;
            while (aux.codigo != codigo){
                aux = aux.sig;
            }
            return aux;
        }
    }
    eliminar(codigo){
        let borrado = this.buscar(codigo);
        if(borrado == null){
            return null;
        }
        else if (borrado == this.pri){
            this.pri = borrado.sig;
            this.pri.ant = borrado.ant;
            return borrado;
        }
        else if (borrado == this.ultimo()){
            borrado.ant.sig = null;
            return borrado;
        }
        else {
            borrado.ant.sig = borrado.sig;
            borrado.sig.ant = borrado.ant;
            return borrado;
        }
    }
    listar(){
        if (this.pri == null){
            return null;
        }
        else{
            let aux = this.pri;
            let res = "";
            while(aux != null){
                 res += aux.info() + ' | '; 
                 aux = aux.sig;
            }
            return res;
        }
    }
    listarInverso(){
        if (this.pri == null){
            return null;
        }
        else{
            let aux = this.ultimo();
            let res = "";
            while(aux != null){
                 res += aux.info() + ' | '; 
                 aux = aux.ant;
            }
            return res;
        }
    }

    extraerPrimero(){
        if(this.pri == null){
            return null;
        }
        else{
            let borrado = this.pri;
            this.pri = borrado.sig;
            if (this.pri != null){
                this.pri.ant = borrado.ant;
            }
            return borrado;
        }
    }
    extraerUltimo(){
        if (this.pri == null){
            return null;
        }
        else if (this.pri == this.ultimo()){
            let borrado = this.pri;
            this.pri = null;
            return borrado;
        }
        else{
            let borrado = this.ultimo();
            borrado.ant.sig = null;
            return borrado;
        }
    }

    prueba(){
        this.pri.sig = null;
        return this.pri
    }
}

class Productos {
    constructor(codigo, nombre, cantidad, costo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.sig = null;
        this.ant = null;
    }
    info(){
        return `Código: ${this.codigo}, Nombre: ${this.nombre}, Cantidad: ${this.cantidad}, Costo: ${this.costo}`;
    }
}

let lista = new listaProductos();
let producto = new Productos(5, "producto", 100, 200);


function agregar(){
    actualizar();
    if (codigo != ""){
        producto = new Productos(codigo, nombre, cantidad, costo);
        lista.agregar(producto);
        accciones.innerHTML += `Se agrego el producto llamado ${nombre} <br>`;
        informes.innerHTML = `<p class="informes">Agregado correctamente</p>`;
    }
    else{
        informes.innerHTML = `<p class="errores">Campo codigo necesario</p>`;
    }
}

function buscar(){
    actualizar();
    if(codigo != ""){
        let producto = lista.buscar(codigo);
        if(producto != null){
            elementos.innerHTML = `
            <div class="Producto">
                <p>Codigo: ${producto.codigo}<br>
                Nombre: ${producto.nombre}<br>
                Cantidad: ${producto.cantidad} <br>
                Costo: $${producto.costo}</p>
            </div>`;
            informes.innerHTML = `<p class="informes">Resultados:</p>`;
            accciones.innerHTML += `Producto con el codigo ${producto.codigo} buscado <br>`;
        }
        else{
            informes.innerHTML = `<p class="errores">No existe este codigo</p>`;
        }
    }
    else{
        informes.innerHTML = `<p class="errores">Introduce el codigo</p>`;
    } 
}

function eliminar(){
    actualizar();
    if (codigo != ""){
        let borrado = lista.eliminar(codigo);
        if(borrado != null){
            informes.innerHTML = `<p class="informes">Producto ${codigo} eliminado</p>`;
            accciones.innerHTML += `Producto con el codigo ${codigo} eliminado <br>`;
        }
        else{
            informes.innerHTML = `<p class="errores">No existe este codigo</p>`;
        }
    }
    else {
        informes.innerHTML = `<p class="errores">Introduce el codigo</p>`;
    }
}

function extraerPrimero(){
    let borrado = lista.extraerPrimero();
    if(borrado != null){
        informes.innerHTML = `<p class="informes">Primer producto eliminado</p>`;
        accciones.innerHTML += `Primer producto con el codigo ${codigo} eliminado <br>`;
    }
    else{
        informes.innerHTML = `<p class="errores">No hay productos en la lista</p>`;
    }
}
function extraerUltimo(){
    let borrado = lista.extraerUltimo();
    if(borrado != null){
        informes.innerHTML = `<p class="informes">Ultimo producto eliminado</p>`;
        accciones.innerHTML += `Ultimo producto con el codigo ${codigo} eliminado <br>`;
    }
    else{
        informes.innerHTML = `<p class="errores">No hay productos en la lista</p>`;
    }
}

function listar(){
    elementos.innerHTML = lista.listar();
    accciones.innerHTML += "Se listaron los productos<br>";
}
function listarInverso(){
    elementos.innerHTML = lista.listarInverso();
    accciones.innerHTML += "Se listaron los productos<br>";
}