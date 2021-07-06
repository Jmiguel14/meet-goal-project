import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { TabRoot } from "./TabRoot/index";
import { PublicRoutes } from "./PublicRoutes";
import loadable from '@loadable/component';
import { IonLoading } from "@ionic/react";

const loadableOptions = {fallback: <IonLoading isOpen={true}/>}

const AsyncHome = loadable(() => import('pages/Home/Home'), loadableOptions)
const AsyncSignIn = loadable(() => import('pages/SignIn'), loadableOptions)
const AsyncSignUp = loadable(() => import('pages/SignUp'), loadableOptions)
const AsyncCheckEmail = loadable(() => import('pages/CheckEmail'), loadableOptions)
const AsyncPasswordReset = loadable(() => import('pages/PasswordReset'), loadableOptions)

export const AppRouter: React.FC = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path="/tabs" component={TabRoot}></Route>
        <PublicRoutes path="/home" component={AsyncHome} />
        <PublicRoutes path="/iniciar-sesion" component={AsyncSignIn} />
        <PublicRoutes path="/registrarse" component={AsyncSignUp} />
        <PublicRoutes
          path="/restablecer-contrasena"
          component={AsyncPasswordReset}
        />
        <PublicRoutes path="/verificar-email-enviado" component={AsyncCheckEmail} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};
