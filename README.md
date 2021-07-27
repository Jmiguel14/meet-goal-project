# :zap: Meet Goal
![logo](https://user-images.githubusercontent.com/56648593/127076823-cba7b816-e329-4a32-a917-c20635c5838e.png)

App created using [Ionic](https://ionicframework.com/), [React](https://reactjs.org/) and [firebase](https://firebase.google.com/docs).

## :page_facing_up: Table of contents


- [General info](#-general-info)
- [Screenshots](#-screenshots)
- [Technologies](#-technologies)
- [Setup](#-setup)
- [Features](#-features)
- [Status](#-status)


- [Registro de usuarios](#-registro-de-usuarios)
- [Inicio de sesión](#-inicio-de-sesión-y-restablecimiento-de-contraseña)
- [Registro de datos de perfil de usuario](#-registro-de-datos-de-perfil-de-usuario)
- [Búsqueda y filtrado](#-búsqueda-y-filtrado)
- [Creación de convocatorias](#-creación-de-convocatorias)
- [Gestión de postulaciones a una convocatoria](#-gestión-de-postulaciones-a-una-convocatoria)
- [Notificaciones](#-notificaciones)
- [Autenticación de aplicación web administrativa](#-autenticación-de-aplicación-web-administrativa)
- [Gestión de aplicación web administrativa](#-%EF%B8%8F-gestión-de-aplicación-web-administrativa)
- [Pruebas finales de App móvil y web](#%EF%B8%8F-pruebas-finales-de-app-móvil-y-web)
- [Despliegue de App móvil y web](#-despliegue-de-app-móvil-y-web)
- [Disposición](#-disposición)

## ℹ️ General info
Mobile App that allows sports clubs to filter their players through calls, and it gives to players the chance to let the clubs know their skills. The App is being built with Ionic, React, and Firebase.
## 📷 Screenshots
 - Autenticación
 
![1](https://user-images.githubusercontent.com/56648593/127067231-9de728a9-ebfc-48c3-aaff-a2cfb04892a4.png) ![3](https://user-images.githubusercontent.com/56648593/127071720-4d8878e5-e1de-4628-896d-6357c1af4fe0.png) ![2](https://user-images.githubusercontent.com/56648593/127067238-def5e220-3a5b-4e7a-8c64-a4cc8df2eacc.png)

 - Usuario jugador
 
 ![5](https://user-images.githubusercontent.com/56648593/127086540-ad7582ce-870c-48c2-8e4f-7addc81c8031.png) ![6](https://user-images.githubusercontent.com/56648593/127086576-835e0cce-af19-4fa7-a658-da301b903854.png) ![7](https://user-images.githubusercontent.com/56648593/127086844-525f018d-b18b-4413-aea4-1f005eaef87d.png) ![8](https://user-images.githubusercontent.com/56648593/127086886-c579c6e1-a0e7-4276-92f9-779396ae5a6b.png) ![9](https://user-images.githubusercontent.com/56648593/127087019-2187cfef-34e3-4191-b91d-b346d1eb9162.png) ![10](https://user-images.githubusercontent.com/56648593/127087060-6e9240f4-ff45-4e42-abb8-2ce00ea21675.png)

 - Usuario club 

![11](https://user-images.githubusercontent.com/56648593/127087471-38690307-adb9-4645-85d8-6e1cab63cf48.png) ![12](https://user-images.githubusercontent.com/56648593/127087548-6d8e0734-0656-4453-bb4b-a71d2841eb94.png) ![13](https://user-images.githubusercontent.com/56648593/127087709-34965d0e-49c8-4d2a-ac99-45dd4c41f709.png) ![14](https://user-images.githubusercontent.com/56648593/127087745-fee06dd9-7a02-4c09-9bbe-41b5a92adcb9.png) ![15](https://user-images.githubusercontent.com/56648593/127087768-743da96d-ae78-4c52-bc34-8404a34a8448.png)

## 👨‍💻 Technologies

- [Ionic 5.5.0](https://ionicframework.com/)
- [React 17.0.1](https://reactjs.org/)
- [Firebase 8.6.8](https://firebase.google.com/docs)
- [Capacitor 3.0.0](https://capacitorjs.com/)
- [react-hook-form 7.8.8](https://react-hook-form.com/)
- [Yup 0.32.9](https://github.com/jquense/yup)

## ⚙️ Setup
- Clone the repo 
- `npm i` or `npm install`
- `npx cap add android`

## 🤖 Features
- Filter the best palyers for calls
- Let the clubs know your skills.

  ### To do
  ### All users:
  - Create an account
  - Create an account with Google or Facebook: **Pending**
  - Login with the account previusly created
  - Reset password
  - Register profile information
  - Update profile information
  - Search players
  - View profile players
  - View notifications: **Pending**
  - Send messages: **Pending**
  ### Players:
  - Search calls
  - View calls
  - Apply for calls
  - Search clubs
  - View profile clubs
  ### Clubs:
  - Create calls
  - Update calls created
  - Select players of a call: **Pending**

## 📆 Status
This app is still being developed, but its develop will have finished by the end of August.

## 👨‍💻 Registro de usuarios
El usuario puede registrarse de 3 maneras en la aplicación, la primera es con un `email` existente, `contraseña` y datos adionales como el nombre, fecha de nacimiento, etc. La segunda y tercera forma es con una cuenta de `Google` o `Facebook` respectivamente. Estas últimas dos maneras aún se encuentran pendientes.
Las imagenes de abajo muestran las vistas del registro con la primera manera.

![1](https://user-images.githubusercontent.com/56648593/127067231-9de728a9-ebfc-48c3-aaff-a2cfb04892a4.png) ![3](https://user-images.githubusercontent.com/56648593/127071720-4d8878e5-e1de-4628-896d-6357c1af4fe0.png) ![2](https://user-images.githubusercontent.com/56648593/127067238-def5e220-3a5b-4e7a-8c64-a4cc8df2eacc.png)

## 📲 Inicio de sesión y restablecimiento de contraseña
Una vez que el usuario se haya registrado en la applicación, puede **iniciciar sesión con el correo y la contraseña** como se muestra en la imagen de abajo. Además la aplicación tiene la funcionalidad de `restablecer la contraseña`, dado el caso que el usuario haya olvidado su contraseña.

![3](https://user-images.githubusercontent.com/56648593/127071720-4d8878e5-e1de-4628-896d-6357c1af4fe0.png) ![4](https://user-images.githubusercontent.com/56648593/127071858-b2fec680-617d-4ab7-8235-282b63770e48.png)


## 💁 Registro de datos de perfil de usuario

## 🔎 Búsqueda y filtrado

## 📂 Creación de convocatorias

## 👨‍💼 Gestión de postulaciones a una convocatoria

## 🔔 Notificaciones

## 📨 Mensajería

## 🔐 Autenticación de aplicación web administrativa

## 👨‍💼 🖥️ Gestión de aplicación web administrativa

## 🗳️ Pruebas finales de App móvil y web

## 🌎 Despliegue de App móvil y web

## 💾 Disposición

## :signal_strength: Tecnologías

- [Android Studio 4.1](https://developer.android.com/)
- [Java 8](https://www.oracle.com/index.html)
- [Gradle](https://gradle.org/)
- [Firebase](https://firebase.google.com/docs)

## :floppy_disk: Disposición

- Descargar APK
