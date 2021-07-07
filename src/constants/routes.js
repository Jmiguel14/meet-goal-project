const PublicRoutes = {
  HOME: "/home",
  LOGIN: "/iniciar-sesion",
  SIGNUP: "/registrarse",
  PASSWORD_RESET: "/restablecer-contrasena",
  CHECK_EMAIL_SENT: "/verificar-email-enviado",
};

const PrivateRoutes = {
  DASHBOARD: "/tabs/inicio-jugador",
  SEARCH: "/tabs/busqueda",
  NOTIFICATIONS: "/tabs/notificaciones-jugador",
  MESSAGES: "/tabs/mensajes-jugador",
};

export const Routes = {
  TABS: "/tabs",
  ...PublicRoutes,
  ...PrivateRoutes,
};
