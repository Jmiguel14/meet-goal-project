import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "pages/Home/Home";
import { SignUp } from "pages/SignUp";
import { SignIn } from "pages/SignIn";
import { TabRoot } from "./TabRoot";
import { PublicRoutes } from "./PublicRoutes";
import loadable from "react-app-env";
import PlayerProfile from "pages/PlayerProfile/PlayerProfile";
import { PrivateRoutes } from "./PrivateRoutes";
import PlayerDashboard from "pages/PlayerDashboard/PlayerDashboard";
import SearchForPlayer from "pages/SearchForPlayer/SearchForPlayer";
import Notifications from "pages/Notifications/Notifications";
import Messages from "pages/Messages/Messages";
import EditPersonalInfo from "pages/PlayerProfile/EditPersonalInfo/EditPersonalInfo";
import EditTacticalInfo from "pages/PlayerProfile/EditTacticalInfo/EditTacticalInfo";
import EditAttributes from "pages/PlayerProfile/EditAttributes/EditAttributes";
import AddClub from "pages/PlayerProfile/AddClub/AddClub";
import AddInjury from "pages/PlayerProfile/AddInjury/AddInjury";
import EditPsycoInfo from "pages/PlayerProfile/EditPsycoInfo/EditPsycoInfo";
import Beginning from "pages/PlayerProfile/Beginning/Beginning";
import AddChannels from "pages/PlayerProfile/AddChannels/AddChannels";

export const AppRouter: React.FC = () => {
  return (
    <>
      <IonRouterOutlet>
        <Route path="/tabs" component={TabRoot}></Route>
        <PublicRoutes exact path="/home" component={Home} />
        <PublicRoutes exact path="/iniciar-sesion" component={SignIn} />
        <PublicRoutes exact path="/registrarse" component={SignUp} />
        <PublicRoutes exact path="/perfil-jugador" component={PlayerProfile} />
        <PublicRoutes
          exact
          path="/inicio-jugador"
          component={PlayerDashboard}
        />
        <PublicRoutes exact path="/busqueda" component={SearchForPlayer} />
        <PublicRoutes
          exact
          path="/notificaciones-jugador"
          component={Notifications}
        />
        <PublicRoutes exact path="/mensajes-jugador" component={Messages} />
        <PublicRoutes
          exact
          path="/editar-info-personal-jugador"
          component={EditPersonalInfo}
        />
        <PublicRoutes
          exact
          path="/editar-info-tactica-jugador"
          component={EditTacticalInfo}
        />
        <PublicRoutes
          exact
          path="/editar-info-atributos-jugador"
          component={EditAttributes}
        />
        <PublicRoutes exact path="/agregar-experiencia" component={AddClub} />
        <PublicRoutes
          exact
          path="/agregar-lesiones-jugador"
          component={AddInjury}
        />
        <PublicRoutes
          exact
          path="/editar-info-psicologica-jugador"
          component={EditPsycoInfo}
        />
        <PublicRoutes
          exact
          path="/editar-valores-jugador"
          component={Beginning}
        />
        <PublicRoutes exact path="/canales-jugador" component={AddChannels} />
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};
