// case-study.js — entry point for case-study.html.
// Reads ?project=<slug> from the URL, renders that project
// through the single shared template, then wires up the same
// shared behaviors used on the homepage (cursor, header, reveal)
// plus the case-study-only progress rail.
import './styles/case-study-entry.css';

import { initCursor } from './modules/cursor.js';
import { initHeader } from './modules/header.js';
import { initClock } from './modules/clock.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { renderCaseStudy } from './modules/caseStudyRenderer.js';
import { initProgressRail } from './modules/progressRail.js';
import { initLenis } from './modules/lenis.js';
import { initCaseStudyAnimation } from "./modules/animations/caseStudy.js";
import { initMagnetic } from "./modules/animations/magnetic.js";
import { initThreeDepth } from "./modules/threeDepth.js";
import { initExhibitionViewer } from "./modules/exhibitionViewer.js";


document.body.classList.add('light');
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('project');

  const project = renderCaseStudy(slug);

initLenis();

initCursor();
initHeader();
initClock();

initScrollReveal(document);

if (project) {
    initCaseStudyAnimation();
    initThreeDepth(project);
    initExhibitionViewer(project);
    initProgressRail();
    initMagnetic();
}
});
