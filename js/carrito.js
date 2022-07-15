const tbody = document.querySelector('.tbody')
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
const totalCarrito = JSON.parse(localStorage.getItem("Totalcarrito"));
const cantidad = JSON.parse(localStorage.getItem('CantidadProductos'));

function realizarCompra()
         {Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Muchas gracias por tu compra, ha sido realizada! Para terminar concretar el envio del producto y el pago, contactate con el siguiente numero: 3364 60-7243',
            showConfirmButton: true,
          })
                guardarLocal("listaProductos", JSON.stringify([]));
                guardarLocal("Totalcarrito", JSON.stringify(0));
                guardarLocal("CantidadProductos", JSON.stringify(0));
                    tbody.innerHTML = ''
                    const contenedor = document.getElementById('Totales')
                    contenedor.innerHTML = ''
                     
                const cantidad2 = JSON.parse(localStorage.getItem('CantidadProductos'));
                if (cantidad2 == null ) {cantidad2=0}
                var x = document.getElementById("ContadorCarrito");
                x.innerHTML = parseInt(cantidad2);

                
        }

function renderCarrito(){
          tbody.innerHTML = ''
          almacenados.map(item => {
                          const tr = document.createElement('tr')
                          tr.classList.add('ItemCarrito')
                          const Content = `
                          
                          <th scope="row"></th>
                                <td ><p>${item.code}</p></td>
                                <td ><p>${item.name}</p></td>
                                <td class="table__price"><p> $ ${item.precio}      </p>                                </td>

                                    <div id="divEliminar" class="text-center">
                                        <button ID = "btnEliminar" class="btnEliminar2 btn btn-outline-dark mt-auto ">X
                                        </button>
                                    </div>                          
                          `
                            tr.innerHTML = Content;
                            tbody.append(tr)

                      }
                )
}

function armarPagina(){

        const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
        const totalCarrito = JSON.parse(localStorage.getItem("Totalcarrito"));
        const cantidad = JSON.parse(localStorage.getItem('CantidadProductos'));


        for (const objeto of almacenados)
              {
                renderCarrito()
              }

        if (cantidad == null ) {cantidad=0}
        var x = document.getElementById("ContadorCarrito");
        x.innerHTML = parseInt(cantidad);

        const contenedor = document.getElementById('Totales')
        const totales = document.createElement('h3')

        totales.textContent = ` El total de la compra es $ ${totalCarrito} `

        contenedor.appendChild(totales)

        const EfectuarCompra = document.getElementById('EfectuarCompra')
        const Confir = document.createElement('button')
        const Content = `
                        <a>
                            <button class="btn btn-outline-dark" type=button >
                                <i class="bi-cart-fill me-1"></i>Confirmar Compra
                            </button>
                        </a> 
                         `
        Confir.innerHTML = Content;

        Confir.addEventListener("click", () => {     realizarCompra()        })  

        EfectuarCompra.appendChild(Confir)

        const vaciarCarrito = document.createElement('button')
        const Content2 = `
                            <button class="btn btn-outline-dark" type=button >
                                <i class="bi-cart-fill me-1"></i>Vaciar Carrito
                            </button>
                         `
        vaciarCarrito.innerHTML = Content2;

        vaciarCarrito.addEventListener("click", () => {     BorrarCompra()        })  

        EfectuarCompra.appendChild(vaciarCarrito)
}

function BorrarCompra() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usted ha vaciado el carrito correctamente',
        showConfirmButton: true,
    })

    tbody.innerHTML = ''
    const contenedor = document.getElementById('Totales')
    contenedor.innerHTML = ''
    const EfectuarCompra = document.getElementById('EfectuarCompra')
    EfectuarCompra.innerHTML= ''
    guardarLocal("listaProductos", JSON.stringify([]));
    guardarLocal("Totalcarrito", JSON.stringify(0));
    guardarLocal("CantidadProductos", JSON.stringify(0));
    armarPagina()
}

function eliminar() {
    const btnEliminar = document.getElementsByClassName("btnEliminar2");

    for(let i =0; i < btnEliminar.length ; i++){
            btnEliminar[i].addEventListener("click", () => {


                guardarLocal("Totalcarrito", JSON.stringify(totalCarrito-almacenados[i].precio));
                guardarLocal("CantidadProductos", JSON.stringify(cantidad-1));
                almacenados.splice(i, 1);
                guardarLocal("listaProductos", JSON.stringify(almacenados));
                const contenedor = document.getElementById('Totales')
                contenedor.innerHTML = ''
                const EfectuarCompra = document.getElementById('EfectuarCompra')
                EfectuarCompra.innerHTML= ''
                armarPagina()
                location.reload()
            })   
}
}

armarPagina()
eliminar()
