import {
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { IonRouterOutlet } from "@ionic/react";
import { PrivateRoutes } from "routers/PrivateRoutes";
import { Route, Redirect, useLocation } from "react-router";
import firebase from "firebase/app";
import {
  homeOutline,
  mailOutline,
  notificationsOutline,
  searchOutline,
} from "ionicons/icons";
import "./styles.css";
import { Menu } from "components/Menu";
import loadable from "@loadable/component";
import { IonLoading } from "@ionic/react";
import { Routes } from "constants/routes";
import { useNotifications } from "hooks/useNotifications";

const loadableOptions = { fallback: <IonLoading isOpen={true} /> };

const AsyncDashboard = loadable(
  () => import("pages/Dashboard/Dashboard"),
  loadableOptions
);
const AsyncSearchForPlayer = loadable(
  () => import("pages/Search"),
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
  () => import("pages/UserProfilePage/UserProfilePage"),
  loadableOptions
);
const AsyncEditPersonalInfo = loadable(
  () => import("pages/UserProfilePage/EditPersonalInfo/EditPersonalInfo"),
  loadableOptions
);
const AsyncEditTacticalInfo = loadable(
  () => import("pages/UserProfilePage/EditTacticalInfo/EditTacticalInfo"),
  loadableOptions
);
const AsyncEditAttributesInfo = loadable(
  () => import("pages/UserProfilePage/EditAttributes/EditAttributes"),
  loadableOptions
);
const AsyncAddClubExperience = loadable(
  () => import("pages/UserProfilePage/AddClub/AddClub"),
  loadableOptions
);
const AsyncAddInjuryExperience = loadable(
  () => import("pages/UserProfilePage/AddInjury/AddInjury"),
  loadableOptions
);
const AsyncEditPsycoInfo = loadable(
  () => import("pages/UserProfilePage/EditPsycoInfo/EditPsycoInfo"),
  loadableOptions
);
const AsyncEditValue = loadable(
  () => import("pages/UserProfilePage/Beginning/Beginning"),
  loadableOptions
);
const AsyncEditChannels = loadable(
  () => import("pages/UserProfilePage/AddChannels/AddChannels"),
  loadableOptions
);

const AsyncEditPhotos = loadable(
  () => import("pages/UpdatePhotos/UpdatePhotos"),
  loadableOptions
);

const AsyncEditInstitutionalInfo = loadable(
  () =>
    import("pages/UserProfilePage/EditInstitutionalInfo/EditInstitutionalInfo"),
  loadableOptions
);

const AsyncEditSportsGoalsInfo = loadable(
  () => import("pages/UserProfilePage/EditSportsGoalsInfo/EditSportsGoalsInfo"),
  loadableOptions
);

const AsyncNewCall = loadable(
  () => import("pages/NewCall/NewCall"),
  loadableOptions
);

const AsyncCallsListClub = loadable(
  () => import("pages/CallsListClub/CallsListClub"),
  loadableOptions
);

const AsyncCallDetails = loadable(
  () => import("pages/CallDetails/CallDetails"),
  loadableOptions
);
const AsyncEditCallDetails = loadable(
  () => import("pages/EditCall/EditCall"),
  loadableOptions
);
const AsyncMyPostulations = loadable(
  () => import("pages/MyPostulations/MyPostulations"),
  loadableOptions
);

export const TabRoot: React.FC = () => {
  const location = useLocation();
  const notification = useNotifications();
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
            path={Routes.PROFILE}
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
          <PrivateRoutes
            exact
            path={Routes.EDITPHOTOS}
            component={AsyncEditPhotos}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITINSTITUTIONALINFO}
            component={AsyncEditInstitutionalInfo}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITSPORTSGOALSINFO}
            component={AsyncEditSportsGoalsInfo}
          />
          <PrivateRoutes exact path={Routes.NEWCALL} component={AsyncNewCall} />
          <PrivateRoutes
            exact
            path={Routes.CALLSLISTCLUB}
            component={AsyncCallsListClub}
          />
          <PrivateRoutes
            exact
            path={Routes.CALLDETAILS}
            component={AsyncCallDetails}
          />
          <PrivateRoutes
            exact
            path={Routes.EDITCALLDETAILS}
            component={AsyncEditCallDetails}
          />
          <PrivateRoutes
            exact
            path={Routes.MYPOSTULATIONS}
            component={AsyncMyPostulations}
          />
          <Route
            path="/tabs"
            render={() => <Redirect to={{ pathname: Routes.DASHBOARD }} />}
            exact={true}
          />
          <Route
            path="/"
            render={() => <Redirect to={{ pathname: Routes.DASHBOARD }} />}
            exact={true}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="light">
          <IonTabButton tab="inicio-jugador" href={Routes.DASHBOARD}>
            <IonIcon icon={homeOutline} />
          </IonTabButton>
          <IonTabButton
            tab="busqueda"
            href={Routes.SEARCH_PLAYERS}
            selected={
              location.pathname === Routes.SEARCH_CLUBS ||
              location.pathname === Routes.SEARCH_CALLS ||
              location.pathname === Routes.SEARCH_PLAYERS
                ? true
                : false
            }
          >
            <IonIcon icon={searchOutline}></IonIcon>
          </IonTabButton>
          <IonTabButton tab="notificaciones" href={Routes.NOTIFICATIONS}>
            {notification ? <IonBadge color="danger"></IonBadge> : ""}
            <IonIcon icon={notificationsOutline}></IonIcon>
          </IonTabButton>
          <IonTabButton tab="mensajes-jugador" href={Routes.MESSAGES}>
            <IonIcon icon={mailOutline}></IonIcon>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};
