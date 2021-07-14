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
  albumsSharp,
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

const appPagesPlayer: AppPage[] = [
  {
    title: "Perfil",
    url: "/tabs/perfil",
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
  {
    title: "Postulaciones",
    url: "/tabs/mis-postulaciones",
    icon: albumsSharp,
    iconSelected: "",
  },
];

const appPagesClub: AppPage[] = [
  {
    title: "Perfil",
    url: "/tabs/perfil",
    icon: personOutline,
    iconSelected: person,
  },
  {
    title: "Mis Convocatorias",
    url: "/tabs/convocatorias-creadas",
    icon: peopleCircle,
    iconSelected: "",
  },
  {
    title: "Lista de jugadores",
    url: "/tabs/lista-jugadores",
    icon: football,
    iconSelected: "",
  },
];
export const Menu: React.FC = () => {
  const location = useLocation();
  const [present] = useIonToast();
  const { logout, data } = useAuth();

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
                <Avatar src={data?.avatarURL} />
              </IonCol>
              <IonCol size="12" className="user-name">
                <IonLabel>{data?.name}</IonLabel>
              </IonCol>
              <IonCol size="12" className="unique-user-name">
                <IonLabel>{`@${data?.name}`}</IonLabel>
              </IonCol>
            </IonRow>
          </IonListHeader>
          <IonItemDivider></IonItemDivider>
          {data?.userType === "Jugador"
            ? appPagesPlayer.map((appPage, key) => {
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
              })
            : appPagesClub.map((appPage, key) => {
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
            <IonItem onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} size="large" />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
