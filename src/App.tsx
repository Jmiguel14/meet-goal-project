import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { SignUp } from "pages/SignUp";
import { AuthProvider } from "contexts/AuthContext";
import PlayerProfile from "pages/PlayerProfile/PlayerProfile";
import PlayerDashboard from "pages/PlayerDashboard/PlayerDashboard";
import Notifications from "pages/Notifications/Notifications";
import Messages from "pages/Messages/Messages";
import EditPersonalInfo from "pages/PlayerProfile/EditPersonalInfo/EditPersonalInfo";
import SearchForPlayer from "pages/SearchForPlayer/SearchForPlayer";
import EditTacticalInfo from "pages/PlayerProfile/EditTacticalInfo/EditTacticalInfo";
import EditAttributes from "pages/PlayerProfile/EditAttributes/EditAttributes";
import AddClub from "pages/PlayerProfile/AddClub/AddClub";
import AddInjury from "pages/PlayerProfile/AddInjury/AddInjury";
import EditPsycoInfo from "pages/PlayerProfile/EditPsycoInfo/EditPsycoInfo";
import Beginning from "pages/PlayerProfile/Beginning/Beginning";
import AddChannels from "pages/PlayerProfile/AddChannels/AddChannels";

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/registrarse">
            <SignUp />
          </Route>
          <Route exact path="/perfil-jugador">
            <PlayerProfile />
          </Route>
          <Route exact path="/inicio-jugador">
            <PlayerDashboard />
          </Route>
          <Route exact path="/busqueda">
            <SearchForPlayer />
          </Route>
          <Route exact path="/notificaciones-jugador">
            <Notifications />
          </Route>
          <Route exact path="mensajes-jugador">
            <Messages />
          </Route>
          <Route exact path="/editar-info-personal-jugador">
            <EditPersonalInfo />
          </Route>
          <Route exact path="/editar-info-tactica-jugador">
            <EditTacticalInfo />
          </Route>
          <Route exact path="/editar-info-atributos-jugador">
            <EditAttributes />
          </Route>
          <Route exact path="/agregar-experiencia">
            <AddClub />
          </Route>
          <Route exact path="/agregar-lesiones-jugador">
            <AddInjury />
          </Route>
          <Route exact path="/editar-info-psicologica-jugador">
            <EditPsycoInfo />
          </Route>
          <Route exact path="/editar-valores-jugador">
            <Beginning />
          </Route>
          <Route exact path="/canales-jugador">
            <AddChannels />
          </Route>
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
