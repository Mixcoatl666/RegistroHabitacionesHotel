# Registro Revisión Habitaciones

## Descripción
Cierta cadena hotelera requiere que las mucamas puedan registrar de manera ágil las condiciones en que se entrega 
una habitación de hotel, después de ser desocupado. El proceso consiste en lo siguiente: Una vez que la persona que ocupo cierta habitación y hace entrega de la misma, en la recepción de hotel, se le solicita a la mucama en cargada del piso donde se encuentra la habitación, que haga la revisión correspondiente de la habitación, al concluir con está, se le notifica al recepcionista para la liberación al cliente. La revisión de la habitación consiste en verificar: 
Que no haya daños, que las sabanas y toallas estén completas y sin daño, que los productos disponibles en el frigobar estén completos (en caso contrario, se reporta para el cobro al cliente) entre otros.

**Usted deberá identificar:**
- Requerimientos Funcionales
- Casos de uso identificados por cada Requerimiento funcional
- Diseño y propuesta de la BD NoRelacional
- Diseño y propuesta de consultas (con al menos 4 filtros, que sean útiles para el usuario)

# Requerimientos Funcionales

1. **Regstro de revisión de habitaciones:** Permite a las mucamas registrar el estado de las habitaciones una vez que han sido desocupadas.
2. **Notificación a la recuperación:** La mucama debe notificar al recepcionista una vez que ha terminado de revisar la habitación.
3. **Validación de inventario en la habitación:** Revisar y registrar el estado de los articulos como sábanas, toalaar y productos del frigobar.
4. **Reportes de daños faltantes:** Posibilidad de reportar cualqioer daño o falta de artículos para efectos de cobro o mantenimiento.
5. **Liberación de habitaciones:** El recepcionista puede liberar la habitacion para su próxima ocupación despues de verificar el reporte de la mucama.

# Casos de uso por requerimiento funcional

## Registro de revisión de habitaciones
- La mucama selecciona la habitación a revisar desde una lista de habitaciones asignadas.
- La mucama ingresa detalles de la revisión para cada ítem (estado, comentarios).
- La mucama marca la revisión como completa y envía el formulario.

## Notificación a la recepción
- El sistema envía automáticamente una notificación al recepcionista cuando la revisión es completada y marcada por la mucama.

## Validación de inventario en la habitación
- La mucama verifica y registra el estado de los artículos en el inventario, utilizando una lista predefinida de ítems a revisar.

## Reportes de daños y faltantes
- La mucama puede reportar daños o artículos faltantes durante la revisión, proporcionando detalles y posibles recomendaciones.

## Liberación de habitaciones
- El recepcionista recibe la notificación y revisa el informe completo de la mucama.
- Si el informe está conforme, el recepcionista cambia el estado de la habitación a "lista" para su próxima ocupación.

# Modelos propuestos para la Base de Datos

## Habitación
~~~
id (ObjectId)
piso (Number)
numeroHabitacion (Number)
nombreMucama
// caracteristicas
~~~

## Revisión
~~~
id (ObjectId)
numeroHabitacion (Sting)
nombreMucama (String)
fecha (Date: Fecha en que se reviso con la hora incluida)
itemsRevisados ([{
    nombre: (String),
    estado: (String: "exelente", "regular", "malo", "no encontrado"),
    comentario: (String)
}])
estadoGeneral: (String)
~~~

## Empleado (mucama, recepcionista)
~~~
id (OnjectId)
nombre (String)
email (String)
contrasenia (String)
rol (String)
token (String)
~~~


Filtros de habitaciones para buscar ciertas caracteristicas decidiendo que filtros a nivel de jefe ex