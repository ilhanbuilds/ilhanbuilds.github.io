import type { ProjectImage } from '../types/content';
import idleMenu from '../assets/images/idleoyun/menu.webp';
import idleLogin from '../assets/images/idleoyun/login.webp';
import idleGame from '../assets/images/idleoyun/gameplay.webp';
import idleMarket from '../assets/images/idleoyun/market.webp';
import idleUpgrade from '../assets/images/idleoyun/upgrade.webp';
import calculator from '../assets/images/calculator/calculation.webp';
import editor from '../assets/images/hcjeditor/live-preview.webp';
import dino from '../assets/images/dinocore/gameplay.webp';
import linaDark from '../assets/images/lina/dark-chat.webp';
import linaLight from '../assets/images/lina/light-chat.webp';
import linaAppearance from '../assets/images/lina/appearance.webp';
import linaWelcome from '../assets/images/lina/welcome.webp';
import rubikSolved from '../assets/images/rubikrl/solved-state.webp';
import rubikScrambled from '../assets/images/rubikrl/scrambled-state.webp';
import rubikInterface from '../assets/images/rubikrl/interface.webp';
import rackerOverview from '../assets/images/racker/overview.webp';
import rackerPlanning from '../assets/images/racker/android-planning.webp';
import rackerTracking from '../assets/images/racker/android-tracking.webp';
import rackerWatch from '../assets/images/racker/wear-os.webp';
import rackerLogo from '../assets/images/racker/logo.webp';
import kutlumiHome from '../assets/images/kutlumi/home.webp';
import kutlumiCreate from '../assets/images/kutlumi/create.webp';
import kutlumiThemes from '../assets/images/kutlumi/themes.webp';
import kutlumiEnvelopes from '../assets/images/kutlumi/envelopes.webp';
import secureUpload from '../assets/images/secureface/upload.webp';
import secureAnonymization from '../assets/images/secureface/anonymization.webp';

interface ProjectMedia {
  coverImage: ProjectImage;
  gallery?: ProjectImage[];
  timelineImage?: ProjectImage;
  logo?: ProjectImage;
}

export const projectImages = {
  racker: {
    coverImage: {
      src: rackerOverview,
      alt: {
        en: 'Provided Racker promotional artwork showing the Android and Wear OS interfaces.',
        tr: 'Racker’ın Android ve Wear OS arayüzlerini gösteren, sağlanan tanıtım görseli.',
      },
    },
    logo: {
      src: rackerLogo,
      alt: {
        en: 'Official Racker app icon from Google Play.',
        tr: 'Google Play’den alınan resmi Racker uygulama simgesi.',
      },
    },
    gallery: [
      {
        src: rackerPlanning,
        alt: {
          en: 'Racker’s supplied Android composition: home, calendar, programs, program editor and exercise selection, with demo data.',
          tr: 'Sağlanan Racker Android kompozisyonu: demo verilerle ana sayfa, takvim, programlar, program düzenleme ve egzersiz seçimi.',
        },
      },
      {
        src: rackerTracking,
        alt: {
          en: 'Racker’s supplied Android composition showing active training, set tracking and progress with demo data.',
          tr: 'Sağlanan Racker Android kompozisyonunda demo verilerle canlı antrenman, set takibi ve gelişim ekranları.',
        },
      },
      {
        src: rackerWatch,
        alt: {
          en: 'Provided Racker Wear OS composition showing workout, rest timer and summary screens.',
          tr: 'Antrenman, dinlenme sayacı ve özet ekranlarını gösteren, sağlanan Racker Wear OS kompozisyonu.',
        },
      },
    ],
  },
  kutlumi: {
    coverImage: {
      src: kutlumiHome,
      alt: {
        en: 'Kutlumi’s landing page and celebration preview with approved demo names.',
        tr: 'Onaylı demo isimlerle Kutlumi ana sayfası ve kutlama ön izlemesi.',
      },
    },
    gallery: [
      {
        src: kutlumiCreate,
        alt: {
          en: 'Creating a celebration in Kutlumi using approved demo text and values.',
          tr: 'Kutlumi’de onaylı demo metin ve değerlerle kutlama oluşturma.',
        },
      },
      {
        src: kutlumiThemes,
        alt: {
          en: 'Kutlumi’s character and theme selection.',
          tr: 'Kutlumi’de karakter ve tema seçimi.',
        },
      },
      {
        src: kutlumiEnvelopes,
        alt: {
          en: 'Unopened celebration envelopes labeled with approved demo names.',
          tr: 'Onaylı demo isimlerin yer aldığı açılmamış kutlama zarfları.',
        },
      },
    ],
  },
  secureface: {
    coverImage: {
      src: secureAnonymization,
      alt: {
        en: 'SecureFace’s anonymization interface with the portfolio owner’s approved face example.',
        tr: 'Portfolyo sahibinin paylaşımına onay verdiği yüz örneğiyle SecureFace anonimleştirme arayüzü.',
      },
    },
    gallery: [
      {
        src: secureUpload,
        alt: {
          en: 'SecureFace’s video upload screen.',
          tr: 'SecureFace video yükleme ekranı.',
        },
      },
    ],
  },
  idleoyun: {
    coverImage: {
      src: idleGame,
      alt: {
        en: 'The original IdleOyun click-based game with its click and market buttons.',
        tr: 'Orijinal IdleOyun: tıklama ve market düğmelerinin bulunduğu oyun ekranı.',
      },
    },
    gallery: [
      {
        src: idleMenu,
        alt: {
          en: 'IdleOyun’s original main menu.',
          tr: 'IdleOyun’un orijinal ana menüsü.',
        },
      },
      {
        src: idleLogin,
        alt: {
          en: 'IdleOyun’s empty login form.',
          tr: 'IdleOyun’un boş giriş formu.',
        },
      },
      {
        src: idleMarket,
        alt: {
          en: 'The market screen with strength, rebirth and prestige upgrades.',
          tr: 'Güç, rebirth ve prestige seçeneklerinin yer aldığı market ekranı.',
        },
      },
      {
        src: idleUpgrade,
        alt: {
          en: 'IdleOyun’s market after a strength upgrade.',
          tr: 'Güç yükseltmesinden sonra IdleOyun marketi.',
        },
      },
    ],
  },
  calculator: {
    coverImage: {
      src: calculator,
      alt: {
        en: 'The original Windows Forms calculator showing 128 + 256.',
        tr: '128 + 256 işlemini gösteren orijinal Windows Forms hesap makinesi.',
      },
    },
  },
  hcjeditor: {
    coverImage: {
      src: editor,
      alt: {
        en: 'HTML, CSS and JavaScript panels above HCJEditor’s live preview.',
        tr: 'HCJEditor’da HTML, CSS ve JavaScript panelleri ile canlı ön izleme.',
      },
    },
  },
  dinocore: {
    coverImage: {
      src: dino,
      alt: {
        en: 'DinoCore gameplay with resource production, upgrades and navigation tabs.',
        tr: 'DinoCore’da kaynak üretimi, yükseltmeler ve alt gezinme sekmeleri.',
      },
    },
  },
  lina: {
    coverImage: {
      src: linaDark,
      alt: {
        en: 'Lina’s dark interface with a conversation about interface design.',
        tr: 'Lina’nın koyu temasında arayüz tasarımı üzerine örnek sohbet.',
      },
    },
    gallery: [
      {
        src: linaLight,
        alt: {
          en: 'The same Lina conversation in the light theme.',
          tr: 'Aynı Lina sohbetinin açık tema görünümü.',
        },
      },
      {
        src: linaAppearance,
        alt: {
          en: 'Lina’s appearance settings for theme and interface density.',
          tr: 'Lina’da tema ve arayüz yoğunluğu için görünüm ayarları.',
        },
      },
      {
        src: linaWelcome,
        alt: {
          en: 'Lina’s welcome screen and new conversation composer.',
          tr: 'Lina’nın karşılama ekranı ve yeni sohbet alanı.',
        },
      },
    ],
  },
  rubikrl: {
    coverImage: {
      src: rubikInterface,
      alt: {
        en: 'RubikRL’s cube simulator and manual move controls.',
        tr: 'RubikRL küp simülatörü ve elle hamle kontrolleri.',
      },
    },
    gallery: [
      {
        src: rubikSolved,
        alt: {
          en: 'The simulator displaying an ordered cube state, not a solving result.',
          tr: 'Simülatörde düzenli küp durumu; çözüm başarımı sonucu değildir.',
        },
      },
      {
        src: rubikScrambled,
        alt: {
          en: 'A scrambled cube in the RubikRL simulator.',
          tr: 'RubikRL simülatöründe karıştırılmış küp.',
        },
      },
    ],
  },
} satisfies Record<string, ProjectMedia>;
