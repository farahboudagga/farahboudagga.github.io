PORTFOLIO - Farah Boudagga
===========================

HOW TO OPEN
  Double-click index.html (needs internet only for the Google Fonts).

FOLDERS
  index.html      structure of the page + texts (English in the tag, French in data-fr="...")
  css/style.css   colors, fonts, layout  (change --ac at the top to change the main color)
  js/config.js    YOUR DATA: email, LinkedIn, GitHub, CV, images, projects, skills, community
  js/main.js      behavior (animations, language switch, terminal) - no need to edit
  assets/img/     photos and project screenshots
  assets/cv/      your CV (PDF)

COMMON CHANGES
  Change my email         -> js/config.js, line "email:"        (it updates the whole site)
  Change my profile photo -> replace assets/img/portrait.jpg  (or change images.portrait)
  Update my CV            -> replace assets/cv/Farah_Boudagga_CV.pdf (keep the same name)
                             (the only CV button is in the hero, next to "See my work")
  Change the loading screen -> index.html (id="pre"), css/style.css (LOADING SCREEN), js/main.js (section 13)
  Add a project           -> js/config.js, copy a block inside "projects: [ ... ]"
  Add a skill             -> js/config.js, add a name inside "skills: [ ... ]"
  Change a sentence       -> index.html (and its French version in data-fr="...")

After any change: save, then refresh the browser with Ctrl + F5.
