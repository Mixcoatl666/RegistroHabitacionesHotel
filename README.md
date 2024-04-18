# Registro Revisión Habitaciones

**Descripción**
Cierta cadena hotelera requiere que las mucamas puedan registrar de manera ágil las condiciones en que se entrega 
una habitación de hotel, después de ser desocupado. El proceso consiste en lo siguiente: Una vez que la persona que ocupo cierta habitación y hace entrega de la misma, en la recepción de hotel, se le solicita a la mucama en cargada del piso donde se encuentra la habitación, que haga la revisión correspondiente de la habitación, al concluir con está, se le notifica al recepcionista para la liberación al cliente. La revisión de la habitación consiste en verificar: 
Que no haya daños, que las sabanas y toallas estén completas y sin daño, que los productos disponibles en el frigobar estén completos (en caso contrario, se reporta para el cobro al cliente) entre otros.

**Usted deberá identificar:**
- Requerimientos Funcionales
- Casos de uso identificados por cada Requerimiento funcional
- Diseño y propuesta de la BD NoRelacional
- Diseño y propuesta de consultas (con al menos n4 filtros, que sean útiles para el usuario)

## Requerimientos Funcionales
1. **Revisión de Habitación por la Mucama:** Las mucamas deben ingresar el estado de cada elemento
2. **Registro y Autenticación de Usuarios:** Los empleados deben poder iniciar sesión en el sistema para acceder a sus funciones correspondientes.
3. **Visualización de Tareas por Mucama:** Las mucamas deben poder ver las habitaciones asignadas a su piso que necesitan ser revisadas.
4. **Filtrado de Habitaciones por Estado, Fecha, Piso y Mucamas:** Los recepcionistas deben poder filtrar las habitaciones por estado (libre, ocupada, revisando), por la fecha de última revisión o rangos de fecha, por piso para observar todas las habitaciones por piso y por mucamas encargadas de piso.

## Casos de uso por requerimiento funcional
1. **Revisión de Habitación por la Mucama**
Ingresar a la habitación asignada: La mucama accede a la habitación que le ha sido asignada para limpieza y revisión.
Registrar condiciones de la habitación: La mucama registra el estado de las sábanas, toallas, y los ítems del frigobar, entre otros.
2. **Filtros**
Consultas basandonos en los filtros que los recepcionistas necesitan
5. **Registro y Autenticación de Usuarios**
Registro de nuevos empleados: Los administradores pueden añadir nuevos empleados al sistema.
Inicio de sesión de empleados: Los empleados usan su correo y contraseña para acceder al sistema.
6. **Visualización de Tareas por Mucama**
Visualizar listado de habitaciones asignadas: Las mucamas pueden ver las habitaciones que necesitan atención en su piso asignado.


## Modelos propuestos para la Base de Datos

### Empleado (mucama, recepcionista)
~~~
id: (OnjectId)
nombre: (String)
email: (String)
contrasenia: (String)
rol: (String)
~~~

### Habitación
~~~
id: (ObjectId)
piso: (Number)
numeroHabitacion (Number)
nombreMucama (String)
clienteHospedado: (String)
caracteristicas: {
    sabanas: {
        estado: (String: "exelente", "regular", "malo")
        cantidad: (Number)
    },
    toallas: {
        estado: (String: "exelente", "regular", "malo")
        cantidad: (Number)
    }
    frigobar: [{
        item: (String),
        cantidad: (Number)
    }]
}
estadoHabitación: (String: "libre", "ocupada", "revisando")
~~~

**Donde .-**
1. La mucama esta encargada de todo un piso, ella verificara todas las habitaciones correspondientes a su piso, por lo que mientras mas pisos en el hotel, mas mucamas.

## Revisión
~~~
id: (ObjectId)
habitacionId: (ObjectId)
nombreMucama: (String)
fecha: (Date: Fecha en que se reviso con la hora incluida)
itemsRevisados: [{
    item: (String),
    cantidadEncontrada: (Number)
    cantidadTotal: (Number)
    comentario: (String)
}]
comentarioGeneral: (String)
~~~