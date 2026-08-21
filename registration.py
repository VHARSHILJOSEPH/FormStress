import streamlit as st
from datetime import date
import uuid

st.set_page_config(
    page_title="Patient Registration · NeuroVR Clinic",
    page_icon="🩺",
    layout="centered"
)

# ───────────────── Premium CSS ─────────────────
st.markdown("""
<style>
/* ── Google Font ── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

/* ── Root variables ── */
:root {
    --bg:        #0f1117;
    --surface:   #1a1c25;
    --surface-2: #22252f;
    --border:    #2d3040;
    --border-hi: #3d405a;
    --text:      #e8eaf0;
    --text-dim:  #8b90a5;
    --accent:    #6c63ff;
    --accent-2:  #8b83ff;
    --success:   #2dd4a8;
    --danger:    #f87171;
    --radius:    10px;
}

/* ── Global resets ── */
html, body, [data-testid="stAppViewContainer"],
[data-testid="stApp"] {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
    -webkit-font-smoothing: antialiased;
}

/* ── Container ── */
.block-container {
    padding-top: 1.5rem !important;
    padding-bottom: 3rem !important;
    max-width: 680px !important;
}

/* ── Page header badge ── */
.page-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, rgba(108,99,255,0.12), rgba(139,131,255,0.08));
    border: 1px solid rgba(108,99,255,0.25);
    border-radius: 40px;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 600;
    color: var(--accent-2);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 6px;
}

/* ── Page title ── */
.page-title {
    font-size: 28px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 4px 0;
}
.page-subtitle {
    font-size: 14px;
    color: var(--text-dim);
    margin: 0 0 24px 0;
    line-height: 1.5;
}

/* ── VR Assessment card ── */
.vr-card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px 24px;
    text-align: center;
    background: linear-gradient(145deg, var(--surface), var(--surface-2));
    margin-bottom: 28px;
    position: relative;
    overflow: hidden;
}
.vr-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.vr-icon {
    font-size: 32px;
    margin-bottom: 10px;
}
.vr-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
}
.vr-desc {
    font-size: 12px;
    color: var(--text-dim);
    line-height: 1.5;
}

/* ── Section header pill ── */
.section-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent-2);
    background: rgba(108,99,255,0.08);
    border: 1px solid rgba(108,99,255,0.15);
    border-radius: 6px;
    padding: 5px 12px;
    margin-bottom: 14px;
}

/* ── Divider ── */
.section-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 28px 0 20px 0;
}

/* ── Form card ── */
div[data-testid="stForm"] {
    border: 1px solid var(--border) !important;
    border-radius: var(--radius) !important;
    padding: 28px 24px !important;
    background: var(--surface) !important;
    box-shadow:
        0 0 0 1px rgba(255,255,255,0.02),
        0 4px 24px rgba(0,0,0,0.25) !important;
}

/* ── Input fields ── */
div[data-testid="stForm"] input,
div[data-testid="stForm"] textarea,
div[data-testid="stForm"] [data-baseweb="select"] {
    border-radius: 8px !important;
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
}

div[data-testid="stForm"] input:focus,
div[data-testid="stForm"] textarea:focus {
    border-color: var(--accent) !important;
    box-shadow: 0 0 0 2px rgba(108,99,255,0.15) !important;
}

/* ── Labels ── */
div[data-testid="stForm"] label p {
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: -0.01em !important;
    color: var(--text) !important;
}

/* ── Section headers inside form ── */
div[data-testid="stForm"] h2 {
    display: none !important;   /* replaced by pills */
}

/* ── Checkbox labels ── */
div[data-testid="stForm"] .stCheckbox label span {
    font-size: 13px !important;
    line-height: 1.45 !important;
}

/* ── Submit button ── */
div[data-testid="stForm"] button[type="submit"] {
    background: linear-gradient(135deg, var(--accent), var(--accent-2)) !important;
    color: #fff !important;
    font-family: 'Inter', sans-serif !important;
    font-weight: 700 !important;
    font-size: 15px !important;
    letter-spacing: -0.01em !important;
    border: none !important;
    border-radius: 10px !important;
    padding: 12px 0 !important;
    margin-top: 8px !important;
    transition: transform 0.15s ease, box-shadow 0.2s ease !important;
    box-shadow: 0 4px 14px rgba(108,99,255,0.3) !important;
}
div[data-testid="stForm"] button[type="submit"]:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 20px rgba(108,99,255,0.45) !important;
}
div[data-testid="stForm"] button[type="submit"]:active {
    transform: translateY(0) !important;
}

/* ── Success / Error cards ── */
div[data-testid="stAlert"] {
    border-radius: 8px !important;
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
}

/* ── Confirmation card ── */
.confirm-card {
    border: 1px solid rgba(45,212,168,0.25);
    border-radius: var(--radius);
    padding: 24px;
    background: linear-gradient(145deg, rgba(45,212,168,0.06), rgba(45,212,168,0.02));
    text-align: center;
    margin-top: 16px;
}
.confirm-card .check-icon {
    font-size: 36px;
    margin-bottom: 12px;
}
.confirm-card .confirm-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--success);
    margin-bottom: 6px;
}
.confirm-card .confirm-id {
    font-family: 'Inter', monospace;
    font-size: 20px;
    font-weight: 800;
    color: var(--text);
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: inline-block;
    padding: 8px 20px;
    margin-top: 8px;
    letter-spacing: 0.04em;
}
.confirm-card .confirm-sub {
    font-size: 12px;
    color: var(--text-dim);
    margin-top: 10px;
}

/* ── Footer ── */
.footer-text {
    text-align: center;
    font-size: 11px;
    color: var(--text-dim);
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    letter-spacing: 0.02em;
}

/* ── Hide default Streamlit header/footer ── */
#MainMenu, header[data-testid="stHeader"], footer {
    visibility: hidden;
}
</style>
""", unsafe_allow_html=True)


# ───────────────── Page Header ─────────────────
st.markdown("""
<div class="page-badge">🩺 NeuroVR Clinic</div>
<div class="page-title">Patient Registration</div>
<div class="page-subtitle">
    Complete the form below to book your consultation.<br>
    Fields marked with <strong>*</strong> are required.
</div>
""", unsafe_allow_html=True)


# ───────────────── VR Assessment Placeholder ─────────────────
st.markdown("""
<div class="vr-card">
    <div class="vr-icon">🧊</div>
    <div class="vr-label">VR Assessment Interface</div>
    <div class="vr-desc">
        The immersive VR assessment module will render here once your<br>
        headset is connected and calibrated.
    </div>
</div>
""", unsafe_allow_html=True)


# ───────────────── Registration Form ─────────────────
with st.form("patient_registration"):

    # ── Personal Information ──
    st.markdown('<div class="section-pill">👤 Personal Information</div>',
                unsafe_allow_html=True)

    full_name = st.text_input("Full Name *")

    col_dob, col_age = st.columns(2)
    with col_dob:
        dob = st.date_input(
            "Date of Birth *",
            min_value=date(1900, 1, 1),
            max_value=date.today()
        )
    with col_age:
        age = st.number_input(
            "Age *",
            min_value=1,
            max_value=120,
            value=18,
            step=1
        )

    col_gender, col_phone = st.columns(2)
    with col_gender:
        gender = st.selectbox(
            "Gender",
            ["Select", "Male", "Female", "Other", "Prefer not to say"]
        )
    with col_phone:
        phone = st.text_input(
            "Phone Number *",
            placeholder="Enter phone number"
        )

    col_email, col_lang = st.columns(2)
    with col_email:
        email = st.text_input(
            "Email Address",
            placeholder="example@email.com"
        )
    with col_lang:
        language = st.text_input(
            "Preferred Language",
            placeholder="e.g. English, Telugu"
        )

    # ── Consultation Details ──
    st.markdown('<hr class="section-divider">',
                unsafe_allow_html=True)
    st.markdown('<div class="section-pill">📋 Consultation Details</div>',
                unsafe_allow_html=True)

    reason = st.selectbox(
        "Reason for Consultation *",
        [
            "Select",
            "Stress",
            "Anxiety",
            "Emotional Well-being",
            "Sleep Problems",
            "Work / Academic Stress",
            "General Consultation",
            "Follow-up Consultation",
            "Other"
        ]
    )

    concern = st.text_area(
        "Briefly describe your concern",
        height=90
    )

    first_consultation = st.radio(
        "Is this your first consultation? *",
        ["Yes", "No"],
        horizontal=True
    )

    # ── Appointment ──
    st.markdown('<hr class="section-divider">',
                unsafe_allow_html=True)
    st.markdown('<div class="section-pill">📅 Appointment Preference</div>',
                unsafe_allow_html=True)

    col_date, col_time = st.columns(2)
    with col_date:
        appointment_date = st.date_input(
            "Preferred Date *",
            min_value=date.today()
        )
    with col_time:
        appointment_time = st.time_input("Preferred Time *")

    consultation_type = st.selectbox(
        "Consultation Type *",
        ["Select", "In-person", "Online", "VR-assisted Assessment"]
    )

    # ── VR Assessment ──
    st.markdown('<hr class="section-divider">',
                unsafe_allow_html=True)
    st.markdown('<div class="section-pill">🥽 VR Assessment</div>',
                unsafe_allow_html=True)

    vr_experience = st.radio(
        "Have you used a VR headset before?",
        ["Yes", "No"],
        horizontal=True
    )

    col_vr1, col_vr2 = st.columns(2)
    with col_vr1:
        vr_discomfort = st.selectbox(
            "VR motion sickness?",
            ["Select", "Yes", "No", "Not Sure"]
        )
    with col_vr2:
        vr_consent = st.selectbox(
            "Willing to do VR assessment? *",
            ["Select", "Yes", "No", "Discuss with Consultant"]
        )

    # ── Additional Information ──
    st.markdown('<hr class="section-divider">',
                unsafe_allow_html=True)
    st.markdown('<div class="section-pill">📝 Additional Information</div>',
                unsafe_allow_html=True)

    medications = st.text_area(
        "Current Medications",
        height=80
    )

    medical_history = st.text_area(
        "Relevant Medical / Psychological History",
        height=80
    )

    additional_info = st.text_area(
        "Anything else the consultant should know?",
        height=80
    )

    # ── Consent ──
    st.markdown('<hr class="section-divider">',
                unsafe_allow_html=True)
    st.markdown('<div class="section-pill">✅ Consent</div>',
                unsafe_allow_html=True)

    information_consent = st.checkbox(
        "I consent to my information being used for consultation purposes. *"
    )

    vr_data_consent = st.checkbox(
        "I consent to participating in the VR-based assessment and related data collection. *"
    )

    diagnosis_acknowledgement = st.checkbox(
        "I understand that the VR/AI assessment is not itself a medical diagnosis. *"
    )

    # ── Submit ──
    st.markdown('<div style="margin-top:8px"></div>',
                unsafe_allow_html=True)
    submitted = st.form_submit_button(
        "Register",
        use_container_width=True
    )


# ───────────────── Validation & Registration ─────────────────
if submitted:

    if not full_name.strip():
        st.error("⚠️  Please enter your full name.")

    elif not phone.strip():
        st.error("⚠️  Please enter your phone number.")

    elif reason == "Select":
        st.error("⚠️  Please select a reason for consultation.")

    elif consultation_type == "Select":
        st.error("⚠️  Please select a consultation type.")

    elif vr_consent == "Select":
        st.error("⚠️  Please select your VR assessment preference.")

    elif not information_consent:
        st.error("⚠️  Please provide the required information consent.")

    elif not vr_data_consent:
        st.error("⚠️  Please provide the VR assessment consent.")

    elif not diagnosis_acknowledgement:
        st.error("⚠️  Please acknowledge the assessment information.")

    else:
        registration_id = "PAT-" + uuid.uuid4().hex[:8].upper()

        st.markdown(f"""
        <div class="confirm-card">
            <div class="check-icon">✅</div>
            <div class="confirm-title">Registration Successful</div>
            <div style="font-size:13px; color:var(--text-dim); margin-bottom:4px;">
                Your Registration ID
            </div>
            <div class="confirm-id">{registration_id}</div>
            <div class="confirm-sub">
                Please save this ID for your records. You will receive a confirmation shortly.
            </div>
        </div>
        """, unsafe_allow_html=True)


# ───────────────── Footer ─────────────────
st.markdown("""
<div class="footer-text">
    NeuroVR Clinic · Patient Registration Portal · Powered by Streamlit
</div>
""", unsafe_allow_html=True)