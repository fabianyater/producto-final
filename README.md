# Node.js Authentication Project

Este proyecto es una API de autenticación básica construida con Node.js, Express y MongoDB. Proporciona funcionalidades como registro, inicio de sesión y manejo de sesiones utilizando JWT (JSON Web Tokens).

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (versión 4 o superior)

## Instalación de MongoDB

Si no tienes MongoDB instalado, sigue las instrucciones oficiales para instalarlo en tu sistema:

- [Instrucciones para instalar MongoDB](https://docs.mongodb.com/manual/installation/)

Una vez que MongoDB esté instalado y corriendo, puedes continuar con la configuración del proyecto.

## Configuración del proyecto

### 1. Clonar el repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tuusuario/nombre-del-proyecto.git
cd nombre-del-proyecto
```

### 2. Crear archivo .env

Agregar las credenciales allí:

**MONGODB_URI**=mongodb://localhost:27017/node-auth  
**SECRET_KEY**=clave-secreta

### 3. Instalar dependencias

Por alguna razón al hacer npm install a la primera no funciona; por la librería mongoose
entonces antes debemos limpiar la caché

```bash
npm cache clean --force
npm install
```

### 4. Correr la aplicación

```bash
npm run dev
```
