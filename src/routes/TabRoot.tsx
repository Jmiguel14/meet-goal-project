import { IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { PrivateRoutes } from "routes/PrivateRoutes";
import PlayerDashboard from "pages/PlayerDashboard/PlayerDashboard";
import SearchForPlayer from "pages/SearchForPlayer/SearchForPlayer";
import Notifications from "pages/Notifications/Notifications";
import Messages from "pages/Messages/Messages";
import { Route, Redirect } from "react-router";

export const TabRoot: React.FC = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
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
        <IonTabBar slot="bottom">
          <IonTabButton tab="inicio-jugador" href="/tabs/inicio-jugador">
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="busqueda" href="/tabs/busqueda">
            <IonLabel>Busqueda</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="notificaciones-jugador"
            href="/tabs/notificaciones-jugador"
          >
            <IonLabel>Notificaciones</IonLabel>
          </IonTabButton>
          <IonTabButton tab="mensajes-jugador" href="/tabs/mensajes-jugador">
            <IonLabel>Mensajes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};
