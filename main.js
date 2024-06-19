/*----------------------FUNCIONES LOGICAS------------*/
document.querySelector("#btnIngreso").addEventListener("click", login);
document.querySelector("#btnRegistro").addEventListener("click", registro);
document.querySelector("#btnCrearProducto").addEventListener("click", crearProducto);
document.querySelector("#estado").addEventListener("change", cargarTablaMisCompras);

/*-------------CAMBIAR PANTALLAS------------------*/
document.querySelector("#btnIrRegistro").addEventListener("click", moverMenu);
document.querySelector("#btnIrlogin").addEventListener("click", moverMenu);
document.querySelector("#volverMenuAdmin").addEventListener("click", moverMenu);
document.querySelector("#volverMenuAdmin1").addEventListener("click", moverMenu);
document.querySelector("#volverMenuAdmin2").addEventListener("click", moverMenu);
document.querySelector("#volverMenuAdmin3").addEventListener("click", moverMenu);
document.querySelector("#volverMenuCliente").addEventListener("click", moverMenu);
document.querySelector("#volverMenuCliente1").addEventListener("click", moverMenu);
document.querySelector("#volverMenuCliente2").addEventListener("click", moverMenu);
document.querySelector(".logout").addEventListener("click", logout);
document.querySelector("#irAcrearProducto").addEventListener("click", moverMenu);
document.querySelector("#irAgestionarProducto").addEventListener("click", refrescarListaAdministrar);
document.querySelector("#irMisCompras").addEventListener("click", refrescarListaMisCompras);
document.querySelector("#irMisCompras1").addEventListener("click", refrescarListaMisCompras);
document.querySelector("#irAmisComprasMenu").addEventListener("click", refrescarListaMisCompras);
document.querySelector("#irAlistaProdMenu").addEventListener("click", refrescarListaProductos);
document.querySelector("#irOfertasMenu").addEventListener("click", cargarTablaOfertas);
document.querySelector("#irOfertas1").addEventListener("click", cargarTablaOfertas);
document.querySelector("#irAlistaAprobacionCompras").addEventListener("click", refrescarListaAprobacionCompras);
document.querySelector("#irAInformeDeGanancias").addEventListener("click", refrescarInformeGanancias);


/*-----------------Funcion LOGIN---------------*/
let miSistema = new Sistema();
miSistema.precargarDatos();

let usuarioLogueado;
function login(){
    let user = document.querySelector("#loginUser").value;
    let password = document.querySelector("#loginPassword").value;
    let parrafo = document.querySelector("#pIngreso");
    if(password.length >= 5) {
        let busquedaUsuario = miSistema.login(user, password);
        if (busquedaUsuario == null) {
            parrafo.innerHTML = "Usuario o Contrasenia es incorrecta";
        }else if(busquedaUsuario.tipo == "Admin"){
                usuarioLogueado = busquedaUsuario;
                let nombre = `Bienvenido ${usuarioLogueado.user.toUpperCase()}`;
                msj1.innerHTML = nombre;  
                cambiarPantalla("#menuAdmin");
        }else if (busquedaUsuario.tipo == "Cliente"){
            usuarioLogueado = busquedaUsuario;
            let nombre = `Bienvenido ${usuarioLogueado.user.toUpperCase()}`;
            msj.innerHTML = nombre;  
            cambiarPantalla("#menuCliente");
            let saldo = `Saldo: ${usuarioLogueado.saldo}`;
            sal.innerHTML = saldo;
        }
    }else{
        parrafo.innerHTML = "Usuario o password es incorrecta";
    }
}

/*----------------FUNCION MOVER MENU---------------------*/
function moverMenu(){
    let destino = "#" + this.getAttribute("data-menu");
    cambiarPantalla(destino);
}

function refrescarListaProductos(){
cargarTablaProductos();
cambiarPantalla("#listaProductos");
}

function refrescarListaMisCompras(){
    cargarTablaMisCompras();
    cambiarPantalla("#listaMisCompras");
}

function refrescarListaAdministrar(){
    cargaAdministrarProductos();
    cambiarPantalla("#administrarProductos")
}

function refrescarListaAprobacionCompras(){
    cargarTablaAprobacion();
    cambiarPantalla("#listaAprobacionCompras");
}

function refrescarInformeGanancias(){
    cargarInformeGanancias();
    cambiarPantalla("#listaInformeGanancias");
}

/*-------------FUNCION LOG OUT-----------*/
function logout(){
    usuarioLogueado = null;
    cambiarPantalla("#ingreso");
}
/*----------------FUNCION REGISTRO---------------------*/
function registro(){
let nombre = document.querySelector("#registroNombre").value;
let apellido = document.querySelector("#registroApellido").value;
let user = document.querySelector("#registroUsuario").value;
let password = document.querySelector("#registroPassword").value;
let tarjeta = document.querySelector("#tarjeta").value;
let tarjetaVerificada = verificarFormatoTarjeta(tarjeta);
let cvc = document.querySelector("#cvc").value;
let parrafo = document.querySelector("#pRegistro");
if(nombre.length> 0 && apellido.length >0){
    if(user.length >0){
        if(verificarPassword(password) == true){
            if(verificarTarjeta(tarjetaVerificada) == true){
                if(verificarCvc(cvc) == true){
                 let busquedaCliente = miSistema.registroCliente(nombre,apellido,user,password,tarjeta,cvc);
                 if(busquedaCliente == null){
                    parrafo.innerHTML = "Registro invalido";
                 }else{
                    parrafo.innerHTML = `Registro Valido. Bienvenido ${nombre}`;
                 }
                }else{
                 parrafo.innerHTML = "CVC invalido";
                }
            }else{
             parrafo.innerHTML = "Tarjeta Invalida";
            }
         }else{
             parrafo.innerHTML = "Password invalida. Debe contener al menos 5 caracteres, mayuscula, minuscula y al menos un numero";
         }
    }else{
        parrafo.innerHTML = "Usuario debe contener al menos 1 caracter"
    }
}else{
    parrafo.innerHTML = "Nombre y Apellido deben contener al menos 1 caracter";
}
}

/*-------------FUNCION CREAR PRODCUTOS-------------*/
function crearProducto(){
let nombreProducto = document.querySelector("#nombreProducto").value;
let precioProducto = parseInt(document.querySelector("#precio").value);
let imagen = document.querySelector("#img").value;
let stock = parseInt(document.querySelector("#stock").value);
let descripcion = document.querySelector("#descripcion").value;
let validacionProducto = validarCamposAlCrearProducto(precioProducto,stock);
let parrafo = document.querySelector("#pCrearProducto");
if(nombreProducto.length > 0  && descripcion.length> 0 && imagen.length > 0){
       if(validacionProducto == true){
           let buscarProducto = miSistema.crearProducto(nombreProducto,precioProducto,descripcion,imagen,stock);
           if(buscarProducto == null){
              parrafo.innerHTML = "No se pudo crear producto";
           }else{
            parrafo.innerHTML = "Producto Creado";
            cargarTablaProductos();
           }
       }else{
           parrafo.innerHTML = "Stock y Precio deben ser numericos mayor a 0";
       }
}else{
  parrafo.innerHTML = "Todos los campos deben tener datos";
}
}

/*----------------FUNCION PANTALLAS----------------------------*/
function cambiarPantalla(activa){
    let pantallas = document.querySelectorAll(".ventana");
    for(let i = 0; i<pantallas.length;i++){
    let unaPantalla = pantallas[i];
    unaPantalla.style.display = "none";
    }
    document.querySelector(activa).style.display = "flex";
}

cambiarPantalla("#ingreso");



/*------FUNCION PARA VALIDAR PASSWORD-----*/
function verificarPassword(password){
let resultado = "";
let mayus = false;
let minuscula = false;
let unNumero = false;
if(password.length >= 5){
    let i=0;
    while(i<password.length && mayus == false){
        if(password[i] == password[i].toUpperCase() && password[i] !== password[i].toLowerCase()){
            mayus = true;
        }
        i++;
    }
    if(mayus == true){
        let j=0;
        while(j<password.length && minuscula == false){
            if(password[j] == password[j].toLowerCase()){
                minuscula = true;
            }
            j++;
        }
    if(minuscula ==true){
        let k = 0;
        while(k<password.length && unNumero == false){
            let letraNumerica = parseInt(password[k]);
           if(!isNaN(letraNumerica)){
             unNumero = true;
           }
       k++; 
    }
    if(unNumero==true && minuscula && mayus == true){
       resultado = true;
       return resultado;
    }else{
        resultado = "Debe contener al menos un numero";
    } 
    }else{
        resultado = "Debe contener al menos una minuscula";
    }
    }else{
       resultado = "Debe contener al menos una mayuscula";
    }
   
}else{
    resultado = "El largo de la contraseña debe ser mayor a 5 caracteres";
}   
   
}

/*------FUNCION PARA VALIDAR CVC-----*/

function verificarCvc(cvc){

let resultado = false;
    if(!isNaN(cvc) && cvc.length == 3){
        resultado = true;
        return resultado;
    }
}

/*------FUNCION PARA EL FORMATO NUMERICO DE LA TARJETA DE CREDITO-----*/

function verificarFormatoTarjeta(tarjeta){
    let resultado = "";
    let validadorContador = 0;
    if (tarjeta[4] == "-" && tarjeta[9] == "-" &&tarjeta[14] == "-") {
           for (let i = 0; i < 19; i++) {
            let contadorNumeros = tarjeta[i];
                if (!isNaN(contadorNumeros) && validadorContador < 17) {
                    validadorContador++
                }
           }
        }
        if(validadorContador == 16){
            for (let i = 0; i < tarjeta.length; i++) {
    
                if (tarjeta[i] != "-") {
    
                    resultado += tarjeta[i];
                }
            }
            return resultado;
        }else{
            resultado = "Formato tarjeta invalido";
            return resultado;
          }
    }

/*------FUNCION PARA VALIDAR NUMERO DE TARJETA DE CREDITO-----*/

function verificarTarjeta(tarjetaVerificada){
  let resultado = false;
  let acumulador = 0;
  let digitoVerificar = tarjetaVerificada[tarjetaVerificada.length -1];
  

  for(let i=0; i < tarjetaVerificada.length -1;i++){
      if(i % 2 === 0){
          let duplicado = Number(tarjetaVerificada[i] * 2);
          if(duplicado >=10){
               let duplicadoStr = String(duplicado);
               let resultado = Number(duplicadoStr[0]) + Number(duplicadoStr[1]);
               acumulador += resultado;
          }else{
            acumulador += duplicado;
          }
      }else{
        acumulador += Number(tarjetaVerificada[i]);
      }
  }
  
  let verificadorMultiplicado = acumulador * 9;
  let verificadorMultString = String(verificadorMultiplicado);
  let verificadorReal = verificadorMultString[verificadorMultString.length-1];
  if(verificadorReal == digitoVerificar){
     resultado = true;
  }
  return resultado;
  }

  /*-----------FUNCION PARA VALIDAR CAMPOS AL CREAR PRODUCTO---------*/
function validarCamposAlCrearProducto(precioProducto,stock){
let resultado = false;

if(!isNaN(precioProducto) && !isNaN(stock)){

    resultado = true;

}
return resultado;
}

 /*-----------FUNCION PARA CARGAR TABLA PRODUCTOS---------*/
 function cargarTablaProductos(){
    let tabla = document.querySelector("#tableProductos");
    tabla.innerHTML = "";
    for(let i = 0; i < miSistema.productos.length; i++){
        let unProducto = miSistema.productos[i];
        if(unProducto.estado == "activo"){
            let unTR = document.createElement("tr");
            let tdImagen = document.createElement("td");
            let tdNombre = document.createElement("td");
            let tdPrecio = document.createElement("td");
            let tdCantidad = document.createElement("td");
            let tdOferta = document.createElement("td");
            let tdComprar = document.createElement("td");
            tdNombre.innerHTML = unProducto.nombre;
            tdPrecio.innerHTML = unProducto.precio;
            let unBoton = document.createElement("input");
            unBoton.setAttribute("type","button");
            unBoton.setAttribute("value","Comprar");
            unBoton.setAttribute("data-id",unProducto.id); 
            unBoton.setAttribute("class","botones");   
            let unaCantidad = document.createElement("input");
            unaCantidad.setAttribute("type","number");
            unaCantidad.setAttribute("data-id", unProducto.id);
            unaCantidad.setAttribute("class", "cantidad");  
            let unaImagen = document.createElement("img");
            unaImagen.setAttribute("src",unProducto.imagen);
            let unaOferta = document.createElement("input");
            unaOferta.setAttribute("type", "checkbox");
            if(unProducto.oferta == false){
               unaOferta.setAttribute("disabled","true")
            }else{
                unaOferta.setAttribute("checked","true")
            }
            tdImagen.appendChild(unaImagen);   
            tdCantidad.appendChild(unaCantidad);
            tdOferta.appendChild(unaOferta)
            tdComprar.appendChild(unBoton);
            unTR.appendChild(tdImagen);
            unTR.appendChild(tdNombre);
            unTR.appendChild(tdPrecio);
            unTR.appendChild(tdCantidad);
            unTR.appendChild(tdOferta);
            unTR.appendChild(tdComprar);
            tabla.appendChild(unTR);
        }
       
    }
    let misBotones = document.querySelectorAll(".botones");
    for(let i = 0; i<misBotones.length; i++){
        let unBoton = misBotones[i];
        unBoton.addEventListener("click",realizarCompra);
    }
}

/*-----------CARGAR TABLA DE OFERTAS------------*/
function cargarTablaOfertas(){
    let tabla = document.querySelector("#tableProductosOferta");
    tabla.innerHTML = "";
    for(let i = 0; i < miSistema.productos.length; i++){
        let unProducto = miSistema.productos[i];
        if(unProducto.estado == "activo"){
            if(unProducto.oferta == true){
                let unTR = document.createElement("tr");
                let tdImagen = document.createElement("td");
                let tdNombre = document.createElement("td");
                let tdPrecio = document.createElement("td");
                let tdCantidad = document.createElement("td");
                let tdOferta = document.createElement("td");
                let tdComprar = document.createElement("td");
                tdNombre.innerHTML = unProducto.nombre;
                tdPrecio.innerHTML = unProducto.precio;
                let unBoton = document.createElement("input");
                unBoton.setAttribute("type","button");
                unBoton.setAttribute("value","Comprar");
                unBoton.setAttribute("data-id",unProducto.id); 
                unBoton.setAttribute("class","botonesOff");   
                let unaCantidad = document.createElement("input");
                unaCantidad.setAttribute("type","number");
                unaCantidad.setAttribute("data-id", unProducto.id);
                unaCantidad.setAttribute("class", "cantidad");  
                let unaImagen = document.createElement("img");
                unaImagen.setAttribute("src",unProducto.imagen);
                let unaOferta = document.createElement("input");
                unaOferta.setAttribute("type", "checkbox");
                if(unProducto.oferta == false){
                   unaOferta.setAttribute("disabled","true")
                }else{
                    unaOferta.setAttribute("checked","true")
                }
                tdImagen.appendChild(unaImagen);   
                tdCantidad.appendChild(unaCantidad);
                tdOferta.appendChild(unaOferta)
                tdComprar.appendChild(unBoton);
                unTR.appendChild(tdImagen);
                unTR.appendChild(tdNombre);
                unTR.appendChild(tdPrecio);
                unTR.appendChild(tdCantidad);
                unTR.appendChild(tdOferta);
                unTR.appendChild(tdComprar);
                tabla.appendChild(unTR);
            
            }
            
        }
       
    }
    cambiarPantalla("#listaProductosOferta");
    let misBotones = document.querySelectorAll(".botonesOff");
    for(let i = 0; i<misBotones.length; i++){
        let unBoton = misBotones[i];
        unBoton.addEventListener("click",realizarCompra);
    }  
}


/*----------CARGAR TABLA MIS COMPRAS------------*/
function cargarTablaMisCompras(){
    let filtro =  document.querySelector("#estado").value;
    let tabla = document.querySelector("#tableMisCompras");
    tabla.innerHTML = "";
    for(let i=0;i<usuarioLogueado.misCompras.length;i++){
    let unaCompra = usuarioLogueado.misCompras[i];
    let unTR = document.createElement("tr");
    let tdNombreC = document.createElement("td");
    let tdCantidad = document.createElement("td");
    let tdMonto = document.createElement("td");
    let tdEstado = document.createElement("td");
    let tdCancelar = document.createElement("td");
    tdNombreC.innerHTML = unaCompra.producto.nombre;
    tdCantidad.innerHTML = unaCompra.cantidad;
    tdMonto.innerHTML = unaCompra.precioCompra;
    tdEstado.innerHTML= unaCompra.estado;
    let cancelarCompra =  document.createElement("input");
    cancelarCompra.setAttribute("type","button");
    cancelarCompra.setAttribute("value","Cancelar Compra");
    cancelarCompra.setAttribute("data-id",unaCompra.id); 
    cancelarCompra.setAttribute("class","botonesCan");  
    if(unaCompra.estado != "Pendiente"){
        cancelarCompra.setAttribute("disabled","true");
    }

if(unaCompra.estado == filtro || filtro === "TodasLasCompras"){
    tdCancelar.appendChild(cancelarCompra);
    unTR.appendChild(tdNombreC);
    unTR.appendChild(tdCantidad);
    unTR.appendChild(tdMonto);
    unTR.appendChild(tdEstado);
    unTR.appendChild(tdCancelar);
    tabla.appendChild(unTR);
}
}
    let misBotones = document.querySelectorAll(".botonesCan");
    for(let i = 0; i<misBotones.length; i++){
        let unBoton = misBotones[i];
        unBoton.addEventListener("click",cancelarCompra);
    }
    monto.innerHTML = `Monto Gastado: ${calcularGasto()}`;
    saldoDisponible.innerHTML = `Saldo Disponible: ${usuarioLogueado.saldo}`;
    }
    
//cargarTablaMisCompras();


/*-------FUNCION CALCULAR GASTO DE USUARIO LOGUEADO-----*/
function calcularGasto(){
let gastado = 0;
for(let i=0;i<usuarioLogueado.misCompras.length;i++){
let unaCompra = usuarioLogueado.misCompras[i];
if(unaCompra.estado == "Aprobada"){
   gastado += unaCompra.precioCompra;
}
}
return gastado;   
}
/*---------FUNCION CANCELAR COMPRA----------*/
function cancelarCompra(){
let pCompras = document.querySelector("#pCompras");
let confirmacion = confirm("Seguro que quieres cancelar la compra?")
let miCompra = this.getAttribute("data-id");
if(confirmacion == true){
  miSistema.cancelCompra(miCompra);
   pCompras.innerHTML = "Compra Cancelada"
  cargarTablaMisCompras();
}else{
    pCompras.innerHTML = "Compra NO Cancelada"
}

}

/*---------FUNCION REALIZAR COMPRA-----------*/
function realizarCompra(){
    let parrafo = document.querySelector("#pLista");
    let miProducto = this.getAttribute("data-id");
    let misCantidades = document.querySelectorAll('input.cantidad');
    let inputCantidadCorrecto = null;
    for (let i = 0; i < misCantidades.length; i++) {
        if (misCantidades[i].getAttribute("data-id") === miProducto) {
            inputCantidadCorrecto = misCantidades[i];
            break;  
        }
    }
     let cantidad = parseInt(inputCantidadCorrecto.value);
     if(cantidad >0){
        miSistema.nuevaCompra(miProducto,cantidad,usuarioLogueado);
        cargarTablaMisCompras();
        parrafo.innerHTML = `Compra Exitosa!`;
     }else{
        parrafo.innerHTML= "Ingrese cantidad positiva";
     }
    //let inputCantidad = document.querySelector(`input.cantidad[data-id="${miProducto}"]`);
    //let cantidad = parseInt(inputCantidad.value);
 
}

/*--------------------FUNCION ADMINISTRAR PRODUCTOS-----*/
function cargaAdministrarProductos(){
let tabla = document.querySelector("#tableAdministrarProductos");
tabla.innerHTML = "";
for(let i=0;i<miSistema.productos.length;i++){
    let administrarProducto = miSistema.productos[i];
    let unTR = document.createElement("tr");
    let tdProducto = document.createElement("td");
    let tdId = document.createElement("td");
    let tdPrecio = document.createElement("td");
    let tdStock = document.createElement("td");
    let tdEstado = document.createElement("td");
    let tdOferta = document.createElement("td");
    let tdModificar = document.createElement("td");
    tdProducto.innerHTML = administrarProducto.nombre;
    tdId.innerHTML = administrarProducto.id;
    tdPrecio.innerHTML = administrarProducto.precio;
    let modificarStock =document.createElement("input");
    modificarStock.setAttribute("type", "number");
    modificarStock.setAttribute("value",administrarProducto.stock);
    modificarStock.setAttribute("data-id", administrarProducto.id);
    modificarStock.setAttribute("class", "modificarStock");
    let unBoton = document.createElement("input");
    unBoton.setAttribute("type","button");
    unBoton.setAttribute("value","Modificar");
    unBoton.setAttribute("data-id",administrarProducto.id); 
    unBoton.setAttribute("class","botonesModificar"); 
    let inputEstado = document.createElement("input");
    inputEstado.setAttribute("type", "text");
    inputEstado.setAttribute("value",administrarProducto.estado);
    inputEstado.setAttribute("data-id", administrarProducto.id);
    inputEstado.setAttribute("class", "cambiarEstado");
    let inputOferta = document.createElement("input");
    inputOferta.setAttribute("type", "text");
    inputOferta.setAttribute("value", administrarProducto.oferta)
    inputOferta.setAttribute("data-id", administrarProducto.id);
    inputOferta.setAttribute("class", "cambiarOferta")
    tdOferta.appendChild(inputOferta);
    tdEstado.appendChild(inputEstado);
    tdStock.appendChild(modificarStock);
    tdModificar.appendChild(unBoton);
    unTR.appendChild(tdProducto);
    unTR.appendChild(tdId);
    unTR.appendChild(tdPrecio);
    unTR.appendChild(tdStock);
    unTR.appendChild(tdEstado);
    unTR.appendChild(tdOferta);
    unTR.appendChild(tdModificar);
    tabla.appendChild(unTR);
}
let misBotones = document.querySelectorAll(".botonesModificar");
for (let i = 0; i < misBotones.length; i++) {
    let unBoton = misBotones[i];
    unBoton.addEventListener("click", modificarProducto)
}
}

/*-------MODIFICAR STOCK-------------*/
function modificarProducto(){
let parrafo = document.querySelector("#admProd");
let modProd = this.getAttribute("data-id");
let miStocks = document.querySelectorAll('input.modificarStock');
let misEstados = document.querySelectorAll('input.cambiarEstado');
let misOfertas = document.querySelectorAll('input.cambiarOferta');
let miStockCorrecto = buscarStocks(miStocks, modProd);
let miEstadoCorrecto = buscarEstados(misEstados, modProd);
let miOfertaCorrecta = buscarOfertas(misOfertas, modProd);
let pStock= miStockCorrecto.value;
let pEstado = miEstadoCorrecto.value;
let pOferta = miOfertaCorrecta.value;
if(pEstado === "activo" || pEstado ==="pausado"){
   if(pOferta ==="true" || pOferta ==="false"){
   let prodModificado = miSistema.realizarModificacion(modProd,pStock,pEstado,pOferta);
    cargaAdministrarProductos();
    parrafo.innerHTML = `Modificacion exitosa de ${prodModificado.nombre}, (${prodModificado.id})`;
   }else{
     parrafo.innerHTML = "Lea las instrucciones";
   }
}else{
    parrafo.innerHTML = "Lea las instrucciones"; 
}

}
/*--------BUSCAR STOCKS--------------*/
function buscarStocks(misStocks, modProd){
let miStockCorrecto = null;
for (let i = 0; i < misStocks.length; i++) {
        if (misStocks[i].getAttribute("data-id") === modProd) {
            miStockCorrecto = misStocks[i];
            break;  
        }
    }
    return miStockCorrecto;
}
/*--------BUSCAR ESTADOS--------------*/
function buscarEstados(misEstados,modProd){
    let miEstadoCorrecto = null;
    for (let i = 0; i < misEstados.length; i++) {
            if (misEstados[i].getAttribute("data-id") === modProd) {
                miEstadoCorrecto = misEstados[i];
                break;  
            }
        }
        return miEstadoCorrecto;
}
/*--------BUSCAR OFERTAS--------------*/
function buscarOfertas(misOfertas,modProd){
    let miOfertaCorrecta = null;
    for (let i = 0; i < misOfertas.length; i++) {
            if (misOfertas[i].getAttribute("data-id") === modProd) {
                miOfertaCorrecta = misOfertas[i];
                break;  
            }
        }
        return miOfertaCorrecta;
}

function cargarTablaAprobacion(){
    cargarTablaComprasPendientes();
    cargarTablaComprasCanceladas();
    cargarTablaComprasAprobadas();
}

function cargarTablaComprasPendientes(){
    let tablaPendientes = document.querySelector("#listaPendientes"); 
    tablaPendientes.innerHTML = "";
    for(let i = 0; i< miSistema.compras.length; i++){
        let administrarCompra = miSistema.compras[i];
        if(administrarCompra.estado == "Pendiente"){
           let unTR = document.createElement("tr");
           let tdUsuario = document.createElement("td");
           let tdSaldo = document.createElement("td");
           let tdProducto = document.createElement("td");
           let tdEstadoProducto = document.createElement("td");
           let tdCantidad = document.createElement("td");
           let tdMonto = document.createElement("td");
           let tdEstado = document.createElement("td");
           let tdBotonAprobar = document.createElement("td");
           let unBotonAprobar = document.createElement("input");
           unBotonAprobar.setAttribute("type","button");
           unBotonAprobar.setAttribute("value","Aprobar");
           unBotonAprobar.setAttribute("data-id",administrarCompra.id); 
           unBotonAprobar.setAttribute("class","botonesAprobar"); 
           let unBotonCancelar = document.createElement("input");
           unBotonCancelar.setAttribute("type","button");
           unBotonCancelar.setAttribute("value","Cancelar");
           unBotonCancelar.setAttribute("data-id",administrarCompra.id); 
           unBotonCancelar.setAttribute("class","botonesCancelar");
           tdUsuario.innerHTML = administrarCompra.cliente.user;
           tdSaldo.innerHTML = administrarCompra.cliente.saldo;
           tdProducto.innerHTML = administrarCompra.producto.nombre;
           tdEstadoProducto.innerHTML = administrarCompra.producto.estado;
           tdCantidad.innerHTML = administrarCompra.cantidad;
           tdMonto.innerHTML = administrarCompra.precioCompra;
           tdEstado.innerHTML = administrarCompra.estado;
           tdBotonAprobar.appendChild(unBotonAprobar);
           unTR.appendChild(tdUsuario);
           unTR.appendChild(tdSaldo);
           unTR.appendChild(tdProducto);
           unTR.appendChild(tdEstadoProducto);
           unTR.appendChild(tdCantidad);
           unTR.appendChild(tdMonto);
           unTR.appendChild(tdEstado);
           unTR.appendChild(unBotonAprobar);
           unTR.appendChild(unBotonCancelar);
           tablaPendientes.appendChild(unTR);
        }
    }
    let misBotonesAprobar = document.querySelectorAll(".botonesAprobar");
    for (let i = 0; i < misBotonesAprobar.length; i++) {
    let unBotonAprobar = misBotonesAprobar[i];
    unBotonAprobar.addEventListener("click", aprobarCompraAdmin);
}
  let misBotonesCancelar = document.querySelectorAll(".botonesCancelar");
  for (let i = 0; i < misBotonesCancelar.length; i++) {
  let unBotonCancelar = misBotonesCancelar[i];
  unBotonCancelar.addEventListener("click", cancelarCompraAdmin);
}
}
/*---FUNCION CANCELAR COMPRA ADMIN---*/
function cancelarCompraAdmin(){
    let miCompra = this.getAttribute("data-id");
    miSistema.cancelarCompraAdmin(miCompra);
    cargarTablaAprobacion();
}

/*---FUNCION APROBAR COMPRA---*/
function aprobarCompraAdmin(){
let miCompra = this.getAttribute("data-id");
miSistema.aprobarCompraAdmin(miCompra);
cargarTablaAprobacion();

}

/*----------FUNCION CARGAR TABLA COMPRAS CANCELADAS--------*/
function cargarTablaComprasCanceladas(){
    let tablaCanceladas = document.querySelector("#listaCanceladas"); 
    tablaCanceladas.innerHTML = "";
    for(let i = 0; i< miSistema.compras.length; i++){
        let administrarCompra = miSistema.compras[i];
        if(administrarCompra.estado == "Cancelada"){
           let unTR = document.createElement("tr");
           let tdUsuario = document.createElement("td");
           let tdSaldo = document.createElement("td");
           let tdProducto = document.createElement("td");
           let tdCantidad = document.createElement("td");
           let tdMonto = document.createElement("td");
           let tdEstado = document.createElement("td");
           tdUsuario.innerHTML = administrarCompra.cliente.user;
           tdSaldo.innerHTML = administrarCompra.cliente.saldo;
           tdProducto.innerHTML = administrarCompra.producto.nombre;
           tdCantidad.innerHTML = administrarCompra.cantidad;
           tdMonto.innerHTML = administrarCompra.precioCompra;
           tdEstado.innerHTML = administrarCompra.estado;
           unTR.appendChild(tdUsuario);
           unTR.appendChild(tdSaldo);
           unTR.appendChild(tdProducto);
           unTR.appendChild(tdCantidad);
           unTR.appendChild(tdMonto);
           unTR.appendChild(tdEstado);
           tablaCanceladas.appendChild(unTR);
        }
    }
}

/*----------FUNCION CARGAR TABLA COMPRAS APROBADAS--------*/
function cargarTablaComprasAprobadas(){
let tablaAprobadas = document.querySelector("#listaAprobadas"); 
tablaAprobadas.innerHTML = "";
for(let i = 0; i< miSistema.compras.length; i++){
    let administrarCompra = miSistema.compras[i];
    if(administrarCompra.estado == "Aprobada"){
       let unTR = document.createElement("tr");
       let tdUsuario = document.createElement("td");
       let tdSaldo = document.createElement("td");
       let tdProducto = document.createElement("td");
       let tdCantidad = document.createElement("td");
       let tdMonto = document.createElement("td");
       let tdEstado = document.createElement("td");
       tdUsuario.innerHTML = administrarCompra.cliente.user;
       tdSaldo.innerHTML = administrarCompra.cliente.saldo;
       tdProducto.innerHTML = administrarCompra.producto.nombre;
       tdCantidad.innerHTML = administrarCompra.cantidad;
       tdMonto.innerHTML = administrarCompra.precioCompra;
       tdEstado.innerHTML = administrarCompra.estado;
       unTR.appendChild(tdUsuario);
       unTR.appendChild(tdSaldo);
       unTR.appendChild(tdProducto);
       unTR.appendChild(tdCantidad);
       unTR.appendChild(tdMonto);
       unTR.appendChild(tdEstado);
       tablaAprobadas.appendChild(unTR);
    }
}
}

/*---------FUNCION CARGAR INFROME GANANCIAS--------*/
function cargarInformeGanancias(){
let tablaInforme = document.querySelector("#tablaInformeGanancias");
tablaInforme.innerHTML = "";
let productos = [];
document.querySelector("#pInformes").innerHTML = gananciaTotalCompras() + "$";
for(let i = 0; i< miSistema.compras.length; i++){
    let miCompra = miSistema.compras[i];
    if(miCompra.estado == "Aprobada"){ 
    let productoId = miCompra.producto.id;
    if(!productos[productoId]){
        let unTR = document.createElement("tr");
        let tdProducto = document.createElement("td");
        let tdCantidadVendidas = document.createElement("td");
        //let tdTotales = document.createElement("td");
        tdProducto.innerHTML =  `${miCompra.producto.nombre} (${miCompra.producto.id})`;
        tdCantidadVendidas.innerHTML = miCompra.producto.unidadesVendidas;
        //tdTotales.innerHTML =  gananciaTotalCompras();
        unTR.appendChild(tdProducto);
        unTR.appendChild(tdCantidadVendidas);
        //unTR.appendChild(tdTotales);
        tablaInforme.appendChild(unTR);
        productos[productoId] = true;  //ayudin de chatgipiti para no mostrar el productos dos veces con el mismo calculo
    }
    }
}

}
/*En esta vista, el administrador, deberá ver en un párrafo, la cantidad total de
vendida (unidades) de cada producto y la ganancia total por todas las compras
realizadas por los usuarios.*/

function gananciaTotalCompras(){
let total = miSistema.gananciaTotal();
return total;
}

