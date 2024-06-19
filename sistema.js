class Sistema{
    constructor(){
        this.productos = [];
        this.administradores = [];
        this.clientes = [];
        this.compras = [];

    }

precargarDatos(){
        /*--------ADMINISTRADORES----------------------*/
        this.nuevoUsuarioAdministrador("Lucas", "Sosamu");
        this.nuevoUsuarioAdministrador("agudelateja", "agustin1");
        this.nuevoUsuarioAdministrador("Matias", "Mati30");
        this.nuevoUsuarioAdministrador("Santiago", "Santi30");
        this.nuevoUsuarioAdministrador("Administrador3", "Administrador3");
        /*--------------------CLIENTES-----------------*/
        this.nuevoCliente("Lucas", "Sosa", "big smoke", "Luk5as","4539-3715-6707-0872" ,"777");
        this.nuevoCliente("Ignacio", "Lacordelle", "bahamut", "Bahamut32","4539-3715-6707-0872" ,"888");
        this.nuevoCliente("Rodrigo", "Rodriguez", "rober", "Rodri1","4539-3715-6707-0872" ,"999");
        this.nuevoCliente("Sebastian", "Mondo", "semon", "Semon45","4539-3715-6707-0872" ,"111");
        this.nuevoCliente("Emilia", "Varela", "emiliachan", "Emilia1000","4539-3715-6707-0872" ,"222");
        /*-----------------PRODUCTOS-------------------*/
        this.nuevoProductoOferta("Pelota de futbol", 220, "Pelota de Futbol", "img/pelota.jpg", 20);
        this.nuevoProductoOferta("Botella", 70, "Botella para agua", "img/botella.jpg", 10);
        this.nuevoProductoOferta("Short", 200, "Short de Futbol", "img/short.jpg", 0);
        this.nuevoProductoOferta("Botines", 400, "Botines de futbol", "img/botines.jpg", 10);
        this.nuevoProducto("Bicicleta",500,"Bicicleta moderna", "img/bici.jpg", 4);
        this.nuevoProducto("Guantes de boxeo",250,"Guantes para boxeo para adultos", "img/guantes.jpg", 4);
        this.nuevoProducto("Campera",300,"Campera deportiva", "img/campera.jpg", 4);
        this.nuevoProducto("Gorra",120,"Gorra zarpada", "img/gorra.jpg", 4);
        this.nuevoProductoInactivo("Bolso", 360, "Bolso grande", "img/bolso.jpeg", 10);
        this.nuevoProductoInactivo("Pelota de rugby", 145, "Pelota de rugby", "img/rugby.jpg", 20);
        /*---------------COMPRAS-----------------------*/
        this.nuevaCompraAprobadaTest(2,this.productos[0],this.clientes[0]);
        this.nuevaCompraAprobadaTest(3,this.productos[1],this.clientes[1]);
        this.nuevaCompraPendienteTest(2,this.productos[8],this.clientes[2]);
        this.nuevaCompraPendienteTest(1,this.productos[5],this.clientes[3]);
        this.nuevaCompraCanceladaTest(4,this.productos[7],this.clientes[4]);
        
    }

    nuevoCliente(nombre, apellido, user, password, tarjeta, cvc){
        let unCliente = new Cliente(nombre, apellido, user, password, tarjeta, cvc);
        this.clientes.push(unCliente);
    }

login(user, password){
        user = user.toLowerCase();
        let miUsuario = this.buscarObjetoPor2Parametros(this.administradores, "user", "password", user, password);
        if(miUsuario == null){
            miUsuario = this.buscarObjetoPor2Parametros(this.clientes, "user", "password", user, password);
            return miUsuario;
        }
        else{
            return miUsuario;
    }
 }

nuevoUsuarioAdministrador(user, password){  
    if(password.length >= 5){
    user = user.toLowerCase();
    let administrador = new Administradores(user,password);
    this.administradores.push(administrador);
    }
 }

 registroCliente(nombre, apellido, user, password, tarjeta, cvc) {
    user = user.toLowerCase(); 

    
    let buscarCliente = this.buscarObjetoPor1Parametro(this.clientes, "user", user);
    let buscarAdministrador = this.buscarObjetoPor1Parametro(this.administradores, "user", user);
    
    if (buscarCliente != null || buscarAdministrador != null) {
        return null; 
    } else {
        let cliente = new Cliente(nombre, apellido, user, password, tarjeta, cvc);
        this.clientes.push(cliente);
        return true;
    }
}


buscarObjetoPor1Parametro(lista, parametro, valor) {
    for(let i = 0; i < lista.length; i++) {
        let unObjeto = lista[i];
        if(unObjeto[parametro] == valor) {
            return unObjeto;
        }
    }
    return null;
}

buscarObjetoPor2Parametros(lista, parametro1, parametro2, valor1, valor2) {
    for(let i = 0; i < lista.length; i++) {
        let unObjeto = lista[i];
        if(unObjeto[parametro1] == valor1 && unObjeto[parametro2] == valor2) {
            return unObjeto;
        }
    }
    return null;
}

crearProducto(nombreProducto,precioProducto,descripcion,imagen,stock){
    if(nombreProducto.length >0 && descripcion.length> 0 && imagen.length> 0){
        if(!isNaN(precioProducto) && !isNaN(stock)){
            let producto = new Producto(nombreProducto,precioProducto,descripcion,imagen,stock); 
            this.productos.push(producto);
            return true;
        }else{
            return null;
    }
    }else{
     return null;
    }

}

nuevoProductoOferta(nombreProducto,precioProducto,descripcion,imagen,stock){
    let nuevoProd = new Producto(nombreProducto,precioProducto,descripcion,imagen,stock);
    nuevoProd.oferta = true;
    nuevoProd.evaluarStock();
    this.productos.push(nuevoProd);
}

nuevoProducto(nombreProducto,precioProducto,descripcion,imagen,stock){
    let nuevoProd = new Producto(nombreProducto,precioProducto,descripcion,imagen,stock);
    nuevoProd.evaluarStock();
    this.productos.push(nuevoProd);
}

nuevoProductoInactivo(nombreProducto,precioProducto,descripcion,imagen,stock){
    let nuevoProd = new Producto(nombreProducto,precioProducto,descripcion,imagen,stock);
    nuevoProd.estado = "pausado";
    nuevoProd.evaluarStock();
    this.productos.push(nuevoProd);
}

realizarModificacion(modProd,pStock,pEstado,pOferta){
let prod = this.buscarObjetoPor1Parametro(this.productos, "id", modProd);
prod.stock = pStock;
prod.estado = pEstado;
if (prod.stock == 0 && prod.estado == "activo") {
    prod.estado = "pausado";
}
prod.oferta == pOferta.toLowerCase();
if(pOferta === "false"){
    prod.oferta = false;
}else{
    prod.oferta = true;
}
return prod;
}
nuevaCompra(idProducto,cantidad,usuarioLogueado){
let miProducto = this.buscarObjetoPor1Parametro(this.productos, "id", idProducto);
let nuevaCompra = new Compra(cantidad,miProducto,usuarioLogueado);
this.compras.push(nuevaCompra);
usuarioLogueado.misCompras.push(nuevaCompra);
}

nuevaCompraPendienteTest(cantidad,producto,cliente){
    let nuevaCompra = new Compra(cantidad,producto,cliente);
    nuevaCompra.estado = "Pendiente";
    this.compras.push(nuevaCompra);
    cliente.misCompras.push(nuevaCompra);
}

nuevaCompraCanceladaTest(cantidad,producto,cliente){
    let nuevaCompra = new Compra(cantidad,producto,cliente);
    nuevaCompra.estado = "Cancelada";
    this.compras.push(nuevaCompra);
    cliente.misCompras.push(nuevaCompra);
}

nuevaCompraAprobadaTest(cantidad,producto,cliente){
    let nuevaCompra = new Compra(cantidad,producto,cliente);
    nuevaCompra.estado = "Aprobada";
    nuevaCompra.producto.unidadesVendidas +=cantidad;
    nuevaCompra.cliente.saldo = nuevaCompra.cliente.saldo - nuevaCompra.precioCompra;
    nuevaCompra.cliente.saldoNegativo();
    this.compras.push(nuevaCompra);
    cliente.misCompras.push(nuevaCompra);
}

cancelCompra(idCompra){
let miCompra = this.buscarObjetoPor1Parametro(this.compras, "id", idCompra);
miCompra.estado = "Cancelada";
}

cancelarCompraAdmin(idCompra){
let miCompra = this.buscarObjetoPor1Parametro(this.compras, "id" ,idCompra);
miCompra.estado = "Cancelada";
}

aprobarCompraAdmin(idCompra){
let miCompra = this.buscarObjetoPor1Parametro(this.compras, "id" ,idCompra);
miCompra.estado = "Aprobada";
miCompra.producto.stock = miCompra.producto.stock - miCompra.cantidad;
miCompra.cliente.saldo = miCompra.cliente.saldo - miCompra.precioCompra;
miCompra.producto.unidadesVendidas += miCompra.cantidad;
miCompra.cliente.saldoNegativo(); 
miCompra.producto.evaluarStock();
}


gananciaTotal(){
let gananciaTotal = 0;
for(let i=0;i<this.compras.length;i++){
 let unaCompra = this.compras[i];
 if(unaCompra.estado == "Aprobada"){
   gananciaTotal += unaCompra.precioCompra;
 }
}
   return gananciaTotal; 
}


}


class Administradores{
    constructor(user, password){
        this.tipo = "Admin";
        this.user = user;
        this.password = password;
    }

}

let idCliente = 0;
class Cliente{
  constructor(nombre,apellido,user,password,tarjeta,cvc){
    this.tipo = "Cliente";
    this.nombre = nombre;
    this.apellido = apellido;
    this.user = user;
    this.password = password;
    this.tarjeta = tarjeta;
    this.cvc = cvc;
    this.saldo = 3000;
    this.id = ++idCliente;
    this.misCompras = [];
  }

   saldoNegativo(){
    if(this.saldo <=0){
        this.saldo =0;
    }
   }

}

let idProducto = 0;
class Producto{
    constructor(nombre,precio,descripcion,imagen,stock){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.stock = stock;
        this.estado = "activo";
        this.oferta = false;
        this.id = `PROD_ID_${++idProducto}`;
        this.unidadesVendidas = 0;
    }
    evaluarStock(){
        if(this.stock <= 0){
            this.estado = "pausado";
        }
    }
   
}
let idCompra =0;
class Compra{
    constructor(cantidad,producto,cliente){
        this.producto = producto;
        this.cliente = cliente;
        this.cantidad = cantidad;
        this.estado = "Pendiente"; 
        this.precioCompra = this.producto.precio * this.cantidad;
        this.id= ++idCompra;
    }
    calcularCosto(){
        this.precioCompra = this.producto.precio * this.cantidad;
    }

    

}