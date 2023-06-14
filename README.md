<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

# Requitos 
* Nodejs v18.15.0
* CLI de nest (opcional)
* Administrador de dependencias "yarn" (opcional)
* Docket desktop para la creación de la imagen de la base de datos

1. Clonar proyecto
2. ```yarn install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```

6. Levantar: ```yarn start:dev```

7. Ejecutar SEED
```
http://localhost:3000/api/seed
```

## Deploy in Flyio
### Requisitos
* Registrarse en [Fly.io](https://fly.io/)
* Instalar CLI de fly.io. Revisar [documentación](https://fly.io/docs/hands-on/install-flyctl/)

1. Iniciar sesión desde la linea de comandos. [Más información](https://fly.io/docs/hands-on/sign-in/)
```
fly auth login
```

2. Implementar proyecto desde un Dockerfile. [Más información](https://fly.io/docs/languages-and-frameworks/dockerfile/)
```
fly launch
```
```
An existing fly.toml file was found for app teslo-shop-nestjs
? Would you like to copy its configuration to he new app?  Yes
```
```
? Woild you like to set up a Postgresql database now? Yes
? Select configuration: Development - Single node, 1x shared CPU, 256 RAM, 1GB disk
? Scale single node pg to zero after one hour? Yes
```
3. Guardar las credenciales de acceso de la base de datos creada en un lugar seguro.
4. Conectarse al cluster de postgres para verificar **la base de datos creada**: `fly postgres connect -a <postgres-app-name>`
5. Listar las bases de datos: `\l`
6. Configurar las variables de entorno con **secrets**
```
fly secrets set STAGE=dev DB_PASSWORD=<Password> DB_NAME=<the-created> DB_HOST=<Hostname> DB_PORT=<Proxy port> PORT=3000 HOST_API=https://<check application>/api JWT_SECRET=<generate new>
```
3. Implementar aplicación
```
fly deploy
```
3. Visualizar detalles de implementación
```
fly status
```
4. Abrir aplicación con `fly open`: Obtendran este mensaje que significa que nuestro proyecto esta corriendo.
```
{"statusCode":404,"message":"ENOENT: no such file or directory, stat '/app/public/index.html'"}
```
5. Abrimos la siguiente URL https://{application name}/api


