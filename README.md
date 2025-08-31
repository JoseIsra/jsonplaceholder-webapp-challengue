# InterbankChallengue

## Pasos para levantar el proyecto

### Clonar el repositorio

Clona este repositorio haciendo click en el botón "Code" de GitHub y copia en tu terminal de confianza la URL que GITHUB te mostrará

### Instalar dependencias

Asegúrate de tener [Nodejs](https://nodejs.org/es) instalado en tu equipo. La versión que debes usar debe ser de la versión 20 hacia adelante porque se usa Angular 18 en este proyecto.

Una vez confirmes que tienes Nodejs y el proyecto clonado, ejecuta el siguiente comando en tu terminal.

```
npm i
```

### Ejecución del proyecto

Una vez la instalacíon de las dependencias haya finalizado, a continuación ejecuta el siguiente comando en tu terminal:

```
npm run dev
```

Esto empezará a compilar el proyecto y una vez termine, el proyecto estará visible en la URL http://localhost:4200/

## Detalles del proyecto

Este proyecto es una aplicación web trabajada con Angular versión 18.

La arquitectura elegida es Clean Arquitecture porque permite separar responsabilidades, representar limpiamente flujos de negocio reales, facilita la implementación de pruebas unitarias y prepara al proyecto para los cambios futuros que todo proyecto de software sufre por naturaleza.

Se ha usado [Docker](https://www.docker.com/) para dockerizar la aplicación porque considero que es vital hoy en día gracias a que simplifica la compartición de todo software entre colegas, clientes y hasta entre equipos. Además que gracias a la dockerización, los despliegues se hacen más prácticos y automatizables.

Se ha enfocado la implementación de pruebas unitarias en las partes más relevantes del proyecto como algunos repositorios, casos de usos, servicios y componentes principales.
