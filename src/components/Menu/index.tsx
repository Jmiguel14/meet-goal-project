import {
  IonItem,
  IonContent,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonLabel,
  IonItemDivider,
  IonRow,
  IonCol,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import React from "react";
import "./styles.css";
import { Avatar } from "components/Avatar";
import {
  football,
  logOutOutline,
  peopleCircle,
  person,
  personOutline,
  shieldHalf,
} from "ionicons/icons";
import { useLocation } from "react-router";
import { useAuth } from "contexts/AuthContext";

interface AppPage {
  url: string;
  icon: string;
  iconSelected: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Perfil",
    url: "/tabs/perfil-jugador",
    icon: personOutline,
    iconSelected: person,
  },
  {
    title: "Lista de convocatorias",
    url: "/tabs/lista-convocatorias",
    icon: peopleCircle,
    iconSelected: "",
  },
  {
    title: "Lista de jugadores",
    url: "/tabs/lista-jugadores",
    icon: football,
    iconSelected: "",
  },
  {
    title: "Lista de clubes",
    url: "/tabs/lista-clubes",
    icon: shieldHalf,
    iconSelected: "",
  },
];

export const Menu: React.FC = () => {
  const location = useLocation();
  const [present] = useIonToast();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      present({
        message: "Ocurrió un error al cerrar sesión",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonRow>
              <IonCol size="12">
                <Avatar
                  src={
                    "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                  }
                />
              </IonCol>
              <IonCol size="12" className="user-name">
                <IonLabel>userName</IonLabel>
              </IonCol>
              <IonCol size="12" className="unique-user-name">
                <IonLabel>@userName</IonLabel>
              </IonCol>
            </IonRow>
          </IonListHeader>
          <IonItemDivider></IonItemDivider>
          {appPages.map((appPage, key) => {
            return (
              <IonMenuToggle key={key} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                >
                  <IonIcon slot="start" icon={appPage.icon} size="large" />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle autoHide={false}>
            <IonItem onClick={handleLogout} routerLink='/home'>
              <IonIcon slot="start" icon={logOutOutline} size="large" />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
