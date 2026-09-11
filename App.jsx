import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin, Calendar, Clock, Users, User, Phone, Bell, Shield,
  CreditCard, CheckCircle2, XCircle, AlertCircle, Plus, Search,
  Filter, ChevronRight, Camera, Check, Sliders, Settings,
  Eye, RefreshCw, Award, ArrowUpRight, Zap, Sparkles, Building2,
  Sun, Moon, Compass, Navigation, Layers, ChevronDown, Trophy,
  Activity, Share2, Map as MapIcon, Crosshair, ArrowRight, Lock,
  Unlock, LogOut, BarChart3, TrendingUp, Smartphone, Laptop
} from 'lucide-react';

// ============================================================================
// BOSHLANG'ICH MA'LUMOTLAR
// ============================================================================

const INITIAL_VENUES = [
  {
    id: 'v1',
    name: "14-sonli umumta'lim maktabi sport zali",
    type: 'school_gym',
    category: 'Voleybol / Basketbol',
    sport: 'Voleybol',
    village: 'Vodil',
    address: "Vodil qishlog'i, Mustaqillik ko'chasi 45-uy",
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
    address: "Vodil soya bo'yi, Dam olish xiyoboni yonida",
    pricePerHour: 160000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80',
    facilities: ["50mm sun'iy chim", "Projektorli tungi yoritish", "Kiyinish xonasi", "Muzdek ichimliklar", "Avtoturargoh"],
    contactPerson: {
      name: "Qodirov Rustam aka",
      role: "Maydon boshlig'i va asoschisi",
      phone: "+998 91 670-88-99",
      workHours: "07:00 - 01:00 (Haftaning 7 kuni)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 42, y: 80 },
    subscription: { plan: '3 oylik', status: 'expiring_soon', daysLeft: 5, expiresAt: '2026-03-20' }
  },
  {
    id: 'v3',
    name: "Yoshlarobod Yoshlar Sport Majmuasi",
    type: 'football_pitch',
    category: 'Futbol / Voleybol',
    sport: 'Futbol',
    village: 'Yoshlarobod',
    address: "Yoshlarobod MFY, Markaziy shoh ko'cha",
    pricePerHour: 120000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
    facilities: ["Yopiq futbol maydoni", "Mini voleybol zonasi", "Avtoturargoh", "Dush va sauna"],
    contactPerson: {
      name: "Mirzayev Farhod",
      role: "Majmua boshqaruvchisi",
      phone: "+998 93 972-30-10",
      workHours: "08:00 - 23:00",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 26, y: 34 },
    subscription: { plan: '1 oylik', status: 'expired', daysLeft: 0, expiresAt: '2026-03-01' }
  },
  {
    id: 'v4',
    name: "8-sonli umumta'lim maktabi zali",
    type: 'school_gym',
    category: 'Voleybol / Basketbol',
    sport: 'Voleybol',
    village: 'Yoshlarobod',
    address: "Yoshlarobod, O'qituvchilar ko'chasi 12",
    pricePerHour: 80000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    facilities: ["Voleybol to'ri", "Basketbol shitlari", "Issiq dush", "Yoritish"],
    contactPerson: {
      name: "Tursunov Akbar",
      role: "Jismoniy tarbiya rahbari",
      phone: "+998 90 300-85-41",
      workHours: "18:00 - 22:00",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    coords: { x: 20, y: 44 },
    subscription: { plan: '3 oylik', status: 'active', daysLeft: 48, expiresAt: '2026-05-02' }
  },
  {
    id: 'v5',
    name: "Novkat Markaziy Sport Zali",
    type: 'basketball_court',
    category: 'Voleybol / Basketbol',
    sport: 'Basketbol',
    village: 'Novkat',
    address: "Novkat qishloq fuqarolar yig'ini, 19-maktab binosi",
    pricePerHour: 90000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    facilities: ["Keng zal 24x12m", "Tribunalar", "Voleybol jihozlari", "Dush"],
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
    address: "Novkat bog'dorchilik hududi, Katta Farg'ona kanali bo'yi",
    pricePerHour: 140000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
    facilities: ["Yangi zamonaviy chim", "Kuchli yoritish", "Kiyinish xonasi", "Choyxona"],
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
      { id: 'p5', name: "Dilmurod Ismoilov", phone: "+998 94 221-33-44", status: "To'langan", method: "Payme", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80" },
      { id: 'p6', name: "Bobur Zokirov", phone: "+998 90 654-32-10", status: "To'langan", method: "Click", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80" },
      { id: 'p7', name: "Sherzod Aliyev", phone: "+998 91 998-77-66", status: "Naqd", method: "Naqd", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80" },
      { id: 'p8', name: "Eldor Qosimov", phone: "+998 93 112-23-34", status: "Kutilmoqda", method: "Kutilmoqda", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  {
    id: 'g3',
    title: "Yoshlarobod ochiq bepul voleybol mashg'uloti",
    sport: 'Voleybol',
    venueId: 'v4',
    venueName: "8-sonli maktab sport zali",
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
      { id: 'p21', name: "Anvar Jo'rayev", phone: "+998 91 555-43-21", status: "To'langan", method: "Bepul", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80" },
      { id: 'p22', name: "Davron Salimov", phone: "+998 93 777-88-99", status: "To'langan", method: "Bepul", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80" },
      { id: 'p23', name: "Mirjalol Shokirov", phone: "+998 90 444-12-34", status: "To'langan", method: "Bepul", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" }
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
      { id: 'p11', name: "Ulug'bek Tohirov", phone: "+998 91 223-34-45", status: "To'langan", method: "Payme", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80" },
      { id: 'p12', name: "Nodirbek Sobirov", phone: "+998 94 667-89-01", status: "Naqd", method: "Naqd", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" }
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
      { id: 'p30', name: "Xoliqov Bahodir", phone: "+998 91 114-63-52", status: "To'langan", method: "Naqd", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80" },
      { id: 'p31', name: "Kamron Rustamov", phone: "+998 90 222-33-44", status: "To'langan", method: "Click", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
      { id: 'p32', name: "Shoxrux Bekmurodov", phone: "+998 93 888-99-00", status: "Kutilmoqda", method: "Naqd", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80" }
    ]
  }
];

export default function App() {
  // THEME: 'dark' | 'light'
  const [theme, setTheme] = useState(() => localStorage.getItem('fs_theme') || 'dark');

  // BOSQICHLAR (STEPS): 1: Kirish (Ism, Nomer), 2: Joylashuv, 3: Asosiy Ilova
  const [appStep, setAppStep] = useState(() => {
    return localStorage.getItem('fs_user_logged_in') ? 3 : 1;
  });

  // Profil Drawer
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

  // 3D Harita Rejimi
  const [is3DMapMode, setIs3DMapMode] = useState(true);
  const [mapRotation, setMapRotation] = useState({ x: 50, z: -20 });

  // Navigation & Role State
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'admin_hall', 'admin_super'
  const [currentRole, setCurrentRole] = useState('user');

  // BOSH ADMIN ANONIM XAVFSIZLIK HOLATLARI
  const [isSuperAdminUnlocked, setIsSuperAdminUnlocked] = useState(false);
  const [isSuperAdminModalOpen, setIsSuperAdminModalOpen] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState(false);

  // TASHRIFLAR VA FOYDALANUVCHILAR HISOBOTI STATISTIKASI (Super Admin uchun)
  const [analytics, setAnalytics] = useState(() => {
    const saved = localStorage.getItem('fs_analytics');
    if (saved) {
      try { return JSON.parse(saved); } catch(e){}
    }
    return {
      totalVisitors: 1284,
      todayVisitors: 142,
      registeredUsers: 386,
      villageStats: { Vodil: 668, Yoshlarobod: 360, Novkat: 256 },
      recentLogs: [
        { id: 'l1', name: "Azizbek Fayziyev", phone: "+998 90 123-45-67", village: "Vodil", device: "Mobil", time: "Hozirgina", sport: "Voleybol" },
        { id: 'l2', name: "Jasur Komilov", phone: "+998 91 334-11-22", village: "Yoshlarobod", device: "Mobil", time: "12 daqiqa oldin", sport: "Voleybol" },
        { id: 'l3', name: "Rustam Qodirov", phone: "+998 91 670-88-99", village: "Vodil", device: "Desktop", time: "34 daqiqa oldin", sport: "Futbol" },
        { id: 'l4', name: "Kamron Rustamov", phone: "+998 90 222-33-44", village: "Novkat", device: "Mobil", time: "1 soat oldin", sport: "Basketbol" },
        { id: 'l5', name: "Otabek G'aniyev", phone: "+998 90 887-65-43", village: "Vodil", device: "Mobil", time: "2 soat oldin", sport: "Voleybol" }
      ]
    };
  });

  // Filterlar
  const [selectedSport, setSelectedSport] = useState('Voleybol');
  const [selectedVillage, setSelectedVillage] = useState('Barchasi');

  // Asosiy kolleksiyalar
  const [venues, setVenues] = useState(INITIAL_VENUES);
  const [games, setGames] = useState(INITIAL_GAMES);

  // Modallar
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(null);

  // Split payment calculator
  const [customSplitPlayerCount, setCustomSplitPlayerCount] = useState(10);
  const [joinPaymentMethod, setJoinPaymentMethod] = useState('Payme');

  // Foydalanuvchi profili
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('fs_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch(e){}
    }
    return {
      name: "Azizbek Fayziyev",
      age: "23",
      phone: "+998 90 123-45-67",
      primarySport: "Voleybol",
      skillLevel: "O'rta daraja",
      userCoords: { x: 48, y: 70 },
      village: "Vodil",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80",
      reminder2Hours: true,
      reminder30Min: true,
      gameHistory: [
        { id: 'h1', title: "Vodil 14-maktab Voleybol", date: "10-Sentabr, 19:30", status: "Qatnashdi" },
        { id: 'h2', title: "Yoshlarobod Futbol Turniri", date: "07-Sentabr, 20:00", status: "Qatnashdi" },
        { id: 'h3', title: "Novkat Markaziy Voleybol", date: "03-Sentabr, 18:00", status: "Bekor qilingan" }
      ]
    };
  });

  // Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => { setToastMessage(null); }, 3500);
  };

  // Har bir yangi sessiya kirishini sanash
  useEffect(() => {
    localStorage.setItem('fs_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Bosh Admin uchun yangi tashrif qayd etish
  const trackNewVisitor = (userObj) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const updated = {
      ...analytics,
      totalVisitors: analytics.totalVisitors + 1,
      todayVisitors: analytics.todayVisitors + 1,
      registeredUsers: analytics.registeredUsers + 1,
      villageStats: {
        ...analytics.villageStats,
        [userObj.village]: (analytics.villageStats[userObj.village] || 0) + 1
      },
      recentLogs: [
        {
          id: 'log_' + Date.now(),
          name: userObj.name,
          phone: userObj.phone,
          village: userObj.village,
          device: isMobile ? "Mobil" : "Desktop",
          time: "Hozirgina",
          sport: userObj.primarySport || "Voleybol"
        },
        ...analytics.recentLogs.slice(0, 7)
      ]
    };
    setAnalytics(updated);
    localStorage.setItem('fs_analytics', JSON.stringify(updated));
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

  // Bosh admin sessiyasini yopish (Qulflash)
  const handleLockSuperAdmin = () => {
    setIsSuperAdminUnlocked(false);
    setCurrentRole('user');
    setActiveTab('home');
    showToast("Bosh Admin paneli qulflandi!");
  };

  // Avatar yuklash
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

  // Sport bo'yicha saralash
  const currentSportGames = useMemo(() => {
    return games.filter(g => {
      const matchSport = selectedSport === 'Barchasi' || g.sport === selectedSport;
      const matchVillage = selectedVillage === 'Barchasi' || g.village === selectedVillage;
      return matchSport && matchVillage;
    });
  }, [games, selectedSport, selectedVillage]);

  // Maydon turlari
  const schoolGyms = useMemo(() => venues.filter(v => v.type === 'school_gym'), [venues]);
  const footballPitches = useMemo(() => venues.filter(v => v.type === 'football_pitch'), [venues]);
  const basketballCourts = useMemo(() => venues.filter(v => v.type === 'basketball_court' || v.category.includes('Basketbol')), [venues]);

  // O'yinga a'zo bo'lish
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

  // Zal admini status
  const handleTogglePaymentStatus = (gameId, participantId, newStatus) => {
    setGames(prev => prev.map(g => {
      if (g.id !== gameId) return g;
      return {
        ...g,
        participants: g.participants.map(p => p.id === participantId ? { ...p, status: newStatus } : p)
      };
    }));
    showToast(`To'lov holati: ${newStatus}`);
  };

  // Bosh admin obuna yangilash
  const handleRenewSubscription = (venueId, months) => {
    const prices = { 1: '150,000', 3: '400,000', 6: '700,000' };
    setVenues(prev => prev.map(v => {
      if (v.id !== venueId) return v;
      return {
        ...v,
        subscription: {
          plan: `${months} oylik`,
          status: 'active',
          daysLeft: months * 30,
          expiresAt: '2026-10-15'
        }
      };
    }));
    showToast(`${months} oylik obuna faollashtirildi (${prices[months]} so'm)!`);
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
      {/* BOSQICHLAR HEADER (BOSQICHLI ILOVA, THEME, BOSH ADMIN ANONIM QULFI)        */}
      {/* ========================================================================= */}
      <div className={`w-full py-2 px-4 border-b ${isDark ? 'bg-zinc-950/90 border-zinc-800/80 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'} text-xs font-semibold`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-emerald-500 font-extrabold hidden sm:inline">
              Ilova Bosqichlari:
            </span>
            <div className="flex items-center gap-1">
              {[
                { step: 1, label: "1. Kirish" },
                { step: 2, label: "2. Xaritada joy" },
                { step: 3, label: "3. Sport Ilovasi" }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setAppStep(s.step)}
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
            {/* MUTLAQ ANONIM BOSH ADMIN QULFI TUGMASI (Parol: admin2010) */}
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
              className={`p-1.5 px-2.5 rounded-xl border flex items-center gap-1 text-xs font-extrabold transition-all ${
                isSuperAdminUnlocked
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-md'
                  : 'bg-zinc-900/90 border-zinc-700 text-zinc-400 hover:text-cyan-400'
              }`}
              title="Anonim Bosh Admin Kirish (Parol: admin2010)"
            >
              {isSuperAdminUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Bosh Admin</span>
            </button>

            {/* DARK / LIGHT THEME TOGGLE */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-1.5 rounded-xl border flex items-center gap-1 text-xs font-bold ${
                isDark ? 'bg-zinc-900 border-zinc-700 text-amber-300' : 'bg-white border-zinc-300 text-zinc-700'
              }`}
              title="Dark / Light rejim"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* PROFIL TUGMASI */}
            <button
              onClick={() => setIsProfileSidebarOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold text-xs shadow"
            >
              <img src={userProfile.avatar} alt="avatar" className="w-4 h-4 rounded-full object-cover" />
              <span>Profil</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1-BOSQICH: KIRISH QISMI - NOMER VA ISMNI MAJBURIY KIRGIZADIGAN FORM       */}
      {/* ========================================================================= */}
      {appStep === 1 && (
        <div className="max-w-md mx-auto p-4 py-8 animate-fadeIn">
          <div className={`p-6 sm:p-7 rounded-3xl border ${cardBg} shadow-2xl space-y-5 text-center`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black flex items-center justify-center mx-auto text-2xl font-black shadow-lg shadow-emerald-500/20">
              🏐
            </div>

            <div>
              <h2 className="text-xl font-black tracking-tight">Farg'ona Sport - Kirish</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Yoshlarobod, Vodil va Novkat sport maydonlaridan foydalanish uchun ism va telefon raqamingizni kiriting
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = (fd.get('name') || '').toString().trim();
                const phone = (fd.get('phone') || '').toString().trim();
                const age = (fd.get('age') || '20').toString().trim();
                const village = (fd.get('village') || 'Vodil').toString();
                const sport = (fd.get('sport') || 'Voleybol').toString();

                if (!name || !phone) {
                  showToast("Iltimos, ism va telefon raqamingizni to'liq kiriting!", "error");
                  return;
                }

                const updatedUser = {
                  ...userProfile,
                  name,
                  phone,
                  age,
                  village,
                  primarySport: sport
                };

                setUserProfile(updatedUser);
                setSelectedSport(sport);
                setSelectedVillage(village);
                localStorage.setItem('fs_current_user', JSON.stringify(updatedUser));
                localStorage.setItem('fs_user_logged_in', 'true');

                // Bosh admin hisoboti uchun yangi kiruvchini qayd qilish
                trackNewVisitor(updatedUser);

                setAppStep(2);
                showToast(`Xush kelibsiz, ${name}! Endi xaritada turgan joyingizni belgilang.`);
              }}
              className="space-y-3.5 text-left text-xs"
            >
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Ism va familiyangiz (Majburiy):</label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    name="name"
                    defaultValue={userProfile.name}
                    required
                    placeholder="Masalan: Azizbek Fayziyev"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold focus:outline-none focus:border-emerald-500`}
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Telefon raqamingiz (Majburiy):</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                  <input
                    name="phone"
                    defaultValue={userProfile.phone}
                    required
                    placeholder="+998 90 123-45-67"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold focus:outline-none focus:border-emerald-500`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Yoshingiz:</label>
                  <input
                    name="age"
                    type="number"
                    defaultValue={userProfile.age}
                    min="10"
                    max="80"
                    required
                    className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold`}
                  />
                </div>
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Hududingiz:</label>
                  <select
                    name="village"
                    defaultValue={userProfile.village}
                    className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold`}
                  >
                    <option value="Vodil">Vodil</option>
                    <option value="Yoshlarobod">Yoshlarobod</option>
                    <option value="Novkat">Novkat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Qiziqqan sport turi:</label>
                <select
                  name="sport"
                  defaultValue={userProfile.primarySport}
                  className={`w-full px-3 py-2.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-300'} font-semibold`}
                >
                  <option value="Voleybol">Voleybol (birlamchi)</option>
                  <option value="Futbol">Futbol</option>
                  <option value="Basketbol">Basketbol</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-black text-sm shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-3"
              >
                <span>Keyingi: Xaritada joylashuvni belgilash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
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

            {/* Xarita joylashuv tanlash */}
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

              {/* Pin */}
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
              <button
                onClick={() => setAppStep(1)}
                className="px-4 py-2 rounded-xl border border-zinc-700 text-xs font-bold"
              >
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
          {/* HEADER */}
          <header className={`sticky top-0 z-40 ${headerBg} backdrop-blur-md px-4 py-3 shadow-md`}>
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg">
                  <span className="text-xl">🏐</span>
                </div>
                <div>
                  <h1 className="font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    FARG'ONA SPORT
                  </h1>
                  <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {userProfile.village} • {userProfile.name.split(' ')[0]} ({userProfile.phone})
                  </p>
                </div>
              </div>

              {/* ROL SWITCHER */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-zinc-800/80 p-1 rounded-xl text-xs">
                  <button
                    onClick={() => { setCurrentRole('user'); setActiveTab('home'); }}
                    className={`px-2 py-1 rounded-lg font-bold ${currentRole === 'user' ? 'bg-emerald-500 text-black' : 'text-zinc-400'}`}
                  >
                    Mijoz
                  </button>
                  <button
                    onClick={() => { setCurrentRole('hall_admin'); setActiveTab('admin_hall'); }}
                    className={`px-2 py-1 rounded-lg font-bold ${currentRole === 'hall_admin' ? 'bg-amber-500 text-black' : 'text-zinc-400'}`}
                  >
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
                    className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 ${
                      currentRole === 'super_admin' ? 'bg-cyan-400 text-black' : 'text-zinc-400'
                    }`}
                  >
                    {isSuperAdminUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    Bosh Admin
                  </button>
                </div>

                <button
                  onClick={() => setIsProfileSidebarOpen(true)}
                  className="p-1 rounded-xl border border-zinc-700 bg-zinc-800"
                  title="Profilni ochish"
                >
                  <img src={userProfile.avatar} alt="User" className="w-7 h-7 rounded-lg object-cover" />
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-5xl mx-auto p-4 pb-24 space-y-6">

            {/* TAB 1: ASOSIY SAHIFA */}
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
                          <RefreshCw className="w-3.5 h-3.5" />
                          Burish
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 3D SATH */}
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

                  {/* Tanlangan maydon kartasi */}
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
                      {['Barchasi', 'Yoshlarobod', 'Vodil', 'Novkat'].map(v => (
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

                    <button
                      onClick={() => setIsCreateGameOpen(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black text-xs font-extrabold flex items-center gap-1 shadow"
                    >
                      <Plus className="w-4 h-4" /> O'yin ochish
                    </button>
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

                  {/* MAKTAB ZALLARI */}
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

                  {/* SUN'IY MAYDONLAR */}
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

                  {/* BASKETBOL */}
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

            {/* TAB 2: ZAL ADMINI PANELI */}
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
                        <button onClick={() => handleTogglePaymentStatus(games[0].id, p.id, "To'langan")} className="px-2.5 py-1 rounded bg-emerald-500 text-black text-xs font-bold">
                          Qabul qilindi
                        </button>
                        <button onClick={() => handleTogglePaymentStatus(games[0].id, p.id, "To'lanmadi")} className="px-2.5 py-1 rounded bg-rose-600 text-white text-xs font-bold">
                          To'lanmadi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: BOSH ADMIN PANELI (TASHRIFLAR HISOBOTI BILAN) */}
            {activeTab === 'admin_super' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Header va Qulflash */}
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
                    <p className="text-xs text-zinc-400">Farg'ona tumani sport infratuzilmasi va foydalanuvchilar oqimi tahlili</p>
                  </div>

                  <button
                    onClick={handleLockSuperAdmin}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow self-start sm:self-center"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Chiqish (Qulflash)
                  </button>
                </div>

                {/* NECHTA ODAM KIRGANI HAQIDA HISOBOT (VISITOR ANALYTICS) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-cyan-400" />
                      Foydalanuvchilar tashrifi va odamlar kirishi hisoboti
                    </h3>
                    <span className="text-xs text-zinc-400">Real-time ma'lumotlar</span>
                  </div>

                  {/* KPI Kartalari */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className={`p-4 rounded-2xl border ${cardBg} space-y-1`}>
                      <span className="text-[11px] text-zinc-400 font-semibold block">Jami kirganlar soni:</span>
                      <p className="text-2xl font-black text-cyan-400">{analytics.totalVisitors.toLocaleString()}</p>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> +14% o'sish
                      </span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${cardBg} space-y-1`}>
                      <span className="text-[11px] text-zinc-400 font-semibold block">Bugungi tashriflar:</span>
                      <p className="text-2xl font-black text-emerald-400">{analytics.todayVisitors.toLocaleString()}</p>
                      <span className="text-[10px] text-zinc-500 font-medium">Faol foydalanuvchilar</span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${cardBg} space-y-1`}>
                      <span className="text-[11px] text-zinc-400 font-semibold block">Ro'yxatdan o'tganlar:</span>
                      <p className="text-2xl font-black text-amber-400">{analytics.registeredUsers.toLocaleString()}</p>
                      <span className="text-[10px] text-zinc-500 font-medium">Telefon raqam bilan</span>
                    </div>

                    <div className={`p-4 rounded-2xl border ${cardBg} space-y-1`}>
                      <span className="text-[11px] text-zinc-400 font-semibold block">Oylik obuna tushumi:</span>
                      <p className="text-2xl font-black text-emerald-400">2,450,000</p>
                      <span className="text-[10px] text-zinc-500 font-medium">so'm (Zallar to'lovi)</span>
                    </div>
                  </div>

                  {/* Qishloqlar kesimida taqsimot */}
                  <div className={`p-4 rounded-2xl border ${cardBg} space-y-3`}>
                    <h4 className="text-xs font-black uppercase tracking-wide text-zinc-400">
                      Qishloqlar bo'yicha kiruvchilar ulushi (Vodil, Yoshlarobod, Novkat):
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">Vodil qishlog'i (Dam olish zonasi)</span>
                          <span className="text-cyan-400 font-bold">{analytics.villageStats.Vodil} kishi (52%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: '52%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">Yoshlarobod hududi</span>
                          <span className="text-emerald-400 font-bold">{analytics.villageStats.Yoshlarobod} kishi (28%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: '28%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">Novkat qishlog'i</span>
                          <span className="text-purple-400 font-bold">{analytics.villageStats.Novkat} kishi (20%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                          <div className="h-full bg-purple-400 rounded-full" style={{ width: '20%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Oxirgi kirgan foydalanuvchilar ro'yxati */}
                  <div className={`rounded-2xl border ${cardBg} overflow-hidden`}>
                    <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase text-zinc-400">So'nggi kirgan va ro'yxatdan o'tgan odamlar logi</h4>
                      <span className="text-[10px] text-emerald-400 font-bold">Onlayn rejimda</span>
                    </div>

                    <div className="divide-y divide-zinc-800/70">
                      {analytics.recentLogs.map((log) => (
                        <div key={log.id} className="p-3 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs">
                              {log.device === "Mobil" ? <Smartphone className="w-4 h-4 text-emerald-400" /> : <Laptop className="w-4 h-4 text-cyan-400" />}
                            </div>
                            <div>
                              <p className="font-bold text-zinc-200">{log.name}</p>
                              <p className="text-[11px] text-zinc-400">{log.phone} • {log.village} ({log.device})</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                              {log.sport}
                            </span>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{log.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Maydonlarga obuna sotish */}
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
                          <button onClick={() => handleRenewSubscription(v.id, 1)} className="px-2 py-1 rounded bg-zinc-800 text-xs font-bold">+1 oy (150k)</button>
                          <button onClick={() => handleRenewSubscription(v.id, 3)} className="px-2 py-1 rounded bg-zinc-800 text-cyan-400 text-xs font-bold">+3 oy (400k)</button>
                          <button onClick={() => handleRenewSubscription(v.id, 6)} className="px-2 py-1 rounded bg-emerald-500 text-black text-xs font-bold">+6 oy (700k)</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </main>
        </>
      )}

      {/* ========================================================================= */}
      {/* 4. MUTLAQ ANONIM BOSH ADMIN PAROL MODALI (admin2010)                       */}
      {/* ========================================================================= */}
      {isSuperAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-2xl text-center text-zinc-100">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-black">Bosh Admin Xavfsiz Kirish</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Tizim hisobotlari va obuna nazorati faqat maxsus parol orqali ochiladi
              </p>
            </div>

            <form onSubmit={handleSuperAdminLogin} className="space-y-3">
              <div>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => {
                    setAdminPasswordInput(e.target.value);
                    setAdminPasswordError(false);
                  }}
                  placeholder="Maxfiy parolni kiriting..."
                  required
                  autoFocus
                  className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950 border ${
                    adminPasswordError ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-zinc-800'
                  } text-center font-mono text-sm tracking-widest text-zinc-100 focus:outline-none focus:border-cyan-400`}
                />
                {adminPasswordError && (
                  <p className="text-[11px] text-rose-400 mt-1 font-semibold">Xato parol! Qayta urinib ko'ring.</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuperAdminModalOpen(false);
                    setAdminPasswordInput('');
                    setAdminPasswordError(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-black shadow-lg"
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. YON PROFIL DRAWER                                                      */}
      {/* ========================================================================= */}
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
              <div className="relative">
                <img src={userProfile.avatar} alt="User" className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400" />
                <label className="absolute bottom-0 right-0 p-1 rounded-full bg-emerald-500 text-black cursor-pointer shadow">
                  <Camera className="w-3.5 h-3.5" />
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              </div>
              <div>
                <h4 className="font-black text-sm">{userProfile.name}</h4>
                <p className="text-xs text-zinc-400">{userProfile.phone}</p>
                <p className="text-xs text-emerald-400 font-bold">{userProfile.age} yosh • {userProfile.village}</p>
              </div>
            </div>

            {/* Eslatmalar */}
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

            <button
              onClick={() => {
                setAppStep(1);
                setIsProfileSidebarOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-800 text-xs font-bold"
            >
              Ma'lumotlarni qayta tahrirlash (Kirish)
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODALLAR: O'YIN TAFSILOTLARI VA TO'LOV HISOB-KITOBLARI                  */}
      {/* ========================================================================= */}
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

            {/* Split hisoblagich */}
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

            {/* Qatnashchilar */}
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

            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold text-xs shadow-lg"
            >
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

      {/* YANGI O'YIN TASHKIL QILISH MODALI */}
      {isCreateGameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-zinc-900 border border-zinc-800 p-5 space-y-3 text-zinc-100">
            <div className="flex justify-between pb-2 border-b border-zinc-800">
              <h3 className="text-sm font-bold">Yangi o'yin ochish</h3>
              <button onClick={() => setIsCreateGameOpen(false)}>✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const newG = {
                  id: 'g_' + Date.now(),
                  title: fd.get('title') || "Do'stona Voleybol o'yini",
                  sport: fd.get('sport') || 'Voleybol',
                  venueId: 'v1',
                  venueName: "14-maktab sport zali",
                  village: fd.get('village') || 'Vodil',
                  date: "Bugun",
                  time: fd.get('time') || "20:00 - 21:30",
                  isFree: fd.get('isFree') === 'free',
                  totalPrice: fd.get('isFree') === 'free' ? 0 : 120000,
                  maxPlayers: parseInt(fd.get('maxPlayers') || '12'),
                  level: "O'rta daraja",
                  creator: userProfile.name,
                  participants: [
                    { id: 'p_creator', name: userProfile.name, phone: userProfile.phone, status: "To'langan", method: "Payme", avatar: userProfile.avatar }
                  ]
                };
                setGames(p => [newG, ...p]);
                setIsCreateGameOpen(false);
                showToast("Yangi o'yin e'loni qo'shildi!");
              }}
              className="space-y-3 text-xs"
            >
              <input name="title" defaultValue="Do'stona Voleybol o'yini" required className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800" />
              <div className="grid grid-cols-2 gap-2">
                <select name="sport" defaultValue={selectedSport} className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  <option value="Voleybol">Voleybol</option>
                  <option value="Futbol">Futbol</option>
                  <option value="Basketbol">Basketbol</option>
                </select>
                <select name="village" defaultValue="Vodil" className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  <option value="Yoshlarobod">Yoshlarobod</option>
                  <option value="Vodil">Vodil</option>
                  <option value="Novkat">Novkat</option>
                </select>
              </div>
              <input name="time" defaultValue="20:00 - 21:30" required className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800" />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs shadow">
                O'yinni e'lon qilish
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
