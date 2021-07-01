import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "pages/Home/Home";
import { SignUp } from "pages/SignUp";
import { SignIn } from "pages/SignIn";
import { TabRoot } from "./TabRoot/index";
import { PublicRoutes } from "./PublicRoutes";
import loadable from "react-app-env";

export const AppRouter: React.FC = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path="/tabs" component={TabRoot}></Route>
        <PublicRoutes exact path="/home" component={Home} />
        <PublicRoutes exact path="/iniciar-sesion" component={SignIn} />
        <PublicRoutes exact path="/registrarse" component={SignUp} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};
