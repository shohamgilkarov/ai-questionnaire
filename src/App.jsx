import { useState } from "react";

const VIOLET = "#8B6CF6";
const LAV = "#CDBEFF";
const BG = "#0D0820";
const CARD = "rgba(255,255,255,0.055)";
const LINE = "rgba(205,190,255,0.22)";
const FG = "#F4F0FF";
const MUTED = "#B4A8D6";
const DISPLAY = "'Rubik', 'Assistant', system-ui, sans-serif";
const BODY = "'Assistant', 'Rubik', system-ui, sans-serif";

const SECTIONS = [
  {
    id: "personal",
    title: "קצת עליך",
    sub: "נתחיל בהיכרות קצרה",
    questions: [
      { id: "name", label: "שם מלא", type: "text", required: true, placeholder: "שמך" },
      { id: "email", label: "אימייל", type: "email", required: true, placeholder: "your@email.com" },
      { id: "phone", label: "טלפון", type: "tel", required: false, placeholder: "050-0000000" },
      { id: "work", label: "במה את עוסקת היום?", type: "text", required: false, placeholder: "לדוגמה: עיצוב, מנהלת סושיאל, יזמת, מצלמת..." },
      {
        id: "motivation",
        label: "מה מביא אותך ללמוד ליצור תוכן ויזואלי עם AI?",
        type: "textarea",
        required: false,
        placeholder: "ספרי בחופשיות — מה הציפייה, מה מרגש אותך בזה...",
      },
    ],
  },
  {
    id: "vision",
    title: "הוויז'ן שלך",
    sub: "מה הסגנון שחולמת עליו",
    questions: [
      {
        id: "style_words",
        label: "תארי את הסגנון הוויזואלי שחולמת עליו ב-3 מילים",
        type: "text",
        required: false,
        placeholder: "לדוגמה: נקי, עוצמתי, קינמטי...",
      },
      {
        id: "references",
        label: "מי יוצרת / מותג / חשבון מדבר/ת אליך ויזואלית?",
        type: "textarea",
        required: false,
        placeholder: "חשבון אינסטגרם, מותג, מפרסמת — מי גורמת לך להגיד ״רוצה כזה״?",
      },
      {
        id: "visual_style",
        label: "איזה סגנון ויזואלי הכי קרוב אלייך? (אפשר לסמן כמה)",
        type: "checkbox",
        options: [
          "אדיטוריאל – מקצועי וצנוע",
          "לייפסטייל – טבעי ואמיתי",
          "אופנה – דרמטי ומלוטש",
          "מינימליסטי – נקי ומדוד",
          "Bold – גרפי ועוצמתי",
          "קינמטי – כמו סרט",
          "לוקשרי – פרימיום ויוקרתי",
          "שמח ומלא צבע",
          "עדיין מחפשת את הסגנון שלי",
        ],
      },
    ],
  },
  {
    id: "voice",
    title: "הטאצ' והסיי שלך",
    sub: "מה את רוצה להגיד לעולם",
    questions: [
      {
        id: "content_says",
        label: "מה את רוצה שהתוכן שלך יגיד עליך / על המותג שלך?",
        type: "textarea",
        required: false,
        placeholder: "מה תרגיש מי שיצפה? מה תרצי שתישאר אצלה אחרי שתסגור?",
      },
      {
        id: "unique",
        label: "מה הזווית הייחודית שלך? מה מייחד אותך?",
        type: "textarea",
        required: false,
        placeholder: "מה יש לך שאין לאחרים? מה הסיפור שלך?",
      },
      {
        id: "current_content",
        label: "האם כבר יצרת תוכן ויזואלי?",
        type: "radio",
        options: [
          "כן – יש לי חשבון פעיל",
          "כן – ניסיתי קצת",
          "לא עדיין – זה צעד חדש עבורי",
        ],
      },
    ],
  },
  {
    id: "tools",
    title: "הכרת הכלים",
    sub: "נבדוק מאיפה מתחילים",
    questions: [
      {
        id: "tools_known",
        label: "אילו כלים את מכירה? (סמני הכל שרלוונטי)",
        type: "checkbox",
        options: [
          "Higgsfield",
          "Kolbo",
          "Artlist",
          "Canva AI",
          "CapCut",
          "Adobe Firefly",
          "Runway / Gen-3",
          "Midjourney",
          "ChatGPT",
          "אחר",
          "לא מכירה כלים ספציפיים",
        ],
      },
      {
        id: "ai_level",
        label: "מה הרמה הכללית שלך עם AI?",
        type: "radio",
        options: [
          "מתחילה לגמרי – לא ניסיתי כמעט",
          "ניסיתי כמה כלים אבל לא עבדתי איתם ברצינות",
          "עובדת עם AI קבוע, רוצה להעמיק",
        ],
      },
    ],
  },
  {
    id: "availability",
    title: "זמינות ומה הלאה",
    sub: "נסגור תיאום ונמשיך לדרך",
    questions: [
      {
        id: "schedule",
        label: "מתי את פנויה ללמוד? (אפשר לסמן כמה)",
        type: "checkbox",
        options: [
          "בוקר (09:00–13:00)",
          "צהריים (13:00–17:00)",
          "ערב (17:00–21:00)",
          "ימי חמישי / שישי בלבד",
          "גמישה – כל זמן מתאים",
        ],
      },
      {
        id: "community",
        label: "קהילת GROW AI – מקום שבו יוצרות מתמחות מתחברות, מתנסות ומתקדמות ביחד. האם תרצי להצטרף?",
        type: "radio",
        options: [
          "כן! מעניין אותי מאוד",
          "אולי – ספרי לי עוד",
          "לא כרגע",
        ],
      },
      {
        id: "anything_else",
        label: "יש משהו שחשוב לך שאדע לפני שנתחיל?",
        type: "textarea",
        required: false,
        placeholder: "כל מחשבה, ציפייה, שאלה – פתוח לכל מה שתרצי לשתף...",
      },
    ],
  },
];

const s = {
  page: {
    minHeight: "100vh",
    background: BG,
    backgroundImage:
      "radial-gradient(900px 700px at 50% -100px,#2B1858 0%,transparent 70%), radial-gradient(600px 500px at 100% 55%,rgba(91,63,209,0.18),transparent 70%)",
    backgroundRepeat: "no-repeat",
    fontFamily: BODY,
    direction: "rtl",
    color: FG,
    padding: "0 0 5rem",
  },
  hero: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "3rem 1.5rem 2rem",
    textAlign: "center",
  },
  eyebrow: {
    fontFamily: DISPLAY,
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.1em",
    color: LAV,
    marginBottom: "0.6rem",
    textTransform: "uppercase",
  },
  heroTitle: {
    fontFamily: DISPLAY,
    fontWeight: 800,
    fontSize: "clamp(28px,6vw,42px)",
    margin: "0 0 0.5rem",
    lineHeight: 1.15,
    color: FG,
  },
  heroSub: {
    fontFamily: BODY,
    fontSize: "1.05rem",
    color: MUTED,
    margin: "0 auto",
    maxWidth: 480,
    lineHeight: 1.65,
  },
  intro: {
    maxWidth: 640,
    margin: "2rem auto 0",
    border: `1px solid ${LINE}`,
    background: "linear-gradient(135deg,rgba(139,108,246,0.16),rgba(139,108,246,0.04))",
    borderRadius: 24,
    padding: "1.75rem 2rem",
    fontSize: "1rem",
    lineHeight: 1.85,
    color: FG,
  },
  introFrom: {
    fontFamily: DISPLAY,
    fontWeight: 700,
    color: LAV,
    marginTop: "0.75rem",
    display: "block",
  },
  card: {
    maxWidth: 640,
    margin: "1.5rem auto 0",
    border: `1px solid ${LINE}`,
    background: CARD,
    borderRadius: 24,
    padding: "1.75rem 2rem",
  },
  cardTitle: {
    fontFamily: DISPLAY,
    fontWeight: 800,
    fontSize: "1.25rem",
    color: LAV,
    marginBottom: "0.25rem",
  },
  cardSub: {
    fontSize: "0.9rem",
    color: MUTED,
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: `1px solid ${LINE}`,
  },
  qBlock: { marginBottom: "1.5rem" },
  label: {
    display: "block",
    fontFamily: DISPLAY,
    fontWeight: 700,
    fontSize: "0.97rem",
    color: FG,
    marginBottom: "0.6rem",
    lineHeight: 1.5,
  },
  input: {
    width: "100%",
    padding: "0.65rem 1rem",
    border: `1.5px solid ${LINE}`,
    borderRadius: 10,
    fontSize: "0.97rem",
    outline: "none",
    background: "rgba(255,255,255,0.06)",
    color: FG,
    fontFamily: BODY,
  },
  textarea: {
    width: "100%",
    padding: "0.65rem 1rem",
    border: `1.5px solid ${LINE}`,
    borderRadius: 10,
    fontSize: "0.97rem",
    outline: "none",
    background: "rgba(255,255,255,0.06)",
    color: FG,
    minHeight: 100,
    resize: "vertical",
    fontFamily: BODY,
    lineHeight: 1.6,
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "0.4rem",
    cursor: "pointer",
    padding: "0.45rem 0.75rem",
    borderRadius: 10,
    transition: "background 0.15s",
  },
  optionLabel: {
    fontSize: "0.95rem",
    color: MUTED,
    cursor: "pointer",
    flex: 1,
    lineHeight: 1.5,
  },
  optionLabelActive: {
    fontSize: "0.95rem",
    color: FG,
    cursor: "pointer",
    flex: 1,
    lineHeight: 1.5,
  },
  submitBtn: {
    display: "block",
    margin: "2.5rem auto 0",
    background: `linear-gradient(135deg,#A78BFA,#6D4CF0)`,
    color: "#fff",
    border: "none",
    borderRadius: 50,
    padding: "0.9rem 3.5rem",
    fontSize: "1.1rem",
    fontWeight: 800,
    fontFamily: DISPLAY,
    cursor: "pointer",
    letterSpacing: 0.5,
    boxShadow: "0 4px 24px rgba(139,108,246,0.4)",
  },
  successBox: {
    maxWidth: 520,
    margin: "5rem auto",
    textAlign: "center",
    border: `1px solid ${LINE}`,
    background: CARD,
    borderRadius: 28,
    padding: "3.5rem 2.5rem",
  },
  successTitle: {
    fontFamily: DISPLAY,
    fontWeight: 800,
    fontSize: "1.8rem",
    color: LAV,
    margin: "1rem 0 0.75rem",
  },
  successText: {
    color: MUTED,
    lineHeight: 1.75,
    fontSize: "1rem",
  },
  brand: {
    fontFamily: DISPLAY,
    fontWeight: 800,
    fontSize: 22,
    letterSpacing: "0.3em",
    color: LAV,
    textShadow: "0 0 24px rgba(139,108,246,0.55)",
    display: "block",
    marginTop: "1.5rem",
  },
  brandBy: {
    fontFamily: DISPLAY,
    fontWeight: 500,
    fontSize: 11,
    letterSpacing: "0.28em",
    color: MUTED,
    textTransform: "uppercase",
    display: "block",
  },
};

function RadioBtn({ checked }) {
  return (
    <div style={{
      width: 18, height: 18, borderRadius: "50%",
      border: `2px solid ${checked ? VIOLET : LINE}`,
      background: checked ? VIOLET : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {checked && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
    </div>
  );
}

function CheckBtn({ checked }) {
  return (
    <div style={{
      width: 18, height: 18, borderRadius: 5,
      border: `2px solid ${checked ? VIOLET : LINE}`,
      background: checked ? VIOLET : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function QuestionField({ q, value, onChange }) {
  if (q.type === "text" || q.type === "tel" || q.type === "email") {
    return (
      <input
        type={q.type}
        style={s.input}
        value={value || ""}
        placeholder={q.placeholder || ""}
        onChange={(e) => onChange(q.id, e.target.value)}
      />
    );
  }
  if (q.type === "textarea") {
    return (
      <textarea
        style={s.textarea}
        value={value || ""}
        placeholder={q.placeholder || ""}
        onChange={(e) => onChange(q.id, e.target.value)}
      />
    );
  }
  if (q.type === "radio") {
    return (
      <div>
        {q.options.map((opt) => {
          const checked = value === opt;
          return (
            <div
              key={opt}
              style={{ ...s.optionRow, background: checked ? "rgba(139,108,246,0.18)" : "transparent" }}
              onClick={() => onChange(q.id, opt)}
            >
              <RadioBtn checked={checked} />
              <span style={checked ? s.optionLabelActive : s.optionLabel}>{opt}</span>
            </div>
          );
        })}
      </div>
    );
  }
  if (q.type === "checkbox") {
    const selected = value || [];
    return (
      <div>
        {q.options.map((opt) => {
          const checked = selected.includes(opt);
          return (
            <div
              key={opt}
              style={{ ...s.optionRow, background: checked ? "rgba(139,108,246,0.18)" : "transparent" }}
              onClick={() => {
                const next = checked ? selected.filter((x) => x !== opt) : [...selected, opt];
                onChange(q.id, next);
              }}
            >
              <CheckBtn checked={checked} />
              <span style={checked ? s.optionLabelActive : s.optionLabel}>{opt}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

export default function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (id, val) => setAnswers((prev) => ({ ...prev, [id]: val }));

  const handleSubmit = async () => {
    const name = answers["name"] || "";
    const email = answers["email"] || "";
    if (!name.trim() || !email.trim()) {
      setError("נא למלא לפחות שם ואימייל כדי להמשיך.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const allQuestions = SECTIONS.flatMap((sec) => sec.questions);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      allQuestions.forEach((q) => {
        if (answers[q.id] !== undefined) {
          const v = answers[q.id];
          formData.append(q.label, Array.isArray(v) ? v.join(", ") : String(v || ""));
        }
      });
      const res = await fetch("https://formspree.io/f/xgoblgnv", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        const details = data?.errors?.map((e) => e.message).join(", ") || data?.error || "נסי שוב";
        setError("שגיאה בשליחה: " + details);
        setSubmitting(false);
        return;
      }
    } catch {
      setError("שגיאת רשת, נסי שוב.");
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.successBox}>
          <div style={{ fontSize: "2.5rem" }}>✨</div>
          <h2 style={s.successTitle}>תודה, מחכה לפגוש אותך!</h2>
          <p style={s.successText}>
            קיבלתי את הכל — אני אעבור על התשובות שלך ואיצור קשר בקרוב.
            <br /><br />
            בינתיים, מוזמנת להצטרף לקהילת GROW AI ולהתחיל להכיר את היוצרות שם.
          </p>
          <span style={s.brand}>GROW AI</span>
          <span style={s.brandBy}>by Shoham</span>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <p style={s.eyebrow}>GROW AI · by Shoham</p>
        <h1 style={s.heroTitle}>שאלון היכרות</h1>
        <p style={s.heroSub}>תוכן ויזואלי עם AI — בואי נכיר אותך לפני שנתחיל</p>
      </div>

      <div style={s.intro}>
        <strong style={{ color: LAV }}>היי יקירה ✨</strong>
        <br /><br />
        שמחה שהגעת לכאן.
        <br /><br />
        השאלון הזה הוא לא טופס — זו שיחה. ככל שתהיי כנה וספציפית, כך אוכל להכין עבורך תוכנית שבאמת מותאמת לסגנון שלך, לכלים שמעניינים אותך ולמקום שבו את רוצה להגיע.
        <br /><br />
        לוקח כ-5 דקות. בואי נתחיל 💜
        <span style={s.introFrom}>שוהם</span>
      </div>

      {SECTIONS.map((sec) => (
        <div key={sec.id} style={s.card}>
          <div style={s.cardTitle}>{sec.title}</div>
          <div style={s.cardSub}>{sec.sub}</div>
          {sec.questions.map((q) => (
            <div key={q.id} style={s.qBlock}>
              <label style={s.label}>
                {q.label}
                {q.required && <span style={{ color: VIOLET, marginRight: 3 }}>*</span>}
              </label>
              <QuestionField q={q} value={answers[q.id]} onChange={handleChange} />
            </div>
          ))}
        </div>
      ))}

      {error && (
        <p style={{ textAlign: "center", color: "#f87171", marginTop: "1rem", fontWeight: 600 }}>
          {error}
        </p>
      )}

      <button
        style={{ ...s.submitBtn, opacity: submitting ? 0.7 : 1 }}
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "שולח..." : "שליחת השאלון ✨"}
      </button>

      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <span style={s.brand}>GROW AI</span>
        <span style={s.brandBy}>by Shoham</span>
      </div>
    </div>
  );
}
