
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    welcome: "Welcome to Doroub",
    tagline: "The Future of Public Transit",
    getStarted: "Get Started",
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Full Name",
    home: "Home",
    map: "Map",
    bookings: "Bookings",
    settings: "Settings",
    inbox: "Inbox",
    searchTickets: "Search Tickets",
    from: "From",
    to: "To",
    date: "Date",
    etusb: "ETUSB",
    bus: "Bus",
    train: "Train",
    buyTicket: "Buy Ticket",
    trackTicket: "Track Ticket",
    myTickets: "My Tickets",
    language: "Language",
    profile: "Profile",
    notifications: "Notifications",
    support: "Support",
    searchAvailableTickets: "Search Available Tickets",
    showAvailableTickets: "Show Available Tickets"
  },
  ar: {
    welcome: "مرحباً بكم في دروب",
    tagline: "مستقبل النقل العام",
    getStarted: "ابدأ الآن",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    name: "الاسم الكامل",
    home: "الرئيسية",
    map: "الخريطة",
    bookings: "الحجوزات",
    settings: "الإعدادات",
    inbox: "الرسائل",
    searchTickets: "البحث عن التذاكر",
    from: "من",
    to: "إلى",
    date: "التاريخ",
    etusb: "إتوسب",
    bus: "حافلة",
    train: "قطار",
    buyTicket: "شراء تذكرة",
    trackTicket: "تتبع التذكرة",
    myTickets: "تذاكري",
    language: "اللغة",
    profile: "الملف الشخصي",
    notifications: "الإشعارات",
    support: "الدعم",
    searchAvailableTickets: "البحث عن التذاكر المتاحة",
    showAvailableTickets: "عرض التذاكر المتاحة"
  },
  fr: {
    welcome: "Bienvenue sur Doroub",
    tagline: "L'avenir du transport public",
    getStarted: "Commencer",
    login: "Connexion",
    signup: "S'inscrire",
    email: "Email",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    name: "Nom complet",
    home: "Accueil",
    map: "Carte",
    bookings: "Réservations",
    settings: "Paramètres",
    inbox: "Messages",
    searchTickets: "Rechercher des billets",
    from: "De",
    to: "À",
    date: "Date",
    etusb: "ETUSB",
    bus: "Bus",
    train: "Train",
    buyTicket: "Acheter un billet",
    trackTicket: "Suivre le billet",
    myTickets: "Mes billets",
    language: "Langue",
    profile: "Profil",
    notifications: "Notifications",
    support: "Support",
    searchAvailableTickets: "Rechercher des billets disponibles",
    showAvailableTickets: "Afficher les billets disponibles"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const isRTL = language === 'ar';

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    // Apply RTL direction to document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
