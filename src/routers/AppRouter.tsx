import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import Home from "pages/Home/Home";
import { SignUp } from "pages/SignUp";
import { SignIn } from "pages/SignIn";
import { TabRoot } from "./TabRoot/index";
import { PublicRoutes } from "./PublicRoutes";
import loadable from "react-app-env";
import PlayerProfile from "pages/PlayerProfile/PlayerProfile";
import { PrivateRoutes } from "./PrivateRoutes";
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
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};
