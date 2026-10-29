// ============================================================================
// FILE 1: js/config-templates.js
// (New upeprint Firebase Config, Apps Script SDM/RN/AM/QR Processor, e-Voter Processor & /templates/ Loader)
// ============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, 
    updatePassword, EmailAuthProvider, reauthenticateWithCredential 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, doc, getDoc, setDoc, updateDoc, collection, 
    addDoc, getDocs, query, where, onSnapshot, deleteDoc,
    orderBy, limit, startAfter
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const firebaseConfig = {
    apiKey: "AIzaSyCjvAVdtOWmyDx4MPYW-0UPsAj7UKEKCuo",
    authDomain: "upeprint.firebaseapp.com",
    projectId: "upeprint",
    storageBucket: "upeprint.firebasestorage.app",
    messagingSenderId: "28101043239",
    appId: "1:28101043239:web:5f90bfa0929583d0b5da02",
    measurementId: "G-GCV8937FRJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.fb = {
    firebaseConfig, app, auth, db,
    signInWithEmailAndPassword, signOut, onAuthStateChanged,
    updatePassword, EmailAuthProvider, reauthenticateWithCredential,
    doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, query, where, onSnapshot, deleteDoc, orderBy, limit, startAfter
};

window.alert = function(message) {
    let alertModal = document.getElementById('customAlertModal');
    if (!alertModal) {
        alertModal = document.createElement('div');
        alertModal.id = 'customAlertModal';
        alertModal.className = 'fixed inset-0 z-[99999] flex items-center justify-center bg-dark-950/85 backdrop-blur-sm p-4 opacity-0 pointer-events-none transition-all duration-300';
        alertModal.innerHTML = `
            <div class="bg-white rounded-3xl shadow-2xl border-t-4 border-royal-500 max-w-sm w-full p-6 text-center transform scale-95 transition-transform duration-300">
                <div class="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden p-2">
                    <img src="/images/logo.png" alt="Ojas Logo" class="w-full h-full object-contain" onerror="this.onerror=null;this.src='images/logo.png';">
                </div>
                <h2 class="text-lg font-black text-dark-900 mb-2">Ojas Print Service</h2>
                <p id="customAlertMessage" class="text-sm font-semibold text-slate-600 mb-6 whitespace-pre-line"></p>
                <button onclick="window.closeCustomAlert()" class="bg-dark-900 hover:bg-black text-royal-300 font-black py-3 px-6 rounded-xl shadow-glow transition w-full text-sm">
                    OK, Got it!
                </button>
            </div>
        `;
        document.body.appendChild(alertModal);
        
        window.closeCustomAlert = function() {
            alertModal.classList.remove('opacity-100', 'pointer-events-auto');
            alertModal.classList.add('opacity-0', 'pointer-events-none');
            alertModal.querySelector('div').classList.remove('scale-100');
            alertModal.querySelector('div').classList.add('scale-95');
        };
    }
    document.getElementById('customAlertMessage').innerText = message;
    alertModal.classList.remove('opacity-0', 'pointer-events-none');
    alertModal.classList.add('opacity-100', 'pointer-events-auto');
    alertModal.querySelector('div').classList.remove('scale-95');
    alertModal.querySelector('div').classList.add('scale-100');
};

window.ADMIN_EMAIL = "hkosiun1221@gmail.com";
window.FREE_VIP_EMAILS = [
    "aadhaar@gmail.com",
    "aadhaar@print.com",
    "danish@print.com"
];
window.MS_PER_DAY = 24 * 60 * 60 * 1000;

window.extractUserDisplayName = function(email, username) {
    let name = username || (email ? email.split('@')[0] : 'User');
    name = String(name).trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
};

window.isAllowedPortalEmail = function(email) {
    if (!email) return false;
    const cleanEmail = String(email).trim().toLowerCase();
    if (cleanEmail === window.ADMIN_EMAIL || window.FREE_VIP_EMAILS.includes(cleanEmail)) return true;
    return cleanEmail.endsWith("@print.com");
};

// ================= API URLS (Minor & Certificate on Google Apps Script) =================
window.API_URLS = {
    "DOB_DELHI": "DELHI",
    "certificate": "https://script.google.com/macros/s/AKfycbxWe_nx9QyfR3oHgJSG7Os_u2FOF22HdPDGUO7nekdwMYIfbNL16LNpIvY2M-QSHTyl/exec",
    "passport": "PASSPORT",
    "minor": "https://script.google.com/macros/s/AKfycbwepvaw92YcuQUQCzYi5DXoL4m2OS00_5vShecUJRY_fsnCREpnTFeLgsGGtka0R1Ot/exec"
};

// ================= SEPARATE HTML TEMPLATES MAP (/templates/) =================
window.TEMPLATE_FILES_MAP = {
    'LOCAL_HTML_CASTE': 'caste.html',
    'LOCAL_HTML_DOMICILE': 'domicile.html',
    'LOCAL_HTML_EVOTER': 'evoter.html',
    'LOCAL_HTML_ANNEXURE_1': 'annexure-1.html',
    'LOCAL_HTML_ANNEXURE_1A': 'annexure-1a.html',
    'LOCAL_HTML_ANNEXURE_3': 'annexure-3.html',
    'LOCAL_HTML_ANNEXURE_3A': 'annexure-3a.html',
    'LOCAL_HTML_ANNEXURE_B': 'annexure-b.html',
    'LOCAL_HTML_ANNEXURE_C': 'annexure-c.html',
    'LOCAL_HTML_ANNEXURE_D': 'annexure-d.html',
    'LOCAL_HTML_ANNEXURE_E': 'annexure-e.html',
    'LOCAL_HTML_ANNEXURE_F': 'annexure-f.html'
};

window.loadedTemplatesCache = {};
window.preloadAllHtmlTemplates = async function() {
    const entries = Object.entries(window.TEMPLATE_FILES_MAP);
    await Promise.all(entries.map(async ([fileId, fileName]) => {
        if (window.loadedTemplatesCache[fileId]) return;
        const candidatePaths = [
            `/templates/${fileName}?v=7.0`,
            `templates/${fileName}?v=7.0`,
            `../templates/${fileName}?v=7.0`
        ];
        for (const p of candidatePaths) {
            try {
                const r = await fetch(p);
                if (r.ok) {
                    let text = await r.text();
                    // Strip outer html/body wrapper if present so inner .affidavit-paper injects cleanly
                    const match = text.match(/<div class="affidavit-paper"[\s\S]*<\/div>/i);
                    if (match) text = match[0];
                    window.loadedTemplatesCache[fileId] = text;
                    break;
                }
            } catch (e) {}
        }
    }));
};
window.preloadAllHtmlTemplates();

window.openSavedPhotoPreview = function(photoSrc, personName = 'Applicant') {
    if (!photoSrc) return;
    const a = document.createElement('a');
    a.href = photoSrc;
    a.download = `${(personName || 'Applicant').replace(/\s+/g, '_')}_Photo.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

// ================= APPS SCRIPT SDM & LOCATION LOGIC FOR CASTE, DOMICILE & e-VOTER =================
window.SDM_LOCATIONS_LIST = [
    { keys: ['BUDHANA', 'बुढ़ाना'], t: 'बुढ़ाना', d: 'मुजफ्फरनगर', o: 'MONIKA SINGH' },
    { keys: ['KHATOLI', 'खतौली'], t: 'खतौली', d: 'मुजफ्फरनगर', o: 'RAHUL SHARMA' },
    { keys: ['JANSHATH', 'जानसठ'], t: 'जानसठ', d: 'मुजफ्फरनगर', o: 'AMIT KUMAR' },
    { keys: ['MUZAFFARNAGAR', 'मुजफ्फरनगर'], t: 'मुजफ्फरनगर', d: 'मुजफ्फरनगर', o: 'SURESH CHANDRA' },
    { keys: ['KAIRANA', 'कैराना'], t: 'कैराना', d: 'शामली', o: 'SHIVAJI YADAV' },
    { keys: ['OON', 'UN', 'ऊन'], t: 'ऊन', d: 'शामली', o: 'VINAY PRATAP SINGH' },
    { keys: ['SHAMLI', 'शामली'], t: 'शामली', d: 'शामली', o: 'NIDHI BHARDWAJ' },
    { keys: ['BARAUT', 'बड़ौत'], t: 'बड़ौत', d: 'बागपत', o: 'BAL KRISHNA SINGH' },
    { keys: ['KHEKRA', 'खेकड़ा', 'खेखड़ा'], t: 'खेकड़ा', d: 'बागपत', o: 'ANIL KUMAR' },
    { keys: ['MAWANA', 'मवाना'], t: 'मवाना', d: 'मेरठ', o: 'ANKIT KUMAR' },
    { keys: ['SARDHANA', 'सरधना'], t: 'सरधना', d: 'मेरठ', o: 'PANKAJ PRAKASH' },
    { keys: ['MEERUT', 'मेरठ'], t: 'मेरठ', d: 'मेरठ', o: 'KAMLESH KUMAR' },
    { keys: ['BEHAT', 'बेहट'], t: 'बेहट', d: 'सहारनपुर', o: 'DEEPAK KUMAR' },
    { keys: ['DEOBAND', 'देवबंद'], t: 'देवबंद', d: 'सहारनपुर', o: 'SANJEEV KUMAR' },
    { keys: ['RAMPUR', 'रामपुर मनिहारन'], t: 'रामपुर मनिहारन', d: 'सहारनपुर', o: 'MANOJ KUMAR' },
    { keys: ['NAKUR', 'नकुड़'], t: 'नकुड़', d: 'सहारनपुर', o: 'AJAY KUMAR' },
    { keys: ['SAHARANPUR', 'सहारनपुर'], t: 'सहारनपुर', d: 'सहारनपुर', o: 'VIVEK YADAV' },
    { keys: ['MODINAGAR', 'मोदीनगर'], t: 'मोदीनगर', d: 'गाजियाबाद', o: 'SANTOSH KUMAR' },
    { keys: ['LONI', 'लोनी'], t: 'लोनी', d: 'गाजियाबाद', o: 'RAJENDRA SHARMA' },
    { keys: ['GHAZIABAD', 'गाजियाबाद'], t: 'गाजियाबाद', d: 'गाजियाबाद', o: 'ARUN DIXIT' }
];

window.processCasteOrDomicileData = function(rawFormObj, serviceType) {
    const toTitleCase = str => str ? str.toString().trim().split(' ').map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '').join(' ') : '';
    const isCaste = (serviceType === 'Caste');

    const processed = {
        SERVICE_TYPE: serviceType,
        DISTRICT: (rawFormObj.DISTRICT || '').toString().trim(),
        TAHSEEL: (rawFormObj.TAHSEEL || '').toString().trim(),
        NAME: toTitleCase(rawFormObj.NAME),
        FNAME: toTitleCase(rawFormObj.FNAME),
        MNAME: toTitleCase(rawFormObj.MNAME),
        AREA: (rawFormObj.AREA || '').toString().trim() ? toTitleCase(rawFormObj.AREA) : '',
        GRAM: toTitleCase(rawFormObj.GRAM),
        HNAME: (rawFormObj.HNAME || '').toString().trim(),
        REL: rawFormObj.REL || 'पुत्र / पुत्री',
        MN: (rawFormObj.MN || '').toString().toUpperCase(),
        THANA: (rawFormObj.THANA || '').toString().trim().toUpperCase(),
        CAST: (rawFormObj.CAST || '').toString().trim().toUpperCase(),
        VLE: (rawFormObj.VLE || '').toString().trim().toUpperCase(),
        PHOTO: rawFormObj.PHOTO || ''
    };

    const rawTahseel = processed.TAHSEEL.toUpperCase();
    const rawDistrict = processed.DISTRICT.toUpperCase();
    const match = window.SDM_LOCATIONS_LIST.find(loc => loc.keys.some(k => rawTahseel.includes(k)))
               || window.SDM_LOCATIONS_LIST.find(loc => loc.keys.some(k => rawDistrict.includes(k)))
               || { t: 'बागपत', d: 'बागपत', o: 'RAKESH CHAUHAN' };

    processed.TEHSIL = match.t;
    processed.DISS = match.d;
    processed.SDM = processed.OFFICER = match.o;

    if (rawFormObj.ISSUE_DATE && rawFormObj.ISSUE_DATE.toString().trim()) {
        const rawDate = rawFormObj.ISSUE_DATE.toString().trim();
        if (rawDate.includes('-')) {
            const parts = rawDate.split('-');
            processed.DATE = (parts.length === 3 && parts[0].length === 4) ? `${parts[2]}/${parts[1]}/${parts[0]}` : rawDate;
        } else {
            processed.DATE = rawDate;
        }
    } else {
        const now = new Date();
        processed.DATE = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
    }
    processed.ISSUE_DATE = processed.DATE;

    const appRandomPart = Math.floor(Math.random() * 49999) + 10000;
    if (isCaste) {
        processed.RN = rawFormObj.RN || ('2613900200' + appRandomPart);
        processed.AM = rawFormObj.AM || ('812620' + (appRandomPart + 2830));
    } else {
        processed.RN = rawFormObj.RN || ('2613900100' + appRandomPart);
        processed.AM = rawFormObj.AM || ('811620' + (appRandomPart + 2830));
    }

    const displayName = processed.HNAME ? `${processed.NAME} / ${processed.HNAME}` : processed.NAME;
    processed.DISPLAY_NAME = displayName.length > 28 ? processed.NAME : displayName;

    const qrDataText = isCaste
        ? `आवेदन क्र० - ${processed.RN}, प्रमाणपत्र क्र० - 0${processed.AM}, नाम - ${processed.DISPLAY_NAME} , जाति - ${processed.CAST}, तहसील - ${processed.TEHSIL}, जिला - ${processed.DISS}, ${processed.SDM}`
        : `आवेदन क्र० - ${processed.RN}, प्रमाणपत्र क्र० - 0${processed.AM}, नाम - ${processed.DISPLAY_NAME} , तहसील - ${processed.TEHSIL}, जिला - ${processed.DISS}, ${processed.SDM}`;

    processed.QR_URL = "https://quickchart.io/chart?cht=qr&chs=300x300&chl=" + encodeURIComponent(qrDataText);
    return processed;
};

// ================= e-VOTER ID PROCESSOR =================
window.generateRandomEpicNo = function() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const prefix = letters.charAt(Math.floor(Math.random()*26)) + letters.charAt(Math.floor(Math.random()*26)) + letters.charAt(Math.floor(Math.random()*26));
    const digits = Math.floor(1000000 + Math.random() * 9000000);
    return prefix + digits;
};

window.processEvoterData = function(rawFormObj) {
    const toTitleCase = str => str ? str.toString().trim().split(' ').map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '').join(' ') : '';
    const epicRaw = (rawFormObj.EPIC_NO || '').toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const epicNo = epicRaw.length >= 6 ? epicRaw : window.generateRandomEpicNo();

    const nameClean = toTitleCase(rawFormObj.NAME || '');
    const hnameClean = (rawFormObj.HNAME || '').toString().trim();
    const displayName = hnameClean ? `${nameClean} / ${hnameClean}` : nameClean;

    const rawTahseel = (rawFormObj.TAHSEEL || '').toString().toUpperCase();
    const rawDistrict = (rawFormObj.DISTRICT || '').toString().toUpperCase();
    const match = window.SDM_LOCATIONS_LIST.find(loc => loc.keys.some(k => rawTahseel.includes(k)))
               || window.SDM_LOCATIONS_LIST.find(loc => loc.keys.some(k => rawDistrict.includes(k)))
               || { t: 'बड़ौत', d: 'बागपत', o: 'BAL KRISHNA SINGH' };

    let dobFormatted = (rawFormObj.DOB || '').toString().trim();
    if (dobFormatted.includes('-')) {
        const p = dobFormatted.split('-');
        if (p.length === 3 && p[0].length === 4) dobFormatted = `${p[2]}/${p[1]}/${p[0]}`;
    }

    const now = new Date();
    const issueDate = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
    const relLabel = (rawFormObj.REL_TYPE === 'W/O') ? 'पति का नाम / Husband Name' : 'पिता का नाम / Father Name';

    const processed = {
        SERVICE_TYPE: 'e-Voter ID',
        EPIC_NO: epicNo,
        NAME: nameClean,
        HNAME: hnameClean,
        DISPLAY_NAME: displayName,
        REL_TYPE: rawFormObj.REL_TYPE || 'S/O',
        REL_LABEL: relLabel,
        FNAME: toTitleCase(rawFormObj.FNAME || ''),
        DOB: dobFormatted,
        SEX: rawFormObj.SEX || 'MALE / पुरुष',
        DISTRICT: rawFormObj.DISTRICT || 'BAGHPAT',
        TAHSEEL: rawFormObj.TAHSEEL || match.t,
        TEHSIL: match.t,
        DISS: match.d,
        SDM: match.o,
        ADDRESS: (rawFormObj.ADDRESS || '').toString().trim().toUpperCase(),
        DATE: issueDate,
        PHOTO: rawFormObj.PHOTO || ''
    };

    const qrText = `e-EPIC: ${processed.EPIC_NO} | Name: ${processed.NAME} | Father/Husband: ${processed.FNAME} | DOB: ${processed.DOB} | Gender: ${processed.SEX} | AC/Tehsil: ${processed.TEHSIL}, ${processed.DISS}`;
    processed.QR_URL = "https://quickchart.io/chart?cht=qr&chs=300x300&chl=" + encodeURIComponent(qrText);
    return processed;
};

window.DOC_OPTIONS_LIST = ["BIRTH CERTIFICATE", "INVALID BIRTH CERTIFICATE", "MARKSHEET", "SCHOOL LEAVING CERTIFICATE", "TRANSFER CERTIFICATE", "PASSPORT"];
window.VLE_NAMES_LIST = ["कपिल", "सचिन", "नसीम", "शौकीन", "राहुल", "अमन", "मोहित"];
window.CASTE_OPTIONS_LIST = ["गुर्जर", "कश्यप", "अहीर", "ब्राह्मण", "सैनी", "प्रजापति", "राजपूत", "त्यागी", "वाल्मीकि"];

window.HOSPITALS_LIST = [
    "CHC BARAUT, BARAUT, BAGHPAT , UTTAR PRADESH, 250611  / सामुदायिक स्वास्थ्य केंद्र बडौत, बडौत, बागपत, उत्तर प्रदेश, 250611",
    "JAGWATI HOSPITAL NEHRU ROAD BARAUT, BAGHPAT, UTTAR PRADESH / जगवती हास्पिटल नेहरू रोड बड़ौत, बागपत, उत्तर प्रदेश",
    "AASTHA NURSING HOME BARAUT, BARAUT, BAGHPAT, UTTAR PRADESH / आस्था नरसिग होम बडौत, बडौत, बागपत, उत्तर प्रदेश",
    "SUB DISTRICT HOSPITAL BARAUT, BAGHPAT, UTTAR PRADESH, 260611 / उप-जिला अस्पताल बडौत, बागपत, उत्तर प्रदेश, 250611"
];

window.DISTRICT_DATA_MAP = {
    'BAGHPAT': { tehsils: ['बड़ौत', 'खेकड़ा', 'बागपत'], thanas: ['बड़ौत', 'खेकड़ा', 'बागपत', 'छपरोली', 'बिनौली', 'रमाला', 'दोघट', 'सिंघावली अहीर', 'बालैनी', 'चांदीनगर'] },
    'SHAMLI': { tehsils: ['कैराना', 'ऊन', 'शामली'], thanas: ['थाना भवन', 'कैराना', 'झिंझाना', 'शामली', 'बाबरी', 'कांधला', 'गढ़ी पुख्ता', 'आदर्श मंडी'] },
    'MUZAFFARNAGAR': { tehsils: ['बुढ़ाना', 'खतौली', 'जानसठ', 'मुजफ्फरनगर'], thanas: ['बुढ़ाना', 'खतौली', 'जानसठ', 'मीरापुर', 'सिविल लाइन', 'कोतवाली नगर', 'नई मंडी', 'चरथावल', 'पुरकाजी', 'छपार', 'मंसूरपुर', 'शाहपुर', 'सिखेड़ा', 'फुगाना', 'भौराकलां', 'ककरौली', 'भोपा', 'रतनपुरी', 'तितावी', 'रामराज'] },
    'MEERUT': { tehsils: ['मेरठ', 'मवाना', 'सरधना'], thanas: ['मवाना', 'सरधना', 'जानी', 'रोहटा', 'परतापुर', 'कंकरखेड़ा', 'दौराला', 'हस्तिनापुर', 'बहसूमा', 'फलावदा', 'किठौर', 'मुंडाली', 'खरखौदा', 'इंचौली', 'गंगानगर', 'मेडिकल', 'नौचंदी', 'सिविल लाइन', 'कोतवाली', 'देहली गेट', 'लिसाड़ी गेट', 'ब्रह्मपुरी', 'टीपी नगर', 'पल्लवपुरम', 'सरूरपुर', 'लालकुर्ती', 'सदर बाजार', 'रेलवे रोड', 'लोहियानगर'] },
    'SAHARANPUR': { tehsils: ['सहारनपुर', 'बेहट', 'देवबंद', 'रामपुर मनिहारन', 'नकुड़'], thanas: ['बेहट', 'देवबंद', 'रामपुर मनिहारन', 'नकुड़', 'गंगोह', 'चिलकाना', 'सरसावा', 'तीतरों', 'नानौता', 'बड़गांव', 'मिर्जापुर', 'फतेहपुर', 'गागलहेड़ी', 'नागल', 'कोतवाली देहात', 'कोतवाली नगर', 'सदर बाजार', 'कुतुबशेर', 'जनकपुरी', 'मंडी', 'बिहारीगढ़'] },
    'GHAZIABAD': { tehsils: ['गाजियाबाद', 'मोदीनगर', 'लोनी'], thanas: ['मोदीनगर', 'लोनी', 'मुरादनगर', 'भोजपुर', 'निवाड़ी', 'लोनी बॉर्डर', 'ट्रॉनिका सिटी', 'अंकुर विहार', 'साहिबाबाद', 'लिंक रोड', 'टीला मोड़', 'शालीमार गार्डन', 'इंदिरापुरम', 'कौशांबी', 'खोड़ा', 'विजयनगर', 'क्रॉसिंग रिपब्लिक', 'कोतवाली घंटाघर', 'सिहानी गेट', 'नंदग्राम', 'कविनगर', 'मधुबन बापूधाम', 'मसूरी', 'वेव सिटी'] }
};

window.buildDocSelectOptions = function(defaultVal = "BIRTH CERTIFICATE") { return window.DOC_OPTIONS_LIST.map(docName => `<option value="${docName}" ${docName === defaultVal ? 'selected' : ''}>${docName}</option>`).join('') + `<option value="OTHER">OTHER (खुद टाइप करें)</option>`; };
window.toggleCustomInput = function(selectEl, customInputId) { const customInp = document.getElementById(customInputId); if (!customInp) return; if (selectEl.value === 'OTHER') { customInp.style.display = 'block'; customInp.required = true; customInp.focus(); } else { customInp.style.display = 'none'; customInp.required = false; customInp.value = ''; } };
window.format12DigitId = function(el) { const digits = el.value.replace(/\D/g, '').substring(0, 12); el.value = digits.match(/.{1,4}/g)?.join(' ') || ''; };
window.toggleNaField = function(checkbox, inputId, originalType = 'text') { const inp = document.getElementById(inputId); if (!inp) return; if (checkbox.checked) { if (inp.type === 'date') inp.type = 'text'; inp.value = 'NA'; inp.readOnly = true; inp.classList.add('bg-slate-200', 'text-slate-600', 'cursor-not-allowed'); } else { inp.type = originalType; inp.value = ''; inp.readOnly = false; inp.classList.remove('bg-slate-200', 'text-slate-600', 'cursor-not-allowed'); inp.focus(); } };
window.cleanDob18AddressString = function(rawVal = '') { let val = String(rawVal).toUpperCase(); val = val.replace(/[\s,\-\/]*(?:UTT[AE]R\s*PRADESH|उत्तर\s*प्रदेश|उत्तरप्रदेश)[\s,\-\/]*/gi, ' '); val = val.replace(/\s{2,}/g, ' '); if (val.trim() !== 'VILL -') { val = val.replace(/[,\-]+$/, ''); } if (val.length > 38) { val = val.substring(0, 38); } return val; };
window.handleDob18AddressInput = function(el) { const rawUpper = el.value.toUpperCase(); const hasUP = /(?:UTT[AE]R\s*PRADESH|उत्तर\s*प्रदेश|उत्तरप्रदेश)/i.test(rawUpper); if (hasUP || rawUpper.length > 38) { el.value = window.cleanDob18AddressString(rawUpper); } else { el.value = rawUpper; } const counterEl = document.getElementById('dobDelhiAddressCharCount'); if (counterEl) { const len = el.value.length; counterEl.innerText = `${len} / 38 Characters`; counterEl.className = len >= 38 ? "text-[10px] font-black text-red-600" : "text-[10px] font-bold text-slate-400"; } };
window.updateTehsilsAndThanas = function() { const districtEl = document.getElementById('districtSelect'); const tehsilSelect = document.getElementById('tehsilSelect'); const thanaSelect = document.getElementById('thanaSelect'); if (!districtEl || !tehsilSelect) return; const selectedDistrict = districtEl.value; const data = window.DISTRICT_DATA_MAP[selectedDistrict] || window.DISTRICT_DATA_MAP['BAGHPAT']; tehsilSelect.innerHTML = data.tehsils.map(t => `<option value="${t}">${t}</option>`).join(''); if (thanaSelect) { thanaSelect.innerHTML = data.thanas.map(th => `<option value="${th}">${th}</option>`).join(''); } };
window.formatDateIN = function(dateStr) { if (!dateStr) return ''; const parts = String(dateStr).split('-'); if (parts.length === 3 && parts[0].length === 4) return `${parts[2]}/${parts[1]}/${parts[0]}`; return dateStr; };
window.getOrdinalDay = function(n) { const s = ["th", "st", "nd", "rd"]; const v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
window.initVerificationDefaults = function() { const now = new Date(); const dayEl = document.getElementById('inpDay'); const myEl = document.getElementById('inpMonthYear'); if (dayEl) dayEl.value = window.getOrdinalDay(now.getDate()); if (myEl) myEl.value = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(); };
window.syncAnnexureENames = function() { const appName = document.getElementById('inpApplicantName')?.value.trim().toUpperCase() || ''; const rec1Input = document.getElementById('inpRecorded1'); const rec2Input = document.getElementById('inpRecorded2'); const retainInput = document.getElementById('inpRetainName'); const removeInput = document.getElementById('inpRemoveName'); if (appName && document.activeElement?.id === 'inpApplicantName') { const urfSplit = appName.split(/\s+(?:URF|ALIAS|उर्फ|उर्फ़)\s+/i); if (urfSplit.length >= 2) { const firstName = urfSplit[0].trim(); const aliasName = urfSplit.slice(1).join(' ').trim(); if (rec1Input) rec1Input.value = firstName; if (rec2Input) rec2Input.value = aliasName; if (retainInput) retainInput.value = firstName; if (removeInput) removeInput.value = aliasName; } else { if (rec1Input) rec1Input.value = appName; if (retainInput) retainInput.value = appName; } } else if (document.activeElement?.id === 'inpRecorded1' && retainInput) { retainInput.value = rec1Input.value.toUpperCase(); } else if (document.activeElement?.id === 'inpRecorded2' && removeInput) { removeInput.value = rec2Input.value.toUpperCase(); } };
window.swapAnnexureERetainRemove = function() { const retainInput = document.getElementById('inpRetainName'); const removeInput = document.getElementById('inpRemoveName'); if (!retainInput || !removeInput) return; const temp = retainInput.value; retainInput.value = removeInput.value; removeInput.value = temp; };

window.userStampCache = {};
window.getTransparentStampDataUrl = function(fileName = 'stamp.png') {
    const cleanName = (fileName.startsWith('/images/') || fileName.startsWith('images/') || fileName.startsWith('data:')) ? fileName : '/images/' + fileName;
    if (window.userStampCache[cleanName]) return Promise.resolve(window.userStampCache[cleanName]);
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
                canvas.width = img.naturalWidth || 794; canvas.height = img.naturalHeight || 1122;
                ctx.drawImage(img, 0, 0); const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) { if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) { data[i + 3] = 0; } }
                ctx.putImageData(imgData, 0, 0); const url = canvas.toDataURL('image/png'); window.userStampCache[cleanName] = url; resolve(url);
            } catch (e) { resolve(cleanName); }
        };
        img.onerror = () => resolve(cleanName);
        img.src = cleanName;
    });
};

// ================= COMPILES SEPARATE /templates/*.html FILES =================
window.buildLocalAffidavitHtml = function(fileId, d = {}, withShadow = true, withStamp = false, stampSrc = '') {
    const shadowClass = withShadow ? 'shadow-2xl' : '';
    const finalStampSrc = stampSrc || (typeof window.pickRandomAvailableStamp === 'function' ? window.pickRandomAvailableStamp() : '/images/stamp.png');
    const stampOverlayHtml = (withStamp && finalStampSrc) ? `
        <div class="stamp-overlay-layer">
            <img src="${finalStampSrc}" onerror="this.style.display='none'" />
        </div>
    ` : '';

    const rawTemplate = window.loadedTemplatesCache[fileId];
    if (rawTemplate) {
        let compiled = rawTemplate.replace('class="affidavit-paper"', `class="affidavit-paper ${shadowClass}"`);
        compiled = compiled.replace(/\{\{STAMP_OVERLAY\}\}/g, stampOverlayHtml);
        compiled = compiled.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (m, key) => {
            return (d[key] !== undefined && d[key] !== null) ? d[key] : '';
        });
        return compiled;
    }

    return `<div class="affidavit-paper ${shadowClass}">${stampOverlayHtml}<div>Template loading... Please click Preview again.</div><div></div></div>`;
};

// ================= SHARED PDF DOWNLOAD, DIRECT PRINT & SHARE =================
window.downloadHtmlDocAsPdf = async function(fileId, formDataObj, fileName, withStamp = false, stampSrc = '', certificateFileId = '') {
    const btn = document.getElementById('modalDownloadBtn');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...'; btn.disabled = true; }

    await window.preloadAllHtmlTemplates();
    if (withStamp && typeof window.preloadAllAvailableStamps === 'function' && window.availableStampsList?.length === 0) {
        await window.preloadAllAvailableStamps();
    }

    const finalStampSrc = withStamp ? (stampSrc || (typeof window.pickRandomAvailableStamp === 'function' ? window.pickRandomAvailableStamp() : '/images/stamp.png')) : '';
    const savedScrollX = window.scrollX; const savedScrollY = window.scrollY; window.scrollTo(0, 0);

    const tempWrapper = document.createElement('div');
    tempWrapper.style.cssText = 'position:fixed;top:0;left:0;width:794px;height:1122px;margin:0;padding:0;z-index:99999;background:#ffffff;overflow:hidden;';
    tempWrapper.innerHTML = window.buildLocalAffidavitHtml(fileId, formDataObj, false, withStamp, finalStampSrc);
    document.body.appendChild(tempWrapper);
    const targetEl = tempWrapper.querySelector('.affidavit-paper');

    try {
        const opt = {
            margin: 0, filename: withStamp ? fileName.replace('.pdf', ' (With Stamp).pdf') : fileName,
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 2, useCORS: true, x: 0, y: 0, scrollX: 0, scrollY: 0, width: 794, height: 1122, windowWidth: 794, windowHeight: 1122 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        await html2pdf().set(opt).from(targetEl).save();
        
        if (certificateFileId) {
            setTimeout(() => {
                window.open(`https://drive.google.com/uc?export=download&id=${certificateFileId}`, '_blank');
            }, 800);
        }
    } catch (err) {
        alert("PDF डाउनलोड करने में समस्या आई।");
    } finally {
        document.body.removeChild(tempWrapper); window.scrollTo(savedScrollX, savedScrollY);
        if (btn) { btn.innerHTML = origHtml; btn.disabled = false; }
    }
};

window.directPrintDocument = async function(fileId, formDataObj, fileName, withStamp = false, stampSrc = '', certificateFileId = '') {
    if (String(fileId).startsWith('LOCAL_HTML_')) {
        await window.preloadAllHtmlTemplates();
        if (withStamp && typeof window.preloadAllAvailableStamps === 'function' && window.availableStampsList?.length === 0) {
            await window.preloadAllAvailableStamps();
        }
        
        if (certificateFileId) {
            window.open(`https://drive.google.com/file/d/${certificateFileId}/view`, '_blank');
        }

        const finalStampSrc = withStamp ? (stampSrc || (typeof window.pickRandomAvailableStamp === 'function' ? window.pickRandomAvailableStamp() : '/images/stamp.png')) : '';
        const htmlContent = window.buildLocalAffidavitHtml(fileId, formDataObj, false, withStamp, finalStampSrc);
        let printFrame = document.getElementById('directPrintIframe');
        if (printFrame) document.body.removeChild(printFrame);

        printFrame = document.createElement('iframe'); printFrame.id = 'directPrintIframe';
        printFrame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
        document.body.appendChild(printFrame);

        const frameDoc = printFrame.contentWindow.document; frameDoc.open();
        frameDoc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${fileName || 'Print Document'}</title>
                <style>
                    @page { size: A4; margin: 0; }
                    html, body { margin: 0; padding: 0; background: #ffffff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .affidavit-paper { position: relative !important; font-family: 'Times New Roman', Times, serif; width: 794px; height: 1122px; padding: 46px 62px; background: #ffffff; color: #000000; font-size: 15px; line-height: 1.55; box-sizing: border-box; display: block !important; margin: 0 !important; overflow: hidden; }
                    .affidavit-paper > div:last-child { position: absolute !important; bottom: 46px !important; left: 62px !important; right: 62px !important; }
                    .filled-val { font-weight: bold !important; color: #000000 !important; text-decoration: underline !important; text-underline-offset: 3px !important; }
                    .stamp-overlay-layer { position: absolute; top: 0; left: 0; width: 794px; height: 1122px; pointer-events: none; z-index: 30; mix-blend-mode: multiply; overflow: hidden; }
                    .stamp-overlay-layer img { width: 794px; height: 1122px; object-fit: contain; object-position: top center; mix-blend-mode: multiply; display: block; }
                </style>
            </head>
            <body>${htmlContent}</body>
            </html>
        `);
        frameDoc.close();
        setTimeout(() => { printFrame.contentWindow.focus(); printFrame.contentWindow.print(); }, 350);
    } else {
        window.open(`https://drive.google.com/file/d/${fileId}/view`, '_blank');
    }
};

window.shareHtmlDocAsPdf = async function(fileId, formDataObj, fileName, withStamp = false, stampSrc = '', certificateFileId = '') {
    const btn = document.getElementById('modalShareBtn');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...'; btn.disabled = true; }

    await window.preloadAllHtmlTemplates();
    if (withStamp && typeof window.preloadAllAvailableStamps === 'function' && window.availableStampsList?.length === 0) {
        await window.preloadAllAvailableStamps();
    }
    const finalStampSrc = withStamp ? (stampSrc || (typeof window.pickRandomAvailableStamp === 'function' ? window.pickRandomAvailableStamp() : '/images/stamp.png')) : '';
    const savedScrollX = window.scrollX; const savedScrollY = window.scrollY; window.scrollTo(0, 0);

    const tempWrapper = document.createElement('div');
    tempWrapper.style.cssText = 'position:fixed;top:0;left:0;width:794px;height:1122px;margin:0;padding:0;z-index:99999;background:#ffffff;overflow:hidden;';
    tempWrapper.innerHTML = window.buildLocalAffidavitHtml(fileId, formDataObj, false, withStamp, finalStampSrc);
    document.body.appendChild(tempWrapper);
    const targetEl = tempWrapper.querySelector('.affidavit-paper');

    try {
        const opt = { margin: 0, filename: withStamp ? fileName.replace('.pdf', ' (With Stamp).pdf') : fileName, image: { type: 'jpeg', quality: 1.0 }, html2canvas: { scale: 2, useCORS: true, x: 0, y: 0, scrollX: 0, scrollY: 0, width: 794, height: 1122 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
        const pdfBlob = await html2pdf().set(opt).from(targetEl).output('blob');
        const finalFileName = withStamp ? fileName.replace('.pdf', ' (With Stamp).pdf') : fileName;
        const file = new File([pdfBlob], finalFileName, { type: 'application/pdf' });

        if (certificateFileId) {
            window.open(`https://drive.google.com/file/d/${certificateFileId}/view`, '_blank');
        }

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: finalFileName, text: 'Here is your generated document.' });
        } else {
            alert('Aapka browser direct file share support nahi karta. Kripya PDF download karke share karein.');
        }
    } catch (err) {
        alert("PDF share karne mein samasya aayi.");
    } finally {
        document.body.removeChild(tempWrapper); window.scrollTo(savedScrollX, savedScrollY);
        if (btn) { btn.innerHTML = origHtml; btn.disabled = false; }
    }
};
