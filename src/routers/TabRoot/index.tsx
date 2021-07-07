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
import loadable from "@loadable/component";
import { IonLoading } from "@ionic/react";
import { Routes } from "constants/routes";

const loadableOptions = { fallback: <IonLoading isOpen={true} /> };

const AsyncDashboard = loadable(
  () => import("pages/PlayerDashboard/PlayerDashboard"),
  loadableOptions
);
const AsyncSearchForPlayer = loadable(
  () => import("pages/SearchForPlayer/SearchForPlayer"),
  loadableOptions
);
const AsyncNotifications = loadable(
  () => import("pages/Notifications/Notifications"),
  loadableOptions
);
const AsyncMessages = loadable(
  () => import("pages/Messages/Messages"),
  loadableOptions
);
const AsyncPlayerProfile = loadable(
  () => import("pages/PlayerProfile/PlayerProfile"),
  loadableOptions
);
const AsyncEditPersonalInfo = loadable(
  () => import("pages/PlayerProfile/EditPersonalInfo/EditPersonalInfo"),
  loadableOptions
);
const AsyncEditTacticalInfo = loadable(
  () => import("pages/PlayerProfile/EditTacticalInfo/EditTacticalInfo"),
  loadableOptions
);
const AsyncEditAttributesInfo = loadable(
  () => import("pages/PlayerProfile/EditAttributes/EditAttributes"),
  loadableOptions
);
const AsyncAddClubExperience = loadable(
  () => import("pages/PlayerProfile/AddClub/AddClub"),
  loadableOptions
);
const AsyncAddInjuryExperience = loadable(
  () => import("pages/PlayerProfile/AddInjury/AddInjury"),
  loadableOptions
);
const AsyncEditPsycoInfo = loadable(
  () => import("pages/PlayerProfile/EditPsycoInfo/EditPsycoInfo"),
  loadableOptions
);
const AsyncEditValue = loadable(
  () => import("pages/PlayerProfile/Beginning/Beginning"),
  loadableOptions
);
const AsyncEditChannels = loadable(
  () => import("pages/PlayerProfile/AddChannels/AddChannels"),
  loadableOptions
);

export const TabRoot: React.FC = () => {
  return (
    <>
      <Menu />
      <IonTabs>
        <IonRouterOutlet id="main">
          <PrivateRoutes
            exact
            path={Routes.DASHBOARD}
            component={AsyncDashboard}
          />
          <PrivateRoutes
            exact
            path={Routes.SEARCH}
            component={AsyncSearchForPlayer}
          />
          <PrivateRoutes
            exact
            path={Routes.NOTIFICATIONS}
            component={AsyncNotifications}
          />
          <PrivateRoutes
            exact
            path={Routes.MESSAGES}
            component={AsyncMessages}
          />
          <PrivateRoutes
            exact
            path={Routes.PLAYERPROFILE}
            component={AsyncPlayerProfile}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITPERSONALINFO}
            component={AsyncEditPersonalInfo}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITTACTICALINFO}
            component={AsyncEditTacticalInfo}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITATTRIBUTESINFO}
            component={AsyncEditAttributesInfo}
          />
          <PrivateRoutes
            exact
            path={Routes.ADDCLUBEXPERIENCE}
            component={AsyncAddClubExperience}
          />
          <PrivateRoutes
            exact
            path={Routes.ADDINJURYEXPERIENCE}
            component={AsyncAddInjuryExperience}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITPSYCOINFO}
            component={AsyncEditPsycoInfo}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITCHANNELS}
            component={AsyncEditChannels}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITVALUES}
            component={AsyncEditValue}
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