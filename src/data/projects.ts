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
    technologies: ['Python'],
    visibility: 'public',
    collaboration: 'solo',
    repositoryUrl: 'https://github.com/ilhanbuilds/idleOyun',
    translations: {
      en: {
        technicalDetails:
          'The original Python/PyQt5 application separates panels from game rules. Click power, rebirth and prestige affect earnings and upgrade prices.',
        summary:
          'My first small click-based idle game, written by hand in Python.',
        overview:
          'A Python game built around clicking, earning in-game currency and buying upgrades.',
      },
      tr: {
        technicalDetails:
          'Özgün Python/PyQt5 uygulamasında paneller ve oyun kuralları ayrıdır. Tıklama gücü, rebirth ve prestige, kazancı ve yükseltme fiyatlarını etkiler.',
        summary:
          'Python ile kendi ellerimle yazdığım ilk küçük tıklama tabanlı idle oyunu.',
        overview:
          'Tıklama, oyun içi para kazanma ve yükseltme satın alma üzerine kurulu küçük bir Python oyunu.',
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
        overview:
          'A Windows Forms calculator with a numeric keypad, editable display and the four basic operations.',
        technicalDetails:
          'The original C# implementation uses 32-bit integers and evaluates operations from left to right. The browser adaptation retains this behavior.',
        summary:
          'A simple calculator exploring desktop interfaces and basic arithmetic operations.',
      },
      tr: {
        overview:
          'Sayısal tuş takımı, düzenlenebilir ekranı ve dört temel işlemi olan bir Windows Forms hesap makinesi.',
        technicalDetails:
          'Özgün C# uygulaması 32 bit tam sayılar kullanır ve işlemleri soldan sağa değerlendirir. Tarayıcı uyarlaması bu davranışı korur.',
        summary:
          'Masaüstü arayüzleri ve temel hesaplama işlemleri üzerine geliştirdiğim basit bir hesap makinesi.',
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
        overview:
          'A compact workspace for trying HTML, CSS and JavaScript together and seeing the result immediately.',
        technicalDetails:
          'Separate code panes, file import and a combined HTML download form the original workflow. The portfolio adds an opaque sandbox around the editor and its preview.',
        summary:
          'A browser editor for writing or loading HTML, CSS and JavaScript, previewing the result live, and downloading it as one file.',
      },
      tr: {
        overview:
          'HTML, CSS ve JavaScript’i birlikte deneyip sonucu anlık görebilmek için küçük bir çalışma alanı.',
        technicalDetails:
          'Ayrı kod alanları, dosya yükleme ve birleştirilmiş HTML indirme özgün akışı oluşturur. Portfolyoda editör ve ön izleme ayrıca yalıtılmış çerçevelerde çalışır.',
        summary:
          'HTML, CSS ve JavaScript yazıp yükleyebildiğiniz, sonucu anlık görebildiğiniz ve tek dosya olarak indirebildiğiniz bir tarayıcı editörü.',
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
        overview:
          'A Unity idle game built around rooms, resource production, dinosaurs and upgrades.',
        technicalDetails:
          'Rebirth and planet progression extend the resource loop. The existing WebGL build stays in its own project rather than adding large game files to this portfolio.',
        summary:
          'My first Unity idle game, built in a short time using AI-assisted development tools.',
        process:
          'I used Unity and AI-assisted development tools to build the resource production and upgrade systems.',
      },
      tr: {
        overview:
          'Odalar, kaynak üretimi, dinozorlar ve yükseltmeler üzerine kurulu bir Unity idle oyunu.',
        technicalDetails:
          'Rebirth ve gezegen ilerlemesi kaynak döngüsünü genişletir. Mevcut WebGL build kendi projesinde kalır; büyük oyun dosyaları portfolyoya eklenmez.',
        summary:
          'Yapay zekâ destekli geliştirme araçlarından yararlanarak kısa sürede oluşturduğum ilk Unity idle oyunu.',
        process:
          'Kaynak üretimi ve yükseltme sistemlerini oluştururken Unity ve yapay zekâ destekli geliştirme araçlarından yararlandım.',
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
    technologies: ['TypeScript'],
    visibility: 'private',
    status: 'unreleased',
    translations: {
      en: {
        overview:
          'A shared celebration experience where messages are presented through themes and envelopes.',
        technicalDetails:
          'The original platform includes creation, contribution and presentation flows. This portfolio uses only the approved demo screenshots; personal celebrations and private source are not included.',
        summary:
          'A website for creating personal celebrations with messages, themes and envelopes.',
      },
      tr: {
        overview:
          'Mesajları temalar ve zarflar üzerinden sunan ortak bir kutlama deneyimi.',
        technicalDetails:
          'Özgün platformda oluşturma, katkı ve sunum akışları bulunur. Portfolyoda yalnızca onaylı demo ekranları kullanılır; kişisel kutlamalar ve özel kaynaklar yer almaz.',
        summary:
          'Mesajlar, temalar ve zarflarla kişisel kutlamalar hazırlamak için geliştirdiğim web sitesi.',
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
    technologies: ['Python', 'Local AI'],
    visibility: 'public',
    status: 'on-hold',
    repositoryUrl: 'https://github.com/ilhanbuilds/Lina',
    translations: {
      en: {
        technicalDetails:
          'The desktop interface depends on locally running models. Its theme and settings views are shown here as recorded screenshots, without pretending to run a live assistant.',
        summary:
          'A modular desktop assistant running local AI models. One of my first larger personal projects, currently on hold.',
        overview:
          'The assistant uses local models and a modular structure for conversations and settings. Development is currently paused.',
      },
      tr: {
        technicalDetails:
          'Masaüstü arayüzü yerelde çalışan modellere ihtiyaç duyar. Tema ve ayar görünümleri burada kayıtlı ekran görüntüleridir; canlı asistan çalıştırılmaz.',
        summary:
          'Yerel yapay zekâ modelleriyle çalışan modüler bir masaüstü asistanı. İlk kapsamlı kişisel projelerimden biri; geliştirmeye ara verdim.',
        overview:
          'Sohbet ve ayarlar için modüler bir yapı ve yerel modeller kullanıyor. Geliştirmeye şu an ara verdim.',
      },
    },
  },
  {
    id: 'racker',
    ...projectImages.racker,
    slug: 'racker',
    title: 'Racker',
    year: 2026,
    timelineOrder: 7,
    category: { en: 'Mobile application', tr: 'Mobil uygulama' },
    technologies: ['React Native', 'Expo', 'TypeScript'],
    visibility: 'private',
    featured: 1,
    documentationUrl: 'https://github.com/ilhanbuilds/Racker-Legal',
    storeUrl:
      'https://play.google.com/store/apps/details?id=com.ilhanki.titanlog',
    translations: {
      en: {
        summary:
          'An offline-first mobile app for tracking training, nutrition and physical progress. My first real application.',
        overview:
          'My first real application brings workout programs, set tracking and physical progress records together on Android, with Wear OS support.',
        technicalDetails:
          'Built with React Native, Expo and TypeScript using an offline-first approach. I tested functionality on physical Android and Wear OS devices.',
      },
      tr: {
        summary:
          'Antrenman, beslenme ve fiziksel gelişim takibi için geliştirdiğim offline-first mobil uygulama. İlk gerçek uygulamam.',
        overview:
          'İlk gerçek uygulamam. Antrenman programlarını, set takibini ve fiziksel gelişim kayıtlarını Android’de bir araya getiriyor; Wear OS desteği de bulunuyor.',
        technicalDetails:
          'React Native, Expo ve TypeScript ile offline-first yaklaşımıyla geliştirdim. İşlevselliğini fiziksel Android ve Wear OS cihazlarında test ettim.',
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
    technologies: ['Kotlin', 'Jetpack Compose', 'Wear OS'],
    visibility: 'private',
    status: 'on-hold',
    translations: {
      en: {
        summary:
          'An unpublished Android and Wear OS project for controlling phone media, apps and shortcuts from a watch. Development is paused; I plan to return to it.',
        overview:
          'I developed Bilekten after Racker to bring phone controls to the wrist. It combines a companion phone interface with watch screens for media, favourite apps and device controls.',
        technicalDetails:
          'Built natively with Kotlin and Jetpack Compose for Android and Wear OS, focusing on the phone–watch connection, media controls and shortcuts. Available commands depend on device support and Android permissions.',
      },
      tr: {
        summary:
          'Telefonun medya, uygulama ve kısayol kontrollerine saatten erişmek için geliştirdiğim, yayınlanmamış Android ve Wear OS projesi. Geliştirmeye ara verdim; ileride devam etmeyi planlıyorum.',
        overview:
          'Racker’dan sonra, telefon kontrollerini bileğe taşımak için geliştirdim. Telefonda bir yönetim arayüzü; saatte medya, favori uygulamalar ve cihaz kontrolleri bulunuyor.',
        technicalDetails:
          'Android ve Wear OS arayüzlerini Kotlin ve Jetpack Compose ile geliştirdim. Telefon–saat bağlantısı, medya denetimi ve kısayollar üzerinde çalıştım. Desteklenen komutlar cihazın yeteneklerine ve Android izinlerine bağlı.',
      },
    },
  },
  {
    id: 'deepfake-detection',
    slug: 'deepfake-detection',
    title: 'Deepfake Detection',
    year: 2026,
    timelineOrder: 9,
    category: { en: 'Academic project', tr: 'Akademik proje' },
    technologies: ['Python', 'PyTorch', 'EfficientNet'],
    visibility: 'public',
    collaboration: 'team',
    repositoryUrl: 'https://github.com/ilhanbuilds/deepfake-image-detection',
    translations: {
      en: {
        technicalDetails:
          'The local application supports image/video analysis and Grad-CAM explanations. We evaluate recorded model outputs in their dataset context; a score alone does not establish authenticity.',
        summary:
          'An academic team project using deep learning to classify real and manipulated face images.',
        overview:
          'We worked together on an academic deep learning project to classify real and manipulated face images using PyTorch and EfficientNet.',
      },
      tr: {
        technicalDetails:
          'Yerel uygulama fotoğraf/video analizi ve Grad-CAM açıklamalarını destekler. Kayıtlı model çıktılarını veri kümesi bağlamında değerlendiriyoruz; tek başına skor bir görüntünün gerçekliğini kanıtlamaz.',
        summary:
          'Gerçek ve sahte yüz görüntülerini derin öğrenme yöntemleriyle sınıflandırmaya yönelik akademik ekip çalışması.',
        overview:
          'Gerçek ve sahte yüz görüntülerini PyTorch ve EfficientNet kullanarak sınıflandırmaya yönelik akademik projeyi ekip olarak yürüttük.',
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
    technologies: ['Computer Vision', 'Face Privacy', 'Cryptography'],
    visibility: 'private',
    collaboration: 'team',
    status: 'in-development',
    featured: 2,
    currentlyBuilding: true,
    translations: {
      en: {
        technicalDetails:
          'The application combines video review, face-region controls and protected image data. The comparison below uses a recorded approved result; no processing or encryption runs in the browser.',
        summary:
          'An ongoing team project on video face anonymization and cryptographic protection of image data.',
        overview:
          'We are developing SecureFace together as a team, combining computer vision for face anonymization with cryptographic protection of image data.',
      },
      tr: {
        technicalDetails:
          'Uygulama video inceleme, yüz bölgesi kontrolleri ve görüntü verilerinin korunmasını bir araya getirir. Aşağıdaki karşılaştırma onaylı kayıtlı sonuçtur; tarayıcıda işleme veya şifreleme çalışmaz.',
        summary:
          'Videolarda yüz anonimleştirme ve görüntü verilerinin kriptografik yöntemlerle korunması üzerine devam eden ekip çalışması.',
        overview:
          'SecureFace’i ekip olarak geliştiriyoruz. Yüz anonimleştirme için bilgisayarlı görü, görüntü verilerinin korunması için kriptografik yöntemler üzerine çalışıyoruz.',
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
    technologies: ['Python', 'Reinforcement Learning'],
    visibility: 'private',
    status: 'in-development',
    currentlyBuilding: true,
    translations: {
      en: {
        technicalDetails:
          'Manual turns and cube-state inspection are separate from model experiments. The lightweight preview below is an independent simulation; general model solving success is not claimed.',
        summary:
          'An experimental project exploring how reinforcement learning can be used to solve the Rubik’s Cube.',
        overview:
          'I’m experimenting with reinforcement learning to train an agent for the Rubik’s Cube, alongside an interface for inspecting cube states and moves.',
      },
      tr: {
        technicalDetails:
          'Elle hamleler ve küp durumu incelemesi model deneylerinden ayrıdır. Aşağıdaki hafif ön izleme bağımsız bir simülasyondur; modelin genel çözüm başarısı iddia edilmez.',
        summary:
          'Rubik küpünü çözmek için pekiştirmeli öğrenme yöntemlerini araştırdığım deneysel proje.',
        overview:
          'Rubik küpü için bir ajan eğitmek üzere pekiştirmeli öğrenme deneyleri yapıyor, küp durumlarını ve hamleleri inceleyebileceğim bir arayüz geliştiriyorum.',
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
