const PublicRoutes = {
  HOME: "/home",
  LOGIN: "/iniciar-sesion",
  SIGNUP: "/registrarse",
  PASSWORD_RESET: "/restablecer-contrasena",
  CHECK_EMAIL_SENT: "/verificar-email-enviado",
};

const PrivateRoutes = {
  TABS: "/tabs",
  DASHBOARD: "/tabs/inicio-jugador",
  SEARCH: "/tabs/busqueda/:segment",
  SEARCH_CLUBS: "/tabs/busqueda/clubs",
  SEARCH_CALLS: "/tabs/busqueda/calls",
  SEARCH_PLAYERS: "/tabs/busqueda/players",
  NOTIFICATIONS: "/tabs/notificaciones-jugador",
  MESSAGES: "/tabs/mensajes-jugador",
  PROFILE: "/tabs/perfil",
  EDITPERSONALINFO: "/tabs/editar-info-personal-jugador",
  EDITTACTICALINFO: "/tabs/editar-info-tactica-jugador",
  EDITATTRIBUTESINFO: "/tabs/editar-info-atributos-jugador",
  ADDCLUBEXPERIENCE: "/tabs/agregar-experiencia",
  ADDINJURYEXPERIENCE: "/tabs/agregar-lesiones-jugador",
  EDITPSYCOINFO: "/tabs/editar-info-psicologica-jugador",
  EDITVALUES: "/tabs/editar-valores-jugador",
  EDITCHANNELS: "/tabs/canales-jugador",
  EDITPHOTOS: "/tabs/editar-fotos",
  EDITINSTITUTIONALINFO: "/tabs/editar-info-institucional-club",
  EDITSPORTSGOALSINFO: "/tabs/editar-logros-institucionales-club",
  NEWCALL: "/tabs/nueva-convocatoria",
  CALLSLISTCLUB: "/tabs/convocatorias-creadas",
  CALLDETAILS: "/tabs/convocatoria/:id",
  EDITCALLDETAILS: "/tabs/editar-convocatoria/:id",
};

export const Routes = {
  ...PublicRoutes,
  ...PrivateRoutes,
};
