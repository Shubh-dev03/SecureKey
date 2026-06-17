/* SecureKey — script.js
   All logic: generation, strength, copy, UI interactions */

"use strict";

/* ── Wordlist for passphrase generation 
   300 common English words chosen for clarity and memorability
 */
const WORDLIST = [
  "able",
  "acid",
  "aged",
  "also",
  "area",
  "army",
  "away",
  "back",
  "ball",
  "band",
  "bank",
  "base",
  "bath",
  "bear",
  "beat",
  "been",
  "bell",
  "best",
  "bird",
  "bite",
  "blow",
  "blue",
  "bold",
  "bone",
  "book",
  "born",
  "both",
  "bowl",
  "burn",
  "busy",
  "calm",
  "came",
  "card",
  "care",
  "cash",
  "cast",
  "cave",
  "chat",
  "chip",
  "city",
  "clam",
  "clay",
  "clip",
  "club",
  "coal",
  "coat",
  "code",
  "coil",
  "cold",
  "come",
  "cook",
  "cool",
  "cope",
  "core",
  "corn",
  "cost",
  "coup",
  "crew",
  "crop",
  "cure",
  "dark",
  "data",
  "date",
  "dawn",
  "days",
  "dead",
  "deal",
  "deck",
  "deep",
  "deer",
  "deny",
  "desk",
  "dial",
  "dice",
  "diet",
  "disk",
  "dock",
  "dome",
  "door",
  "dose",
  "down",
  "draw",
  "drop",
  "drum",
  "dual",
  "dusk",
  "dust",
  "earn",
  "east",
  "edge",
  "else",
  "emit",
  "epic",
  "even",
  "exam",
  "face",
  "fact",
  "fail",
  "fair",
  "fall",
  "fame",
  "farm",
  "fast",
  "fear",
  "feel",
  "fell",
  "felt",
  "file",
  "fill",
  "film",
  "find",
  "fire",
  "firm",
  "fish",
  "fist",
  "flag",
  "flat",
  "flow",
  "foam",
  "fold",
  "folk",
  "font",
  "food",
  "ford",
  "form",
  "fort",
  "foul",
  "free",
  "from",
  "fuel",
  "full",
  "fund",
  "fuse",
  "gain",
  "game",
  "gave",
  "gear",
  "gift",
  "give",
  "glad",
  "glow",
  "glue",
  "goal",
  "gold",
  "golf",
  "gone",
  "good",
  "grab",
  "grew",
  "grid",
  "grim",
  "grip",
  "grow",
  "gulf",
  "hall",
  "hand",
  "hang",
  "hard",
  "harm",
  "hash",
  "have",
  "heal",
  "heat",
  "heel",
  "held",
  "help",
  "here",
  "hero",
  "high",
  "hill",
  "hint",
  "hold",
  "hole",
  "holy",
  "home",
  "hook",
  "hope",
  "horn",
  "host",
  "hour",
  "huge",
  "hunt",
  "hurt",
  "icon",
  "idea",
  "idle",
  "inch",
  "iron",
  "item",
  "join",
  "jump",
  "just",
  "keen",
  "kept",
  "kind",
  "king",
  "knot",
  "know",
  "land",
  "lark",
  "last",
  "late",
  "lead",
  "leaf",
  "lean",
  "leap",
  "left",
  "lens",
  "lift",
  "like",
  "lime",
  "line",
  "link",
  "list",
  "live",
  "load",
  "lock",
  "loft",
  "lone",
  "long",
  "look",
  "loop",
  "lord",
  "lore",
  "lose",
  "lost",
  "loud",
  "love",
  "luck",
  "made",
  "main",
  "make",
  "many",
  "mark",
  "mask",
  "mass",
  "maze",
  "meal",
  "mean",
  "meet",
  "melt",
  "menu",
  "mere",
  "mesh",
  "mild",
  "milk",
  "mill",
  "mind",
  "mint",
  "miss",
  "mist",
  "mode",
  "mold",
  "moon",
  "more",
  "most",
  "move",
  "much",
  "must",
  "myth",
  "name",
  "navy",
  "near",
  "need",
  "nest",
  "next",
  "nice",
  "nine",
  "node",
  "norm",
  "note",
  "noun",
  "null",
  "oath",
  "open",
  "oral",
  "oven",
  "over",
  "pace",
  "page",
  "pain",
  "pair",
  "pale",
  "palm",
  "park",
  "part",
  "pass",
  "path",
  "peak",
  "peel",
  "peel",
  "peer",
  "pick",
  "pier",
  "pile",
  "pine",
  "pink",
  "pipe",
  "plan",
  "play",
  "plot",
  "plow",
  "plug",
  "plus",
  "poem",
  "poet",
  "poll",
  "pool",
  "poor",
  "port",
  "post",
  "pour",
  "prey",
  "prod",
  "pull",
  "pump",
  "pure",
  "push",
  "quit",
  "race",
  "rack",
  "rage",
  "raid",
  "rail",
  "rain",
  "rake",
  "ramp",
  "rank",
  "rate",
  "read",
  "real",
  "reap",
  "reef",
  "reel",
  "rely",
  "rest",
  "rice",
  "rich",
  "ride",
  "ring",
  "riot",
  "rise",
  "risk",
  "road",
  "roam",
  "rock",
  "role",
  "roll",
  "roof",
  "room",
  "root",
  "rope",
  "rose",
  "rude",
  "ruin",
  "rule",
  "rush",
  "safe",
  "sage",
  "sail",
  "sand",
  "save",
  "scan",
  "seal",
  "seed",
  "seek",
  "self",
  "sell",
  "send",
  "shed",
  "ship",
  "shop",
  "shot",
  "show",
  "shut",
  "sick",
  "side",
  "sift",
  "sign",
  "silk",
  "silo",
  "sing",
  "sink",
  "skip",
  "slab",
  "slam",
  "slim",
  "slip",
  "slow",
  "snow",
  "soil",
  "sole",
  "some",
  "song",
  "sort",
  "soul",
  "sour",
  "span",
  "spar",
  "spin",
  "star",
  "stay",
  "stem",
  "step",
  "stir",
  "stop",
  "stub",
  "such",
  "suit",
  "swap",
  "swim",
  "tail",
  "take",
  "tale",
  "tall",
  "tame",
  "tank",
  "task",
  "team",
  "tear",
  "tell",
  "tend",
  "term",
  "test",
  "text",
  "than",
  "then",
  "they",
  "thin",
  "this",
  "tick",
  "tide",
  "tied",
  "tile",
  "time",
  "tiny",
  "toll",
  "tomb",
  "tone",
  "tool",
  "torn",
  "tour",
  "town",
  "trap",
  "tree",
  "trek",
  "trim",
  "trio",
  "true",
  "tube",
  "tuck",
  "tune",
  "turn",
  "twin",
  "type",
  "unit",
  "upon",
  "used",
  "user",
  "vary",
  "vast",
  "verb",
  "vest",
  "view",
  "vine",
  "void",
  "volt",
  "vote",
  "wade",
  "wage",
  "wait",
  "wake",
  "walk",
  "wall",
  "wand",
  "ward",
  "warm",
  "warn",
  "warp",
  "wash",
  "wave",
  "weld",
  "well",
  "went",
  "were",
  "west",
  "wide",
  "wild",
  "will",
  "wind",
  "wine",
  "wing",
  "wire",
  "wise",
  "wish",
  "with",
  "wood",
  "word",
  "wore",
  "work",
  "worn",
  "wrap",
  "yard",
  "year",
  "yoga",
  "zero",
  "zone",
  "zoom",
];

/* ── Character Sets ──────────────────────────────────────── */
const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*-_=+<>?",
  similar: "O0lI1",
  ambiguous: "{}[]()/\\`~,;:.'\"",
};

/* ── DOM References ──────────────────────────────────────── */
const dom = {
  // Header
  themeToggle: document.getElementById("theme-toggle"),
  themeIcon: document.getElementById("theme-icon"),

  // Tabs
  tabs: document.querySelectorAll(".mode-tab"),
  panels: document.querySelectorAll(".panel"),

  // Password output
  outputText: document.getElementById("output-text"),
  visibilityToggle: document.getElementById("visibility-toggle"),
  regenBtn: document.getElementById("regenerate-btn"),
  copyBtn: document.getElementById("copy-btn"),
  strengthFill: document.getElementById("strength-fill"),
  strengthLabel: document.getElementById("strength-label"),

  // Password controls
  lengthSlider: document.getElementById("length-slider"),
  lengthDisplay: document.getElementById("length-display"),
  optUpper: document.getElementById("opt-upper"),
  optLower: document.getElementById("opt-lower"),
  optNumbers: document.getElementById("opt-numbers"),
  optSymbols: document.getElementById("opt-symbols"),
  optSimilar: document.getElementById("opt-similar"),
  optAmbiguous: document.getElementById("opt-ambiguous"),
  generateBtn: document.getElementById("generate-btn"),

  // Passphrase output
  passphraseText: document.getElementById("passphrase-text"),
  ppRegenBtn: document.getElementById("passphrase-regen-btn"),
  ppCopyBtn: document.getElementById("passphrase-copy-btn"),
  ppStrengthFill: document.getElementById("pp-strength-fill"),
  ppStrengthLabel: document.getElementById("pp-strength-label"),

  // Passphrase controls
  wordCountSlider: document.getElementById("word-count-slider"),
  wordCountDisplay: document.getElementById("word-count-display"),
  separatorSelect: document.getElementById("separator-select"),
  ppCapitalize: document.getElementById("pp-capitalize"),
  ppNumber: document.getElementById("pp-number"),
  passphraseGenBtn: document.getElementById("passphrase-gen-btn"),

  // Toast
  toast: document.getElementById("toast"),
  toastText: document.getElementById("toast-text"),
};

/* ── App State ───────────────────────────────────────────── */
const state = {
  mode: "password", // 'password' | 'passphrase'
  currentPwd: "",
  currentPP: "",
  pwdVisible: true,
  darkMode: false,
  toastTimer: null,
};

/* ── Cryptographic Random Integer ───────────────────────── */
function secureRandInt(max) {
  // Uses Web Crypto API for true randomness
  const array = new Uint32Array(1);
  let result;
  do {
    crypto.getRandomValues(array);
    // Reject values that would introduce bias
    result = array[0] % max;
  } while (array[0] - result + max - 1 < max - 1 && max > 1);
  return result;
}

/* ── Password Generator ─────────────────────────────────── */
function generatePassword() {
  const length = parseInt(dom.lengthSlider.value, 10);
  const useUpper = dom.optUpper.checked;
  const useLower = dom.optLower.checked;
  const useNums = dom.optNumbers.checked;
  const useSyms = dom.optSymbols.checked;
  const exSimilar = dom.optSimilar.checked;
  const exAmbig = dom.optAmbiguous.checked;

  // Guard: at least one charset must be selected
  if (!useUpper && !useLower && !useNums && !useSyms) {
    showToast("Pick at least one character type.", true);
    return null;
  }

  // Build charset
  let charset = "";
  if (useUpper) charset += CHARS.upper;
  if (useLower) charset += CHARS.lower;
  if (useNums) charset += CHARS.numbers;
  if (useSyms) charset += CHARS.symbols;

  // Apply exclusions
  if (exSimilar) {
    charset = charset
      .split("")
      .filter((c) => !CHARS.similar.includes(c))
      .join("");
  }
  if (exAmbig) {
    charset = charset
      .split("")
      .filter((c) => !CHARS.ambiguous.includes(c))
      .join("");
  }

  if (charset.length === 0) {
    showToast("No characters left after exclusions.", true);
    return null;
  }

  // Generate with guaranteed inclusion of each selected type
  // (Ensures password policy compliance)
  const required = [];
  const filtered = (pool) => {
    let p = pool;
    if (exSimilar)
      p = p
        .split("")
        .filter((c) => !CHARS.similar.includes(c))
        .join("");
    if (exAmbig)
      p = p
        .split("")
        .filter((c) => !CHARS.ambiguous.includes(c))
        .join("");
    return p;
  };

  if (useUpper) {
    const p = filtered(CHARS.upper);
    if (p) required.push(p[secureRandInt(p.length)]);
  }
  if (useLower) {
    const p = filtered(CHARS.lower);
    if (p) required.push(p[secureRandInt(p.length)]);
  }
  if (useNums) {
    const p = filtered(CHARS.numbers);
    if (p) required.push(p[secureRandInt(p.length)]);
  }
  if (useSyms) {
    const p = filtered(CHARS.symbols);
    if (p) required.push(p[secureRandInt(p.length)]);
  }

  // Fill remaining positions
  const remaining = length - required.length;
  const randomChars = Array.from(
    { length: remaining },
    () => charset[secureRandInt(charset.length)],
  );

  // Merge and shuffle (Fisher-Yates with crypto random)
  const all = [...required, ...randomChars];
  for (let i = all.length - 1; i > 0; i--) {
    const j = secureRandInt(i + 1);
    [all[i], all[j]] = [all[j], all[i]];
  }

  return all.join("");
}

/* ── Passphrase Generator ───────────────────────────────── */
function generatePassphrase() {
  const count = parseInt(dom.wordCountSlider.value, 10);
  const sep = dom.separatorSelect.value;
  const capitalize = dom.ppCapitalize.checked;
  const addNumber = dom.ppNumber.checked;

  const words = Array.from({ length: count }, () => {
    const word = WORDLIST[secureRandInt(WORDLIST.length)];
    return capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  });

  let phrase = words.join(sep);

  if (addNumber) {
    const num = secureRandInt(100);
    phrase = phrase + (sep || "-") + num;
  }

  return phrase;
}

/* ── Strength Calculator ────────────────────────────────── */
/*
  Scoring rubric (0–4):
  1 = Weak   → short length, single char class
  2 = Fair   → moderate length or two char classes
  3 = Good   → good length + multiple classes
  4 = Strong → long + diverse + bonus patterns
*/
function calcStrength(password) {
  if (!password || password.length < 4) return 0;

  let score = 0;
  const len = password.length;

  // Length score
  if (len >= 8) score += 1;
  if (len >= 12) score += 1;
  if (len >= 20) score += 1;

  // Character diversity
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const diversity = [hasUpper, hasLower, hasDigit, hasSymbol].filter(
    Boolean,
  ).length;
  score += diversity;

  // Penalise repetition
  const uniqueRatio = new Set(password).size / len;
  if (uniqueRatio < 0.5) score -= 1;

  // Sequential run penalty
  let maxRun = 1,
    run = 1;
  for (let i = 1; i < password.length; i++) {
    if (
      password.charCodeAt(i) === password.charCodeAt(i - 1) + 1 ||
      password[i] === password[i - 1]
    ) {
      run++;
      maxRun = Math.max(maxRun, run);
    } else {
      run = 1;
    }
  }
  if (maxRun >= 5) score -= 1;

  // Clamp
  score = Math.max(1, Math.min(4, Math.round(score / 2)));
  return score;
}

function calcPassphraseStrength(phrase) {
  const wordCount = phrase.split(/[-_. ]/).filter(Boolean).length;
  if (wordCount >= 6) return 4;
  if (wordCount >= 5) return 3;
  if (wordCount >= 4) return 2;
  return 1;
}

const STRENGTH_LABELS = {
  0: "—",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
};

function updateStrengthUI(score, fillEl, labelEl) {
  fillEl.setAttribute("data-strength", score || "");
  labelEl.setAttribute("data-strength", score || "");
  labelEl.textContent = STRENGTH_LABELS[score] || "—";
}

/* ── Output Rendering ───────────────────────────────────── */
function renderPassword(pwd) {
  if (!pwd) return;
  state.currentPwd = pwd;

  const el = dom.outputText;

  // Flash animation
  el.classList.remove("flash", "is-placeholder");
  void el.offsetWidth; // reflow
  el.classList.add("flash");

  if (state.pwdVisible) {
    el.textContent = pwd;
    el.classList.remove("is-masked");
  } else {
    el.textContent = "•".repeat(pwd.length);
    el.classList.add("is-masked");
  }

  // Enable action buttons
  dom.visibilityToggle.disabled = false;
  dom.regenBtn.disabled = false;
  dom.copyBtn.disabled = false;

  // Update strength
  const score = calcStrength(pwd);
  updateStrengthUI(score, dom.strengthFill, dom.strengthLabel);
}

function renderPassphrase(phrase) {
  if (!phrase) return;
  state.currentPP = phrase;

  const el = dom.passphraseText;
  el.classList.remove("flash", "is-placeholder");
  void el.offsetWidth;
  el.classList.add("flash");
  el.textContent = phrase;

  dom.ppRegenBtn.disabled = false;
  dom.ppCopyBtn.disabled = false;

  const score = calcPassphraseStrength(phrase);
  updateStrengthUI(score, dom.ppStrengthFill, dom.ppStrengthLabel);
}

/* ── Toast ───────────────────────────────────────────────── */
function showToast(message = "Copied to clipboard", isError = false) {
  dom.toastText.textContent = message;
  dom.toast.style.background = isError ? "#ef4444" : "";
  dom.toast.classList.add("toast--visible");

  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    dom.toast.classList.remove("toast--visible");
    dom.toast.style.background = "";
  }, 2200);
}

/* ── Copy to Clipboard ───────────────────────────────────── */
async function copyToClipboard(text, btn) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    const originalHTML = btn.innerHTML;
    btn.classList.add("icon-btn--copied");
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 12 4 10"/></svg>`;
    showToast("Copied to clipboard");
    setTimeout(() => {
      btn.classList.remove("icon-btn--copied");
      btn.innerHTML = originalHTML;
    }, 1800);
  } catch {
    // Fallback for older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Copied to clipboard");
    } catch {
      showToast("Copy failed — please copy manually", true);
    }
    document.body.removeChild(ta);
  }
}

/* ── Dark Mode ───────────────────────────────────────────── */
function applyTheme(dark) {
  state.darkMode = dark;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  dom.themeIcon.textContent = dark ? "☾" : "☀";
  localStorage.setItem("securekey-theme", dark ? "dark" : "light");
}

function initTheme() {
  const saved = localStorage.getItem("securekey-theme");
  const prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved ? saved === "dark" : prefDark);
}

/* ── Tab Switching ───────────────────────────────────────── */
function switchMode(mode) {
  state.mode = mode;

  dom.tabs.forEach((tab) => {
    const isActive = tab.dataset.mode === mode;
    tab.classList.toggle("mode-tab--active", isActive);
    tab.setAttribute("aria-selected", isActive);
  });

  dom.panels.forEach((panel) => {
    const isActive = panel.id === `panel-${mode}`;
    panel.classList.toggle("panel--hidden", !isActive);
    panel.hidden = !isActive;
  });
}

/* ── Loading State ───────────────────────────────────────── */
function setLoading(btn, loading) {
  btn.classList.toggle("btn--loading", loading);
  btn.disabled = loading;
}

/* ── Simulate brief async for UX polish ─────────────────── */
function withLoadingDelay(btn, fn) {
  setLoading(btn, true);
  // requestAnimationFrame ensures spinner renders before sync work
  requestAnimationFrame(() => {
    setTimeout(() => {
      fn();
      setLoading(btn, false);
    }, 80);
  });
}

/* ── Slider Live Sync ────────────────────────────────────── */
function syncSlider(input, display, ariaLabel) {
  const val = input.value;
  display.textContent = val;
  input.setAttribute("aria-valuenow", val);
  input.setAttribute("aria-label", ariaLabel(val));
  // Update fill track using a CSS custom property
  const pct = ((val - input.min) / (input.max - input.min)) * 100;
  input.style.setProperty("--fill", `${pct}%`);
}

/* ── Event Listeners ─────────────────────────────────────── */
function bindEvents() {
  // Theme toggle
  dom.themeToggle.addEventListener("click", () => applyTheme(!state.darkMode));

  // Tab switch
  dom.tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchMode(tab.dataset.mode));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchMode(tab.dataset.mode);
      }
    });
  });

  // Length slider
  dom.lengthSlider.addEventListener("input", () => {
    syncSlider(
      dom.lengthSlider,
      dom.lengthDisplay,
      (v) => `Password length: ${v} characters`,
    );
  });

  // Word count slider
  dom.wordCountSlider.addEventListener("input", () => {
    syncSlider(
      dom.wordCountSlider,
      dom.wordCountDisplay,
      (v) => `Word count: ${v} words`,
    );
  });

  // Generate password
  dom.generateBtn.addEventListener("click", () => {
    withLoadingDelay(dom.generateBtn, () => {
      const pwd = generatePassword();
      if (pwd) renderPassword(pwd);
    });
  });

  // Regenerate password
  dom.regenBtn.addEventListener("click", () => {
    const pwd = generatePassword();
    if (pwd) renderPassword(pwd);
  });

  // Toggle visibility
  dom.visibilityToggle.addEventListener("click", () => {
    state.pwdVisible = !state.pwdVisible;
    if (!state.currentPwd) return;

    const eyeOpen = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const eyeClosed = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

    if (state.pwdVisible) {
      dom.outputText.textContent = state.currentPwd;
      dom.outputText.classList.remove("is-masked");
      dom.visibilityToggle.innerHTML = eyeOpen;
      dom.visibilityToggle.setAttribute("aria-label", "Hide password");
    } else {
      dom.outputText.textContent = "•".repeat(state.currentPwd.length);
      dom.outputText.classList.add("is-masked");
      dom.visibilityToggle.innerHTML = eyeClosed;
      dom.visibilityToggle.setAttribute("aria-label", "Show password");
    }
  });

  // Copy password
  dom.copyBtn.addEventListener("click", () => {
    copyToClipboard(state.currentPwd, dom.copyBtn);
  });

  // Generate passphrase
  dom.passphraseGenBtn.addEventListener("click", () => {
    withLoadingDelay(dom.passphraseGenBtn, () => {
      const pp = generatePassphrase();
      renderPassphrase(pp);
    });
  });

  // Regenerate passphrase
  dom.ppRegenBtn.addEventListener("click", () => {
    renderPassphrase(generatePassphrase());
  });

  // Copy passphrase
  dom.ppCopyBtn.addEventListener("click", () => {
    copyToClipboard(state.currentPP, dom.ppCopyBtn);
  });
}
//   Keyboard shortcut: E

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  try {
    initTheme();
  } catch (e) {
    // ignore if theme init fails in older environments
  }
  bindEvents();

  // Ensure sliders show correct initial values
  if (dom.lengthSlider && dom.lengthDisplay) {
    syncSlider(
      dom.lengthSlider,
      dom.lengthDisplay,
      (v) => `Password length: ${v} characters`,
    );
  }
  if (dom.wordCountSlider && dom.wordCountDisplay) {
    syncSlider(
      dom.wordCountSlider,
      dom.wordCountDisplay,
      (v) => `Word count: ${v} words`,
    );
  }
});
