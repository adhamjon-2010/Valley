import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin, Calendar, Clock, Users, User, Phone, Bell, Shield,
  CreditCard, CheckCircle2, XCircle, AlertCircle, Plus, Search,
  Filter, ChevronRight, Camera, Check, Sliders, Settings,
  Eye, RefreshCw, Award, ArrowUpRight, Zap, Sparkles, Building2,
  Sun, Moon, Compass, Navigation, Layers, ChevronDown, Trophy,
  Activity, Share2, Map as MapIcon, Crosshair, ArrowRight, Lock,
  Unlock, LogOut, BarChart3, TrendingUp, Smartphone, Laptop,
  KeyRound, Send, MessageSquareCheck, ShieldCheck
} from 'lucide-react';

// O'zbekiston mobil operatorlari ro'yxati
const UZ_OPERATORS = {
  '90': 'Beeline',
  '91': 'Beeline',
  '93': 'Ucell',
  '94': 'Ucell',
  '50': 'Ucell',
  '97': 'Mobiuz',
  '88': 'Mobiuz',
  '99': 'Uztelecom',
  '95': 'Uztelecom',
  '77': 'Uztelecom',
  '33': 'Humans',
  '20': 'OQ',
  '98': 'Perfectum'
};

// ============================================================================
// BOSHLANG'ICH MA'LUMOTLAR
// ============================================================================

const INITIAL_VENUES = [
  {
    id: 'v_fg1',
    name: "Farg'ona 'Istiqlol' Markaziy Sport Majmuasi",
    type: 'football_pitch',
    category: 'Futbol / Yugurish',
    sport: 'Futbol',
    village: "Farg'ona",
    address: "Farg'ona shahri, Istiqlol ko'chasi 1-uy",
    lat: 40.3892,
    lng: 71.7835,
    pricePerHour: 180000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    facilities: ["Xalqaro standartdagi stadion", "Yoritish projektorlari", "VIP kiyinish xonasi", "Dush va sauna"],
    contactPerson: {
      name: "Soliyev Olimjon",
      role: "Majmua bosh direktori",
      phone: "+998 90 160-22-33",
      workHours: "07:00 - 23:00",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 50, y: 20 },
    subscription: { plan: '12 oylik', status: 'active', daysLeft: 310, expiresAt: '2027-01-15' }
  },
  {
    id: 'v_fg2',
    name: "Farg'ona Olimpiya Zaxiralari Voleybol va Basketbol Saroyi",
    type: 'school_gym',
    category: 'Voleybol / Basketbol',
    sport: 'Voleybol',
    village: "Farg'ona",
    address: "Farg'ona shahri, Al-Farg'oniy shoh ko'chasi 42",
    lat: 40.3815,
    lng: 71.7780,
    pricePerHour: 130000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80',
    facilities: ["Parket pol", "Elektron tablo", "Professional voleybol to'ri", "Tribunalar"],
    contactPerson: {
      name: "Qosimov Alisher",
      role: "Bosh murabbiy",
      phone: "+998 91 650-44-55",
      workHours: "08:00 - 22:00",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 45, y: 25 },
    subscription: { plan: '6 oylik', status: 'active', daysLeft: 180, expiresAt: '2026-09-10' }
  },
  {
    id: 'v_fg3',
    name: "Farg'ona 'Neftchi' Sun'iy Qoplamali Futbol Maydoni",
    type: 'football_pitch',
    category: 'Futbol',
    sport: 'Futbol',
    village: "Farg'ona",
    address: "Farg'ona shahri, Yangi Asr ko'chasi 15",
    lat: 40.3950,
    lng: 71.7910,
    pricePerHour: 150000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80',
    facilities: ["Zamonaviy chim", "Kuchli projektor", "Muzdek ichimliklar", "Avtoturargoh"],
    contactPerson: {
      name: "Mamajonov Bekzod",
      role: "Maydon ma'muri",
      phone: "+998 93 440-12-34",
      workHours: "08:00 - 01:00",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 55, y: 15 },
    subscription: { plan: '3 oylik', status: 'active', daysLeft: 75, expiresAt: '2026-05-25' }
  },
  {
    id: 'v1',
    name: "14-sonli umumta'lim maktabi sport zali",
    type: 'school_gym',
    category: 'Voleybol / Basketbol',
    sport: 'Voleybol',
    village: 'Vodil',
    address: "Vodil qishlog'i, Mustaqillik ko'chasi 45-uy",
    lat: 40.1805,
    lng: 71.7262,
    pricePerHour: 100000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    facilities: ["Dush mavjud", "Kiyinish xonasi", "To'r va 4 ta to'p", "Yoritish (LED)", "Yog'och pol"],
    contactPerson: {
      name: "Rahmonov Dilshod",
      role: "Jismoniy tarbiya fani o'qituvchisi (Oliy toifa)",
      phone: "+998 90 555-14-22",
      workHours: "17:00 - 22:30 (Darslardan so'ng)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 52, y: 72 },
    subscription: { plan: '6 oylik', status: 'active', daysLeft: 145, expiresAt: '2026-08-15' }
  },
  {
    id: 'v2',
    name: "Vodil Arena Sun'iy Qoplamali Maydon",
    type: 'football_pitch',
    category: 'Futbol',
    sport: 'Futbol',
    village: 'Vodil',
    address: "Vodil dam olish xiyoboni bo'yi",
    pricePerHour: 160000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80',
    facilities: ["50mm sun'iy chim", "Projektorli tungi yoritish", "Kiyinish xonasi", "Muzdek ichimliklar"],
    contactPerson: {
      name: "Qodirov Rustam aka",
      role: "Maydon boshlig'i",
      phone: "+998 91 670-88-99",
      workHours: "07:00 - 01:00",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 42, y: 80 },
    subscription: { plan: '3 oylik', status: 'expiring_soon', daysLeft: 5, expiresAt: '2026-03-20' }
  },
  {
    id: 'v_yoshlarobod_55',
    name: "55-sonli umumta'lim maktabi sport zali",
    type: 'school_gym',
    category: 'Voleybol / Mini-futbol / Basketbol',
    sport: 'Voleybol',
    village: 'Yoshlarobod',
    address: "Yoshlarobod qishlog'i, 55-maktab binosi",
    lat: 40.2355,
    lng: 71.7120,
    pricePerHour: 90000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    facilities: ["Maktab sport zali", "Voleybol to'ri va 4 ta to'p", "Basketbol shitlari", "Kiyinish xonasi", "Yoritish tizimi", "Yog'och pol"],
    contactPerson: {
      name: "Tursunov Akbar",
      role: "55-maktab jismoniy tarbiya o'qituvchisi",
      phone: "+998 90 300-85-41",
      workHours: "17:30 - 22:00 (Darslardan so'ng)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 26, y: 34 },
    subscription: { plan: '6 oylik', status: 'active', daysLeft: 160, expiresAt: '2026-08-20' }
  },
  {
    id: 'v5',
    name: "Novkat Markaziy Sport Zali",
    type: 'basketball_court',
    category: 'Voleybol / Basketbol',
    sport: 'Basketbol',
    village: 'Novkat',
    address: "Novkat QFY, 19-maktab binosi",
    pricePerHour: 90000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    facilities: ["Keng zal 24x12m", "Tribunalar", "Voleybol jihozlari"],
    contactPerson: {
      name: "Xoliqov Bahodir",
      role: "Sport to'garagi murabbiyi",
      phone: "+998 91 114-63-52",
      workHours: "16:30 - 22:00",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 74, y: 42 },
    subscription: { plan: '6 oylik', status: 'active', daysLeft: 92, expiresAt: '2026-06-18' }
  },
  {
    id: 'v6',
    name: "Novkat Star Mini-Futbol Maydoni",
    type: 'football_pitch',
    category: 'Futbol',
    sport: 'Futbol',
    village: 'Novkat',
    address: "Novkat, Kanal bo'yi",
    pricePerHour: 140000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
    facilities: ["Yangi zamonaviy chim", "Kuchli yoritish", "Kiyinish xonasi"],
    contactPerson: {
      name: "Karimov Otabek",
      role: "Maydon boshqaruvchisi",
      phone: "+998 90 840-77-66",
      workHours: "08:00 - 00:00",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 80, y: 56 },
    subscription: { plan: '1 oylik', status: 'active', daysLeft: 18, expiresAt: '2026-04-01' }
  }
];

const INITIAL_GAMES = [
  {
    id: 'g_fg1',
    title: "Farg'ona Shahar Oqshom Voleybol Matchi",
    sport: 'Voleybol',
    venueId: 'v_fg2',
    venueName: "Farg'ona Olimpiya Zaxiralari Voleybol va Basketbol Saroyi",
    village: "Farg'ona",
    lat: 40.3815,
    lng: 71.7780,
    date: "Bugun, 11-Sentabr",
    time: "20:00 - 21:30",
    isFree: false,
    totalPrice: 130000,
    maxPlayers: 12,
    level: "O'rta daraja",
    creator: "Qosimov Alisher (Admin)",
    participants: [
      { id: 'p_fg1', name: "Qosimov Alisher", phone: "+998 91 650-44-55", status: "To'langan", method: "Payme", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80" },
      { id: 'p_fg2', name: "Javohir Ergashev", phone: "+998 90 220-33-44", status: "To'langan", method: "Click", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  {
    id: 'g_fg2',
    title: "Farg'ona 'Istiqlol' Katta Futbol Matchi",
    sport: 'Futbol',
    venueId: 'v_fg1',
    venueName: "Farg'ona 'Istiqlol' Markaziy Sport Majmuasi",
    village: "Farg'ona",
    lat: 40.3892,
    lng: 71.7835,
    date: "Ertaga, 12-Sentabr",
    time: "19:00 - 20:30",
    isFree: false,
    totalPrice: 180000,
    maxPlayers: 14,
    level: "Yuqori daraja",
    creator: "Soliyev Olimjon (Admin)",
    participants: [
      { id: 'p_fg3', name: "Soliyev Olimjon", phone: "+998 90 160-22-33", status: "To'langan", method: "Click", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  {
    id: 'g1',
    title: "Vodil 14-maktab Oqshom Voleyboli",
    sport: 'Voleybol',
    venueId: 'v1',
    venueName: "14-maktab sport zali",
    village: "Vodil",
    date: "Bugun, 11-Sentabr",
    time: "19:30 - 21:00",
    isFree: false,
    totalPrice: 120000,
    maxPlayers: 12,
    level: "O'rta daraja",
    creator: "Azizbek Fayziyev",
    participants: [
      { id: 'p1', name: "Azizbek Fayziyev", phone: "+998 90 123-45-67", status: "To'langan", method: "Payme", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" },
      { id: 'p2', name: "Jasur Komilov", phone: "+998 91 334-11-22", status: "To'langan", method: "Click", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80" },
      { id: 'p3', name: "Sanjar Mahmudov", phone: "+998 93 456-78-90", status: "Naqd", method: "Naqd", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80" },
      { id: 'p4', name: "Otabek G'aniyev", phone: "+998 90 887-65-43", status: "Kutilmoqda", method: "Naqd", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&q=80" },
      { id: 'p5', name: "Dilmurod Ismoilov", phone: "+998 94 221-33-44", status: "To'langan", method: "Payme", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  {
    id: 'g3',
    title: "Yoshlarobod 55-maktab bepul voleybol mashg'uloti",
    sport: 'Voleybol',
    venueId: 'v_yoshlarobod_55',
    venueName: "55-sonli umumta'lim maktabi sport zali",
    village: "Yoshlarobod",
    date: "Ertaga, 12-Sentabr",
    time: "18:00 - 19:30",
    isFree: true,
    totalPrice: 0,
    maxPlayers: 12,
    level: "Barcha darajalar",
    creator: "Tursunov Akbar (Murabbiy)",
    participants: [
      { id: 'p20', name: "Tursunov Akbar", phone: "+998 90 300-85-41", status: "To'langan", method: "Bepul", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80" },
      { id: 'p21', name: "Anvar Jo'rayev", phone: "+998 91 555-43-21", status: "To'langan", method: "Bepul", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  {
    id: 'g2',
    title: "Vodil vs Yoshlarobod o'rtoqlik o'yini",
    sport: 'Futbol',
    venueId: 'v2',
    venueName: "Vodil Arena Sun'iy Maydoni",
    village: "Vodil",
    date: "Bugun, 11-Sentabr",
    time: "21:00 - 22:30",
    isFree: false,
    totalPrice: 160000,
    maxPlayers: 14,
    level: "Havaskor",
    creator: "Sarvar Usmonov",
    participants: [
      { id: 'p10', name: "Sarvar Usmonov", phone: "+998 90 555-11-22", status: "To'langan", method: "Click", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" },
      { id: 'p11', name: "Ulug'bek Tohirov", phone: "+998 91 223-34-45", status: "To'langan", method: "Payme", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  {
    id: 'g4',
    title: "Novkat yoshlari mini-turniri",
    sport: 'Basketbol',
    venueId: 'v5',
    venueName: "Novkat Markaziy Sport Zali",
    village: "Novkat",
    date: "13-Sentabr, Yakshanba",
    time: "17:00 - 19:00",
    isFree: false,
    totalPrice: 100000,
    maxPlayers: 10,
    level: "O'rta daraja",
    creator: "Xoliqov Bahodir",
    participants: [
      { id: 'p30', name: "Xoliqov Bahodir", phone: "+998 91 114-63-52", status: "To'langan", method: "Naqd", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80" }
    ]
  }
];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('fs_theme') || 'dark');
  const [appStep, setAppStep] = useState(1);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [is3DMapMode, setIs3DMapMode] = useState(true);
  const [mapRotation, setMapRotation] = useState({ x: 50, z: -20 });
  const [activeTab, setActiveTab] = useState('home');
  const [currentRole, setCurrentRole] = useState('user');

  // ANONIM BOSH ADMIN PAROL (admin2010)
  const [isSuperAdminUnlocked, setIsSuperAdminUnlocked] = useState(false);
  const [isSuperAdminModalOpen, setIsSuperAdminModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState(false);

  // ADMIN HUQUQLARI VA TO'LOV TIZIMI (MONETIZATSIYA)
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('fs_is_admin') === 'true');
  const [isAdminPaymentModalOpen, setIsAdminPaymentModalOpen] = useState(false);
  const [ownerCard, setOwnerCard] = useState(() => localStorage.getItem('fs_owner_card') || '8600 **** **** ****');
  const [ownerCardInput, setOwnerCardInput] = useState(() => localStorage.getItem('fs_owner_card') || '8600 **** **** ****');

  // YANGI O'YIN OCHISH STATE
  const [newGameTitleInput, setNewGameTitleInput] = useState('');
  const [newGameSport, setNewGameSport] = useState('Voleybol');
  const [newGameVillage, setNewGameVillage] = useState("Farg'ona");
  const [newGameVenueId, setNewGameVenueId] = useState('v_fg2');
  const [newGameIsFree, setNewGameIsFree] = useState(false);
  const [newGameTotalPrice, setNewGameTotalPrice] = useState(130000);
  const [newGameMaxPlayers, setNewGameMaxPlayers] = useState(12);
  const [newGameDateInput, setNewGameDateInput] = useState('Bugun, 11-Sentabr');
  const [newGameTimeInput, setNewGameTimeInput] = useState('20:00 - 21:30');

  // TELEFON RAQAMINI HAQIQIY EKANLIGINI TEKSHIRISH VA SMS KOD TIZIMI
  const [phoneDigits, setPhoneDigits] = useState(() => {
    const saved = localStorage.getItem('fs_current_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u.phone) {
          const d = u.phone.replace(/\D/g, '');
          return d.startsWith('998') ? d.substring(3) : d;
        }
      } catch(e){}
    }
    return '';
  });
  const [detectedOperator, setDetectedOperator] = useState(() => {
    const saved = localStorage.getItem('fs_current_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u.phone) {
          const d = u.phone.replace(/\D/g, '');
          const clean = d.startsWith('998') ? d.substring(3) : d;
          return UZ_OPERATORS[clean.substring(0, 2)] || null;
        }
      } catch(e){}
    }
    return null;
  });
  const [phoneError, setPhoneError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  // HAQIQIY TASHRIFLAR VA FOYDALANUVCHILARNI TOZALASH FUNKSIYASI (YOLG'ON STATISTIKASIZ)
  const cleanRealAnalytics = (savedRaw) => {
    const defaultClean = {
      totalVisitors: 1,
      todayVisitors: 1,
      registeredUsers: 0,
      subscriptionRevenue: 0,
      villageStats: { "Farg'ona": 0, "Vodil": 0, "Yoshlarobod": 0, "Novkat": 0 },
      recentLogs: []
    };
    if (!savedRaw) return defaultClean;
    try {
      const parsed = typeof savedRaw === 'string' ? JSON.parse(savedRaw) : savedRaw;
      if (!parsed || typeof parsed !== 'object') return defaultClean;

      // Soxta dummy foydalanuvchilarni chiqarib tashlash
      const realLogs = (parsed.recentLogs || []).filter(l => {
        if (!l) return false;
        if (l.id === 'l1' || l.id === 'l2' || l.id === 'l3') return false;
        const nm = (l.name || '').trim().toLowerCase();
        if (nm === 'azizbek fayziyev' || nm === 'jasur komilov' || nm === 'rustam qodirov') return false;
        return true;
      });

      const villageStats = { "Farg'ona": 0, "Vodil": 0, "Yoshlarobod": 0, "Novkat": 0 };
      realLogs.forEach(l => {
        if (l.village && villageStats[l.village] !== undefined) {
          villageStats[l.village] += 1;
        } else if (l.village) {
          villageStats[l.village] = 1;
        }
      });

      const isInflated = (parsed.totalVisitors >= 100) || (parsed.todayVisitors >= 50) || (parsed.registeredUsers >= 50);
      const realRegistered = realLogs.length;
      const realTotal = isInflated ? Math.max(realRegistered, 1) : Math.max(parsed.totalVisitors || 0, realRegistered, 1);
      const realToday = isInflated ? Math.max(realRegistered, 1) : Math.max(parsed.todayVisitors || 0, realRegistered, 1);

      const cleanResult = {
        totalVisitors: realTotal,
        todayVisitors: realToday,
        registeredUsers: realRegistered,
        subscriptionRevenue: 0,
        villageStats,
        recentLogs: realLogs
      };
      localStorage.setItem('fs_analytics', JSON.stringify(cleanResult));
      return cleanResult;
    } catch (e) {
      return defaultClean;
    }
  };

  // TASHRIFLAR HISOBOTI (FAQAT HAQIQIY FOYDALANUVCHILAR)
  const [analytics, setAnalytics] = useState(() => {
    const saved = localStorage.getItem('fs_analytics');
    return cleanRealAnalytics(saved);
  });

  const [selectedSport, setSelectedSport] = useState('Voleybol');
  const [selectedVillage, setSelectedVillage] = useState('Barchasi');

  const [venues, setVenues] = useState(INITIAL_VENUES);
  const [games, setGames] = useState(INITIAL_GAMES);

  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(null);

  const [customSplitPlayerCount, setCustomSplitPlayerCount] = useState(10);
  const [joinPaymentMethod, setJoinPaymentMethod] = useState('Payme');

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('fs_current_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u && u.name && u.name !== 'Azizbek Fayziyev') {
          return u;
        }
      } catch(e){}
    }
    return {
      name: "",
      age: "23",
      phone: "",
      primarySport: "Voleybol",
      userCoords: { x: 48, y: 70 },
      village: "Vodil",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80",
      reminder2Hours: true,
      reminder30Min: true,
      verified: false
    };
  });

  const [userNameInput, setUserNameInput] = useState(() => userProfile.name || '');
  const [telegramBotUsername, setTelegramBotUsername] = useState(() => localStorage.getItem('fs_tg_bot_username') || 'ValleyAuth_bot');
  const [telegramBotToken, setTelegramBotToken] = useState(() => localStorage.getItem('fs_tg_bot_token') || '');
  const [telegramChatId, setTelegramChatId] = useState(() => localStorage.getItem('fs_tg_chat_id') || '');
  const [eskizToken, setEskizToken] = useState(() => localStorage.getItem('fs_eskiz_token') || '');

  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => { setToastMessage(null); }, 3500);
  };

  useEffect(() => {
    localStorage.setItem('fs_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // SMS Taymer
  useEffect(() => {
    let interval = null;
    if (otpCountdown > 0) {
      interval = setInterval(() => {
        setOtpCountdown(c => c - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpCountdown]);

  // Telefon raqamini chiroyli ko'rsatish: "90 123 45 67"
  const formatPhoneDisplay = (digits) => {
    if (!digits) return '';
    let res = '';
    if (digits.length > 0) res += digits.substring(0, 2);
    if (digits.length > 2) res += ' ' + digits.substring(2, 5);
    if (digits.length > 5) res += ' ' + digits.substring(5, 7);
    if (digits.length > 7) res += ' ' + digits.substring(7, 9);
    return res;
  };

  // Raqamni tozalash va boshqa raqam kiritish
  const handleClearPhone = () => {
    setPhoneDigits('');
    setIsPhoneVerified(false);
    setIsOtpSent(false);
    setOtpInput('');
    setPhoneError('');
    setDetectedOperator(null);
    showToast("Raqam tozalandi. Yangi raqam kiritishingiz mumkin.");
  };

  // Telefon raqamini kiritish va operatorni tekshirish (ixtiyoriy yangi raqam yozish imkoniyati bilan)
  const handlePhoneChange = (val) => {
    let clean = val.replace(/\D/g, '');
    if (clean.startsWith('998')) {
      clean = clean.substring(3);
    }
    // Agar 9 tadan oshsa, yangi terilgan oxirgi 9 ta raqam olinadi
    if (clean.length > 9) {
      clean = clean.slice(-9);
    }

    setPhoneDigits(clean);
    setIsPhoneVerified(false);
    setIsOtpSent(false);
    setOtpInput('');
    setPhoneError('');

    if (clean.length >= 2) {
      const opCode = clean.substring(0, 2);
      if (UZ_OPERATORS[opCode]) {
        setDetectedOperator(UZ_OPERATORS[opCode]);
      } else {
        setDetectedOperator(null);
        setPhoneError(`"${opCode}" kodi O'zbekiston mobil operatorlarida mavjud emas! (90, 91, 93, 94, 97, 88, 99, 95, 77, 33, 50, 20)`);
      }
    } else {
      setDetectedOperator(null);
    }
  };

  // Soxta raqamlarni filtrlovchi detektor
  const isFakeNumber = (clean9Digits) => {
    if (/^(\d)\1+$/.test(clean9Digits)) return true;
    if (clean9Digits === '123456789' || clean9Digits === '987654321') return true;
    if (clean9Digits.substring(2) === '0000000') return true;
    return false;
  };

  // Haqiqiy SMS yoki Telegram orqali kod yuborish
  const handleSendSmsCode = async () => {
    if (phoneDigits.length !== 9) {
      setPhoneError("Telefon raqami to'liq emas! 9 ta raqam bo'lishi shart.");
      showToast("Telefon raqamini to'liq kiriting!", "error");
      return;
    }

    const opCode = phoneDigits.substring(0, 2);
    if (!UZ_OPERATORS[opCode]) {
      setPhoneError("Noto'g'ri operator kodi! Raqam O'zbekiston operatorlariga tegishli emas.");
      showToast("Noto'g'ri operator kodi!", "error");
      return;
    }

    if (isFakeNumber(phoneDigits)) {
      setPhoneError("Mavjud bo'lmagan soxta raqam aniqlandi! Haqiqiy telefon raqamingizni kiriting.");
      showToast("Mavjud bo'lmagan soxta raqam!", "error");
      return;
    }

    setPhoneError('');
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setIsOtpSent(true);
    setOtpCountdown(60);

    // Eskiz.uz SMS Shlyuzi
    const savedEskiz = localStorage.getItem('fs_eskiz_token');
    if (savedEskiz) {
      try {
        await fetch('https://notify.eskiz.uz/api/message/sms/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${savedEskiz}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mobile_phone: '998' + phoneDigits,
            message: `Valley tasdiqlash kodi: ${code}`,
            from: '4546'
          })
        });
      } catch (e) {
        console.log("Eskiz API:", e);
      }
    }

    // Telegram Bot: Agar Bot Token bo'lsa
    const savedBotToken = localStorage.getItem('fs_tg_bot_token');
    const savedChatId = localStorage.getItem('fs_tg_chat_id');
    if (savedBotToken && savedChatId) {
      try {
        await fetch(`https://api.telegram.org/bot${savedBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: savedChatId,
            text: `🔐 Valley tasdiqlash kodi: ${code}\n📱 Telefon: +998 ${phoneDigits}`
          })
        });
      } catch (e) {
        console.log("Telegram Bot xatosi:", e);
      }
    }

    showToast(`📲 Xabarnoma jo'natildi: +998 ${formatPhoneDisplay(phoneDigits)}`);
  };

  // Kiritilgan SMS kodni tekshirish
  const handleVerifyOtp = () => {
    if (otpInput.trim() === generatedOtp) {
      setIsPhoneVerified(true);
      setPhoneError('');
      showToast("✅ Telefon raqam muvaffaqiyatli tasdiqlandi!");
    } else {
      showToast("Xato kod! Qayta tekshirib kiriting yoki Telegram bot orqali oling.", "error");
    }
  };

  // TO'LIQ ANONIM KIRISH (SMS VA KOD TALAB QILINMAYDI)
  const handleAnonymousLogin = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const anonName = (userNameInput && userNameInput.trim()) ? userNameInput.trim() : `Anonim O'yinchi #${randomNum}`;
    const villageInput = document.getElementById('login_village');
    const sportInput = document.getElementById('login_sport');
    const village = villageInput ? villageInput.value : (userProfile.village || "Farg'ona");
    const sport = sportInput ? sportInput.value : (userProfile.primarySport || "Voleybol");

    const up = {
      ...userProfile,
      name: anonName,
      phone: phoneDigits ? ('+998 ' + formatPhoneDisplay(phoneDigits)) : "Anonim (maxfiy)",
      age: userProfile.age || 20,
      village: village,
      primarySport: sport,
      verified: true,
      isAnonymous: true
    };

    setUserProfile(up);
    setSelectedSport(sport);
    setSelectedVillage(village);
    localStorage.setItem('fs_current_user', JSON.stringify(up));
    localStorage.setItem('fs_user_logged_in', 'true');
    trackVisitor(up);

    setAppStep(2);
    showToast(`🎭 Xush kelibsiz! To'liq anonim rejimda kirdingiz.`);
  };

  // Bosh Admin uchun yangi tashrif qayd etish (faqat haqiqiy ma'lumotlar)
  const trackVisitor = (userObj) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setAnalytics(prev => {
      const current = cleanRealAnalytics(prev);

      const newLog = {
        id: 'log_' + Date.now(),
        name: userObj.name,
        phone: userObj.phone,
        village: userObj.village,
        device: isMobile ? "Mobil" : "Desktop",
        time: `Bugun, ${timeStr}`,
        sport: userObj.primarySport || "Voleybol"
      };

      const updatedLogs = [newLog, ...current.recentLogs.filter(l => l.phone !== userObj.phone)].slice(0, 30);

      const villageStats = { "Farg'ona": 0, "Vodil": 0, "Yoshlarobod": 0, "Novkat": 0 };
      updatedLogs.forEach(l => {
        if (l.village && villageStats[l.village] !== undefined) {
          villageStats[l.village] += 1;
        } else if (l.village) {
          villageStats[l.village] = 1;
        }
      });

      const updated = {
        ...current,
        totalVisitors: Math.max(current.totalVisitors + 1, updatedLogs.length),
        todayVisitors: Math.max(current.todayVisitors + 1, updatedLogs.length),
        registeredUsers: updatedLogs.length,
        villageStats,
        recentLogs: updatedLogs
      };
      localStorage.setItem('fs_analytics', JSON.stringify(updated));
      return updated;
    });
  };

  // Bosh Admin parolini tekshirish (admin2010)
  const handleSuperAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput === 'admin2010') {
      setIsSuperAdminUnlocked(true);
      setIsSuperAdminModalOpen(false);
      setAdminPasswordInput('');
      setAdminPasswordError(false);
      setCurrentRole('super_admin');
      setActiveTab('admin_super');
      showToast("Bosh Admin huquqi muvaffaqiyatli tasdiqlandi!");
    } else {
      setAdminPasswordError(true);
      showToast("Xato parol! Ruxsat etilmadi.", "error");
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserProfile(prev => {
        const u = { ...prev, avatar: url };
        localStorage.setItem('fs_current_user', JSON.stringify(u));
        return u;
      });
      showToast("Profil rasmi yangilandi!");
    }
  };

  const currentSportGames = useMemo(() => {
    return games.filter(g => {
      const matchSport = selectedSport === 'Barchasi' || g.sport === selectedSport;
      const matchVillage = selectedVillage === 'Barchasi' || g.village === selectedVillage;
      return matchSport && matchVillage;
    });
  }, [games, selectedSport, selectedVillage]);

  const canCreateGame = isSuperAdminUnlocked || currentRole === 'super_admin' || currentRole === 'hall_admin' || currentRole === 'admin' || isAdmin;

  const handleOpenCreateGame = () => {
    if (canCreateGame) {
      setIsCreateGameOpen(true);
    } else {
      setIsAdminPaymentModalOpen(true);
    }
  };

  const schoolGyms = useMemo(() => venues.filter(v => v.type === 'school_gym'), [venues]);
  const footballPitches = useMemo(() => venues.filter(v => v.type === 'football_pitch'), [venues]);
  const basketballCourts = useMemo(() => venues.filter(v => v.type === 'basketball_court' || v.category.includes('Basketbol')), [venues]);

  const handleJoinGame = () => {
    if (!selectedGame) return;
    const exists = selectedGame.participants.some(p => p.phone === userProfile.phone);
    if (exists) {
      showToast("Siz bu o'yinga allaqachon a'zo bo'lgansiz!", 'warning');
      setIsJoinModalOpen(false);
      return;
    }
    const newP = {
      id: 'p_' + Date.now(),
      name: userProfile.name,
      phone: userProfile.phone,
      status: joinPaymentMethod === 'Naqd' ? 'Naqd' : "To'langan",
      method: joinPaymentMethod,
      avatar: userProfile.avatar
    };
    const updated = {
      ...selectedGame,
      participants: [...selectedGame.participants, newP]
    };
    setGames(prev => prev.map(g => g.id === selectedGame.id ? updated : g));
    setSelectedGame(updated);
    setIsJoinModalOpen(false);
    showToast(`Muvaffaqiyatli qo'shildingiz! To'lov: ${joinPaymentMethod}`);
  };

  const isDark = theme === 'dark';
  const bgClass = isDark ? "bg-[#080a0f] text-zinc-100" : "bg-[#f4f6fa] text-zinc-900";
  const cardBg = isDark ? "bg-zinc-900/90 border-zinc-800/80" : "bg-white border-zinc-200/90 shadow-sm";
  const headerBg = isDark ? "bg-zinc-900/90 border-zinc-800" : "bg-white/95 border-zinc-200 shadow-sm";

  return (
    <div className={`min-h-screen ${bgClass} font-sans selection:bg-emerald-500 selection:text-black transition-colors duration-300 relative overflow-x-hidden`}>

      {/* TOAST BILDIRISHNOMA */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900/95 border border-emerald-500/60 text-emerald-400 shadow-2xl backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold tracking-wide text-zinc-100">{toastMessage.text}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOSQICHLAR HEADER                                                         */}
      {/* ========================================================================= */}
      <div className={`w-full py-2 px-4 border-b ${isDark ? 'bg-zinc-950/90 border-zinc-800/80 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'} text-xs font-semibold`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-emerald-500 font-extrabold hidden sm:inline">
              Ilova Bosqichlari:
            </span>
            <div className="flex items-center gap-1">
              {[
                { step: 1, label: "1. Kirish & SMS" },
                { step: 2, label: "2. Xaritada joy" },
                { step: 3, label: "3. Sport Ilovasi" }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => {
                    if (s.step > 1 && !isPhoneVerified) {
                      showToast("Iltimos, avval ismingizni kiriting va telefoningizni tasdiqlang!", "error");
                      return;
                    }
                    setAppStep(s.step);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    appStep === s.step
                      ? 'bg-emerald-500 text-black shadow'
                      : isDark ? 'bg-zinc-900 text-zinc-300' : 'bg-white text-zinc-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* MUTLAQ ANONIM BOSH ADMIN QULFI (Parol: admin2010) */}
            <button
              onClick={() => {
                if (isSuperAdminUnlocked) {
                  setCurrentRole('super_admin');
                  setActiveTab('admin_super');
                  setAppStep(3);
                } else {
                  setIsSuperAdminModalOpen(true);
                }
              }}
              className={`p-1 px-2.5 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                isSuperAdminUnlocked ? 'bg-cyan-500 text-black border-cyan-400 shadow-md' : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-cyan-400'
              }`}
              title="Anonim Bosh Admin (Parol: admin2010)"
            >
              {isSuperAdminUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>Bosh Admin</span>
            </button>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-1.5 rounded-xl border text-xs font-bold ${
                isDark ? 'bg-zinc-900 border-zinc-700 text-amber-300' : 'bg-white border-zinc-300 text-zinc-700'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button onClick={() => setIsProfileSidebarOpen(true)} className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold text-xs shadow">
              <img src={userProfile.avatar} alt="avatar" className="w-4 h-4 rounded-full object-cover" />
              <span>Profil</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1-BOSQICH: NOMERNI HAQIQATDAN BORLIGINI TEKSHIRISH VA KIRISH               */}
      {/* ========================================================================= */}
      {appStep === 1 && (
        <div className="max-w-md mx-auto p-4 py-8 animate-fadeIn">
          <div className={`p-6 sm:p-7 rounded-3xl border ${cardBg} shadow-2xl space-y-5 text-center`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black flex items-center justify-center mx-auto text-2xl font-black shadow-lg shadow-emerald-500/20">
              🏐
            </div>

            <div>
              <h2 className="text-xl font-black tracking-tight">Valley - Kirish</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Iltimos, haqiqiy telefon raqamingizni kiriting va SMS orqali tasdiqlang
              </p>
            </div>

            {/* Rasm tanlash */}
            <div className="relative inline-block mx-auto">
              <img src={userProfile.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover border-4 border-emerald-500 shadow-xl" />
              <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 text-black cursor-pointer shadow-md hover:scale-110">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>

            <div className="space-y-4 text-left text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Ism va familiyangiz (Majburiy):</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    id="login_name"
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    required
                    placeholder="Ismingiz va familiyangizni kiriting"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold focus:outline-none focus:border-emerald-500`}
                  />
                </div>
              </div>

              {/* TELEFON RAQAM TEKSHIRUVI (O'ZBEKISTON OPERATORLARI VA SMS) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-zinc-400 font-bold block">Telefon raqamingiz (Majburiy):</label>
                  {detectedOperator && (
                    <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {detectedOperator}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className={`flex items-center rounded-xl border transition-all overflow-hidden ${
                    phoneError ? 'border-rose-500' : isPhoneVerified ? 'border-emerald-500 bg-emerald-950/20' : isDark ? 'bg-zinc-950 border-zinc-800 focus-within:border-emerald-500' : 'bg-zinc-50 border-zinc-300 focus-within:border-emerald-500'
                  }`}>
                    {/* O'zbekiston kodi fiksirlangan prefiks */}
                    <div className={`flex items-center gap-1.5 px-3 py-2.5 border-r select-none shrink-0 ${
                      isDark ? 'bg-zinc-900 border-zinc-800 text-emerald-400' : 'bg-zinc-200 border-zinc-300 text-zinc-800'
                    } font-mono font-bold text-sm`}>
                      <span>🇺🇿</span>
                      <span>+998</span>
                    </div>

                    {/* 9 xonali erkin, qulay kiritish maydoni */}
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={formatPhoneDisplay(phoneDigits)}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="90 123 45 67"
                      className="flex-1 min-w-0 px-3 py-2.5 bg-transparent font-mono font-bold text-sm tracking-wide focus:outline-none"
                    />

                    {/* Tozalash yoki Tasdiqlangan belgisi */}
                    {phoneDigits.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearPhone}
                        className="px-2.5 text-zinc-400 hover:text-rose-400 text-base font-bold transition-colors"
                        title="Raqamni tozalash"
                      >
                        ✕
                      </button>
                    )}

                    {isPhoneVerified && (
                      <div className="flex items-center gap-1 pr-3 text-emerald-400 text-xs font-black shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="hidden sm:inline">Tasdiqlandi</span>
                      </div>
                    )}
                  </div>

                  {/* Boshqa nomer kiritish tezkor tugmasi */}
                  {phoneDigits.length > 0 && (
                    <div className="flex items-center justify-between px-1">
                      <button
                        type="button"
                        onClick={handleClearPhone}
                        className="text-[11px] text-zinc-400 hover:text-emerald-400 font-bold flex items-center gap-1 transition-colors"
                      >
                        <span>🔄 Boshqa raqam kiritish</span>
                      </button>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {phoneDigits.length}/9 raqam
                      </span>
                    </div>
                  )}

                  {/* SMS / Telegram Kod Yuborish Tugmalari */}
                  {!isPhoneVerified && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleSendSmsCode}
                        disabled={otpCountdown > 0 || phoneDigits.length !== 9}
                        className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black text-xs font-black shadow transition-all flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>
                          {otpCountdown > 0 ? `Qayta yuborish (${otpCountdown}s)` : isOtpSent ? "Kodni qayta yuborish" : "SMS orqali kod olish"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (telegramBotUsername === 'ValleyAuth_bot' && !telegramBotToken) {
                            showToast("💡 Bot ochish: Telegramda @BotFather ga kiring, /newbot deb bot oching va Bosh Adminga tokenni qo'ying. Hozircha quyidagi sinov kodidan foydalaning!");
                          } else {
                            window.open(`https://t.me/${telegramBotUsername.replace('@', '')}?start=auth_${generatedOtp || 'valley'}`, '_blank');
                          }
                          if (!isOtpSent) handleSendSmsCode();
                        }}
                        className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black shadow transition-all flex items-center justify-center gap-1.5 text-center"
                      >
                        <span>✈️ Telegram Botdan kod olish</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Xatolik xabari */}
                {phoneError && (
                  <p className="text-[11px] text-rose-400 mt-1 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {phoneError}
                  </p>
                )}
              </div>

              {/* SMS / TELEGRAM KOD KIRITISH TIZIMI */}
              {isOtpSent && !isPhoneVerified && (
                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-emerald-500/40 space-y-3 animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg shrink-0 border border-emerald-500/20">
                      📩
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-400">Tasdiqlash xabarnomasi jo'natildi!</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        +998 {formatPhoneDisplay(phoneDigits)} raqamingizga 4 xonali kod jo'natildi. Kodni quyidagi maydonga kiriting:
                      </p>
                    </div>
                  </div>

                  {/* SINOV REJIMI UCHUN KOD KO'RSATISH VA 1-TUGMA BILAN TASDIQLASH */}
                  {(!eskizToken && !telegramBotToken) && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-amber-400 block text-xs">⚡ Sinov tasdiqlash kodi:</span>
                          <span className="text-[10px] text-zinc-400">Eskiz.uz SMS yoki Telegram Bot ulanmaguncha:</span>
                        </div>
                        <span className="text-lg font-black font-mono px-3 py-1 rounded-lg bg-black/80 text-emerald-400 border border-emerald-500/40 tracking-widest select-all">
                          {generatedOtp}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpInput(generatedOtp);
                          setIsPhoneVerified(true);
                          setPhoneError('');
                          showToast("✅ Telefon raqam sinov kodi bilan tasdiqlandi!");
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                      >
                        <span>⚡ Kodni avtomatik kiritish va tasdiqlash</span>
                      </button>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] text-zinc-300 font-bold block">
                      4 xonali tasdiqlash kodini kiriting:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="••••"
                        className="flex-1 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-center font-mono text-lg font-black tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={otpInput.length !== 4}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-black text-xs shadow-md transition-all shrink-0"
                      >
                        Tasdiqlash
                      </button>
                    </div>
                  </div>

                  {/* Tezkor Anonim Kirish yordamchisi */}
                  <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={handleAnonymousLogin}
                      className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-emerald-400 font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>🎭 Kod kelmadimi? Anonim rejimda davom etish</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Yoshingiz:</label>
                  <input
                    id="login_age"
                    type="number"
                    defaultValue={userProfile.age}
                    min="10"
                    max="80"
                    required
                    className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold`}
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Qishlog'ingiz:</label>
                  <select
                    id="login_village"
                    defaultValue={userProfile.village}
                    className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold`}
                  >
                    <option value="Farg'ona">Farg'ona</option>
                    <option value="Vodil">Vodil</option>
                    <option value="Yoshlarobod">Yoshlarobod</option>
                    <option value="Novkat">Novkat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Qiziqqan sport turi:</label>
                <select
                  id="login_sport"
                  defaultValue={userProfile.primarySport}
                  className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold`}
                >
                  <option value="Voleybol">Voleybol (birlamchi)</option>
                  <option value="Futbol">Futbol</option>
                  <option value="Basketbol">Basketbol</option>
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const nameInput = document.getElementById('login_name');
                    const ageInput = document.getElementById('login_age');
                    const villageInput = document.getElementById('login_village');
                    const sportInput = document.getElementById('login_sport');

                    const name = (userNameInput && userNameInput.trim()) || (nameInput ? nameInput.value.trim() : userProfile.name);
                    const age = ageInput ? ageInput.value.trim() : userProfile.age;
                    const village = villageInput ? villageInput.value : userProfile.village;
                    const sport = sportInput ? sportInput.value : userProfile.primarySport;
                    const phone = phoneDigits ? ('+998 ' + formatPhoneDisplay(phoneDigits)) : userProfile.phone;

                    if (!name) {
                      showToast("Ismingizni kiriting!", "error");
                      return;
                    }

                    if (!isPhoneVerified) {
                      showToast("Telefon raqamingizni tasdiqlang yoki 'Anonim kirish' tugmasini bosing!", "error");
                      return;
                    }

                    const up = { ...userProfile, name, phone, age, village, primarySport: sport, verified: true };
                    setUserProfile(up);
                    setSelectedSport(sport);
                    setSelectedVillage(village);
                    localStorage.setItem('fs_current_user', JSON.stringify(up));
                    localStorage.setItem('fs_user_logged_in', 'true');
                    trackVisitor(up);

                    setAppStep(2);
                    showToast(`Xush kelibsiz, ${name}!`);
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-black text-sm shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Keyingi: Xaritada joylashuvni tanlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* YOKI ANONIM KIRISH TUGMASI (KODSIZ VA TO'LIQ MAXFIY) */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-zinc-800"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">YOKI</span>
                  <div className="flex-grow border-t border-zinc-800"></div>
                </div>

                <button
                  type="button"
                  onClick={handleAnonymousLogin}
                  className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-emerald-500/50 text-zinc-200 font-extrabold text-xs shadow transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">🎭</span>
                  <span>To'liq anonim kirish (Kod talab qilinmaydi)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2-BOSQICH: XARITADA JOYINI BELGILASH                                      */}
      {/* ========================================================================= */}
      {appStep === 2 && (
        <div className="max-w-2xl mx-auto p-4 py-6 animate-fadeIn space-y-4">
          <div className={`p-5 rounded-3xl border ${cardBg} shadow-xl space-y-4`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  2-Bosqich: Joylashuv
                </span>
                <h3 className="text-base font-black mt-1">Xaritada qayerda turganingizni belgilang</h3>
                <p className="text-xs text-zinc-400">Xarita ustiga bosing yoki pastdagi qishloqlardan birini tanlang</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/30">
                📍 {userProfile.village}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[
                { name: 'Yoshlarobod', x: 26, y: 38 },
                { name: 'Vodil', x: 50, y: 72 },
                { name: 'Novkat', x: 75, y: 48 }
              ].map(v => (
                <button
                  key={v.name}
                  onClick={() => {
                    setUserProfile(prev => {
                      const u = { ...prev, village: v.name, userCoords: { x: v.x, y: v.y } };
                      localStorage.setItem('fs_current_user', JSON.stringify(u));
                      return u;
                    });
                    showToast(`Joylashuv: ${v.name}`);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    userProfile.village === v.name
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-md'
                      : isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>

            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                let vName = "Vodil";
                if (x < 35) vName = "Yoshlarobod";
                else if (x > 65) vName = "Novkat";

                setUserProfile(prev => {
                  const u = { ...prev, userCoords: { x, y }, village: vName };
                  localStorage.setItem('fs_current_user', JSON.stringify(u));
                  return u;
                });
                showToast(`Turgan joyingiz belgilandi: ${vName}`);
              }}
              className={`relative w-full h-64 rounded-2xl border ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-zinc-100'} overflow-hidden cursor-crosshair shadow-inner`}
            >
              <svg className="absolute inset-0 w-full h-full">
                <path d="M 120 0 Q 180 80 200 140 T 260 280" fill="none" stroke="#06b6d4" strokeWidth="8" strokeOpacity="0.6" strokeLinecap="round" />
                <path d="M 80 30 L 190 130 L 250 250" fill="none" stroke="#52525b" strokeWidth="3" strokeDasharray="4,4" />
                <path d="M 190 130 L 390 140" fill="none" stroke="#52525b" strokeWidth="3" strokeDasharray="4,4" />
              </svg>

              <div className="absolute top-4 left-6 text-xs font-black text-emerald-400 bg-black/60 px-2 py-0.5 rounded">
                Yoshlarobod
              </div>
              <div className="absolute bottom-6 left-1/3 text-xs font-black text-cyan-400 bg-black/60 px-2 py-0.5 rounded">
                Vodil
              </div>
              <div className="absolute top-6 right-6 text-xs font-black text-purple-400 bg-black/60 px-2 py-0.5 rounded">
                Novkat
              </div>

              <div
                style={{ left: `${userProfile.userCoords.x}%`, top: `${userProfile.userCoords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <div className="relative flex flex-col items-center">
                  <span className="w-10 h-10 rounded-full bg-emerald-400/40 animate-ping absolute -top-1" />
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black shadow-2xl border-2 border-white">
                    📍
                  </div>
                  <span className="bg-black/90 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-emerald-500/40 whitespace-nowrap mt-1">
                    Siz shu yerdasiz
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button onClick={() => setAppStep(1)} className="px-4 py-2 rounded-xl border border-zinc-700 text-xs font-bold">
                Orqaga
              </button>
              <button
                onClick={() => {
                  setAppStep(3);
                  showToast("Hush kelibsiz! Barcha sport zallari va o'yinlar tayyor.");
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold text-xs shadow-xl flex items-center gap-1.5"
              >
                <span>Ilovaga kirish</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3-BOSQICH: ASOSIY SPORT ILOVASI                                           */}
      {/* ========================================================================= */}
      {appStep === 3 && (
        <>
          <header className={`sticky top-0 z-40 ${headerBg} backdrop-blur-md px-4 py-3 shadow-md`}>
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg">
                  <span className="text-xl">🏐</span>
                </div>
                <div>
                  <h1 className="font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    VALLEY
                  </h1>
                  <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {userProfile.village} • {userProfile.name.split(' ')[0]} ({userProfile.phone})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-zinc-800/80 p-1 rounded-xl text-xs">
                  <button onClick={() => { setCurrentRole('user'); setActiveTab('home'); }} className={`px-2 py-1 rounded-lg font-bold ${currentRole === 'user' ? 'bg-emerald-500 text-black' : 'text-zinc-400'}`}>
                    Mijoz
                  </button>
                  <button onClick={() => { setCurrentRole('hall_admin'); setActiveTab('admin_hall'); }} className={`px-2 py-1 rounded-lg font-bold ${currentRole === 'hall_admin' ? 'bg-amber-500 text-black' : 'text-zinc-400'}`}>
                    Zal Admin
                  </button>
                  <button
                    onClick={() => {
                      if (isSuperAdminUnlocked) {
                        setCurrentRole('super_admin');
                        setActiveTab('admin_super');
                      } else {
                        setIsSuperAdminModalOpen(true);
                      }
                    }}
                    className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 ${currentRole === 'super_admin' ? 'bg-cyan-400 text-black' : 'text-zinc-400'}`}
                  >
                    {isSuperAdminUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    Bosh Admin
                  </button>
                </div>

                <button onClick={() => setIsProfileSidebarOpen(true)} className="p-1 rounded-xl border border-zinc-700 bg-zinc-800">
                  <img src={userProfile.avatar} alt="User" className="w-7 h-7 rounded-lg object-cover" />
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-5xl mx-auto p-4 pb-24 space-y-6">

            {activeTab === 'home' && (
              <>
                {/* 3D XARITA */}
                <div className={`relative rounded-3xl overflow-hidden border ${cardBg} p-4 sm:p-5 shadow-2xl space-y-4`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-500 text-black font-black">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base font-black">Farg'ona tumani 3D Sport Xaritasi</h2>
                        <p className="text-xs text-zinc-400">Yoshlarobod, Vodil va Novkat sport maydonlari</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIs3DMapMode(!is3DMapMode)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 ${
                          is3DMapMode ? 'bg-emerald-500 text-black border-emerald-400' : isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        {is3DMapMode ? "3D Rejim (Faol)" : "2D Rejim"}
                      </button>
                      {is3DMapMode && (
                        <button
                          onClick={() => setMapRotation(p => ({ ...p, z: p.z === -20 ? 10 : -20 }))}
                          className="px-2.5 py-1.5 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-bold border border-zinc-700 flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Burish
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    style={{ perspective: '1100px' }}
                    className={`relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border ${isDark ? 'border-zinc-800 bg-[#06080e]' : 'border-zinc-300 bg-slate-100'} select-none flex items-center justify-center`}
                  >
                    <div
                      style={{
                        transform: is3DMapMode ? `rotateX(${mapRotation.x}deg) rotateZ(${mapRotation.z}deg) scale(0.95)` : 'none',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className="relative w-[92%] h-[88%] rounded-3xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 border-2 border-emerald-500/30 shadow-2xl overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:18px_18px]" />
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path d="M 140 -20 Q 200 80 230 160 T 300 320" fill="none" stroke="#06b6d4" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.8" />
                        <path d="M 80 10 L 210 140 L 270 280" fill="none" stroke="#64748b" strokeWidth="4" strokeDasharray="5,5" />
                        <path d="M 210 140 L 440 150" fill="none" stroke="#64748b" strokeWidth="4" strokeDasharray="5,5" />
                      </svg>

                      <div className="absolute top-4 left-6 text-xs font-black uppercase text-emerald-300 bg-zinc-900/90 px-2.5 py-1 rounded-lg border border-emerald-500/40 shadow">
                        Yoshlarobod
                      </div>
                      <div className="absolute bottom-6 left-1/3 text-xs font-black uppercase text-cyan-300 bg-zinc-900/90 px-2.5 py-1 rounded-lg border border-cyan-500/40 shadow">
                        Vodil Soya Bo'yi
                      </div>
                      <div className="absolute top-6 right-6 text-xs font-black uppercase text-purple-300 bg-zinc-900/90 px-2.5 py-1 rounded-lg border border-purple-500/40 shadow">
                        Novkat
                      </div>

                      {/* Joylashuv pini */}
                      <div style={{ left: `${userProfile.userCoords.x}%`, top: `${userProfile.userCoords.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <div className="relative flex flex-col items-center">
                          <span className="w-10 h-10 rounded-full bg-emerald-400/30 animate-ping absolute -top-1" />
                          <div className="w-7 h-7 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shadow-2xl border-2 border-white">
                            📍
                          </div>
                          <span className="bg-black/90 text-emerald-300 text-[9px] font-black px-1.5 py-0.5 rounded-full border border-emerald-500 mt-0.5">
                            Siz shu yerdasiz
                          </span>
                        </div>
                      </div>

                      {/* 3D Maydonlar */}
                      {venues.map(v => {
                        const isGym = v.type === 'school_gym';
                        const isBasket = v.type === 'basketball_court';
                        const isSel = selectedVenue?.id === v.id;
                        return (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVenue(v)}
                            style={{ left: `${v.coords.x}%`, top: `${v.coords.y}%` }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                          >
                            <div className="relative flex flex-col items-center">
                              <div className="w-8 h-4 bg-black/50 rounded-full blur-[2px] -mb-1" />
                              <div className={`transition-all transform group-hover:-translate-y-2 ${isSel ? '-translate-y-3 ring-4 ring-white' : ''}`}>
                                {isGym ? (
                                  <div className="w-12 h-9 rounded-lg bg-indigo-900 border-2 border-indigo-400 flex flex-col items-center justify-center text-white shadow-xl">
                                    <span className="text-xs">🏫</span>
                                    <span className="text-[7px] font-black text-indigo-200">ZAL</span>
                                  </div>
                                ) : isBasket ? (
                                  <div className="w-12 h-9 rounded-lg bg-amber-900 border-2 border-amber-400 flex flex-col items-center justify-center text-white shadow-xl">
                                    <span className="text-xs">🏀</span>
                                    <span className="text-[7px] font-black text-amber-200">BASKET</span>
                                  </div>
                                ) : (
                                  <div className="w-12 h-9 rounded-lg bg-emerald-900 border-2 border-emerald-400 flex flex-col items-center justify-center text-white shadow-xl">
                                    <span className="text-xs">⚽</span>
                                    <span className="text-[7px] font-black text-emerald-200">CHIM</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {selectedVenue && (
                    <div className={`p-3.5 rounded-2xl border ${cardBg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn`}>
                      <div className="flex items-center gap-3">
                        <img src={selectedVenue.image} alt={selectedVenue.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <span className="text-xs font-black text-emerald-400">{selectedVenue.village} • {selectedVenue.category}</span>
                          <h4 className="text-sm font-black">{selectedVenue.name}</h4>
                          <p className="text-xs text-zinc-400">{selectedVenue.pricePerHour.toLocaleString()} so'm / soat</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button onClick={() => setIsCallModalOpen(selectedVenue.contactPerson)} className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-bold flex items-center justify-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" /> Qo'ng'iroq
                        </button>
                        <button onClick={() => { setSelectedVillage(selectedVenue.village); showToast(`${selectedVenue.village} saralandi`); }} className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-emerald-500 text-black text-xs font-extrabold">
                          O'yinlarini ko'rish
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* SPORT TURLARI FILTRI */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black">Sport turini tanlang:</h3>
                    <div className="flex items-center gap-1">
                      {['Barchasi', "Farg'ona", 'Vodil', 'Yoshlarobod', 'Novkat'].map(v => (
                        <button
                          key={v}
                          onClick={() => setSelectedVillage(v)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                            selectedVillage === v ? 'bg-emerald-500 text-black' : isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-white text-zinc-600'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Voleybol', label: 'Voleybol (Birlamchi)', icon: '🏐', desc: 'Zal va ochiq matchlar' },
                      { id: 'Futbol', label: 'Futbol', icon: '⚽', desc: 'Sun\'iy maydonlar' },
                      { id: 'Basketbol', label: 'Basketbol', icon: '🏀', desc: 'Sport majmualari' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedSport(tab.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedSport === tab.id
                            ? 'bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border-emerald-500 ring-2 ring-emerald-500/40'
                            : isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-300'
                        }`}
                      >
                        <span className="text-2xl">{tab.icon}</span>
                        <p className={`font-black text-sm mt-1 ${selectedSport === tab.id ? 'text-emerald-400' : ''}`}>{tab.label}</p>
                        <p className="text-[10px] text-zinc-400">{tab.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1. O'YINLAR (JONLI RO'YXAT) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black flex items-center gap-2">
                        <span>{selectedSport === 'Voleybol' ? '🏐' : selectedSport === 'Futbol' ? '⚽' : '🏀'} {selectedSport} o'yinlari qayerlarda bo'lyapti?</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                          {currentSportGames.length} ta o'yin
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">Tafsilotlar va to'lov hisoblagichini ko'rish uchun bosing</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {canCreateGame ? (
                        <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-black text-emerald-400">
                          🛡️ Admin: Cheklanmagan
                        </span>
                      ) : (
                        <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] font-black text-amber-400">
                          🔒 O'yin ochish: Admin kerak
                        </span>
                      )}
                      <button
                        onClick={handleOpenCreateGame}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all ${
                          canCreateGame
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                        <span>{canCreateGame ? "O'yin ochish" : "O'yin ochish (Admin)"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {currentSportGames.map(game => {
                      const freeSpots = game.maxPlayers - game.participants.length;
                      const pricePerPerson = game.isFree ? 0 : Math.round(game.totalPrice / game.maxPlayers);

                      return (
                        <div
                          key={game.id}
                          onClick={() => setSelectedGame(game)}
                          className={`p-4 rounded-2xl border ${cardBg} hover:border-emerald-500/60 cursor-pointer space-y-3 shadow-md`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              game.isFree ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {game.isFree ? "BEPUL" : `PULLI (${pricePerPerson.toLocaleString()} so'm/kishi)`}
                            </span>
                            <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-emerald-400" /> {game.village}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-bold text-base">{game.title}</h4>
                            <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                              <Building2 className="w-3.5 h-3.5 text-zinc-500" /> {game.venueName}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-cyan-400" /> {game.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {game.time}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-emerald-400 font-bold">{game.participants.length}/{game.maxPlayers} ta o'yinchi ({freeSpots} bo'sh)</span>
                            <button className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs font-bold flex items-center gap-1">
                              Tafsilotlar <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. UNI PASIGA: MAKTAB ZALLARI, SUN'IY MAYDONLAR, BASKETBOL */}
                <div className="space-y-6 pt-4 border-t border-zinc-800">
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-indigo-400 flex items-center gap-2">
                      <span>🏫 Maktab sport zallari (Voleybol va Basketbol)</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {schoolGyms.map(gym => (
                        <div key={gym.id} className={`p-4 rounded-2xl border ${cardBg} space-y-2.5 shadow-sm`}>
                          <div className="relative h-28 rounded-xl overflow-hidden">
                            <img src={gym.image} alt={gym.name} className="w-full h-full object-cover" />
                            <span className="absolute bottom-2 right-2 text-xs font-black px-2 py-0.5 rounded bg-black/80 text-emerald-400">
                              {gym.pricePerHour.toLocaleString()} so'm/s
                            </span>
                          </div>
                          <h4 className="text-xs font-black truncate">{gym.name}</h4>
                          <p className="text-[11px] text-zinc-400">{gym.village}, {gym.address}</p>
                          <div className="p-2 rounded-xl bg-zinc-950/50 border border-zinc-800 flex items-center justify-between">
                            <div>
                              <p className="text-[11px] font-bold">{gym.contactPerson.name}</p>
                              <p className="text-[10px] text-zinc-500">{gym.contactPerson.workHours}</p>
                            </div>
                            <button onClick={() => setIsCallModalOpen(gym.contactPerson)} className="px-2 py-1 rounded bg-emerald-500 text-black text-xs font-bold">
                              Bog'lanish
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2">
                      <span>⚽ Sun'iy futbol maydonlari</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {footballPitches.map(pitch => (
                        <div key={pitch.id} className={`p-4 rounded-2xl border ${cardBg} space-y-2.5 shadow-sm`}>
                          <div className="relative h-28 rounded-xl overflow-hidden">
                            <img src={pitch.image} alt={pitch.name} className="w-full h-full object-cover" />
                            <span className="absolute bottom-2 right-2 text-xs font-black px-2 py-0.5 rounded bg-black/80 text-emerald-400">
                              {pitch.pricePerHour.toLocaleString()} so'm/s
                            </span>
                          </div>
                          <h4 className="text-xs font-black truncate">{pitch.name}</h4>
                          <p className="text-[11px] text-zinc-400">{pitch.village}, {pitch.address}</p>
                          <div className="p-2 rounded-xl bg-zinc-950/50 border border-zinc-800 flex items-center justify-between">
                            <div>
                              <p className="text-[11px] font-bold">{pitch.contactPerson.name}</p>
                              <p className="text-[10px] text-zinc-500">{pitch.contactPerson.phone}</p>
                            </div>
                            <button onClick={() => setIsCallModalOpen(pitch.contactPerson)} className="px-2 py-1 rounded bg-emerald-500 text-black text-xs font-bold">
                              Qo'ng'iroq
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-amber-400 flex items-center gap-2">
                      <span>🏀 Basketbol maydonlari va Majmualar</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {basketballCourts.map(court => (
                        <div key={court.id} className={`p-4 rounded-2xl border ${cardBg} space-y-2.5 shadow-sm`}>
                          <div className="relative h-28 rounded-xl overflow-hidden">
                            <img src={court.image} alt={court.name} className="w-full h-full object-cover" />
                            <span className="absolute bottom-2 right-2 text-xs font-black px-2 py-0.5 rounded bg-black/80 text-emerald-400">
                              {court.pricePerHour.toLocaleString()} so'm/s
                            </span>
                          </div>
                          <h4 className="text-xs font-black truncate">{court.name}</h4>
                          <p className="text-[11px] text-zinc-400">{court.village}, {court.address}</p>
                          <div className="p-2 rounded-xl bg-zinc-950/50 border border-zinc-800 flex items-center justify-between">
                            <div>
                              <p className="text-[11px] font-bold">{court.contactPerson.name}</p>
                              <p className="text-[10px] text-zinc-500">{court.contactPerson.workHours}</p>
                            </div>
                            <button onClick={() => setIsCallModalOpen(court.contactPerson)} className="px-2 py-1 rounded bg-emerald-500 text-black text-xs font-bold">
                              Bog'lanish
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: ZAL ADMINI */}
            {activeTab === 'admin_hall' && (
              <div className="space-y-4 animate-fadeIn">
                <div className={`p-5 rounded-3xl border ${cardBg} shadow-xl`}>
                  <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Zal Admin Paneli</span>
                  <h2 className="text-lg font-black mt-1">14-maktab sport zali (Vodil)</h2>
                  <p className="text-xs text-zinc-400">Mas'ul: Rahmonov Dilshod (+998 90 555-14-22)</p>
                </div>

                <div className={`rounded-2xl border ${cardBg} divide-y divide-zinc-800`}>
                  {games[0].participants.map(p => (
                    <div key={p.id} className="p-3.5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold">{p.name} ({p.phone})</p>
                        <p className="text-[11px] text-zinc-400">Holat: {p.status} • Usul: {p.method}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => {
                          setGames(prev => prev.map(g => g.id === games[0].id ? {
                            ...g, participants: g.participants.map(part => part.id === p.id ? { ...part, status: "To'langan" } : part)
                          } : g));
                          showToast("Qabul qilindi!");
                        }} className="px-2.5 py-1 rounded bg-emerald-500 text-black text-xs font-bold">
                          Qabul qilindi
                        </button>
                        <button onClick={() => {
                          setGames(prev => prev.map(g => g.id === games[0].id ? {
                            ...g, participants: g.participants.map(part => part.id === p.id ? { ...part, status: "To'lanmadi" } : part)
                          } : g));
                          showToast("To'lanmadi deb belgilandi!");
                        }} className="px-2.5 py-1 rounded bg-rose-600 text-white text-xs font-bold">
                          To'lanmadi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: BOSH ADMIN (HISOBOT BILAN) */}
            {activeTab === 'admin_super' && (
              <div className="space-y-6 animate-fadeIn">
                <div className={`p-5 rounded-3xl border ${cardBg} shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                        Bosh Admin Maxfiy Paneli
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        Parol: admin2010 (Faol)
                      </span>
                    </div>
                    <h2 className="text-xl font-black mt-1">Platforma Boshqaruvi va Tashriflar Hisoboti</h2>
                    <p className="text-xs text-zinc-400">Nechta odam kirgani va oqim statistikasi</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSuperAdminUnlocked(false);
                      setCurrentRole('user');
                      setActiveTab('home');
                      showToast("Bosh Admin paneli qulflandi!");
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Qulflash (Chiqish)
                  </button>
                </div>

                {/* HAQIQIY STATISTIKA VA TASHRIFLAR HISOBOTI */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-cyan-400" />
                        Odamlar kirishi va platforma tashriflari hisoboti
                      </h3>
                      <p className="text-[11px] text-zinc-400 mt-0.5">Faqat haqiqatda saytga kirgan va ro'yxatdan o'tgan foydalanuvchilar hisobi</p>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Jonli real-time
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className={`p-4 rounded-2xl border ${cardBg} space-y-1`}>
                      <span className="text-[11px] text-zinc-400 font-semibold block">Jami kirganlar soni:</span>
                      <p className="text-2xl font-black text-cyan-400">{analytics.totalVisitors.toLocaleString()}</p>
                      <span className="text-[10px] text-cyan-400 font-medium">Haqiqiy tashriflar</span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${cardBg} space-y-1`}>
                      <span className="text-[11px] text-zinc-400 font-semibold block">Bugungi tashriflar:</span>
                      <p className="text-2xl font-black text-emerald-400">{analytics.todayVisitors.toLocaleString()}</p>
                      <span className="text-[10px] text-emerald-400 font-medium">Bugun kirganlar</span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${cardBg} space-y-1`}>
                      <span className="text-[11px] text-zinc-400 font-semibold block">Ro'yxatdan o'tganlar:</span>
                      <p className="text-2xl font-black text-amber-400">{analytics.registeredUsers.toLocaleString()}</p>
                      <span className="text-[10px] text-amber-400 font-medium">Telefon bilan kirganlar</span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${cardBg} space-y-1`}>
                      <span className="text-[11px] text-zinc-400 font-semibold block">Obuna tushumi:</span>
                      <p className="text-2xl font-black text-emerald-400">{analytics.subscriptionRevenue ? analytics.subscriptionRevenue.toLocaleString() : "0"}</p>
                      <span className="text-[10px] text-zinc-500 font-medium">so'm (Haqiqiy)</span>
                    </div>
                  </div>

                  {/* Qishloq va shaharlar bo'yicha haqiqiy ulush */}
                  <div className={`p-4 rounded-2xl border ${cardBg} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wide text-zinc-400">
                        Hududlar bo'yicha haqiqiy kiruvchilar ulushi:
                      </h4>
                      <span className="text-[10px] text-zinc-400 font-medium">
                        Jami: {analytics.registeredUsers} nafar ro'yxatdan o'tgan
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {[
                        { name: "Farg'ona shahri", key: "Farg'ona", color: "bg-blue-500", text: "text-blue-400" },
                        { name: "Vodil qishlog'i", key: "Vodil", color: "bg-cyan-400", text: "text-cyan-400" },
                        { name: "Yoshlarobod hududi (55-maktab)", key: "Yoshlarobod", color: "bg-emerald-400", text: "text-emerald-400" },
                        { name: "Novkat qishlog'i", key: "Novkat", color: "bg-purple-400", text: "text-purple-400" }
                      ].map(area => {
                        const count = (analytics.villageStats && analytics.villageStats[area.key]) || 0;
                        const total = analytics.registeredUsers || 0;
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                          <div key={area.key}>
                            <div className="flex justify-between mb-1">
                              <span className="font-bold">{area.name}</span>
                              <span className={`${area.text} font-bold`}>{count} kishi ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                              <div className={`h-full ${area.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Loglar */}
                  <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
                    <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black uppercase text-zinc-400">Haqiqiy kirgan foydalanuvchilar oqimi</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Faqat telefon raqami va ismini kiritib kirgan haqiqiy odamlar</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Haqiqiy log ({analytics.recentLogs ? analytics.recentLogs.length : 0})
                        </span>
                        {analytics.recentLogs && analytics.recentLogs.length > 0 && (
                          <button
                            onClick={() => {
                              if (confirm("Haqiqatan ham barcha loglarni tozalamoqchimisiz?")) {
                                const emptyData = {
                                  totalVisitors: 0,
                                  todayVisitors: 0,
                                  registeredUsers: 0,
                                  subscriptionRevenue: 0,
                                  villageStats: { "Farg'ona": 0, "Vodil": 0, "Yoshlarobod": 0, "Novkat": 0 },
                                  recentLogs: []
                                };
                                setAnalytics(emptyData);
                                localStorage.setItem('fs_analytics', JSON.stringify(emptyData));
                                showToast("Statistika va loglar tozalandi!");
                              }
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 transition-all"
                            title="Loglarni tozalash"
                          >
                            Tozalash
                          </button>
                        )}
                      </div>
                    </div>

                    {(!analytics.recentLogs || analytics.recentLogs.length === 0) ? (
                      <div className="p-8 text-center text-zinc-500 space-y-2">
                        <div className="text-2xl">👥</div>
                        <p className="text-xs font-bold text-zinc-400">Hozircha yangi kirgan foydalanuvchilar yo'q</p>
                        <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                          Odamlar o'z ismi va telefon raqami bilan kirishlari bilanoq, ularning haqiqiy ma'lumotlari shu yerda paydo bo'ladi.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-zinc-800">
                        {analytics.recentLogs.map(log => (
                          <div key={log.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-zinc-900/30 transition-colors">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm">{log.name}</span>
                                <span className="font-mono text-emerald-400 font-bold text-xs">({log.phone})</span>
                              </div>
                              <p className="text-[11px] text-zinc-400">
                                📍 {log.village} • 📱 {log.device}
                              </p>
                            </div>
                            <div className="text-right space-y-1">
                              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                                {log.sport || "Voleybol"}
                              </span>
                              <p className="text-[10px] text-zinc-400">{log.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Obunalar */}
                <div className="space-y-3 pt-4 border-t border-zinc-800">
                  <h3 className="text-sm font-black">Maydon egalariga adminlik obunalarini sotish va boshqarish</h3>
                  <div className={`rounded-2xl border ${cardBg} divide-y divide-zinc-800`}>
                    {venues.map(v => (
                      <div key={v.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold">{v.name} ({v.village})</p>
                          <p className="text-[11px] text-zinc-400">Obuna: {v.subscription.status} • {v.subscription.daysLeft} kun qoldi</p>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => {
                            setVenues(prev => prev.map(ven => ven.id === v.id ? {
                              ...ven, subscription: { ...ven.subscription, daysLeft: ven.subscription.daysLeft + 30, status: 'active' }
                            } : ven));
                            showToast("+1 oy qo'shildi!");
                          }} className="px-2 py-1 rounded bg-zinc-800 text-xs font-bold">+1 oy (150k)</button>
                          <button onClick={() => {
                            setVenues(prev => prev.map(ven => ven.id === v.id ? {
                              ...ven, subscription: { ...ven.subscription, daysLeft: ven.subscription.daysLeft + 90, status: 'active' }
                            } : ven));
                            showToast("+3 oy qo'shildi!");
                          }} className="px-2 py-1 rounded bg-zinc-800 text-cyan-400 text-xs font-bold">+3 oy (400k)</button>
                          <button onClick={() => {
                            setVenues(prev => prev.map(ven => ven.id === v.id ? {
                              ...ven, subscription: { ...ven.subscription, daysLeft: ven.subscription.daysLeft + 180, status: 'active' }
                            } : ven));
                            showToast("+6 oy qo'shildi!");
                          }} className="px-2 py-1 rounded bg-emerald-500 text-black text-xs font-bold">+6 oy (700k)</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MENING BANK KARTAM (ADMIN TO'LOVLARI TUSHADIGAN KARTA) */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${cardBg} space-y-3.5 shadow-lg`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wide text-cyan-400 flex items-center gap-2">
                        <span>💳 Mening bank kartam (Admin to'lovlari tushadigan karta)</span>
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Foydalanuvchilar o'yin ochish huquqi (Admin litsenziyasi) uchun to'lov qilganda ushbu kartaga pul tushadi
                      </p>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      To'lov qabul qilish faol
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={ownerCardInput}
                      onChange={(e) => setOwnerCardInput(e.target.value)}
                      placeholder="8600 1234 5678 9012"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 font-mono text-sm text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setOwnerCard(ownerCardInput);
                        localStorage.setItem('fs_owner_card', ownerCardInput);
                        showToast("✅ Bank karta raqamingiz muvaffaqiyatli saqlandi!");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs shadow-md transition-all shrink-0"
                    >
                      Kartani saqlash
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-zinc-500">Ilovada ko'rinadigan faol karta: </span>
                      <span className="font-mono font-black text-emerald-400">{ownerCard}</span>
                      {ownerCard.includes('*') && (
                        <span className="text-amber-400 text-[11px] block mt-0.5">
                          ⚠️ (Karta raqami admin tomonidan tez orada kiritiladi)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setIsAdmin(!isAdmin);
                        localStorage.setItem('fs_is_admin', (!isAdmin).toString());
                        showToast(isAdmin ? "Admin huquqi o'chirildi" : "Admin huquqi yoqildi!");
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${isAdmin ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}
                    >
                      {isAdmin ? "Admin huquqini sinov uchun o'chirish" : "O'zimga Admin huquqini berish"}
                    </button>
                  </div>
                </div>

                {/* TELEGRAM BOT VA SMS SHLYUZ (ESKIZ.UZ) SOZLAMALARI */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${cardBg} space-y-3.5 shadow-lg`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wide text-cyan-400 flex items-center gap-2">
                        <span>🤖 Telegram Bot va 📩 SMS Shlyuz (Eskiz.uz) sozlamalari</span>
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Foydalanuvchilarga tasdiqlash kodlarini avtomatik Telegram Bot yoki haqiqiy SMS orqali yuborish
                      </p>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      Avtomatlashtirish
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Telegram Bot Username */}
                    <div className="space-y-1">
                      <label className="text-zinc-400 font-bold block">1. Telegram Bot Username (masalan: @ValleyAuth_bot):</label>
                      <input
                        type="text"
                        value={telegramBotUsername}
                        onChange={(e) => setTelegramBotUsername(e.target.value)}
                        placeholder="@ValleyAuth_bot"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 font-mono text-xs text-cyan-400 font-bold focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Telegram Bot Token */}
                    <div className="space-y-1">
                      <label className="text-zinc-400 font-bold block">2. Telegram Bot Token (@BotFather bergan API token):</label>
                      <input
                        type="password"
                        value={telegramBotToken}
                        onChange={(e) => setTelegramBotToken(e.target.value)}
                        placeholder="1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 font-mono text-xs text-zinc-300 font-bold focus:outline-none focus:border-cyan-500"
                      />
                      <p className="text-[10px] text-zinc-500">
                        💡 Telegramda @BotFather ga kiring, /newbot deb yozing va berilgan tokenni shu yerga qo'ying.
                      </p>
                    </div>

                    {/* Eskiz.uz SMS Token */}
                    <div className="space-y-1">
                      <label className="text-zinc-400 font-bold block">3. Eskiz.uz SMS Token (O'zbekiston raqamlariga haqiqiy SMS uchun):</label>
                      <input
                        type="password"
                        value={eskizToken}
                        onChange={(e) => setEskizToken(e.target.value)}
                        placeholder="Eskiz.uz API bearer token..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 font-mono text-xs text-zinc-300 font-bold focus:outline-none focus:border-emerald-500"
                      />
                      <p className="text-[10px] text-zinc-500">
                        💡 Eskiz.uz saytidan ro'yxatdan o'tib, token kiritilsa — foydalanuvchilar telefoniga to'g'ridan-to'g'ri SMS boradi.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem('fs_tg_bot_username', telegramBotUsername);
                        localStorage.setItem('fs_tg_bot_token', telegramBotToken);
                        localStorage.setItem('fs_eskiz_token', eskizToken);
                        showToast("✅ Telegram Bot va SMS sozlamalari saqlandi!");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs shadow-md transition-all"
                    >
                      Bot va SMS sozlamalarini saqlash
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </>
      )}

      {/* MUTLAQ ANONIM BOSH ADMIN PAROL MODALI (admin2010) */}
      {isSuperAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-2xl text-center text-zinc-100">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black">Bosh Admin Xavfsiz Kirish</h3>
              <p className="text-xs text-zinc-400 mt-1">Hisobotlar va nazorat faqat maxsus parol bilan ochiladi</p>
            </div>

            <form onSubmit={handleSuperAdminLogin} className="space-y-3">
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => { setAdminPasswordInput(e.target.value); setAdminPasswordError(false); }}
                placeholder="Maxfiy parolni kiriting..."
                required
                autoFocus
                className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950 border ${adminPasswordError ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-zinc-800'} text-center font-mono text-sm tracking-widest text-zinc-100 focus:outline-none`}
              />
              {adminPasswordError && (
                <p className="text-[11px] text-rose-400 font-bold">Xato parol! Qayta urinib ko'ring.</p>
              )}
              <div className="flex gap-2">
                <button type="button" onClick={() => { setIsSuperAdminModalOpen(false); setAdminPasswordInput(''); setAdminPasswordError(false); }} className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold">
                  Bekor qilish
                </button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-black shadow-lg">
                  Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* YON PROFIL DRAWER */}
      {isProfileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-sm h-full ${isDark ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'} border-l border-zinc-800 p-5 space-y-5 overflow-y-auto animate-slideLeft`}>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="font-black text-base flex items-center gap-1.5">
                <User className="w-5 h-5 text-emerald-400" /> Profil
              </h3>
              <button onClick={() => setIsProfileSidebarOpen(false)} className="text-zinc-400">✕</button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950/40 border border-zinc-800">
              <img src={userProfile.avatar} alt="User" className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400" />
              <div>
                <h4 className="font-black text-sm">{userProfile.name}</h4>
                <p className="text-xs text-zinc-400 flex items-center gap-1">
                  <span>{userProfile.phone}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="Raqam tasdiqlangan" />
                </p>
                <p className="text-xs text-emerald-400 font-bold">{userProfile.age} yosh • {userProfile.village}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-3">
              <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Bell className="w-4 h-4" /> Avtomatik Eslatmalar
              </p>
              <div className="flex items-center justify-between text-xs">
                <span>2 soat oldin eslatish:</span>
                <button
                  onClick={() => {
                    setUserProfile(p => {
                      const u = { ...p, reminder2Hours: !p.reminder2Hours };
                      localStorage.setItem('fs_current_user', JSON.stringify(u));
                      return u;
                    });
                    showToast("Eslatma yangilandi");
                  }}
                  className={`w-10 h-5 rounded-full relative p-0.5 ${userProfile.reminder2Hours ? 'bg-emerald-500' : 'bg-zinc-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform ${userProfile.reminder2Hours ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>30 daqiqa oldin eslatish:</span>
                <button
                  onClick={() => {
                    setUserProfile(p => {
                      const u = { ...p, reminder30Min: !p.reminder30Min };
                      localStorage.setItem('fs_current_user', JSON.stringify(u));
                      return u;
                    });
                    showToast("Eslatma yangilandi");
                  }}
                  className={`w-10 h-5 rounded-full relative p-0.5 ${userProfile.reminder30Min ? 'bg-emerald-500' : 'bg-zinc-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform ${userProfile.reminder30Min ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            <button onClick={() => { setAppStep(1); setIsProfileSidebarOpen(false); }} className="w-full py-2.5 rounded-xl bg-zinc-800 text-xs font-bold">
              Raqamni qayta tasdiqlash (Kirish)
            </button>
          </div>
        </div>
      )}

      {/* O'YIN TAFSILOTLARI MODALI */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-zinc-900 border border-zinc-800 p-5 space-y-4 shadow-2xl text-zinc-100">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  {selectedGame.sport} • {selectedGame.village}
                </span>
                <h3 className="text-base font-black mt-1">{selectedGame.title}</h3>
                <p className="text-xs text-zinc-400">{selectedGame.venueName}</p>
              </div>
              <button onClick={() => setSelectedGame(null)} className="p-1 text-zinc-400">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-950 text-xs">
              <div>
                <span className="text-zinc-500 block">Vaqt:</span>
                <span className="font-bold">{selectedGame.date}</span>
                <span className="block text-zinc-400">{selectedGame.time}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 block">Zal narxi:</span>
                <span className="font-black text-emerald-400 text-sm">
                  {selectedGame.isFree ? "BEPUL" : `${selectedGame.totalPrice.toLocaleString()} so'm`}
                </span>
              </div>
            </div>

            {!selectedGame.isFree && (
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-zinc-200 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" /> Taqsimlash kalkulyatori
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-400">O'yinchilar soni:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => setCustomSplitPlayerCount(Math.max(4, customSplitPlayerCount - 1))} className="w-6 h-6 rounded bg-zinc-800 font-bold">-</button>
                      <span className="font-bold">{customSplitPlayerCount}</span>
                      <button onClick={() => setCustomSplitPlayerCount(Math.min(selectedGame.maxPlayers, customSplitPlayerCount + 1))} className="w-6 h-6 rounded bg-zinc-800 font-bold">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-400">Har bir kishiga:</span>
                    <p className="text-base font-black text-emerald-400">
                      {Math.round(selectedGame.totalPrice / customSplitPlayerCount).toLocaleString()} so'm
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold">Qatnashchilar ({selectedGame.participants.length}/{selectedGame.maxPlayers}):</span>
                <span className="text-zinc-400">{selectedGame.maxPlayers - selectedGame.participants.length} bo'sh joy</span>
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1.5 divide-y divide-zinc-800/60">
                {selectedGame.participants.map((p, idx) => (
                  <div key={p.id} className="pt-1.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500">{idx + 1}.</span>
                      <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full object-cover" />
                      <span>{p.name}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.status === "To'langan" ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {p.status} ({p.method})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setIsJoinModalOpen(true)} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold text-xs shadow-lg">
              O'yinga qo'shilish va to'lash
            </button>
          </div>
        </div>
      )}

      {/* TO'LOV USULI MODALI */}
      {isJoinModalOpen && selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-zinc-800 p-5 space-y-4 shadow-2xl text-zinc-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">To'lov usulini tanlang</h3>
              <button onClick={() => setIsJoinModalOpen(false)}>✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <button onClick={() => setJoinPaymentMethod('Payme')} className={`w-full p-2.5 rounded-xl border flex items-center justify-between ${joinPaymentMethod === 'Payme' ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200' : 'bg-zinc-950 border-zinc-800'}`}>
                <span>Payme orqali to'lash</span>
                {joinPaymentMethod === 'Payme' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </button>
              <button onClick={() => setJoinPaymentMethod('Click')} className={`w-full p-2.5 rounded-xl border flex items-center justify-between ${joinPaymentMethod === 'Click' ? 'bg-blue-950/60 border-blue-400 text-blue-200' : 'bg-zinc-950 border-zinc-800'}`}>
                <span>Click Up orqali to'lash</span>
                {joinPaymentMethod === 'Click' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
              </button>
              <button onClick={() => setJoinPaymentMethod('Naqd')} className={`w-full p-2.5 rounded-xl border flex items-center justify-between ${joinPaymentMethod === 'Naqd' ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200' : 'bg-zinc-950 border-zinc-800'}`}>
                <span>Naqd pul (Zal adminiga joyida)</span>
                {joinPaymentMethod === 'Naqd' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>

            <button onClick={handleJoinGame} className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs shadow">
              {joinPaymentMethod === 'Naqd' ? "Joyni band qilish (Naqd)" : `${joinPaymentMethod} orqali tasdiqlash`}
            </button>
          </div>
        </div>
      )}

      {/* QO'NG'IROQ MODALI */}
      {isCallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-zinc-800 p-6 space-y-3 text-center text-zinc-100">
            <img src={isCallModalOpen.avatar} alt="avatar" className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-emerald-400" />
            <h3 className="text-sm font-black">{isCallModalOpen.name}</h3>
            <p className="text-xs text-zinc-400">{isCallModalOpen.role}</p>
            <p className="text-sm font-bold text-emerald-400 font-mono">{isCallModalOpen.phone}</p>
            <p className="text-[10px] text-zinc-500">Ish vaqti: {isCallModalOpen.workHours}</p>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setIsCallModalOpen(null)} className="flex-1 py-2 rounded-xl bg-zinc-800 text-xs font-bold">Yopish</button>
              <a href={`tel:${isCallModalOpen.phone}`} onClick={() => setIsCallModalOpen(null)} className="flex-1 py-2 rounded-xl bg-emerald-500 text-black text-xs font-extrabold flex items-center justify-center gap-1 shadow">
                <Phone className="w-3.5 h-3.5" /> Qo'ng'iroq
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ODDİY FOYDALANUVCHILAR UCHUN CHEKLOV VA ADMIN HUQUQINI SOTIB OLISH MODALI */}
      {isAdminPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-2xl text-zinc-100">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                  🔒
                </span>
                <div>
                  <h3 className="text-sm font-black text-white">O'yin ochish cheklangan!</h3>
                  <p className="text-[11px] text-zinc-400">Faqat rasmiy Adminlar uchun ruxsat etilgan</p>
                </div>
              </div>
              <button onClick={() => setIsAdminPaymentModalOpen(false)} className="text-zinc-400 hover:text-white p-1">✕</button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <p className="font-bold">⚠️ Hurmatli foydalanuvchi!</p>
              <p className="text-[11px] leading-relaxed text-amber-200/90">
                Platformamizda xavfsizlik va tartibni saqlash maqsadida oddiy foydalanuvchilarga o'yin e'lon qilish cheklangan. 
                O'yin tashkil qilish huquqi faqat <b>tasdiqlangan Adminlar uchun cheklanmagan</b>.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-zinc-400">Admin bo'lish va cheksiz o'yin ochish:</h4>
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Tashkilotchi admin to'lovi:</span>
                  <span className="font-black text-emerald-400 text-sm">50 000 so'm / oy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Imtiyoz:</span>
                  <span className="font-bold text-white">Cheksiz o'yinlar tashkil qilish</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 space-y-1">
                  <span className="text-[11px] text-zinc-400 block">To'lov tushadigan admin kartasi:</span>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 font-mono font-bold text-emerald-400">
                    <span className="tracking-wider">{ownerCard}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(ownerCard.replace(/\s/g, ''));
                        showToast("Karta raqami nusxalandi!");
                      }}
                      className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-300 font-sans"
                    >
                      Nusxa olish
                    </button>
                  </div>
                  {ownerCard.includes('*') && (
                    <p className="text-[10px] text-amber-400 pt-0.5">
                      (Karta raqami admin tomonidan tez orada kiritiladi. Aloqa: +998 90 555-14-22)
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-[11px] text-zinc-400 text-center">
                Admin kartasiga 50 000 so'm to'lov qilib, quyidagi tugmani bosing:
              </p>
              <button
                onClick={() => {
                  setIsAdmin(true);
                  localStorage.setItem('fs_is_admin', 'true');
                  setIsAdminPaymentModalOpen(false);
                  setIsCreateGameOpen(true);
                  showToast("🎉 Tabriklaymiz! Sizga cheksiz o'yin ochish Admin huquqi berildi!");
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <span>✅ To'lov qildim, Admin huquqini faollashtirish</span>
              </button>
              <button
                onClick={() => setIsAdminPaymentModalOpen(false)}
                className="w-full py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YANGI O'YIN TASHKIL QILISH (ADMINLAR UCHUN CHEKLANMAGAN) */}
      {isCreateGameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 space-y-4 shadow-2xl text-zinc-100">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                  🛡️
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-white">Yangi O'yin Ochish</h3>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      Admin Huquqi
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">Farg'ona, Vodil, Yoshlarobod, Novkat sport majmualarida</p>
                </div>
              </div>
              <button onClick={() => setIsCreateGameOpen(false)} className="text-zinc-400 hover:text-white p-1">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const chosenVenue = venues.find(v => v.id === newGameVenueId) || venues[0];
                const finalTitle = newGameTitleInput || `${chosenVenue.village} ${newGameSport} Do'stona O'yini`;
                const newG = {
                  id: 'g_' + Date.now(),
                  title: finalTitle,
                  sport: newGameSport,
                  venueId: chosenVenue.id,
                  venueName: chosenVenue.name,
                  village: chosenVenue.village,
                  lat: chosenVenue.lat,
                  lng: chosenVenue.lng,
                  date: newGameDateInput || "Bugun",
                  time: newGameTimeInput || "20:00 - 21:30",
                  isFree: newGameIsFree,
                  totalPrice: newGameIsFree ? 0 : Number(newGameTotalPrice),
                  maxPlayers: Number(newGameMaxPlayers),
                  level: "Barcha darajalar",
                  creator: `${userProfile.name} (Admin)`,
                  participants: [
                    {
                      id: 'p_creator_' + Date.now(),
                      name: userProfile.name,
                      phone: userProfile.phone,
                      status: "To'langan",
                      method: newGameIsFree ? "Bepul" : "Admin",
                      avatar: userProfile.avatar
                    }
                  ]
                };

                setGames(prev => [newG, ...prev]);
                setIsCreateGameOpen(false);
                showToast(`🎉 "${newG.title}" o'yini e'lon qilindi!`);
              }}
              className="space-y-4 text-xs"
            >
              {/* O'yin nomi */}
              <div>
                <label className="text-zinc-300 font-bold block mb-1">O'yin nomi / Sarlavha:</label>
                <input
                  type="text"
                  value={newGameTitleInput}
                  onChange={(e) => setNewGameTitleInput(e.target.value)}
                  placeholder="Masalan: Farg'ona Olimpiya Zali Voleybol Oqshomi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Sport turi va Hudud */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-bold block mb-1">Sport turi:</label>
                  <select
                    value={newGameSport}
                    onChange={(e) => {
                      const s = e.target.value;
                      setNewGameSport(s);
                      const matching = venues.find(v => (v.sport === s || v.category.includes(s)) && v.village === newGameVillage);
                      if (matching) {
                        setNewGameVenueId(matching.id);
                        setNewGameTotalPrice(matching.pricePerHour);
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-bold"
                  >
                    <option value="Voleybol">🏐 Voleybol</option>
                    <option value="Futbol">⚽ Futbol</option>
                    <option value="Basketbol">🏀 Basketbol</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 font-bold block mb-1">Hudud (Qishloq/Shahar):</label>
                  <select
                    value={newGameVillage}
                    onChange={(e) => {
                      const vil = e.target.value;
                      setNewGameVillage(vil);
                      const matching = venues.find(v => (v.sport === newGameSport || v.category.includes(newGameSport)) && v.village === vil) || venues.find(v => v.village === vil);
                      if (matching) {
                        setNewGameVenueId(matching.id);
                        setNewGameTotalPrice(matching.pricePerHour);
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-bold"
                  >
                    <option value="Farg'ona">🏢 Farg'ona shahri</option>
                    <option value="Vodil">🌲 Vodil</option>
                    <option value="Yoshlarobod">🏡 Yoshlarobod</option>
                    <option value="Novkat">🌾 Novkat</option>
                  </select>
                </div>
              </div>

              {/* Haqiqiy sport zali yoki maydonni tanlash */}
              <div>
                <label className="text-zinc-300 font-bold block mb-1">Sport zali yoki maydon (Google Maps ro'yxati):</label>
                <select
                  value={newGameVenueId}
                  onChange={(e) => {
                    const vid = e.target.value;
                    setNewGameVenueId(vid);
                    const ven = venues.find(v => v.id === vid);
                    if (ven) {
                      setNewGameTotalPrice(ven.pricePerHour);
                      setNewGameVillage(ven.village);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 font-bold"
                >
                  {venues
                    .filter(v => (v.village === newGameVillage || newGameVillage === 'Barchasi'))
                    .map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.village} - {v.pricePerHour.toLocaleString()} so'm/s)
                      </option>
                    ))}
                </select>
              </div>

              {/* Bepul yoki Pulli tanlovi */}
              <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <label className="text-zinc-300 font-bold block">O'yin to'lov formati:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewGameIsFree(false)}
                    className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      !newGameIsFree ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30' : 'border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span>💳 Pulli (Ijara taqsimlash)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGameIsFree(true)}
                    className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      newGameIsFree ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30' : 'border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span>🆓 Bepul o'yin</span>
                  </button>
                </div>

                {!newGameIsFree && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/80">
                    <div>
                      <label className="text-[11px] text-zinc-400 font-semibold block mb-1">Zal ijara narxi (so'm):</label>
                      <input
                        type="number"
                        value={newGameTotalPrice}
                        onChange={(e) => setNewGameTotalPrice(Number(e.target.value))}
                        step="10000"
                        min="0"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 font-semibold block mb-1">O'yinchilar soni:</label>
                      <input
                        type="number"
                        value={newGameMaxPlayers}
                        onChange={(e) => setNewGameMaxPlayers(Number(e.target.value))}
                        min="2"
                        max="30"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold"
                      />
                    </div>
                    <div className="col-span-2 p-2 rounded-xl bg-zinc-900/60 flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Kishi boshiga taqsimlangan narx:</span>
                      <span className="font-black text-emerald-400 text-sm">
                        {newGameMaxPlayers > 0 ? Math.round(newGameTotalPrice / newGameMaxPlayers).toLocaleString() : 0} so'm / odam
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Vaqt va Sana */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-bold block mb-1">Sana:</label>
                  <input
                    type="text"
                    value={newGameDateInput}
                    onChange={(e) => setNewGameDateInput(e.target.value)}
                    placeholder="Bugun"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-bold block mb-1">Vaqt oralig'i:</label>
                  <input
                    type="text"
                    value={newGameTimeInput}
                    onChange={(e) => setNewGameTimeInput(e.target.value)}
                    placeholder="20:00 - 21:30"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateGameOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-zinc-800 text-zinc-300 font-bold text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-black text-xs shadow-lg transition-all"
                >
                  O'yinni e'lon qilish ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
