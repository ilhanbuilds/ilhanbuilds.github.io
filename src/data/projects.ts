import { rackerStoreImages } from './racker-store-images';
import type { Project } from '../types/content';
import { projectImages } from './project-images';

// Only information approved for public display belongs in this file.
export const projects: Project[] = [
  {
    id: 'idleoyun',
    ...projectImages.idleoyun,
    slug: 'idleoyun',
    title: 'IdleOyun',
    year: 2024,
    timelineOrder: 1,
    category: { en: 'First steps', tr: 'İlk adımlar' },
    technologies: ['Python', 'PyQt5'],
    visibility: 'public',
    collaboration: 'solo',
    repositoryUrl: 'https://github.com/ilhanbuilds/idleOyun',
    translations: {
      en: {
        cardSummary:
          'My first small clicker game, written in Python with PyQt5.',
        technicalDetails:
          'PyQt5 menu, game and market panels connect to Python game rules. Strength, rebirth and prestige change earnings and upgrade costs.',
        summary:
          'My first small Python game, built around clicking, earning currency and buying upgrades.',
        overview:
          'A desktop game where clicking earns in-game currency for strength upgrades in the market.',
      },
      tr: {
        cardSummary: 'Python ve PyQt5 ile yazdığım ilk küçük tıklama oyunu.',
        technicalDetails:
          'PyQt5 ile hazırladığım menü, oyun ve market panelleri Python oyun kurallarına bağlanır. Güç, rebirth ve prestige kazancı ve yükseltme maliyetlerini değiştirir.',
        summary:
          'Tıklama, para kazanma ve yükseltmeler üzerine kurulu ilk küçük Python oyunum.',
        overview:
          'Tıklayarak oyun içi para kazanılan, marketten güç yükseltmeleri alınan bir masaüstü oyunu.',
      },
    },
  },
  {
    id: 'calculator',
    ...projectImages.calculator,
    slug: 'calculator',
    title: 'Calculator',
    year: 2025,
    timelineOrder: 2,
    category: { en: 'Desktop application', tr: 'Masaüstü uygulaması' },
    technologies: ['C#', 'Windows Forms'],
    visibility: 'public',
    repositoryUrl: 'https://github.com/ilhanbuilds/Hesap-Makinesi-Form',
    translations: {
      en: {
        cardSummary: 'A Windows Forms calculator for basic integer arithmetic.',
        overview:
          'A Windows Forms app with a numeric keypad, editable display and the four basic operations.',
        technicalDetails:
          'Built with C# and .NET Framework. Calculations use 32-bit integers evaluated from left to right; the portfolio browser adaptation preserves this calculation model.',
        summary:
          'A small calculator I built while learning desktop interfaces and basic arithmetic operations.',
      },
      tr: {
        cardSummary:
          'Temel tam sayı işlemleri için Windows Forms hesap makinesi.',
        overview:
          'Sayısal tuş takımı, düzenlenebilir ekranı ve dört temel işlemi olan bir Windows Forms uygulaması.',
        technicalDetails:
          'C# ve .NET Framework ile geliştirildi. Hesaplamalar 32 bit tam sayılarla soldan sağa yapılır; portfolyodaki tarayıcı uyarlaması bu hesaplama modelini korur.',
        summary:
          'Masaüstü arayüzleri ve temel hesaplama işlemlerini öğrenirken geliştirdiğim küçük bir hesap makinesi.',
      },
    },
  },
  {
    id: 'hcjeditor',
    ...projectImages.hcjeditor,
    slug: 'hcjeditor',
    title: 'HCJEditor',
    year: 2025,
    timelineOrder: 3,
    category: { en: 'Web development', tr: 'Web geliştirme' },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    visibility: 'public',
    repositoryUrl: 'https://github.com/ilhanbuilds/HCJEditor',
    translations: {
      en: {
        cardSummary:
          'A browser editor with live HTML, CSS and JavaScript preview.',
        overview:
          'The original app can open local files, keep edits in browser storage and export a combined HTML file.',
        technicalDetails:
          'In this portfolio, live editing runs in isolated frames. File operations are disabled in the demo, and edits are cleared on reload.',
        summary:
          'A small browser editor with separate HTML, CSS and JavaScript panes and live preview.',
      },
      tr: {
        cardSummary:
          'HTML, CSS ve JavaScript için canlı ön izlemeli tarayıcı editörü.',
        overview:
          'Özgün uygulama yerel dosya açmayı, düzenlemeleri tarayıcıda saklamayı ve tek HTML dosyası olarak indirmeyi destekliyor.',
        technicalDetails:
          'Portfolyo ön izlemesinde canlı kod denemeleri yalıtılmış çerçevelerde çalışır. Dosya işlemleri bu demoda kapalıdır; düzenlemeler yenilemeyle silinir.',
        summary:
          'HTML, CSS ve JavaScript’i ayrı alanlarda yazıp sonucu anlık görebildiğiniz küçük bir tarayıcı editörü.',
      },
    },
  },
  {
    id: 'dinocore',
    ...projectImages.dinocore,
    slug: 'dinocore',
    title: 'DinoCore: Evolution Idle',
    year: 2026,
    timelineOrder: 4,
    category: { en: 'Game development', tr: 'Oyun geliştirme' },
    technologies: ['Unity', 'C#'],
    visibility: 'public',
    demoUrl: 'https://ilhanbuilds.github.io/DinoCore-Evolution-Idle/',
    repositoryUrl: 'https://github.com/ilhanbuilds/DinoCore-Evolution-Idle',
    translations: {
      en: {
        cardSummary: 'An early idle game prototype built with Unity.',
        overview:
          'Clicks and production rooms earn currency that opens new rooms and progression upgrades.',
        technicalDetails:
          'C# components manage production, rebirth and planet progression. Progress is stored as JSON in PlayerPrefs, with bounded offline earnings calculated on return. The existing WebGL demo opens through its separate link.',
        summary:
          'My first Unity idle game prototype, built around production rooms and dinosaur bonuses.',
        process:
          'I used AI-assisted coding tools while building my first playable Unity prototype.',
      },
      tr: {
        cardSummary: 'Unity ile geliştirdiğim erken aşama idle oyun prototipi.',
        overview:
          'Tıklayarak ve üretim odalarından kazanç elde ediyor; yeni odalar ve ilerleme yükseltmeleri açıyorsunuz.',
        technicalDetails:
          'C# bileşenleri üretim, rebirth ve gezegen ilerlemesini yönetir. İlerleme JSON olarak PlayerPrefs’te saklanır; yeniden açılışta geçen süreye göre sınırlı çevrimdışı kazanç hesaplanır. Mevcut WebGL demo ayrı bağlantıda açılır.',
        summary:
          'Odalar ve dinozor bonusları etrafında kaynak üretimi kurduğum ilk Unity idle oyun prototipi.',
        process:
          'Unity ile ilk oynanabilir prototipimi hazırlarken yapay zekâ destekli kodlama araçlarından yararlandım.',
      },
    },
  },
  {
    id: 'kutlumi',
    ...projectImages.kutlumi,
    slug: 'kutlumi',
    title: 'Kutlumi',
    year: 2026,
    timelineOrder: 5,
    category: { en: 'Personal web project', tr: 'Kişisel web projesi' },
    technologies: ['TypeScript', 'Next.js', 'React', 'Supabase'],
    visibility: 'private',
    status: 'unreleased',
    translations: {
      en: {
        cardSummary: 'A web project for creating personal celebration pages.',
        overview:
          'An owner manages the celebration, while messages submitted through a contribution link appear in a themed envelope experience.',
        technicalDetails:
          'The app uses a React interface and Next.js server actions. Supabase PostgreSQL handles message and gift records, with files in private Storage.',
        summary:
          'My unpublished web project bringing messages, music and gift images together in a shared celebration.',
      },
      tr: {
        cardSummary:
          'Kişisel kutlama sayfaları hazırlamak için geliştirdiğim web projesi.',
        overview:
          'Oluşturan kişi kutlamayı yönetiyor; katkı bağlantısıyla gelen mesajlar, seçilen tema ve zarflarla adım adım sunuluyor.',
        technicalDetails:
          'React arayüzü ve Next.js sunucu aksiyonları kullanılır. Mesaj ve hediye verileri Supabase PostgreSQL, dosyalar özel Storage üzerinden işlenir.',
        summary:
          'Mesajları, müziği ve hediye görsellerini ortak bir kutlamada buluşturan, henüz yayınlanmamış web projem.',
      },
    },
  },
  {
    id: 'lina',
    ...projectImages.lina,
    slug: 'lina',
    title: 'Lina',
    year: 2026,
    timelineOrder: 6,
    category: { en: 'Desktop assistant', tr: 'Masaüstü asistanı' },
    technologies: ['Python', 'PySide6', 'Ollama', 'SQLite'],
    visibility: 'public',
    status: 'on-hold',
    repositoryUrl: 'https://github.com/ilhanbuilds/Lina',
    translations: {
      en: {
        cardSummary:
          'A desktop assistant using local models; development is paused.',
        technicalDetails:
          'The Python/PySide6 interface, Ollama model layer and SQLite conversation store are separate modules. Voice input uses faster-whisper. The portfolio shows recorded application screens.',
        summary:
          'A Windows desktop assistant for local-model chat, conversation history and optional voice input. Development is paused.',
        overview:
          'I brought conversations, history search and settings into one desktop interface, using a local Ollama service for model responses.',
      },
      tr: {
        cardSummary:
          'Yerel modellerle çalışan, geliştirmeye ara verdiğim masaüstü asistanı.',
        technicalDetails:
          'Python/PySide6 arayüzü, Ollama model katmanı ve SQLite konuşma deposu ayrı modüllerdedir. Ses girdisinde faster-whisper kullanılır. Portfolyoda uygulamanın kayıtlı ekranları gösterilir.',
        summary:
          'Yerel modellerle sohbet, konuşma geçmişi ve isteğe bağlı sesli girdi sunan Windows masaüstü asistanı. Geliştirmeye ara verdim.',
        overview:
          'Sohbetleri, geçmiş aramasını ve ayarları tek bir masaüstü arayüzünde bir araya getirdim. Model yanıtları için yerel Ollama servisini kullanıyor.',
      },
    },
  },
  {
    id: 'racker',
    storeGallery: rackerStoreImages,
    productFeatures: {
      tr: [
        {
          icon: 'calendar',
          title: 'Program ve planlama',
          description:
            'Antrenman günleri, egzersiz sırası ve kişisel programlar; bağlantı veya QR ile program paylaşımı.',
        },
        {
          icon: 'activity',
          title: 'Antrenman kaydı',
          description:
            'Set, tekrar, çalışma ağırlığı ve dinlenme takibi; süreye dayalı kardiyo ve tamamlanan antrenman özetleri.',
        },
        {
          icon: 'chart',
          title: 'Fiziksel gelişim',
          description:
            'Vücut ağırlığı, hedef ve ölçüm kayıtları; geçmiş performans ve dönemsel antrenman istatistikleri.',
        },
        {
          icon: 'watch',
          title: 'Telefon ve saat',
          description:
            'Wear OS üzerinde aktif antrenman, set ağırlığı/tekrar, set tamamlama ve dinlenme; telefondaki kayıtlarla eşleşme.',
        },
      ],
      en: [
        {
          icon: 'calendar',
          title: 'Programs and planning',
          description:
            'Workout days, exercise order and personal programs, with program sharing through links or QR codes.',
        },
        {
          icon: 'activity',
          title: 'Workout logging',
          description:
            'Sets, reps, working weight and rest tracking, plus timed cardio and completed-workout summaries.',
        },
        {
          icon: 'chart',
          title: 'Physical progress',
          description:
            'Body-weight, goal and measurement records, previous performance and period-based workout statistics.',
        },
        {
          icon: 'watch',
          title: 'Phone and watch',
          description:
            'Active workouts, set weight/reps, set completion and rest on Wear OS, synchronized with phone records.',
        },
      ],
    },
    ...projectImages.racker,
    slug: 'racker',
    title: 'Racker',
    year: 2026,
    timelineOrder: 7,
    category: { en: 'Mobile application', tr: 'Mobil uygulama' },
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Kotlin',
      'Wear OS',
      'SQLite',
    ],
    visibility: 'private',
    featured: 1,
    documentationUrl: 'https://github.com/ilhanbuilds/Racker-Legal',
    storeUrl:
      'https://play.google.com/store/apps/details?id=com.ilhanki.titanlog',
    translations: {
      en: {
        cardSummary:
          'Offline workout, set and progress tracking for Android and Wear OS.',
        summary:
          'My Android and Wear OS workout journal, published on Google Play. It brings programs, set records and physical progress tracking together.',
        overview:
          'I built Racker to manage a daily workout log across a phone and watch. It works without an account, keeping records on the device.',
        technicalDetails:
          'The phone app uses React Native, Expo and TypeScript; the watch app uses Kotlin and Jetpack Compose. Workout and measurement records live in phone SQLite storage. Wear Data Layer synchronizes the watch with the active workout state managed by the phone.',
        process:
          'I developed planning, active workout and history screens around everyday use, testing functionality on physical Android and Wear OS devices.',
      },
      tr: {
        cardSummary:
          'Android ve Wear OS için çevrimdışı antrenman, set ve gelişim takibi.',
        summary:
          'Google Play’de yayımladığım Android ve Wear OS antrenman günlüğü. Programları, set kayıtlarını ve fiziksel gelişim takibini bir araya getiriyor.',
        overview:
          'Racker’ı günlük antrenman kaydını telefon ve saat üzerinde birlikte yönetebilmek için geliştirdim. Hesap açmadan, kayıtları cihazda tutarak kullanılabiliyor.',
        technicalDetails:
          'Telefon uygulaması React Native, Expo ve TypeScript; saat uygulaması Kotlin ve Jetpack Compose kullanır. Antrenman ve ölçüm kayıtları telefonun SQLite veritabanında tutulur. Wear Data Layer, saati telefonun yönettiği aktif antrenman durumuyla eşler.',
        process:
          'Planlama, aktif antrenman ve geçmiş ekranlarını günlük kullanım etrafında geliştirdim. İşlevleri fiziksel Android ve Wear OS cihazlarında test ettim.',
      },
    },
  },
  {
    id: 'bilekten',
    ...projectImages.bilekten,
    slug: 'bilekten',
    title: 'Bilekten',
    year: 2026,
    timelineOrder: 8,
    category: { en: 'Android & Wear OS', tr: 'Android ve Wear OS' },
    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Wear OS',
      'Wear Data Layer',
      'DataStore',
    ],
    visibility: 'private',
    status: 'on-hold',
    translations: {
      en: {
        cardSummary:
          'Phone controls from a watch; unpublished and currently paused.',
        summary:
          'An unpublished Android project bringing phone media, volume and app controls to a Wear OS watch. Development is paused, with plans to return to it.',
        overview:
          'Developed after Racker, Bilekten combines media, favourite apps, shortcuts, flashlight and Find Phone controls in phone and watch interfaces.',
        technicalDetails:
          'Kotlin and Jetpack Compose interfaces exchange commands and state through Wear Data Layer; DataStore keeps user preferences. Media and device controls depend on Android permissions and device capabilities.',
      },
      tr: {
        cardSummary:
          'Saatten telefon kontrolleri; yayınlanmamış ve geliştirmeye ara verilmiş proje.',
        summary:
          'Telefonun medya, ses ve uygulama kontrollerini Wear OS saatine taşıyan, yayınlanmamış Android projesi. Geliştirmeye ara verdim; ileride devam etmeyi planlıyorum.',
        overview:
          'Racker’dan sonra geliştirdiğim Bilekten; medya, favori uygulamalar, kısayollar, fener ve Telefonumu Bul kontrollerini telefon ve saat arayüzlerinde toplar.',
        technicalDetails:
          'Kotlin ve Jetpack Compose arayüzleri Wear Data Layer ile komut ve durum paylaşır; kullanıcı ayarları DataStore’da tutulur. Medya ve cihaz kontrolleri Android izinlerine ve cihaz yeteneklerine bağlıdır.',
      },
    },
  },
  {
    ...projectImages.deepfake,
    id: 'deepfake-detection',
    slug: 'deepfake-detection',
    title: 'Deepfake Detection',
    year: 2026,
    timelineOrder: 9,
    category: { en: 'Academic project', tr: 'Akademik proje' },
    technologies: ['Python', 'PyTorch', 'EfficientNet', 'RetinaFace'],
    visibility: 'public',
    collaboration: 'team',
    repositoryUrl: 'https://github.com/ilhanbuilds/deepfake-image-detection',
    translations: {
      en: {
        cardSummary:
          'An academic team project examining face manipulation in images and videos.',
        technicalDetails:
          'Photos use V3 EfficientNet-B0 and Grad-CAM; videos use SBI EfficientNet-B4, RetinaFace and an adaptive 6→12-frame pipeline. Grad-CAM shows model attention rather than a manipulation mask. The video pipeline requires CUDA; separate model evaluations are not combined into one general accuracy figure.',
        summary:
          'An academic team project using deep learning to examine face manipulation in images and videos.',
        overview:
          'We built a local application for photo analysis and video-frame evaluation, interpreting results within the scope of the model and dataset used.',
      },
      tr: {
        cardSummary:
          'Fotoğraf ve videolardaki yüz manipülasyonlarını inceleyen akademik ekip projesi.',
        technicalDetails:
          'Fotoğraflarda V3 EfficientNet-B0 ve Grad-CAM; videolarda SBI EfficientNet-B4, RetinaFace ve adaptif 6→12 kare akışı kullanılır. Grad-CAM modelin dikkat bölgelerini gösterir; manipülasyon maskesi değildir. Video hattı CUDA gerektirir; ayrı model değerlendirmeleri tek bir genel doğruluk oranına dönüştürülmez.',
        summary:
          'Fotoğraf ve videolardaki yüz manipülasyonlarını incelemek için geliştirdiğimiz derin öğrenme tabanlı akademik ekip projesi.',
        overview:
          'Fotoğraf analizi ve video karelerinden değerlendirme yapan yerel bir uygulama geliştirdik. Sonuçları kullanılan modelin ve veri kümesinin kapsamıyla birlikte ele alıyoruz.',
      },
    },
  },
  {
    id: 'secureface',
    ...projectImages.secureface,
    slug: 'secureface',
    title: 'SecureFace',
    year: 2026,
    timelineOrder: 10,
    category: { en: 'Research & development', tr: 'Araştırma ve geliştirme' },
    technologies: [
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'OpenCV',
      'AES-GCM',
    ],
    visibility: 'private',
    collaboration: 'team',
    status: 'in-development',
    featured: 2,
    currentlyBuilding: true,
    translations: {
      en: {
        cardSummary:
          'Ongoing team research into face blurring and encrypted video archives.',
        technicalDetails:
          'A React/TypeScript interface works with Python/FastAPI services. Face detection uses OpenCV YuNet, local records use SQLite, and archive encryption uses AES-GCM. Live-stream integration and protection continuity remain separate research topics.',
        summary:
          'A local team prototype for blurring face regions in video, encrypted archiving and key-authorized restoration.',
        overview:
          'We are developing a workflow for video preview, reviewing and correcting face boxes, and protecting selected regions. The project remains in research and development.',
      },
      tr: {
        cardSummary:
          'Yüz bulanıklaştırma ve şifreli arşivleme üzerine devam eden ekip araştırması.',
        technicalDetails:
          'React/TypeScript arayüzü Python/FastAPI servisleriyle çalışır. Yüz tespitinde OpenCV YuNet, yerel kayıtlarda SQLite, arşiv şifrelemesinde AES-GCM kullanılır. Canlı yayın entegrasyonu ve koruma sürekliliği ayrı araştırma konularıdır.',
        summary:
          'Videolardaki yüz bölgelerini bulanıklaştırma, şifreli arşivleme ve anahtarla yetkili geri yükleme üzerine geliştirdiğimiz yerel ekip prototipi.',
        overview:
          'Video ön izlemesi, yüz kutularını inceleme/düzeltme ve seçilen bölgeleri koruma akışını birlikte geliştiriyoruz. Proje araştırma ve geliştirme aşamasında.',
      },
    },
  },
  {
    id: 'rubikrl',
    ...projectImages.rubikrl,
    slug: 'rubikrl',
    title: 'RubikRL',
    year: 2026,
    timelineOrder: 11,
    category: { en: 'Reinforcement learning', tr: 'Pekiştirmeli öğrenme' },
    technologies: [
      'Python',
      'PyTorch',
      'Double DQN',
      'FastAPI',
      'React',
      'Three.js',
    ],
    visibility: 'private',
    status: 'in-development',
    currentlyBuilding: true,
    translations: {
      en: {
        cardSummary:
          'Experimental reinforcement learning and Double DQN work on the Rubik’s Cube.',
        technicalDetails:
          'A NumPy/FastAPI backend manages cube state, while React, TypeScript and React Three Fiber display moves. Model trials require a validated local PyTorch checkpoint.',
        summary:
          'An experimental project exploring reinforcement learning on the 3×3×3 Rubik’s Cube, combining training trials with an interface for inspecting cube states.',
        overview:
          'I experiment with a Double DQN agent on a mathematical cube engine and limited scramble depths. General 3×3×3 solving performance has not been demonstrated.',
      },
      tr: {
        cardSummary:
          'Rubik küpünde pekiştirmeli öğrenme ve Double DQN üzerine deneysel çalışma.',
        technicalDetails:
          'NumPy/FastAPI tabanı küp durumunu yönetir; React, TypeScript ve React Three Fiber arayüzü hareketleri gösterir. PyTorch modelinin denenmesi doğrulanmış yerel checkpoint gerektirir.',
        summary:
          '3×3×3 Rubik küpünde pekiştirmeli öğrenmeyi araştırdığım deneysel proje; eğitim denemeleri ve küp durumlarını inceleyen bir arayüz geliştiriyorum.',
        overview:
          'Küpün matematiksel motoru üzerinde Double DQN ajanı ve sınırlı karıştırma derinlikleriyle deneyler yapıyorum. Genel 3×3×3 çözüm başarısı gösterilmiş değil.',
      },
    },
  },
];

export const timeline = [...projects].sort(
  (a, b) => b.timelineOrder - a.timelineOrder,
);
export const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured! - b.featured!);
export const building = projects.filter(
  (p) => p.currentlyBuilding && !p.featured,
);
