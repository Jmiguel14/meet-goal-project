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
import PlayerProfile from "pages/PlayerProfile/PlayerProfile";
import PlayerDashboard from "pages/PlayerDashboard/PlayerDashboard";
import SearchForPlayer from "pages/SearchForPlayer/SearchForPlayer";
import Notifications from "pages/Notifications/Notifications";
import Messages from "pages/Messages/Messages";
import EditPersonalInfo from "pages/PlayerProfile/EditPersonalInfo/EditPersonalInfo";
const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home/player/profile" component={PlayerProfile} />
        <Route exact path="/home/player" component={PlayerDashboard} />
        <Route exact path="/home/player/search" component={SearchForPlayer} />
        <Route
          exact
          path="/home/player/notifications"
          component={Notifications}
        />
        <Route exact path="/home/player/messages" component={Messages} />
        <Route
          exact
          path="/home/player/profile/personal-info"
          component={EditPersonalInfo}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
