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

