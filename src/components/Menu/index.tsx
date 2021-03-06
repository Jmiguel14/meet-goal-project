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
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Avatar } from "components/Avatar";
import {
  albumsSharp,
  football,
  logOutOutline,
  peopleCircle,
  personOutline,
  shieldHalf,
} from "ionicons/icons";
import { useLocation } from "react-router";
import { useAuth } from "contexts/AuthContext";
import { USER_TYPES } from "constants/userTypes";
import { Routes } from "constants/routes";
import { useCurrentUserData } from "hooks/useCurrentUserData";

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

export const Menu: React.FC = () => {
  const { currentUser } = useAuth();
  const currentUserData = useCurrentUserData();

  const appPagesPlayer: AppPage[] = [
    {
      title: "Perfil",
      url: `/tabs/perfil/${currentUser?.uid}`,
      icon: personOutline,
    },
    {
      title: "Lista de convocatorias",
      url: Routes.SEARCH_CALLS,
      icon: peopleCircle,
    },
    {
      title: "Lista de jugadores",
      url: Routes.SEARCH_PLAYERS,
      icon: football,
    },
    {
      title: "Lista de clubes",
      url: Routes.SEARCH_CLUBS,
      icon: shieldHalf,
    },
    {
      title: "Postulaciones",
      url: Routes.MYPOSTULATIONS,
      icon: albumsSharp,
    },
  ];

  const appPagesClub: AppPage[] = [
    {
      title: "Perfil",
      url: `/tabs/perfil/${currentUser?.uid}`,
      icon: personOutline,
    },
    {
      title: "Mis Convocatorias",
      url: Routes.CALLSLISTCLUB,
      icon: peopleCircle,
    },
    {
      title: "Lista de jugadores",
      url: Routes.SEARCH_PLAYERS,
      icon: football,
    },
  ];

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
                <Avatar src={currentUserData?.avatarURL} />
              </IonCol>
              <IonCol size="12" className="user-name">
                <IonLabel>{currentUserData?.name}</IonLabel>
              </IonCol>
              <IonCol size="12" className="unique-user-name">
                <IonLabel>{`@${currentUserData?.name}`}</IonLabel>
              </IonCol>
            </IonRow>
          </IonListHeader>
          <IonItemDivider></IonItemDivider>
          {currentUserData?.userType === USER_TYPES.PLAYER
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
