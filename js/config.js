/* =====================================================================
   config.js  -  YOUR DATA  (this is the file you edit most often)
   =====================================================================
   Everything that can change over time is here:
     1. Identity            (name, initials)
     2. Contact + links     (email, LinkedIn, GitHub)
     3. CV file
     4. Images              (portrait)
     5. Hero texts          (big title, typing words)
     6. Numbers             (stats)
     7. Skills              (scrolling banner)
     8. Projects            (cards)
     9. Experience          (tabs)
    10. Community           (hackathon, workshop)

   RULES
   - Keep the commas "," and the quotes "" exactly as they are.
   - Texts shown in two languages are written as a pair:
         ["English text", "Texte français"]
   - Image paths are relative to index.html (example: "assets/img/portrait.jpg").
     To change a photo: put the new file in assets/img/ and change the path here.
   - After editing, save the file and refresh the page (Ctrl + F5).
   ===================================================================== */

const CONFIG = {

  /* ---------- 1. IDENTITY ---------- */
  name: "Farah Boudagga",
  initials: "FB",                       // shown in the navbar logo

  /* ---------- 2. CONTACT + LINKS ---------- */
  // This email is used EVERYWHERE: contact card, "Copy address", contact form, terminal.
  email: "farahboudagga@yahoo.com",

  linkedin: {
    url: "https://www.linkedin.com/in/farah-boudagga-781b01399/",
    handle: "in/farah-boudagga-781b01399"      // text displayed under "LinkedIn"
  },
  github: {
    url: "https://github.com/farahboudagga",
    handle: "github.com/farahboudagga"         // text displayed under "GitHub"
  },

  /* ---------- 3. CV ---------- */
  // To update your CV: replace the PDF in assets/cv/ (same name) or change "file".
  cv: {
    file: "assets/cv/Farah_Boudagga_CV.pdf",
    downloadName: "Farah_Boudagga_CV.pdf"      // name of the file when someone downloads it
  },

  /* ---------- 4. IMAGES ---------- */
  images: {
    // Used in the navbar, hero, About section and LinkedIn preview card
    portrait: "assets/img/portrait.jpg"
    // Project and community images are set inside their own blocks below.
  },

  /* ---------- 5. HERO TEXTS ---------- */
  // Big title (animated letter by letter)
  headline: ["Real software, built end to end.", "Du vrai logiciel, construit de bout en bout."],

  // Words that are typed after "I work on ..."
  typingWords: [
    ["Software Engineering", "Génie logiciel"],
    ["Web Development", "Développement web"],
    ["Responsive Web Design", "Sites web responsive"],
    ["Frontend", "Frontend"],
    ["Backend", "Backend"],
    ["Problem Solving", "Résolution de problèmes"]
  ],

  /* ---------- 6. NUMBERS (Skills section) ---------- */
  // value = number that counts up, label = [English, French]
  stats: [
    { value: 3,  label: ["full-stack projects", "projets full-stack"] },
    { value: 10, label: ["internship weeks", "semaines de stage"] },
    { value: 2,  label: ["databases: MySQL and PostgreSQL", "bases de données : MySQL et PostgreSQL"] },
    { value: 3,  label: ["spoken languages", "langues parlées"] }
  ],

  /* ---------- 7. SKILLS (scrolling banner + terminal) ---------- */
  // The first 9 go in the top banner, the others in the bottom banner.
  skills: [
    "HTML5", "CSS3", "JavaScript", "Bootstrap", "Responsive Design", "Vite", "React", "Next.js", "Thymeleaf",
    "Java", "Spring Boot 3", "REST API", "JWT", "RBAC", "MySQL", "PostgreSQL", "Git", "GitHub", "Agile Scrum"
  ],

  /* ---------- 8. PROJECTS ---------- */
  // To add a project: copy one block { ... }, paste it after the last one (with a comma), edit it.
  // "github" is optional: delete the line if the project has no public repository.
  projects: [
    {
      name: "ShopFlow",
      period: ["Academic project, March to May 2026", "Projet académique, mars à mai 2026"],
      description: [
        "A complete e-commerce marketplace: products, users and client–seller interactions, with a Next.js frontend on a secured Spring Boot REST API.",
        "Une marketplace e-commerce complète : produits, utilisateurs et interactions client-vendeur, avec un frontend Next.js sur une API REST Spring Boot sécurisée."
      ],
      features: [                               // shown when you hover the image (desktop)
        ["JWT authentication with role-based access", "Authentification JWT avec accès par rôles"],
        ["Cart, orders, reviews and coupons", "Panier, commandes, avis et coupons"],
        ["Admin and seller dashboards", "Tableaux de bord administrateur et vendeur"]
      ],
      stack: ["Next.js", "Spring Boot 3", "MySQL", "REST API", "JWT"],
      github: "https://github.com/farahboudagga/shopflow",
      image: "assets/img/project-shopflow.jpg",
      imageAlt: "ShopFlow product page with price, discount and stock"
    },
    {
      name: "MediSmart",
      period: ["Academic project, February to May 2026", "Projet académique, février à mai 2026"],
      description: [
        "A hospital emergency platform with a dedicated space for emergency physicians, nurses, administrators and super admins.",
        "Une plateforme d’urgences hospitalières avec un espace dédié aux médecins urgentistes, infirmier(e)s, administrateurs et super admins."
      ],
      features: [
        ["Client/server architecture with authentication", "Architecture client/serveur avec authentification"],
        ["Entry by role for four hospital profiles", "Entrée par rôle pour quatre profils"],
        ["Built with Agile Scrum", "Développé en Agile Scrum"]
      ],
      stack: ["React", "Vite", "Spring Boot", "PostgreSQL", "JWT"],
      // no github line = no GitHub button on the card
      image: "assets/img/project-medismart.jpg",
      imageAlt: "MediSmart role selection screen"
    },
    {
      name: "Library Management",
      period: ["End-of-year project, Faculté des Sciences de Monastir", "Projet de fin d’année, Faculté des Sciences de Monastir"],
      description: [
        "A server-rendered web app to run a library: authors, a book catalogue and loyalty points.",
        "Une application web rendue côté serveur pour gérer une bibliothèque : auteurs, catalogue et points de fidélité."
      ],
      features: [
        ["Authors with loyalty points", "Auteurs avec points de fidélité"],
        ["Catalogue with ISBN, title and year", "Catalogue avec ISBN, titre et année"],
        ["Linking a book to an author awards 10 points", "Lier un livre à un auteur lui donne 10 points"]
      ],
      stack: ["Spring Boot", "MySQL", "Thymeleaf"],
      github: "https://github.com/farahboudagga/Gestion-Bibliotheque-SpringBoot",
      image: "assets/img/project-library.jpg",
      imageAlt: "Library management home screen"
    }
  ],

  /* ---------- 9. EXPERIENCE (tabs in the Experience section) ---------- */
  // Each step = [ [title EN, title FR], [description EN, description FR] ]
  experience: [
    [["Frontend development", "Développement frontend"],
     ["Building and refining the interface of the Dowell dashboard inside an existing codebase.", "Construction et amélioration de l’interface du dashboard Dowell dans un code existant."]],
    [["Local testing", "Tests en local"],
     ["Checking each change on my own machine before it goes any further.", "Vérification de chaque modification sur ma machine avant d’aller plus loin."]],
    [["Production testing", "Tests en production"],
     ["Verifying how the interface behaves in the live environment.", "Vérification du comportement de l’interface dans l’environnement réel."]],
    [["Debugging", "Débogage"],
     ["Tracing issues back to their cause and fixing them.", "Remonter jusqu’à la cause des problèmes et les corriger."]],
    [["Integration and validation", "Intégration et validation"],
     ["Making sure the interface works with the rest of the platform and does what it should.", "S’assurer que l’interface fonctionne avec le reste de la plateforme et fait ce qu’elle doit."]]
  ],

  /* ---------- 10. COMMUNITY (hackathon, workshop...) ---------- */
  certificateLabel: ["Certificate of participation", "Certificat de participation"],

  community: [
    {
      title: ["WEHACK 0.0", "WEHACK 0.0"],
      organizer: ["Hackathon organized by the IEEE FSM Student Branch", "Hackathon organisé par l’IEEE FSM Student Branch"],
      description: [
        "I took part in the WEHACK 0.0 hackathon and received my certificate of participation.",
        "J’ai participé au hackathon WEHACK 0.0 et reçu mon certificat de participation."
      ],
      tag: ["Hackathon", "Hackathon"],
      org: "IEEE FSM Student Branch",
      sealText: "IEEE FSM STUDENT BRANCH • WEHACK 0.0 • ",      // round rotating text (~35-40 characters)
      photos: [                                                  // the photo deck (first = on top)
        { image: "assets/img/hackathon-certificate.jpg",
          alt: "WEHACK 0.0 certificate of participation awarded to Farah Boudagga",
          caption: ["The certificate of participation", "Le certificat de participation"],
          focus: "50% 50%" },                                    // focus = which part of the photo stays visible
        { image: "assets/img/hackathon-with-certificate.jpg",
          alt: "Farah Boudagga holding her WEHACK 0.0 certificate",
          caption: ["With my certificate", "Avec mon certificat"],
          focus: "50% 30%" },
        { image: "assets/img/hackathon-badge.jpg",
          alt: "Farah Boudagga wearing her WEHACK 0.0 badge",
          caption: ["With my WEHACK 0.0 badge", "Avec mon badge WEHACK 0.0"],
          focus: "50% 22%" }
      ]
    },
    {
      title: ["LinkedIn and CV Creation workshop", "Atelier LinkedIn et création de CV"],
      organizer: ["Workshop organized by the IEEE FSM Student Branch", "Atelier organisé par l’IEEE FSM Student Branch"],
      description: [
        "I attended this workshop on building a professional LinkedIn profile and CV.",
        "J’ai suivi cet atelier consacré à la création d’un profil LinkedIn et d’un CV professionnels."
      ],
      tag: ["Workshop", "Atelier"],
      org: "IEEE FSM Student Branch",
      sealText: "IEEE FSM STUDENT BRANCH • WORKSHOP • ",
      photos: [
        { image: "assets/img/workshop-certificate.jpg",
          alt: "Certificate of participation for the LinkedIn and CV Creation workshop",
          caption: ["The certificate of participation", "Le certificat de participation"],
          focus: "50% 50%" }
      ]
    }
  ]
};
