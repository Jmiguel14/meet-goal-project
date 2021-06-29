import {
  IonSplitPane,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { PrivateRoutes } from "routers/PrivateRoutes";
import PlayerDashboard from "pages/PlayerDashboard/PlayerDashboard";
import SearchForPlayer from "pages/SearchForPlayer/SearchForPlayer";
import Notifications from "pages/Notifications/Notifications";
import Messages from "pages/Messages/Messages";
import { Route, Redirect } from "react-router";
import { home, mail, notifications, search } from "ionicons/icons";
import "./styles.css";
import { Menu } from "components/Menu";

export const TabRoot: React.FC = () => {
  return (
    <>
        <Menu />
        <IonTabs>
          <IonRouterOutlet id="main">
            <PrivateRoutes
              exact
              path="/tabs/inicio-jugador"
              component={PlayerDashboard}
            />
            <PrivateRoutes
              exact
              path="/tabs/busqueda"
              component={SearchForPlayer}
            />
            <PrivateRoutes
              exact
              path="/tabs/notificaciones-jugador"
              component={Notifications}
            />
            <PrivateRoutes
              exact
              path="/tabs/mensajes-jugador"
              component={Messages}
            />
            <Route
              path="/tabs"
              render={() => <Redirect to="/tabs/inicio-jugador" />}
              exact={true}
            />
            <Route
              path="/"
              render={() => <Redirect to="/tabs/inicio-jugador" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" color="light">
            <IonTabButton tab="inicio-jugador" href="/tabs/inicio-jugador">
              <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab="busqueda" href="/tabs/busqueda">
              <IonIcon icon={search}></IonIcon>
            </IonTabButton>
            <IonTabButton
              tab="notificaciones-jugador"
              href="/tabs/notificaciones-jugador"
            >
              <IonIcon icon={notifications}></IonIcon>
            </IonTabButton>
            <IonTabButton tab="mensajes-jugador" href="/tabs/mensajes-jugador">
              <IonIcon icon={mail}></IonIcon>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
    </>
  );
};
