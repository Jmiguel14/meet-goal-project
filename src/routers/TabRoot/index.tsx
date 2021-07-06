import { IonTabBar, IonTabs, IonTabButton, IonIcon } from "@ionic/react";
import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { PrivateRoutes } from "routers/PrivateRoutes";
import { Route, Redirect } from "react-router";
import {
  homeOutline,
  mailOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";
import "./styles.css";
import { Menu } from "components/Menu";
import PlayerProfile from "pages/PlayerProfile/PlayerProfile";
import EditPersonalInfo from "pages/PlayerProfile/EditPersonalInfo/EditPersonalInfo";
import EditTacticalInfo from "pages/PlayerProfile/EditTacticalInfo/EditTacticalInfo";
import EditAttributes from "pages/PlayerProfile/EditAttributes/EditAttributes";
import AddClub from "pages/PlayerProfile/AddClub/AddClub";
import AddInjury from "pages/PlayerProfile/AddInjury/AddInjury";
import EditPsycoInfo from "pages/PlayerProfile/EditPsycoInfo/EditPsycoInfo";
import Beginning from "pages/PlayerProfile/Beginning/Beginning";
import AddChannels from "pages/PlayerProfile/AddChannels/AddChannels";
import loadable from '@loadable/component';
import { IonLoading } from "@ionic/react";

const loadableOptions = {fallback: <IonLoading isOpen={true}/>}

const AsyncDashboard = loadable(() => import('pages/PlayerDashboard/PlayerDashboard'), loadableOptions)
const AsyncSearchForPlayer = loadable(() => import('pages/SearchForPlayer/SearchForPlayer'), loadableOptions)
const AsyncNotifications = loadable(() => import('pages/Notifications/Notifications'), loadableOptions)
const AsyncMessages = loadable(() => import('pages/Messages/Messages'), loadableOptions)
const AsyncPasswordReset = loadable(() => import('pages/PasswordReset'), loadableOptions)

export const TabRoot: React.FC = () => {
  return (
    <>
      <Menu />
      <IonTabs>
        <IonRouterOutlet id="main">
          <PrivateRoutes
            exact
            path="/tabs/inicio-jugador"
            component={AsyncDashboard}
          />
          <PrivateRoutes
            exact
            path="/tabs/busqueda"
            component={AsyncSearchForPlayer}
          />
          <PrivateRoutes
            exact
            path="/tabs/notificaciones-jugador"
            component={AsyncNotifications}
          />
          <PrivateRoutes
            exact
            path="/tabs/mensajes-jugador"
            component={AsyncMessages}
          />
          <PrivateRoutes
            exact
            path="/tabs/perfil-jugador"
            component={PlayerProfile}
          />
          <PrivateRoutes
            exact
            path="/tabs/editar-info-personal-jugador"
            component={EditPersonalInfo}
          />
          <PrivateRoutes
            exact
            path="/tabs/editar-info-tactica-jugador"
            component={EditTacticalInfo}
          />
          <PrivateRoutes
            exact
            path="/tabs/editar-info-atributos-jugador"
            component={EditAttributes}
          />
          <PrivateRoutes
            exact
            path="/tabs/agregar-experiencia"
            component={AddClub}
          />
          <PrivateRoutes
            exact
            path="/tabs/agregar-lesiones-jugador"
            component={AddInjury}
          />
          <PrivateRoutes
            exact
            path="/tabs/editar-info-psicologica-jugador"
            component={EditPsycoInfo}
          />
          <PrivateRoutes
            exact
            path="/tabs/editar-valores-jugador"
            component={Beginning}
          />
          <PrivateRoutes
            exact
            path="/tabs/canales-jugador"
            component={AddChannels}
          />
          <Route
            path="/tabs"
            render={() => (
              <Redirect to={{ pathname: "/tabs/inicio-jugador" }} />
            )}
            exact={true}
          />
          <Route
            path="/"
            render={() => (
              <Redirect to={{ pathname: "/tabs/inicio-jugador" }} />
            )}
            exact={true}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="light">
          <IonTabButton tab="inicio-jugador" href="/tabs/inicio-jugador">
            <IonIcon icon={homeOutline} />
          </IonTabButton>
          <IonTabButton tab="busqueda" href="/tabs/busqueda">
            <IonIcon icon={searchOutline}></IonIcon>
          </IonTabButton>
          <IonTabButton
            tab="notificaciones-jugador"
            href="/tabs/notificaciones-jugador"
          >
            <IonIcon icon={notificationsOutline}></IonIcon>
          </IonTabButton>
          <IonTabButton tab="mensajes-jugador" href="/tabs/mensajes-jugador">
            <IonIcon icon={mailOutline}></IonIcon>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};
