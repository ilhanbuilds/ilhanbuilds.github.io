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
          'A Python game built around clicking, earning in-game currency and buying upgrades.',
      },
      tr: {
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
          'I used Unity and AI-assisted development tools to build the resource production and upgrade systems.',
      },
      tr: {
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
        summary:
          'A website for creating personal celebrations with messages, themes and envelopes.',
      },
      tr: {
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
        summary:
          'A modular desktop assistant running local AI models. One of my first larger personal projects, currently on hold.',
        overview:
          'The assistant uses local models and a modular structure for conversations and settings. Development is currently paused.',
      },
      tr: {
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
          'We worked together on an academic deep learning project to classify real and manipulated face images using PyTorch and EfficientNet.',
      },
      tr: {
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
          'We are developing SecureFace together as a team, combining computer vision for face anonymization with cryptographic protection of image data.',
      },
      tr: {
        summary:
          'Gerçek zamanlı yüz anonimleştirme ve görüntü verilerinin kriptografik yöntemlerle korunması üzerine devam eden ekip araştırması.',
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
          'I’m experimenting with reinforcement learning to train an agent for the Rubik’s Cube, alongside an interface for inspecting cube states and moves.',
      },
      tr: {
        summary:
          'Rubik küpünü çözmek için pekiştirmeli öğrenme yöntemlerini araştırdığım deneysel proje.',
        overview:
          'Rubik küpü için bir ajan eğitmek üzere pekiştirmeli öğrenme deneyleri yapıyor, küp durumlarını ve hamleleri inceleyebileceğim bir arayüz geliştiriyorum.',
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
