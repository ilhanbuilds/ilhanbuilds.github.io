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
        summary:
          'My first small click-based idle game, written by hand in Python.',
        overview:
          'The starting point of my development journey: a small game built around clicking and progression. It stays here as a record of where I began.',
      },
      tr: {
        summary:
          'Python ile kendi ellerimle yazdığım ilk küçük tıklama tabanlı idle oyunu.',
        overview:
          'Yazılım yolculuğumun başlangıcı: tıklama ve ilerleme üzerine kurulu küçük bir oyun. Burada, başladığım noktayı gösteren bir kayıt olarak yer alıyor.',
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
        summary:
          'A simple calculator exploring desktop interfaces and basic arithmetic operations.',
      },
      tr: {
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
        summary:
          'A browser editor for writing or loading HTML, CSS and JavaScript, previewing the result live, and downloading it as one file.',
      },
      tr: {
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
    repositoryUrl: 'https://github.com/ilhanbuilds/DinoCore-Evolution-Idle',
    translations: {
      en: {
        summary:
          'My first Unity idle game, built in a short time using AI-assisted development tools.',
        process:
          'AI-assisted development was part of the process. Alongside IdleOyun, this project shows a different set of tools and a different way of approaching a game.',
      },
      tr: {
        summary:
          'Yapay zekâ destekli geliştirme araçlarından yararlanarak kısa sürede oluşturduğum ilk Unity idle oyunu.',
        process:
          'Geliştirme sürecinde yapay zekâ desteğinden yararlandım. IdleOyun ile birlikte bu proje, oyun geliştirmeye farklı araçlarla ve farklı bir yaklaşımla bakışımı gösteriyor.',
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
        summary:
          'A website for celebrating special occasions. Built as a personal project and not yet released.',
      },
      tr: {
        summary:
          'Özel günleri kutlamak için geliştirdiğim, henüz yayınlanmamış bir web sitesi.',
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
        summary:
          'A modular desktop assistant running local AI models. One of my first larger personal projects, currently on hold.',
        overview:
          'Started as a long-term project with a modular architecture and local models. Development is paused; the project remains part of my learning process.',
      },
      tr: {
        summary:
          'Yerel yapay zekâ modelleriyle çalışan modüler bir masaüstü asistanı. İlk kapsamlı kişisel projelerimden biri; geliştirmeye ara verdim.',
        overview:
          'Modüler mimari ve yerel modellerle uzun vadeli bir proje olarak başladım. Geliştirmeye ara vermiş olsam da öğrenme sürecimin bir parçası.',
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
          'Racker brings training, nutrition and physical progress tracking into one mobile application. It is my first real application, and the main focus of this portfolio.',
        technicalDetails:
          'Built with React Native, Expo and TypeScript, with an offline-first approach. The public documentation is maintained separately from the application source.',
      },
      tr: {
        summary:
          'Antrenman, beslenme ve fiziksel gelişim takibi için geliştirdiğim offline-first mobil uygulama. İlk gerçek uygulamam.',
        overview:
          'Racker, antrenman, beslenme ve fiziksel gelişim takibini tek bir mobil uygulamada bir araya getiriyor. İlk gerçek uygulamam ve bu portfolyonun ana odağı.',
        technicalDetails:
          'React Native, Expo ve TypeScript ile offline-first yaklaşımıyla geliştirildi. Herkese açık dokümantasyonu, uygulamanın kaynak kodundan ayrı tutuluyor.',
      },
    },
  },
  {
    id: 'deepfake-detection',
    slug: 'deepfake-detection',
    title: 'Deepfake Detection',
    year: 2026,
    timelineOrder: 8,
    category: { en: 'Academic project', tr: 'Akademik proje' },
    technologies: ['Python', 'PyTorch', 'EfficientNet'],
    visibility: 'public',
    collaboration: 'team',
    repositoryUrl: 'https://github.com/ilhanbuilds/deepfake-image-detection',
    translations: {
      en: {
        summary:
          'An academic team project using deep learning to classify real and manipulated face images.',
        overview:
          'Developed as a team project, with a focus on real and manipulated face image classification. The scope is face images, rather than the detection of every kind of AI manipulation.',
      },
      tr: {
        summary:
          'Gerçek ve sahte yüz görüntülerini derin öğrenme yöntemleriyle sınıflandırmaya yönelik akademik ekip çalışması.',
        overview:
          'Gerçek ve sahte yüz görüntülerinin sınıflandırılmasına odaklanan bir ekip projesi. Kapsamı yüz görüntüleri; her tür yapay zekâ manipülasyonunu tespit etme iddiası taşımıyor.',
      },
    },
  },
  {
    id: 'secureface',
    ...projectImages.secureface,
    slug: 'secureface',
    title: 'SecureFace',
    year: 2026,
    timelineOrder: 9,
    category: { en: 'Research & development', tr: 'Araştırma ve geliştirme' },
    technologies: ['Computer Vision', 'Face Privacy', 'Cryptography'],
    visibility: 'private',
    collaboration: 'team',
    status: 'in-development',
    featured: 2,
    currentlyBuilding: true,
    translations: {
      en: {
        summary:
          'An ongoing team research project on real-time face anonymization and cryptographic protection of image data.',
        overview:
          'We are exploring face privacy through computer vision and cryptography. The project is under development; this page describes the public scope of the research.',
      },
      tr: {
        summary:
          'Gerçek zamanlı yüz anonimleştirme ve görüntü verilerinin kriptografik yöntemlerle korunması üzerine devam eden ekip araştırması.',
        overview:
          'Bilgisayarlı görü ve kriptografi kullanarak yüz gizliliği üzerine çalışıyoruz. Proje geliştirme aşamasında; burada araştırmanın paylaşılması onaylanan kapsamı yer alıyor.',
      },
    },
  },
  {
    id: 'rubikrl',
    ...projectImages.rubikrl,
    slug: 'rubikrl',
    title: 'RubikRL',
    year: 2026,
    timelineOrder: 10,
    category: { en: 'Reinforcement learning', tr: 'Pekiştirmeli öğrenme' },
    technologies: ['Python', 'Reinforcement Learning'],
    visibility: 'private',
    status: 'in-development',
    currentlyBuilding: true,
    translations: {
      en: {
        summary:
          'An experimental project exploring how reinforcement learning can be used to solve the Rubik’s Cube.',
        overview:
          'An ongoing machine learning experiment in learning to solve the Rubik’s Cube. The work is exploratory and does not claim general solving success.',
      },
      tr: {
        summary:
          'Rubik küpünü çözmek için pekiştirmeli öğrenme yöntemlerini araştırdığım deneysel proje.',
        overview:
          'Rubik küpünü çözmeyi öğrenme üzerine devam eden bir makine öğrenmesi deneyi. Çalışma araştırma aşamasında ve genel çözüm başarısı iddiası taşımıyor.',
      },
    },
  },
];

export const timeline = [...projects].sort(
  (a, b) => a.timelineOrder - b.timelineOrder,
);
export const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured! - b.featured!);
export const building = projects.filter((p) => p.currentlyBuilding);
