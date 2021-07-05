import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "pages/Home/Home";
import { SignUp } from "pages/SignUp";
import { SignIn } from "pages/SignIn";
import { TabRoot } from "./TabRoot/index";
import { PublicRoutes } from "./PublicRoutes";
import loadable from "react-app-env";
import { PasswordReset } from "pages/PasswordReset";
import { CheckEmail } from "pages/CheckEmail";

export const AppRouter: React.FC = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path="/tabs" component={TabRoot}></Route>
        <PublicRoutes path="/home" component={Home} />
        <PublicRoutes path="/iniciar-sesion" component={SignIn} />
        <PublicRoutes path="/registrarse" component={SignUp} />
        <PublicRoutes
          path="/restablecer-contrasena"
          component={PasswordReset}
        />
        <PublicRoutes path="/verificar-email-enviado" component={CheckEmail} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};
