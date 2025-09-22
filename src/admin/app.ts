export default {
  config: {
    // Configuración para el título de la ventana y favicon
    head: {
      title: "Panel de Hazze",
      favicon: null, // Si quieres cambiar el favicon, importa tu archivo aquí
    },
    // Configuración de idiomas disponibles
    locales: ["es", "en"],
    // Traducciones personalizadas
    translations: {
      en: {
        "Auth.form.welcome.title": "¡Welcome to Hazze!",
        "Auth.form.welcome.subtitle": "Log in to your custom dashboard account",
        "Auth.form.email.placeholder": "example@hazze.com",
        "Auth.form.email.label": "Email", // Si también quieres cambiar la etiqueta
        "Auth.form.password.placeholder": "••••••••", // Si quieres cambiar el placeholder de la contraseña
      },
      es: {
        "Auth.form.welcome.title": "¡Bienvenido a Hazze!",
        "Auth.form.welcome.subtitle":
          "Inicia sesión en tu cuenta personalizada del panel",
        "Auth.form.email.placeholder": "ejemplo@hazze.com",
        "Auth.form.email.label": "Correo electrónico", // Si también quieres cambiar la etiqueta
        "Auth.form.password.placeholder": "••••••••", // Si quieres cambiar el placeholder de la contraseña
      },
    },
  },
  bootstrap() {},
};
