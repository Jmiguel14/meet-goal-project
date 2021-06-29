import { IonItem, IonContent, IonList, IonListHeader, IonMenu, IonMenuToggle, IonLabel } from '@ionic/react'
import React from 'react'

export const Menu: React.FC = () => {
    return (
        <IonMenu contentId='main' type='overlay'>
            <IonContent>
                <IonList>
                    <IonListHeader>User</IonListHeader>
                    <IonMenuToggle>
                        <IonItem>
                            <IonLabel>Profile</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}
