import { useState } from "react";
import emailjs from "@emailjs/browser";

const SECTIONS = [
  {
    id: "personal",
    title: "פרטים אישיים",
    questions: [
      { id: "name", label: "שם מלא", type: "text", required: true },
      { id: "phone", label: "מספר טלפון", type: "tel", required: true },
      { id: "email", label: "אימייל", type: "email", required: true },
      { id: "role", label: "במה את עובדת היום?", type: "text", required: false },
    ],
  },
  {
    id: "background",
    title: "חלק א׳ – רקע ומוטיבציה",
    questions: [
      {
        id: "q1",
        label: "1. מה הביא אותך להצטרף לקורס?",
        type: "textarea",
        placeholder: "ספרי בחופשיות...",
        required: true,
      },
      {
        id: "q2",
        label: "2. מה את מקווה לקחת איתך מהמפגש?",
        type: "textarea",
        placeholder: "לדוגמה: לחסוך זמן בעבודה, להרגיש בטוחה עם הטכנולוגיה...",
        required: true,
      },
      {
        id: "q3",
        label: "3. האם חשת פעם חוסר ביטחון בעבודה עם כלים טכנולוגיים חדשים?",
        type: "radio",
        options: [
          "כן, לעיתים קרובות",
          "לפעמים",
          "לא ממש",
          "בכלל לא, אני אוהבת טכנולוגיה",
        ],
        required: true,
      },
    ],
  },
  {
    id: "current",
    title: "חלק ב׳ – מה את מכירה כרגע",
    questions: [
      {
        id: "q4",
        label: "4. האם השתמשת אי פעם ב-ChatGPT או בכלי AI אחר?",
        type: "radio",
        options: [
          "מעולם לא",
          "ניסיתי פעם-פעמיים",
          "משתמשת לפעמים",
          "משתמשת בצורה קבועה",
        ],
        required: true,
      },
      {
        id: "q5",
        label: "5. אילו כלי AI את מכירה? סמני את כל הרלוונטיים",
        type: "checkbox",
        options: [
          "ChatGPT",
          "Gemini (של גוגל)",
          "Copilot (של מיקרוסופט)",
          "Claude",
          "Canva AI",
          "Adobe Firefly",
          "Runway / CapCut AI (עריכת וידאו)",
          "Gamma (מצגות AI)",
          "אחר",
          "לא מכירה אף כלי",
        ],
        required: false,
      },
      {
        id: "q6",
        label: "6. לאיזה שימושים ניסית להשתמש ב-AI?",
        type: "checkbox",
        options: [
          "כתיבת אימיילים / הודעות",
          "סיכום מסמכים",
          "חיפוש מידע",
          "יצירת תמונות / תוכן ויזואלי",
          "תרגום",
          "רעיונות ויצירתיות",
          "עבודה על מצגות / מסמכים",
          "עדיין לא השתמשתי",
        ],
        required: false,
      },
    ],
  },
  {
    id: "work",
    title: "חלק ג׳ – עבודה יומיומית",
    questions: [
      {
        id: "q7",
        label: "7. אילו משימות לוקחות לך הכי הרבה זמן בעבודה?",
        type: "checkbox",
        options: [
          "כתיבת אימיילים ומסמכים",
          "הכנת מצגות",
          "סיכום פגישות / חומרים",
          "מחקר ואיסוף מידע",
          "עריכת תוכן (טקסט, תמונות, וידאו)",
          "תכנון ותיאום לוגיסטי",
          "דיווחים וטבלאות",
          "תקשורת עם לקוחות / עמיתים",
          "אחר",
        ],
        required: false,
      },
      {
        id: "q7b",
        label: "8. אם היית יכולה לחסוך שעה ביום – על מה הכי הייתה שמחה לחסוך?",
        type: "textarea",
        placeholder: "תארי בחופשיות...",
        required: false,
      },
    ],
  },
  {
    id: "tech",
    title: "חלק ד׳ – רמה טכנית ותפיסת AI",
    questions: [
      {
        id: "q8",
        label: "9. מה הרמה הטכנית שלך?",
        type: "radio",
        options: [
          "מתחילה",
          "בינונית",
          "מתקדמת",
        ],
        required: true,
      },
      {
        id: "q10b",
        label: "10. מה מעכב אותך מלנסות AI?",
        type: "checkbox",
        options: [
          "לא יודעת מאיפה להתחיל",
          "פוחדת לעשות טעויות",
          "לא בטוחה שזה יעזור לי",
          "חשש מפרטיות / אבטחה",
          "זה נראה מורכב מדי",
          "אין לי זמן ללמוד",
          "לא מעכב אותי כלום – אני כבר משתמשת!",
        ],
        required: false,
      },
    ],
  },
  {
    id: "goals",
    title: "חלק ה׳ – מטרות וציפיות",
    questions: [
      {
        id: "q13",
        label: "11. מה הכי חשוב לך לדעת לעשות אחרי המפגש?",
        type: "checkbox",
        options: [
          "לכתוב פרומפטים (הנחיות) טובים ל-AI",
          "לחסוך זמן במשימות יומיומיות",
          "לכתוב אימיילים וטקסטים מקצועיים",
          "לסכם מסמכים ארוכים",
          "ליצור תוכן ויזואלי (תמונות, מצגות)",
          "להבין מה AI יכול ומה הגבולות שלו",
          "להרגיש בטוחה עם הטכנולוגיה",
          "לדעת אילו כלים להתקין ולהשתמש בהם",
        ],
        required: false,
      },
      {
        id: "q14",
        label: "12. מה ההצלחה עבורך בסיום המפגש?",
        type: "textarea",
        placeholder: "מה תרגישי / תדעי לעשות אחרי שנסיים?",
        required: false,
      },
      {
        id: "q15",
        label: "13. יש משהו נוסף שחשוב לך שאדע לפני המפגש?",
        type: "textarea",
        placeholder: "כל מחשבה, חשש, ציפייה או בקשה מיוחדת...",
        required: false,
      },
    ],
  },
];

const PURPLE = "#7c3aed";
const PURPLE_LIGHT = "#f5f3ff";
const PURPLE_MID = "#ede9fe";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#faf9ff",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    direction: "rtl",
    padding: "0 0 4rem",
  },
  hero: {
    background: `linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)`,
    color: "#fff",
    padding: "2.5rem 1.5rem 2rem",
    textAlign: "center",
  },
  heroTag: {
    margin: "0 0 0.35rem",
    fontSize: "0.85rem",
    opacity: 0.8,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: 500,
  },
  heroTitle: {
    fontSize: "1.75rem",
    fontWeight: 700,
    margin: "0 0 0.3rem",
    letterSpacing: "-0.5px",
  },
  heroSubtitle: {
    fontSize: "1.05rem",
    fontWeight: 400,
    margin: "0 0 0.6rem",
    opacity: 0.9,
  },
  heroSub: {
    fontSize: "0.95rem",
    opacity: 0.8,
    margin: 0,
    maxWidth: 500,
    marginInline: "auto",
    lineHeight: 1.6,
  },
  intro: {
    maxWidth: 620,
    margin: "2rem auto 0",
    background: "#fff",
    border: "1.5px solid #ede9fe",
    borderRadius: 16,
    padding: "1.5rem 1.75rem",
    fontSize: "1rem",
    lineHeight: 1.85,
    color: "#374151",
    boxShadow: "0 2px 12px rgba(124,58,237,0.06)",
  },
  sectionCard: {
    maxWidth: 620,
    margin: "1.5rem auto 0",
    background: "#fff",
    border: "1.5px solid #ede9fe",
    borderRadius: 16,
    padding: "1.5rem 1.75rem",
    boxShadow: "0 2px 12px rgba(124,58,237,0.06)",
  },
  sectionTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: PURPLE,
    marginBottom: "1.25rem",
    paddingBottom: "0.5rem",
    borderBottom: `2px solid ${PURPLE_MID}`,
  },
  questionBlock: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontWeight: 600,
    fontSize: "0.97rem",
    color: "#1f1b4e",
    marginBottom: "0.6rem",
    lineHeight: 1.5,
  },
  input: {
    width: "100%",
    padding: "0.55rem 0.85rem",
    border: "1.5px solid #ddd6fe",
    borderRadius: 8,
    fontSize: "0.95rem",
    outline: "none",
    background: PURPLE_LIGHT,
    color: "#1f1b4e",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "0.6rem 0.85rem",
    border: "1.5px solid #ddd6fe",
    borderRadius: 8,
    fontSize: "0.95rem",
    outline: "none",
    background: PURPLE_LIGHT,
    color: "#1f1b4e",
    minHeight: 90,
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.4rem",
    cursor: "pointer",
    padding: "0.4rem 0.75rem",
    borderRadius: 8,
    transition: "background 0.15s",
  },
  optionLabel: {
    fontSize: "0.95rem",
    color: "#374151",
    cursor: "pointer",
    flex: 1,
    lineHeight: 1.5,
  },
  submitBtn: {
    display: "block",
    margin: "2rem auto 0",
    background: `linear-gradient(135deg, #7c3aed, #a855f7)`,
    color: "#fff",
    border: "none",
    borderRadius: 50,
    padding: "0.85rem 3rem",
    fontSize: "1.1rem",
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 0.5,
    boxShadow: "0 4px 18px rgba(124,58,237,0.25)",
  },
  successBox: {
    maxWidth: 500,
    margin: "4rem auto",
    textAlign: "center",
    background: "#fff",
    borderRadius: 20,
    padding: "3rem 2rem",
    border: "2px solid #ede9fe",
    boxShadow: "0 4px 24px rgba(124,58,237,0.1)",
  },
};

function QuestionField({ q, value, onChange }) {
  if (q.type === "text" || q.type === "tel" || q.type === "email") {
    return (
      <input
        type={q.type}
        style={styles.input}
        value={value || ""}
        placeholder={q.placeholder || ""}
        onChange={(e) => onChange(q.id, e.target.value)}
      />
    );
  }
  if (q.type === "textarea") {
    return (
      <textarea
        style={styles.textarea}
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
              style={{ ...styles.optionRow, background: checked ? PURPLE_MID : "transparent" }}
              onClick={() => onChange(q.id, opt)}
            >
              <div style={{
                width: 18, height: 18, borderRadius: "50%",
                border: `2px solid ${checked ? PURPLE : "#c4b5fd"}`,
                background: checked ? PURPLE : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {checked && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
              </div>
              <span style={styles.optionLabel}>{opt}</span>
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
              style={{ ...styles.optionRow, background: checked ? PURPLE_MID : "transparent" }}
              onClick={() => {
                const next = checked ? selected.filter((x) => x !== opt) : [...selected, opt];
                onChange(q.id, next);
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: 4,
                border: `2px solid ${checked ? PURPLE : "#c4b5fd"}`,
                background: checked ? PURPLE : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {checked && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={styles.optionLabel}>{opt}</span>
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
      const allQuestions = SECTIONS.flatMap((s) => s.questions);
      const message = allQuestions
        .filter((q) => q.id !== "email" && answers[q.id] !== undefined)
        .map((q) => {
          const v = answers[q.id];
          return `${q.label}\n${Array.isArray(v) ? v.join(", ") : String(v || "")}`;
        })
        .join("\n\n");
      const templateParams = {
        name: name,
        user_email: email,
        title: "שאלון הכנה להפקה",
        time: new Date().toLocaleString("he-IL"),
        message: message,
      };
      await emailjs.send(
        "service_o1kaq4u",
        "template_5bxldhc",
        templateParams,
        "gu3MOqMfp1tFkuCu7"
      );
    } catch (e) {
      setError("שגיאת רשת, נסי שוב.");
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.successBox}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💜</div>
          <h2 style={{ color: PURPLE, fontWeight: 700, marginBottom: "0.5rem" }}>תודה רבה!</h2>
          <p style={{ color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
            השאלון נשלח בהצלחה. אני מתרגשת לפגוש אותך בזום ולהתאים את המפגש בדיוק בשבילך 🚀
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.heroTag}>Grow by Shoham</p>
        <h1 style={styles.heroTitle}>שאלון היכרות</h1>
        <p style={styles.heroSubtitle}>קורס בינה מלאכותית</p>
      </div>

      <div style={styles.intro}>
        <strong>היי יקירה! 💜</strong>
        <br /><br />
        שמחה מאד שבחרת ללמוד איתי ולהכיר מקרוב את עולם ה-AI.
        <br /><br />
        כדי שאוכל להכין עבורך מערך שיעור מותאם אישית בדיוק לצרכים שלך, אשמח אם תקדישי כמה דקות למלא את השאלון הזה.
        <br /><br />
        זה יעזור לי להבין איפה את נמצאת היום, מה המטרות שלך, ואיזה כלים טכנולוגיים יכולים לקדם אותך – כך נוכל למקסם את הזמן שלנו ביחד ולהתמקד בכלים שבאמת יעזרו לך.
        <br /><br />
        אין תשובות נכונות או לא נכונות – פשוט שתהיי כנה וספציפית ככל שאת יכולה 😊
        <br /><br />
        בואי נתחיל!
        <br /><br />
        <em>מחכה להכיר אותך, שוהם 💜</em>
      </div>

      {SECTIONS.map((sec) => (
        <div key={sec.id} style={styles.sectionCard}>
          <div style={styles.sectionTitle}>{sec.title}</div>
          {sec.questions.map((q) => (
            <div key={q.id} style={styles.questionBlock}>
              <label style={styles.label}>
                {q.label}
                {q.required && <span style={{ color: PURPLE, marginRight: 2 }}>*</span>}
              </label>
              <QuestionField q={q} value={answers[q.id]} onChange={handleChange} />
            </div>
          ))}
        </div>
      ))}

      {error && (
        <p style={{ textAlign: "center", color: "#dc2626", marginTop: "1rem", fontWeight: 500 }}>
          {error}
        </p>
      )}

      <button
        style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1 }}
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "שולח..." : "שליחת השאלון 💜"}
      </button>
    </div>
  );
}
