/*
  Оживление страницы и отправка заявки.

  Заявка уходит в ту же базу, что и заявки из приложения
  (`applications/{uid}`), поэтому совет клуба видит их в одном списке — вне
  зависимости от того, пришёл человек с сайта или из приложения. Правила
  Firestore требуют все три согласия, поэтому форма не даёт отправить без них
  не только ради вежливости: без согласий запись просто не создастся.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

/* ── Появление блоков при прокрутке ────────────────────────────────────── */

const revealables = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const watcher = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        // Блок появляется один раз: повторная анимация при возврате к нему
        // читается как дефект, а не как эффект.
        watcher.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
  );
  revealables.forEach(node => watcher.observe(node));
} else {
  // Без наблюдателя показываем всё сразу: пустая страница хуже отсутствия
  // анимации.
  revealables.forEach(node => node.classList.add("is-in"));
}

/* ── Искры на первом экране ────────────────────────────────────────────── */

/* Немного медленных искр, поднимающихся снизу. Это не фейерверк: штук
   сорок, тёплого цвета, с затуханием — жар от углей, а не спецэффект. */
const embers = document.getElementById("embers");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (embers && !reduceMotion) {
  const ctx = embers.getContext("2d");
  let width = 0, height = 0, sparks = [];

  const spawn = () => ({
    x: Math.random() * width,
    y: height + Math.random() * 40,
    r: 0.8 + Math.random() * 2.2,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -(0.35 + Math.random() * 0.75),
    life: 0,
    span: 240 + Math.random() * 300,
    hue: 18 + Math.random() * 22,
  });

  const resize = () => {
    const box = embers.parentElement.getBoundingClientRect();
    width = embers.width = Math.floor(box.width);
    height = embers.height = Math.floor(box.height);
    const count = Math.min(60, Math.round(width / 24));
    sparks = Array.from({ length: count }, () => {
      const s = spawn();
      s.y = Math.random() * height;
      s.life = Math.random() * s.span;
      return s;
    });
  };

  const tick = () => {
    ctx.clearRect(0, 0, width, height);
    for (const s of sparks) {
      s.life += 1;
      s.x += s.vx + Math.sin(s.life / 40) * 0.25;
      s.y += s.vy;
      const t = s.life / s.span;
      const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${s.hue}, 100%, 62%, ${Math.max(0, alpha) * 0.85})`;
      ctx.shadowColor = `hsla(${s.hue}, 100%, 55%, 0.9)`;
      ctx.shadowBlur = 12;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (t >= 1 || s.y < -20) Object.assign(s, spawn());
    }
    requestAnimationFrame(tick);
  };

  resize();
  addEventListener("resize", resize, { passive: true });
  requestAnimationFrame(tick);
}

/* ── Матовая шапка после прокрутки ─────────────────────────────────────── */

const top = document.getElementById("top");
if (top) {
  const onScroll = () => top.classList.toggle("is-stuck", window.scrollY > 24);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

/* ── Заявка ────────────────────────────────────────────────────────────── */

const form = document.getElementById("apply");

if (form) {
  const submit = document.getElementById("apply-submit");
  const state = document.getElementById("apply-state");
  const consents = [...form.querySelectorAll(".consent input")];
  const name = form.elements.name;
  const phone = form.elements.phone;

  const say = (text, kind = "") => {
    state.textContent = text;
    state.dataset.kind = kind;
  };

  /* Телефон считаем указанным, если в нём хотя бы десять цифр: форматов
     записи много (+7, 8, скобки, пробелы), и придираться к ним значит
     отказывать людям из-за скобки. */
  const phoneLooksReal = () =>
    phone.value.replace(/[^0-9]/g, "").length >= 10;

  const ready = () =>
    name.value.trim().length >= 2 &&
    phoneLooksReal() &&
    consents.every(box => box.checked);

  const sync = () => {
    submit.disabled = !ready();
  };

  form.addEventListener("input", sync);
  form.addEventListener("change", sync);
  sync();

  let firestore = null;
  let auth = null;

  /* Firebase поднимаем только при первой отправке: на первом экране он не
     нужен, а тянуть SDK ради страницы, которую могут просто прочитать, —
     лишние килобайты каждому посетителю. */
  const connect = async () => {
    if (firestore) return { firestore, auth };
    const app = initializeApp({
      apiKey: "AIzaSyCM4ovpj4tw2zERcLCkzB1tCb3U4Il3mFU",
      authDomain: "burn-b365c.firebaseapp.com",
      projectId: "burn-b365c",
      storageBucket: "burn-b365c.firebasestorage.app",
      messagingSenderId: "643405050062",
      appId: "1:643405050062:web:fb9a9318c11f0fca5a209f",
    });
    auth = getAuth(app);
    firestore = getFirestore(app);
    return { firestore, auth };
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!ready()) return;

    submit.disabled = true;
    say("Отправляем…");

    try {
      await connect();
      const credential = await signInAnonymously(auth);
      const uid = credential.user.uid;

      /* Документ адресуется по uid: заявка у человека одна, и повторная
         отправка перезаписывает свою же, а не создаёт вторую. */
      await setDoc(
        doc(firestore, "applications", uid),
        {
          userId: uid,
          name: name.value.trim(),
          phone: phone.value.trim(),
          company: form.elements.company.value.trim(),
          city: "",
          source: "site",
          /* Согласия фиксируем поимённо, а не одним флагом: человек
             соглашался с конкретными вещами. */
          rulesAccepted: true,
          contactAccepted: true,
          dataAccepted: true,
          rulesVersion: "",
          status: "new",
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );

      form.reset();
      sync();
      say("Заявка отправлена. Менеджер клуба свяжется с вами.", "ok");
    } catch (error) {
      submit.disabled = false;
      say(
        "Не удалось отправить заявку. Напишите нам в Instagram — разберёмся.",
        "bad",
      );
      console.error(error);
    }
  });
}
