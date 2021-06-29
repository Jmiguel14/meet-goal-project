import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import { AppRouter } from "routers/AppRouter";
import {IonSplitPane} from '@ionic/react'

const App = () => (
  <IonApp>
    <IonReactRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
