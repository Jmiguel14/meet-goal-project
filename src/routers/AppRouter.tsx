import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { TabRoot } from "./TabRoot/index";
import { PublicRoutes } from "./PublicRoutes";
import loadable from "@loadable/component";
import { IonLoading } from "@ionic/react";
import { Routes } from "constants/routes";

const loadableOptions = { fallback: <IonLoading isOpen={true} /> };

const AsyncHome = loadable(() => import("pages/Home/Home"), loadableOptions);
const AsyncSignIn = loadable(() => import("pages/SignIn"), loadableOptions);
const AsyncSignUp = loadable(() => import("pages/SignUp"), loadableOptions);
const AsyncCheckEmail = loadable(
  () => import("pages/CheckEmail"),
  loadableOptions
);
const AsyncPasswordReset = loadable(
  () => import("pages/PasswordReset"),
  loadableOptions
);

export const AppRouter: React.FC = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path={Routes.TABS} component={TabRoot}></Route>
        <PublicRoutes path={Routes.HOME} component={AsyncHome} />
        <PublicRoutes path={Routes.LOGIN} component={AsyncSignIn} />
        <PublicRoutes path={Routes.SIGNUP} component={AsyncSignUp} />
        <PublicRoutes
          path={Routes.PASSWORD_RESET}
          component={AsyncPasswordReset}
        />
        <PublicRoutes
          path={Routes.CHECK_EMAIL_SENT}
          component={AsyncCheckEmail}
        />
        <Route exact path="/">
          <Redirect to={Routes.TABS} />
        </Route>
      </IonRouterOutlet>
    </>
  );
};
