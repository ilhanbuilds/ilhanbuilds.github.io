import dinocore from '../assets/covers/dinocore.webp';
import dinocoreEn from '../assets/covers/dinocore-en.webp';
import secureface from '../assets/covers/secureface.webp';
import securefaceEn from '../assets/covers/secureface-en.webp';
import rubikrl from '../assets/covers/rubikrl.webp';
import rubikrlEn from '../assets/covers/rubikrl-en.webp';
import deepfakedetection from '../assets/covers/deepfake-detection.webp';
import deepfakedetectionEn from '../assets/covers/deepfake-detection-en.webp';
import type { Locale, ProjectImage } from '../types/content';
import idleoyun from '../assets/covers/idleoyun.webp';
import idleoyunEn from '../assets/covers/idleoyun-en.webp';
import calculator from '../assets/covers/calculator.webp';
import calculatorEn from '../assets/covers/calculator-en.webp';
import hcjeditor from '../assets/covers/hcjeditor.webp';
import hcjeditorEn from '../assets/covers/hcjeditor-en.webp';
import kutlumi from '../assets/covers/kutlumi.webp';
import kutlumiEn from '../assets/covers/kutlumi-en.webp';
import lina from '../assets/covers/lina.webp';
import linaEn from '../assets/covers/lina-en.webp';
import bilekten from '../assets/covers/bilekten.webp';
import bilektenEn from '../assets/covers/bilekten-en.webp';

// Promotional compositions are distinct from the approved screenshot inventory.
// Missing entries intentionally retain the project's original approved image.
export const promotionalCovers: Partial<
  Record<string, Partial<Record<Locale, ProjectImage>>>
> = {
  dinocore: {
    tr: {
      src: dinocore,
      alt: {
        tr: 'DinoCore tanıtımı: erken aşama Unity idle oyun prototipi.',
        en: 'DinoCore promotional artwork: an early Unity idle game prototype.',
      },
    },
    en: {
      src: dinocoreEn,
      alt: {
        tr: 'DinoCore tanıtımı: erken aşama Unity idle oyun prototipi.',
        en: 'DinoCore promotional artwork: an early Unity idle game prototype.',
      },
    },
  },
  secureface: {
    tr: {
      src: secureface,
      alt: {
        tr: 'SecureFace tanıtımı: yüz gizliliği üzerine ekip araştırması.',
        en: 'SecureFace promotional artwork: team research on face privacy.',
      },
    },
    en: {
      src: securefaceEn,
      alt: {
        tr: 'SecureFace tanıtımı: yüz gizliliği üzerine ekip araştırması.',
        en: 'SecureFace promotional artwork: team research on face privacy.',
      },
    },
  },
  rubikrl: {
    tr: {
      src: rubikrl,
      alt: {
        tr: 'RubikRL tanıtımı: pekiştirmeli öğrenme ile deneysel küp araştırması.',
        en: 'RubikRL promotional artwork: experimental reinforcement learning and cube research.',
      },
    },
    en: {
      src: rubikrlEn,
      alt: {
        tr: 'RubikRL tanıtımı: pekiştirmeli öğrenme ile deneysel küp araştırması.',
        en: 'RubikRL promotional artwork: experimental reinforcement learning and cube research.',
      },
    },
  },
  'deepfake-detection': {
    tr: {
      src: deepfakedetection,
      alt: {
        tr: 'Deepfake Detection tanıtımı: temsili görsel; gerçek model sonucu veya skor içermez.',
        en: 'Deepfake Detection promotional artwork: illustrative imagery with no actual model result or score.',
      },
    },
    en: {
      src: deepfakedetectionEn,
      alt: {
        tr: 'Deepfake Detection tanıtımı: temsili görsel; gerçek model sonucu veya skor içermez.',
        en: 'Deepfake Detection promotional artwork: illustrative imagery with no actual model result or score.',
      },
    },
  },
  bilekten: {
    tr: {
      src: bilekten,
      alt: {
        tr: 'Bilekten tanıtım kompozisyonu: Android ve Wear OS ile telefon kontrolleri.',
        en: 'Bilekten promotional composition: phone controls with Android and Wear OS.',
      },
    },
    en: {
      src: bilektenEn,
      alt: {
        tr: 'Bilekten için İngilizce tanıtım ve özgün Türkçe saat ekranı.',
        en: 'Bilekten promotional composition with English text and the original Turkish watch interface.',
      },
    },
  },
  idleoyun: {
    tr: {
      src: idleoyun,
      alt: {
        tr: 'IdleOyun tanıtım kompozisyonu: ilk Python tıklama oyunu.',
        en: 'IdleOyun promotional composition: the first Python clicker game.',
      },
    },
    en: {
      src: idleoyunEn,
      alt: {
        tr: 'IdleOyun için İngilizce tanıtım ve özgün Türkçe oyun ekranı.',
        en: 'IdleOyun promotional composition with English text and the original Turkish game view.',
      },
    },
  },
  calculator: {
    tr: {
      src: calculator,
      alt: {
        tr: 'Calculator tanıtım kompozisyonu: temel işlemler için Windows Forms uygulaması.',
        en: 'Calculator promotional composition: a Windows Forms app for basic arithmetic.',
      },
    },
    en: {
      src: calculatorEn,
      alt: {
        tr: 'Calculator için İngilizce tanıtım ve özgün Windows Forms ekranı.',
        en: 'Calculator promotional composition with English text and the original Windows Forms view.',
      },
    },
  },
  hcjeditor: {
    tr: {
      src: hcjeditor,
      alt: {
        tr: 'HCJEditor tanıtım kompozisyonu: HTML, CSS ve JavaScript ile canlı ön izleme.',
        en: 'HCJEditor promotional composition: HTML, CSS and JavaScript with live preview.',
      },
    },
    en: {
      src: hcjeditorEn,
      alt: {
        tr: 'HCJEditor için İngilizce tanıtım ve özgün Türkçe editör ekranı.',
        en: 'HCJEditor promotional composition with English text and the original Turkish editor view.',
      },
    },
  },
  kutlumi: {
    tr: {
      src: kutlumi,
      alt: {
        tr: 'Kutlumi tanıtım kompozisyonu: mesajlar, temalar ve kutlama zarfları.',
        en: 'Kutlumi promotional composition: messages, themes and celebration envelopes.',
      },
    },
    en: {
      src: kutlumiEn,
      alt: {
        tr: 'Kutlumi için İngilizce tanıtım ve onaylı Türkçe demo ekranı.',
        en: 'Kutlumi promotional composition with English text and the approved Turkish demo view.',
      },
    },
  },
  lina: {
    tr: {
      src: lina,
      alt: {
        tr: 'Lina tanıtım kompozisyonu: yerel masaüstü asistanının kayıtlı arayüzü.',
        en: 'Lina promotional composition: a recorded view of the local desktop assistant.',
      },
    },
    en: {
      src: linaEn,
      alt: {
        tr: 'Lina için İngilizce tanıtım; geliştirmeye ara verildiği ve özgün Türkçe arayüz belirtilir.',
        en: 'Lina promotional composition: development paused, with English text and the recorded Turkish interface.',
      },
    },
  },
};
