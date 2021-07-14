import {
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonInput,
  IonButton,
} from "@ionic/react";
import { USER_TYPE } from "constants/userType";

export const SignUpForm = ({
  register,
  handleSubmit,
  clearErrors,
  errors,
}: any) => {
  return (
    <form onSubmit={handleSubmit}>
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium">Tipo de usuario</IonLabel>
            <IonSelect
              okText="Okay"
              cancelText="Cerrar"
              {...register("userType")}
              onIonChange={() => {
                clearErrors("userType");
              }}
            >
              <IonSelectOption value={USER_TYPE.JUGADOR}>
                Jugador
              </IonSelectOption>
              <IonSelectOption value={USER_TYPE.CLUB}>Club</IonSelectOption>
              <IonSelectOption value={USER_TYPE.ACADEMIA}>
                Académia
              </IonSelectOption>
              <IonSelectOption value={USER_TYPE.TECNICO}>
                Técnico
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          {errors.userType && (
            <IonNote color="danger">{errors.userType?.message}</IonNote>
          )}
        </IonCol>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Nombre
            </IonLabel>
            <IonInput
              type="text"
              {...register("name")}
              onIonChange={() => {
                clearErrors("name");
              }}
            />
          </IonItem>
          {errors.name?.message && (
            <IonNote color="danger">{errors.name?.message}</IonNote>
          )}
        </IonCol>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Teléfono
            </IonLabel>
            <IonInput
              type="number"
              {...register("phone")}
              onIonChange={() => {
                clearErrors("phone");
              }}
            />
          </IonItem>
          {errors.phone?.message && (
            <IonNote color="danger">{errors.phone?.message}</IonNote>
          )}
        </IonCol>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Correo
            </IonLabel>
            <IonInput
              {...register("email")}
              onIonChange={() => {
                clearErrors("email");
              }}
            />
          </IonItem>
          {errors.email && (
            <IonNote color="danger">{errors.email?.message}</IonNote>
          )}
        </IonCol>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Contraseña
            </IonLabel>
            <IonInput
              type="password"
              {...register("password", { pattern: /^[A-Za-z]+$/i })}
              onIonChange={() => {
                clearErrors("password");
              }}
            />
          </IonItem>
          {errors.password && (
            <IonNote color="danger">{errors.password?.message}</IonNote>
          )}
        </IonCol>
      </IonRow>
      <IonRow className="sign-up-button">
        <IonCol size="11">
          <IonButton type="submit" expand="block">
            Registrarse
          </IonButton>
        </IonCol>
      </IonRow>
    </form>
  );
};
