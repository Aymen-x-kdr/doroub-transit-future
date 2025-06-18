
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
    showAvailableTickets: "Show Available Tickets",
    // Settings page
    customizeExperience: "Customize your Doroub experience",
    premiumMember: "Premium Member",
    chooseLanguage: "Choose your preferred language",
    manageAccount: "Manage your account information",
    controlNotifications: "Control your notification preferences",
    getHelpSupport: "Get help and contact support",
    version: "Version",
    logout: "Logout",
    // Bookings page
    manageTravelTickets: "Manage your travel tickets",
    dateTime: "Date & Time",
    price: "Price",
    seat: "Seat",
    ticketId: "Ticket ID",
    showQrCode: "Show QR Code",
    viewDetails: "View Details",
    downloadReceipt: "Download Receipt",
    noBookingsYet: "No bookings yet",
    startJourney: "Start your journey by booking your first ticket",
    bookNow: "Book Now",
    active: "Active",
    upcoming: "Upcoming",
    completed: "Completed",
    // Map page
    exploreTransit: "Explore transit options near you",
    myLocation: "My Location",
    interactiveMap: "Interactive Map",
    realTimeMap: "Real-time transit map of Batna city",
    nearbyStops: "Nearby Stops",
    nextArrival: "Next arrival",
    // Inbox page
    stayConnected: "Stay connected with updates and support",
    messages: "Messages",
    systemNotifications: "System Notifications",
    customerSupport: "Customer Support",
    newMessage: "New Message",
    compose: "Compose",
    all: "All",
    unread: "Unread",
    important: "Important",
    // Login/Signup
    welcomeBack: "Welcome back to Doroub!",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    loggingIn: "Logging in...",
    creatingAccount: "Creating account...",
    loginFailed: "Login failed. Please try again.",
    signupFailed: "Signup failed. Please try again.",
    passwordsDontMatch: "Passwords do not match",
    success: "Success",
    error: "Error",
    yourFullName: "Your full name",
    yourEmail: "your@email.com",
    // Home page
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    quickActions: "Quick Actions",
    recentActivity: "Recent Activity",
    popularRoutes: "Popular Routes",
    quickBooking: "Quick Booking",
    enterDestination: "Enter your destination",
    selectTransport: "Select transport type",
    findTickets: "Find Tickets"
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
    showAvailableTickets: "عرض التذاكر المتاحة",
    // Settings page
    customizeExperience: "خصص تجربتك مع دروب",
    premiumMember: "عضو مميز",
    chooseLanguage: "اختر لغتك المفضلة",
    manageAccount: "إدارة معلومات حسابك",
    controlNotifications: "التحكم في تفضيلات الإشعارات",
    getHelpSupport: "احصل على المساعدة واتصل بالدعم",
    version: "الإصدار",
    logout: "تسجيل الخروج",
    // Bookings page
    manageTravelTickets: "إدارة تذاكر السفر",
    dateTime: "التاريخ والوقت",
    price: "السعر",
    seat: "المقعد",
    ticketId: "رقم التذكرة",
    showQrCode: "عرض رمز الاستجابة السريعة",
    viewDetails: "عرض التفاصيل",
    downloadReceipt: "تحميل الإيصال",
    noBookingsYet: "لا توجد حجوزات بعد",
    startJourney: "ابدأ رحلتك بحجز أول تذكرة لك",
    bookNow: "احجز الآن",
    active: "نشط",
    upcoming: "قادم",
    completed: "مكتمل",
    // Map page
    exploreTransit: "استكشف خيارات النقل بالقرب منك",
    myLocation: "موقعي",
    interactiveMap: "خريطة تفاعلية",
    realTimeMap: "خريطة النقل في الوقت الفعلي لمدينة باتنة",
    nearbyStops: "المحطات القريبة",
    nextArrival: "الوصول التالي",
    // Inbox page
    stayConnected: "ابق على اتصال مع التحديثات والدعم",
    messages: "الرسائل",
    systemNotifications: "إشعارات النظام",
    customerSupport: "دعم العملاء",
    newMessage: "رسالة جديدة",
    compose: "إنشاء",
    all: "الكل",
    unread: "غير مقروء",
    important: "مهم",
    // Login/Signup
    welcomeBack: "مرحباً بعودتك إلى دروب!",
    dontHaveAccount: "ليس لديك حساب؟",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    loggingIn: "جارٍ تسجيل الدخول...",
    creatingAccount: "جارٍ إنشاء الحساب...",
    loginFailed: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
    signupFailed: "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.",
    passwordsDontMatch: "كلمات المرور غير متطابقة",
    success: "نجح",
    error: "خطأ",
    yourFullName: "اسمك الكامل",
    yourEmail: "بريدك@الإلكتروني.com",
    // Home page
    goodMorning: "صباح الخير",
    goodAfternoon: "مساء الخير",
    goodEvening: "مساء الخير",
    quickActions: "إجراءات سريعة",
    recentActivity: "النشاط الأخير",
    popularRoutes: "الطرق الشائعة",
    quickBooking: "حجز سريع",
    enterDestination: "أدخل وجهتك",
    selectTransport: "اختر نوع النقل",
    findTickets: "البحث عن التذاكر"
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
    showAvailableTickets: "Afficher les billets disponibles",
    // Settings page
    customizeExperience: "Personnalisez votre expérience Doroub",
    premiumMember: "Membre Premium",
    chooseLanguage: "Choisissez votre langue préférée",
    manageAccount: "Gérer les informations de votre compte",
    controlNotifications: "Contrôler vos préférences de notification",
    getHelpSupport: "Obtenir de l'aide et contacter le support",
    version: "Version",
    logout: "Déconnexion",
    // Bookings page
    manageTravelTickets: "Gérer vos billets de voyage",
    dateTime: "Date et heure",
    price: "Prix",
    seat: "Siège",
    ticketId: "ID du billet",
    showQrCode: "Afficher le code QR",
    viewDetails: "Voir les détails",
    downloadReceipt: "Télécharger le reçu",
    noBookingsYet: "Aucune réservation pour le moment",
    startJourney: "Commencez votre voyage en réservant votre premier billet",
    bookNow: "Réserver maintenant",
    active: "Actif",
    upcoming: "À venir",
    completed: "Terminé",
    // Map page
    exploreTransit: "Explorez les options de transport près de vous",
    myLocation: "Ma position",
    interactiveMap: "Carte interactive",
    realTimeMap: "Carte de transport en temps réel de la ville de Batna",
    nearbyStops: "Arrêts à proximité",
    nextArrival: "Prochaine arrivée",
    // Inbox page
    stayConnected: "Restez connecté avec les mises à jour et le support",
    messages: "Messages",
    systemNotifications: "Notifications système",
    customerSupport: "Support client",
    newMessage: "Nouveau message",
    compose: "Composer",
    all: "Tous",
    unread: "Non lu",
    important: "Important",
    // Login/Signup
    welcomeBack: "Bon retour sur Doroub!",
    dontHaveAccount: "Vous n'avez pas de compte?",
    alreadyHaveAccount: "Vous avez déjà un compte?",
    loggingIn: "Connexion en cours...",
    creatingAccount: "Création du compte...",
    loginFailed: "Échec de la connexion. Veuillez réessayer.",
    signupFailed: "Échec de l'inscription. Veuillez réessayer.",
    passwordsDontMatch: "Les mots de passe ne correspondent pas",
    success: "Succès",
    error: "Erreur",
    yourFullName: "Votre nom complet",
    yourEmail: "votre@email.com",
    // Home page
    goodMorning: "Bonjour",
    goodAfternoon: "Bon après-midi",
    goodEvening: "Bonsoir",
    quickActions: "Actions rapides",
    recentActivity: "Activité récente",
    popularRoutes: "Itinéraires populaires",
    quickBooking: "Réservation rapide",
    enterDestination: "Entrez votre destination",
    selectTransport: "Sélectionnez le type de transport",
    findTickets: "Trouver des billets"
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
