import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "pages/Home/Home";
import { SignUp } from "pages/SignUp";
import { SignIn } from "pages/SignIn";
import { TabRoot } from "./TabRoot";

export const AppRouter: React.FC = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path="/tabs" component={TabRoot}></Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/iniciar-sesion" component={SignIn} />
        <Route exact path="/registrarse" component={SignUp} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};
