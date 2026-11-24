import { useState } from "react";

const BRAND = "#8B6CF6";
const BRAND_DARK = "#6D4CF0";
const BG = "#F8F5FF";
const TEXT = "#1E1A3E";
const MUTED = "#6B7280";
const BORDER = "#E5DFFE";
const LIGHT_BG = "#F3EEFF";
const DISPLAY = "'Rubik', 'Assistant', system-ui, sans-serif";
const BODY = "'Assistant', 'Rubik', system-ui, sans-serif";

const COMMUNITY_LINK = "https://chat.whatsapp.com/JFpjnywFnFU28keJpDrvKB?mode=gi_t";

const SECTIONS = [
  {
    id: "personal",
    title: "פרטים אישיים",
    questions: [
      { id: "name", label: "שם מלא", type: "text", required: true },
      { id: "email", label: "אימייל", type: "email", required: true },
      { id: "phone", label: "טלפון", type: "tel" },
      { id: "work", label: "במה את עוסקת?", type: "text" },
    ],
  },
  {
    id: "content",
    title: "סגנון ותוכן",
    questions: [
      {
        id: "learn_goal",
        label: "מה את רוצה ללמוד?",
        type: "checkbox",
        options: [
          "סוכנים חכמים לעסק",
          "עולמות הווידאו והסושיאל מדיה",
          "היכרות עם כלי AI הנפוצים בשוק",
          "מההתחלה ועד למתקדם",
          "אתרים ומערכות טכנולוגיות",
        ],
      },
      {
        id: "visual_style",
        label: "איזה סגנון ויזואלי מדבר אלייך?",
        type: "checkbox",
        options: [
          "מינימליסטי ונקי",
          "צבעוני ואנרגטי",
          "אופנתי ומלוטש",
          "חם וטבעי",
          "עדיין מחפשת את הסגנון שלי",
        ],
      },
      {
        id: "reference",
        label: "יש חשבון, מותג או יוצרת שאת מתחברת לסגנון ההפקה שלהם? צרפי לינק לאינסטגרם שלהם",
        type: "text",
        placeholder: "https://www.instagram.com/...",
        required: false,
      },
      {
        id: "tools",
        label: "אילו כלים כבר מכירה?",
        type: "checkbox",
        options: [
          "Higgsfield",
          "Kolbo",
          "Artlist",
          "CapCut",
          "Canva AI",
          "Runway",
          "ChatGPT",
          "Gemini",
          "Claude",
          "Seedance",
          "Kling",
          "לא מכירה עדיין",
        ],
      },
    ],
  },
  {
    id: "learning",
    title: "רמה וסגנון למידה",
    questions: [
      {
        id: "ai_level",
        label: "מה הרמה שלך עם AI?",
        type: "radio",
        options: [
          "מתחילה לגמרי",
          "ניסיתי כמה כלים",
          "עובדת עם AI בקביעות",
        ],
      },
      {
        id: "learning_style",
        label: "איך את לומדת הכי טוב?",
        type: "checkbox",
        options: [
          "להסתכל ואז לנסות",
          "הסברים כתובים שאפשר לחזור אליהם",
          "לצלול ולנסות לבד",
          "שילוב של הכל",
        ],
      },
    ],
  },
  {
    id: "availability",
    title: "זמינות",
    questions: [
      {
        id: "schedule",
        label: "מתי את פנויה?",
        type: "checkbox",
        options: ["בוקר", "צהריים", "ערב", "גמישה"],
      },
      {
        id: "sessions_count",
        label: "כמה מפגשים מרגיש לך נכון?",
        type: "radio",
        options: [
          "5 מפגשים",
          "8 מפגשים",
          "10 מפגשים",
          "אשמח שתתאימי לי אישית את כמות המפגשים",
        ],
      },
    ],
  },
];

const st = {
  page: {
    minHeight: "100vh",
    background: BG,
    fontFamily: BODY,
    direction: "rtl",
    color: TEXT,
    padding: "0 0 5rem",
  },
  hero: {
    background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
    color: "#fff",
    padding: "2.5rem 1.5rem 2.25rem",
    textAlign: "center",
  },
  heroEye: {
    fontFamily: DISPLAY,
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    opacity: 0.85,
    marginBottom: "0.4rem",
  },
  heroTitle: {
    fontFamily: DISPLAY,
    fontWeight: 800,
    fontSize: "clamp(26px, 6vw, 38px)",
    margin: "0 0 0.3rem",
    lineHeight: 1.15,
  },
  heroSub: {
    fontSize: "1rem",
    opacity: 0.85,
    margin: 0,
  },
  wrap: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "0 1rem",
  },
  intro: {
    background: "#fff",
    border: `1.5px solid ${BORDER}`,
    borderRadius: 16,
    padding: "1.75rem 2rem",
    marginTop: "1.75rem",
    fontSize: "1rem",
    lineHeight: 1.9,
    color: TEXT,
    boxShadow: "0 2px 16px rgba(139,108,246,0.07)",
  },
  card: {
    background: "#fff",
    border: `1.5px solid ${BORDER}`,
    borderRadius: 16,
    padding: "1.75rem 2rem",
    marginTop: "1.25rem",
    boxShadow: "0 2px 16px rgba(139,108,246,0.07)",
  },
  cardTitle: {
    fontFamily: DISPLAY,
    fontWeight: 800,
    fontSize: "1.1rem",
    color: BRAND,
    marginBottom: "1.25rem",
    paddingBottom: "0.75rem",
    borderBottom: `1.5px solid ${BORDER}`,
  },
  qBlock: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontFamily: DISPLAY,
    fontWeight: 700,
    fontSize: "0.95rem",
    color: TEXT,
    marginBottom: "0.6rem",
    lineHeight: 1.5,
  },
  input: {
    width: "100%",
    padding: "0.65rem 1rem",
    border: `1.5px solid ${BORDER}`,
    borderRadius: 10,
    fontSize: "0.97rem",
    outline: "none",
    background: LIGHT_BG,
    color: TEXT,
    fontFamily: BODY,
    boxSizing: "border-box",
  },
  optRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "0.35rem",
    cursor: "pointer",
    padding: "0.45rem 0.75rem",
    borderRadius: 10,
    transition: "background 0.12s",
  },
  optLabel: {
    fontSize: "0.95rem",
    color: MUTED,
    cursor: "pointer",
    flex: 1,
    lineHeight: 1.5,
  },
  optLabelActive: {
    fontSize: "0.95rem",
    color: TEXT,
    fontWeight: 600,
    cursor: "pointer",
    flex: 1,
    lineHeight: 1.5,
  },
  communityCard: {
    background: `linear-gradient(135deg, ${LIGHT_BG}, #fff)`,
    border: `1.5px solid ${BORDER}`,
    borderRadius: 16,
    padding: "1.75rem 2rem",
    marginTop: "1.25rem",
    textAlign: "center",
    boxShadow: "0 2px 16px rgba(139,108,246,0.07)",
  },
  communityTitle: {
    fontFamily: DISPLAY,
    fontWeight: 800,
    fontSize: "1.05rem",
    color: TEXT,
    marginBottom: "0.6rem",
  },
  communityText: {
    fontSize: "0.95rem",
    color: MUTED,
    lineHeight: 1.7,
    marginBottom: "1.25rem",
  },
  communityBtn: {
    display: "inline-block",
    background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
    color: "#fff",
    border: "none",
    borderRadius: 50,
    padding: "0.75rem 2.5rem",
    fontSize: "0.97rem",
    fontWeight: 700,
    fontFamily: DISPLAY,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 4px 18px rgba(139,108,246,0.3)",
  },
  submitBtn: {
    display: "block",
    width: "100%",
    maxWidth: 640,
    margin: "2rem auto 0",
    background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    fontWeight: 800,
    fontFamily: DISPLAY,
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(139,108,246,0.3)",
  },
  error: {
    textAlign: "center",
    color: "#dc2626",
    marginTop: "1rem",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  successPage: {
    minHeight: "100vh",
    background: BG,
    fontFamily: BODY,
    direction: "rtl",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
  },
  successCard: {
    background: "#fff",
    border: `1.5px solid ${BORDER}`,
    borderRadius: 20,
    padding: "3rem 2.5rem",
    maxWidth: 480,
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 32px rgba(139,108,246,0.1)",
  },
  successTitle: {
    fontFamily: DISPLAY,
    fontWeight: 800,
    fontSize: "1.4rem",
    color: BRAND,
    margin: "0 0 1rem",
  },
  successText: {
    color: MUTED,
    lineHeight: 1.9,
    fontSize: "1rem",
    margin: 0,
  },
};

function RadioDot({ checked }) {
  return (
    <div style={{
      width: 18, height: 18, borderRadius: "50%",
      border: `2px solid ${checked ? BRAND : BORDER}`,
      background: checked ? BRAND : "#fff",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {checked && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
    </div>
  );
}

function CheckBox({ checked }) {
  return (
    <div style={{
      width: 18, height: 18, borderRadius: 5,
      border: `2px solid ${checked ? BRAND : BORDER}`,
      background: checked ? BRAND : "#fff",
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

function Field({ q, value, onChange }) {
  if (q.type === "text" || q.type === "tel" || q.type === "email") {
    return (
      <input
        type={q.type}
        style={st.input}
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
          const on = value === opt;
          return (
            <div
              key={opt}
              style={{ ...st.optRow, background: on ? LIGHT_BG : "transparent" }}
              onClick={() => onChange(q.id, opt)}
            >
              <RadioDot checked={on} />
              <span style={on ? st.optLabelActive : st.optLabel}>{opt}</span>
            </div>
          );
        })}
      </div>
    );
  }
  if (q.type === "checkbox") {
    const sel = value || [];
    return (
      <div>
        {q.options.map((opt) => {
          const on = sel.includes(opt);
          return (
            <div
              key={opt}
              style={{ ...st.optRow, background: on ? LIGHT_BG : "transparent" }}
              onClick={() => {
                const next = on ? sel.filter((x) => x !== opt) : [...sel, opt];
                onChange(q.id, next);
              }}
            >
              <CheckBox checked={on} />
              <span style={on ? st.optLabelActive : st.optLabel}>{opt}</span>
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
      setError("נא למלא שם ואימייל כדי להמשיך.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const allQ = SECTIONS.flatMap((s) => s.questions);
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      allQ.forEach((q) => {
        if (answers[q.id] !== undefined) {
          const v = answers[q.id];
          fd.append(q.label, Array.isArray(v) ? v.join(", ") : String(v || ""));
        }
      });
      const res = await fetch("https://formspree.io/f/xgoblgnv", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
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
      <div style={st.successPage}>
        <div style={st.successCard}>
          <h2 style={st.successTitle}>השאלון נשלח בהצלחה!</h2>
          <p style={st.successText}>
            בונה עבורך את מערך הלמידה הכי מדויק שיש
            <br />
            מתרגשת להתחיל ללמוד ביחד
            <br />
            וזמינה לכל שאלה 💜
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={st.page}>
      <div style={st.hero}>
        <p style={st.heroEye}>GROW AI · by Shoham</p>
        <h1 style={st.heroTitle}>שאלון היכרות</h1>
        <p style={st.heroSub}>תוכן ויזואלי עם AI</p>
      </div>

      <div style={st.wrap}>
        <div style={st.intro}>
          היי יקירה,
          <br /><br />
          שמחה שבחרת להתחיל לעבוד חכם וללמוד אצלי
          <br />
          בכדי שאוכל להכיר אותך קצת יותר ולהתאים את התוכן המדויק עבורך
          <br />
          מלאי את השאלון בנחת
          <br />
          עם כמה שיותר מידע
          <br /><br />
          <span style={{ fontFamily: DISPLAY, fontWeight: 700, color: BRAND }}>שוהם</span>
        </div>

        {SECTIONS.map((sec) => (
          <div key={sec.id} style={st.card}>
            <div style={st.cardTitle}>{sec.title}</div>
            {sec.questions.map((q) => (
              <div key={q.id} style={st.qBlock}>
                <label style={st.label}>
                  {q.label}
                  {q.required && <span style={{ color: BRAND, marginRight: 2 }}>*</span>}
                </label>
                <Field q={q} value={answers[q.id]} onChange={handleChange} />
              </div>
            ))}
          </div>
        ))}

        <div style={st.communityCard}>
          <div style={st.communityTitle}>קהילת GROW AI</div>
          <p style={st.communityText}>
            מוזמנת להצטרף לקהילת נשות עסקים בתדר גבוה GROW AI
            <br />
            בה אני מפרסמת תכנים, מדריכים ומפגשי זום על AI לעסקים
          </p>
          <a href={COMMUNITY_LINK} target="_blank" rel="noopener noreferrer" style={st.communityBtn}>
            הצטרפי לקהילה
          </a>
        </div>

        {error && <p style={st.error}>{error}</p>}

        <button
          style={{ ...st.submitBtn, opacity: submitting ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "שולח..." : "שליחת השאלון"}
        </button>
      </div>
    </div>
  );
}
