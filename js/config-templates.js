// ============================================================================
// FILE 1: js/config-templates.js
// (Firebase Config, Common Helpers, District Maps, Hospitals & All 9 Annexures A4 Layout)
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
    apiKey: "AIzaSyBSiDAvDYyBG8hkmez7s900JHhlbenG2nU",
    authDomain: "oaps-d2cce.firebaseapp.com",
    projectId: "oaps-d2cce",
    storageBucket: "oaps-d2cce.firebasestorage.app",
    messagingSenderId: "619616461386",
    appId: "1:619616461386:web:c3b9b36815369c6f5d7cb3",
    measurementId: "G-5Y6RHLE2LK"
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
                    <img src="images/logo.png" onerror="this.src='logo.png'" alt="Ojas Logo" class="w-full h-full object-contain" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1211/1211833.png'">
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
// Free VIP Access Users (Admin + Aadhaar + Danish)
window.FREE_VIP_EMAILS = [
    "aadhaar@gmail.com",
    "aadhaar@print.com",
    "danish@print.com"
];
window.MS_PER_DAY = 24 * 60 * 60 * 1000;

window.extractUserDisplayName = function(email, username) {
    let name = username;
    if (!name && email) {
        name = email.split('@')[0];
    }
    if (!name) return 'User';
    name = String(name).trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
};

window.isAllowedPortalEmail = function(email) {
    if (!email) return false;
    const cleanEmail = String(email).trim().toLowerCase();
    if (cleanEmail === window.ADMIN_EMAIL || window.FREE_VIP_EMAILS.includes(cleanEmail)) return true;
    return cleanEmail.endsWith("@print.com");
};

// ================= API URLS =================
window.API_URLS = {
    "domicile": "https://script.google.com/macros/s/AKfycbwqvv_hWDzTltYcP7UDC41uPM7X2wvCzYFvu_eKu8t82TJf_f4QD5tLQtZ23_JCgYlgFA/exec",
    "DOB": "https://script.google.com/macros/s/AKfycbyncAUbXWLplC_uHgodCqhPCDLTWFiWEQVzxPAInLP7zedGUQRdRbvix_jdDBJrYMlc9w/exec",
    "DOB_MEERUT": "https://script.google.com/macros/s/AKfycbyncAUbXWLplC_uHgodCqhPCDLTWFiWEQVzxPAInLP7zedGUQRdRbvix_jdDBJrYMlc9w/exec",
    "DOB_DELHI": "DELHI",
    "CASTE": "https://script.google.com/macros/s/AKfycbzUs_e_ga3Ly3SQ9qq5inqHgfC23-jzav8sjUES7XnPw7cyUn3DHhVEBFdgxqUejU5Y/exec",
    "certificate": "https://script.google.com/macros/s/AKfycbxWe_nx9QyfR3oHgJSG7Os_u2FOF22HdPDGUO7nekdwMYIfbNL16LNpIvY2M-QSHTyl/exec",
    "passport": "PASSPORT",
    "minor": "https://script.google.com/macros/s/AKfycbwepvaw92YcuQUQCzYi5DXoL4m2OS00_5vShecUJRY_fsnCREpnTFeLgsGGtka0R1Ot/exec" // <--- यहाँ नया Minor Google Apps Script Web App URL डालें
};


// ================= SEPARATE HTML TEMPLATES LOADER (/templates/) =================
window.TEMPLATE_FILES_MAP = {
    'LOCAL_HTML_CASTE': 'templates/caste.html',
    'LOCAL_HTML_DOMICILE': 'templates/domicile.html',
    'LOCAL_HTML_ANNEXURE_1': 'templates/annexure-1.html',
    'LOCAL_HTML_ANNEXURE_1A': 'templates/annexure-1a.html',
    'LOCAL_HTML_ANNEXURE_3': 'templates/annexure-3.html',
    'LOCAL_HTML_ANNEXURE_3A': 'templates/annexure-3a.html',
    'LOCAL_HTML_ANNEXURE_B': 'templates/annexure-b.html',
    'LOCAL_HTML_ANNEXURE_C': 'templates/annexure-c.html',
    'LOCAL_HTML_ANNEXURE_D': 'templates/annexure-d.html',
    'LOCAL_HTML_ANNEXURE_E': 'templates/annexure-e.html',
    'LOCAL_HTML_ANNEXURE_F': 'templates/annexure-f.html'
};

window.loadedTemplatesCache = {};
window.preloadAllHtmlTemplates = async function() {
    const entries = Object.entries(window.TEMPLATE_FILES_MAP);
    await Promise.all(entries.map(async ([fileId, filePath]) => {
        if (window.loadedTemplatesCache[fileId]) return;
        try {
            const res = await fetch(filePath + '?v=6.0');
            if (res.ok) {
                let text = await res.text();
                // Extract .affidavit-paper div if wrapped in full html
                const match = text.match(/<div class="affidavit-paper"[\s\S]*<\/div>\s*(?:<\/body>|$)/i);
                if (match) {
                    text = match[0].replace(/<\/body>\s*$/i, '');
                }
                window.loadedTemplatesCache[fileId] = text.trim();
            }
        } catch (e) {}
    }));
};
window.preloadAllHtmlTemplates();

// ================= APPS SCRIPT SDM & LOCATION LOGIC FOR CASTE & DOMICILE =================
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

window.DOC_OPTIONS_LIST = ["BIRTH CERTIFICATE", "INVALID BIRTH CERTIFICATE", "MARKSHEET", "SCHOOL LEAVING CERTIFICATE", "TRANSFER CERTIFICATE", "PASSPORT"];
window.VLE_NAMES_LIST = ["कपिल", "सचिन", "नसीम", "शौकीन", "राहुल", "अमन", "मोहित"];
window.CASTE_OPTIONS_LIST = ["गुर्जर", "कश्यप", "अहीर", "ब्राह्मण", "सैनी", "प्रजापति", "राजपूत", "त्यागी", "वाल्मीकि"];

// Hospitals List for Minor Place of Birth (PB)
window.HOSPITALS_LIST = [
    "CHC BARAUT, BARAUT, BAGHPAT , UTTAR PRADESH, 250611  / सामुदायिक स्वास्थ्य केंद्र बडौत, बडौत, बागपत, उत्तर प्रदेश, 250611",
    "JAGWATI HOSPITAL NEHRU ROAD BARAUT, BAGHPAT, UTTAR PRADESH / जगवती हास्पिटल नेहरू रोड बड़ौत, बागपत, उत्तर प्रदेश",
    "AASTHA NURSING HOME BARAUT, BARAUT, BAGHPAT, UTTAR PRADESH / आस्था नरसिग होम बडौत, बडौत, बागपत, उत्तर प्रदेश",
    "SUB DISTRICT HOSPITAL BARAUT, BAGHPAT, UTTAR PRADESH, 260611 / उप-जिला अस्पताल बडौत, बडौत, बागपत, उत्तर प्रदेश, 250611"
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
window.handleDob18AddressInput = function(el) { const rawUpper = el.value.toUpperCase(); const hasUP = /(?:UTT[AE]R\s*PRADESH|उत्तर\s*प्रदेश|उत्तरप्रदेश)/i.test(rawUpper); if (hasUP || rawUpper.length > 38) { el.value = window.cleanDob18AddressString(rawUpper); } else { el.value = rawUpper; } const counterEl = document.getElementById('dobAddressCharCount'); if (counterEl) { const len = el.value.length; counterEl.innerText = `${len} / 38 Characters`; counterEl.className = len >= 38 ? "text-[10px] font-black text-red-600" : "text-[10px] font-bold text-slate-400"; } };
window.updateTehsilsAndThanas = function() { const districtEl = document.getElementById('districtSelect'); const tehsilSelect = document.getElementById('tehsilSelect'); const thanaSelect = document.getElementById('thanaSelect'); if (!districtEl || !tehsilSelect) return; const selectedDistrict = districtEl.value; const data = window.DISTRICT_DATA_MAP[selectedDistrict] || window.DISTRICT_DATA_MAP['BAGHPAT']; tehsilSelect.innerHTML = data.tehsils.map(t => `<option value="${t}">${t}</option>`).join(''); if (thanaSelect) { thanaSelect.innerHTML = data.thanas.map(th => `<option value="${th}">${th}</option>`).join(''); } };
window.formatDateIN = function(dateStr) { if (!dateStr) return ''; const parts = String(dateStr).split('-'); if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`; return dateStr; };
window.getOrdinalDay = function(n) { const s = ["th", "st", "nd", "rd"]; const v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
window.initVerificationDefaults = function() { const now = new Date(); const dayEl = document.getElementById('inpDay'); const myEl = document.getElementById('inpMonthYear'); if (dayEl) dayEl.value = window.getOrdinalDay(now.getDate()); if (myEl) myEl.value = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(); };
window.syncAnnexureENames = function() { const appName = document.getElementById('inpApplicantName')?.value.trim().toUpperCase() || ''; const rec1Input = document.getElementById('inpRecorded1'); const rec2Input = document.getElementById('inpRecorded2'); const retainInput = document.getElementById('inpRetainName'); const removeInput = document.getElementById('inpRemoveName'); if (appName && document.activeElement?.id === 'inpApplicantName') { const urfSplit = appName.split(/\s+(?:URF|ALIAS|उर्फ|उर्फ़)\s+/i); if (urfSplit.length >= 2) { const firstName = urfSplit[0].trim(); const aliasName = urfSplit.slice(1).join(' ').trim(); if (rec1Input) rec1Input.value = firstName; if (rec2Input) rec2Input.value = aliasName; if (retainInput) retainInput.value = firstName; if (removeInput) removeInput.value = aliasName; } else { if (rec1Input) rec1Input.value = appName; if (retainInput) retainInput.value = appName; } } else if (document.activeElement?.id === 'inpRecorded1' && retainInput) { retainInput.value = rec1Input.value.toUpperCase(); } else if (document.activeElement?.id === 'inpRecorded2' && removeInput) { removeInput.value = rec2Input.value.toUpperCase(); } };
window.swapAnnexureERetainRemove = function() { const retainInput = document.getElementById('inpRetainName'); const removeInput = document.getElementById('inpRemoveName'); if (!retainInput || !removeInput) return; const temp = retainInput.value; retainInput.value = removeInput.value; removeInput.value = temp; };

window.userStampCache = {};
window.getTransparentStampDataUrl = function(fileName = 'stamp.png') {
    if (window.userStampCache[fileName]) return Promise.resolve(window.userStampCache[fileName]);
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
                canvas.width = img.naturalWidth || 794; canvas.height = img.naturalHeight || 1122;
                ctx.drawImage(img, 0, 0); const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) { if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) { data[i + 3] = 0; } }
                ctx.putImageData(imgData, 0, 0); const url = canvas.toDataURL('image/png'); window.userStampCache[fileName] = url; resolve(url);
            } catch (e) { resolve(fileName); }
        };
        img.onerror = () => {
            if (!fileName.startsWith('images/')) {
                img.onerror = () => resolve(fileName);
                img.src = fileName;
            } else {
                resolve(fileName);
            }
        };
        img.src = (fileName.startsWith('images/') || fileName.startsWith('data:')) ? fileName : ('images/' + fileName);
    });
};

window.buildLocalAffidavitHtml = function(fileId, d = {}, withShadow = true, withStamp = false, stampSrc = '') {
    const shadowClass = withShadow ? 'shadow-2xl' : '';
    const finalStampSrc = stampSrc || (typeof window.pickRandomAvailableStamp === 'function' ? window.pickRandomAvailableStamp() : 'stamp.png');
    const stampOverlayHtml = (withStamp && finalStampSrc) ? `
        <div class="stamp-overlay-layer">
            <img src="${finalStampSrc}" onerror="this.style.display='none'" />
        </div>
    ` : '';

    
    // 0. Check if external template from /templates/*.html is loaded in cache
    if (window.loadedTemplatesCache && window.loadedTemplatesCache[fileId]) {
        let compiled = window.loadedTemplatesCache[fileId].replace('class="affidavit-paper"', `class="affidavit-paper ${shadowClass}"`);
        compiled = compiled.replace(/\{\{STAMP_OVERLAY\}\}/g, stampOverlayHtml);
        compiled = compiled.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (m, key) => {
            return (d[key] !== undefined && d[key] !== null) ? d[key] : '';
        });
        return compiled;
    }

    if (fileId === 'LOCAL_HTML_CASTE') {
        return `
            <div class="affidavit-paper ${shadowClass}" style="font-family: 'Arial', 'Noto Sans Devanagari', sans-serif; border: 3px double #1e293b; padding: 36px 46px !important;">
                ${stampOverlayHtml}
                <div>
                    <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 14px;">
                        <div style="font-size: 21px; font-weight: 900; color: #0f172a;">उत्तर प्रदेश शासन</div>
                        <div style="font-size: 14px; font-weight: bold; margin-top: 2px;">कार्यालय तहसीलदार : ${d.TEHSIL || ''} | जनपद : ${d.DISS || ''}</div>
                        <div style="display: inline-block; margin-top: 8px; background: #0f172a; color: #ffffff; font-weight: 900; padding: 4px 20px; border-radius: 4px; font-size: 16px;">
                            जाति प्रमाण पत्र (CASTE CERTIFICATE)
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 13.5px; font-weight: bold;">
                        <div>आवेदन क्र० : <span class="filled-val">${d.RN || ''}</span></div>
                        <div>प्रमाणपत्र क्र० : <span class="filled-val">0${d.AM || ''}</span></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; margin-bottom: 18px;">
                        <div style="flex: 1; text-align: justify; line-height: 1.9; font-size: 15px;">
                            प्रमाणित किया जाता है कि <strong>${d.DISPLAY_NAME || d.NAME || ''}</strong> 
                            ${d.REL || 'पुत्र / पुत्री'} <strong>${d.FNAME || ''}</strong>, माता का नाम <strong>${d.MNAME || ''}</strong>, 
                            निवासी मोहल्ला/क्षेत्र <strong>${d.AREA || ''}</strong>, ग्राम/वार्ड <strong>${d.GRAM || ''}</strong>, 
                            तहसील <strong>${d.TEHSIL || ''}</strong>, जनपद <strong>${d.DISS || ''}</strong> (उत्तर प्रदेश) 
                            राज्य की <strong>${d.CAST || ''}</strong> जाति के व्यक्ति हैं।<br><br>
                            यह उत्तर प्रदेश लोक सेवा (अनुसूचित जातियों, अनुसूचित जनजातियों तथा अन्य पिछड़े वर्गों के लिए आरक्षण) अधिनियम के अंतर्गत मान्यता प्राप्त है।
                        </div>
                        <div style="width: 125px; display: flex; flex-direction: column; align-items: center; gap: 10px; flex-shrink: 0;">
                            <div style="width: 120px; height: 145px; border: 2px solid #0f172a; padding: 2px; background: #fff;">
                                <img src="${d.PHOTO || ''}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'" />
                            </div>
                            <div style="width: 105px; height: 105px; border: 1px solid #cbd5e1; padding: 2px; background: #fff;">
                                <img src="${d.QR_URL || ''}" crossorigin="anonymous" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.style.display='none'" />
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 16px; padding: 10px 14px; border: 1px dashed #64748b; background: #f8fafc; font-size: 12.5px; line-height: 1.6;">
                        <div><strong>जन सेवा केंद्र (CSC/VLE) संचालक :</strong> ${d.VLE || ''}</div>
                        <div><strong>नोट :</strong> यह प्रमाण पत्र डिजिटल रूप से हस्ताक्षरित है एवं क्यूआर कोड स्कैन कर सत्यापित किया जा सकता है।</div>
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; font-weight: bold; font-size: 14px; border-top: 1px solid #cbd5e1; padding-top: 14px;">
                        <div>स्थान : ${d.TEHSIL || ''}, ${d.DISS || ''}<br>जारी दिनांक : <span class="filled-val">${d.DATE || d.ISSUE_DATE || ''}</span></div>
                        <div style="text-align: right;"><div style="font-size: 15px; font-weight: 900;">${d.SDM || ''}</div><div>तहसीलदार / सक्षम अधिकारी</div><div style="font-size: 12px;">तहसील ${d.TEHSIL || ''}, ${d.DISS || ''}</div></div>
                    </div>
                </div>
            </div>`;
    }

    if (fileId === 'LOCAL_HTML_DOMICILE') {
        return `
            <div class="affidavit-paper ${shadowClass}" style="font-family: 'Arial', 'Noto Sans Devanagari', sans-serif; border: 3px double #1e293b; padding: 36px 46px !important;">
                ${stampOverlayHtml}
                <div>
                    <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 14px;">
                        <div style="font-size: 21px; font-weight: 900; color: #0f172a;">उत्तर प्रदेश शासन</div>
                        <div style="font-size: 14px; font-weight: bold; margin-top: 2px;">कार्यालय उप-जिलाधिकारी / तहसीलदार : ${d.TEHSIL || ''} | जनपद : ${d.DISS || ''}</div>
                        <div style="display: inline-block; margin-top: 8px; background: #0f172a; color: #ffffff; font-weight: 900; padding: 4px 20px; border-radius: 4px; font-size: 16px;">
                            निवास प्रमाण पत्र (DOMICILE CERTIFICATE)
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 13.5px; font-weight: bold;">
                        <div>आवेदन क्र० : <span class="filled-val">${d.RN || ''}</span></div>
                        <div>प्रमाणपत्र क्र० : <span class="filled-val">0${d.AM || ''}</span></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 18px; margin-bottom: 18px;">
                        <div style="flex: 1; text-align: justify; line-height: 1.9; font-size: 15px;">
                            प्रमाणित किया जाता है कि <strong>${d.DISPLAY_NAME || d.NAME || ''}</strong> 
                            ${d.REL || 'पुत्र / पुत्री'} <strong>${d.FNAME || ''}</strong>, माता का नाम <strong>${d.MNAME || ''}</strong>, 
                            मकान नं० <strong>${d.MN || ''}</strong>, मोहल्ला/पोस्ट <strong>${d.AREA || ''}</strong>, 
                            ग्राम/वार्ड <strong>${d.GRAM || ''}</strong>, थाना <strong>${d.THANA || ''}</strong>, 
                            तहसील <strong>${d.TEHSIL || ''}</strong>, जनपद <strong>${d.DISS || ''}</strong> (उत्तर प्रदेश) के स्थायी निवासी हैं।
                        </div>
                        <div style="width: 125px; display: flex; flex-direction: column; align-items: center; gap: 10px; flex-shrink: 0;">
                            <div style="width: 120px; height: 145px; border: 2px solid #0f172a; padding: 2px; background: #fff;">
                                <img src="${d.PHOTO || ''}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'" />
                            </div>
                            <div style="width: 105px; height: 105px; border: 1px solid #cbd5e1; padding: 2px; background: #fff;">
                                <img src="${d.QR_URL || ''}" crossorigin="anonymous" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.style.display='none'" />
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 16px; padding: 10px 14px; border: 1px dashed #64748b; background: #f8fafc; font-size: 12.5px; line-height: 1.6;">
                        <div><strong>जन सेवा केंद्र (CSC/VLE) संचालक :</strong> ${d.VLE || ''}</div>
                        <div><strong>नोट :</strong> यह प्रमाण पत्र डिजिटल रूप से हस्ताक्षरित है एवं क्यूआर कोड स्कैन कर सत्यापित किया जा सकता है।</div>
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; font-weight: bold; font-size: 14px; border-top: 1px solid #cbd5e1; padding-top: 14px;">
                        <div>स्थान : ${d.TEHSIL || ''}, ${d.DISS || ''}<br>जारी दिनांक : <span class="filled-val">${d.DATE || d.ISSUE_DATE || ''}</span></div>
                        <div style="text-align: right;"><div style="font-size: 15px; font-weight: 900;">${d.SDM || ''}</div><div>सक्षम अधिकारी / उप-जिलाधिकारी</div><div style="font-size: 12px;">तहसील ${d.TEHSIL || ''}, ${d.DISS || ''}</div></div>
                    </div>
                </div>
            </div>`;
    }

    if (fileId === 'LOCAL_HTML_ANNEXURE_1') {
        return `
            <div class="affidavit-paper ${shadowClass}">
                ${stampOverlayHtml}
                <div>
                    <div style="text-align: center; font-weight: bold; font-size: 17px; text-decoration: underline; margin-bottom: 6px;">Annexure-I- For Adults</div>
                    <div style="text-align: center; font-weight: bold; font-size: 16px; text-decoration: underline; margin-bottom: 10px;">Affidavit for date of birth updation</div>
                    <div style="text-align: center; font-weight: bold; font-size: 13.5px; line-height: 1.4; margin-bottom: 22px;">
                        (Applicable for cases where the DoB is verified. To be printed on non-judicial<br>
                        stamp paper of minimum value of <span style="font-family: Arial, sans-serif;">₹10</span>)
                    </div>
                    <div style="text-align: justify; line-height: 1.75; margin-bottom: 14px;">
                        1. I, <span class="filled-val">${d.applicantName || ''}</span> ${d.rel || 'S/D/W/o'} <span class="filled-val">${d.relativeName || ''}</span> resident of <span class="filled-val">${d.address || ''}</span> holding ID number <span class="filled-val">${d.idNumber || ''}</span> do hereby solemnly affirm and declare as under:-
                    </div>
                    <ol style="list-style-type: lower-roman; padding-left: 34px; margin-bottom: 18px; text-align: justify;">
                        <li style="margin-bottom: 11px; padding-left: 6px;">That I am the resident of the above said address.</li>
                        <li style="margin-bottom: 11px; padding-left: 6px;">That my correct date of birth is <span class="filled-val">${d.newDob || ''}</span>.</li>
                        <li style="margin-bottom: 11px; padding-left: 6px;">That the earlier recorded date of birth in Aadhar is <span class="filled-val">${d.oldDob || ''}</span>.</li>
                        <li style="margin-bottom: 11px; padding-left: 6px;">That I have <span class="filled-val">${d.updateTimes || 'NEVER'}</span> updated my date of birth in Aadhar.</li>
                        <li style="margin-bottom: 11px; padding-left: 6px;">That currently a birth certificate/ corrected version of the earlier submitted document (document must be a part of existing list of valid PDB documents) (choose as applicable) is being provided in support of DoB update request. </li>
                        <li style="margin-bottom: 11px; padding-left: 6px;">That I wish to get my date of birth updated as <span class="filled-val">${d.newDob || ''}</span> for which I am submitting <span class="filled-val">${d.newDoc || ''}</span> as proof of date of birth.</li>
                        <li style="margin-bottom: 11px; padding-left: 6px;">That I further undertake that I shall not be eligible for any further updation of my date of birth.</li>
                    </ol>
                    <div style="text-align: justify; line-height: 1.65; margin-bottom: 14px;">
                        2. I undertake that if the document submitted as proof of date of birth is found to be fraudulent/false/forged/non-genuine or I was not entitled for the said document, my ID number may be deactivated as per Regulation 28 of the (Enrolment and Update) Regulations, 2016 and I shall be liable to be prosecuted under provisions of the applicable law.
                    </div>
                    <div style="text-align: justify; line-height: 1.65; margin-bottom: 38px;">
                        3. I hereby declare that all the information mentioned above is true to the best of my knowledge. In case of any discrepancies, the undersigned will be held responsible.
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 26px; font-weight: bold;">
                        <div>Date: <span class="filled-val">${d.date || ''}</span></div>
                        <div style="text-align: right;">
                            <div style="margin-bottom: 4px;" class="filled-val">${d.applicantName || ''}</div>
                            <div>Name &amp; Signature of Resident (Deponent)</div>
                        </div>
                    </div>
                    <div style="text-align: center; font-weight: bold; font-size: 13.5px; line-height: 1.4;">
                        (This affidavit may be signed and attested in presence of a Judicial Magistrate or Executive<br>Magistrate/Notary Public)
                    </div>
                </div>
            </div>
        `;
    }

    if (fileId === 'LOCAL_HTML_ANNEXURE_1A') {
        return `
            <div class="affidavit-paper ${shadowClass}">
                ${stampOverlayHtml}
                <div>
                    <div style="text-align: center; font-weight: bold; font-size: 17px; text-decoration: underline; margin-bottom: 6px;">Annexure IA- For children</div>
                    <div style="text-align: center; font-weight: bold; font-size: 16px; text-decoration: underline; margin-bottom: 8px;">Affidavit for date of birth updation</div>
                    <div style="text-align: center; font-weight: bold; font-size: 13.5px; line-height: 1.4; margin-bottom: 18px;">
                        (Applicable for cases where the DoB is verified. To be printed on non-judicial<br>
                        stamp paper of minimum value of <span style="font-family: Arial, sans-serif;">₹10</span>)
                    </div>
                    <div style="text-align: justify; line-height: 1.7; margin-bottom: 12px;">
                        1. I, <span class="filled-val">${d.parentName || ''}</span> ${d.rel || 'S/D/W/o'} <span class="filled-val">${d.relativeName || ''}</span> resident of <span class="filled-val">${d.address || ''}</span> holding ID number <span class="filled-val">${d.parentIdNumber || ''}</span> do hereby solemnly affirm and declare as under:-
                    </div>
                    <ol style="list-style-type: lower-roman; padding-left: 34px; margin-bottom: 16px; text-align: justify;">
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I am the resident of the above said address.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I am parent/legal guardian of the <span class="filled-val">${d.childName || ''}</span> holding ID number <span class="filled-val">${d.childIdNumber || ''}</span>.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That correct date of birth of my child/ ward is <span class="filled-val">${d.newDob || ''}</span>.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That the earlier recorded date of birth of my child/ward is <span class="filled-val">${d.oldDob || ''}</span> based on <span class="filled-val">${d.oldDoc || ''}</span> document submitted by me.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I have <span class="filled-val">${d.updateTimes || 'NEVER'}</span> updated my child/ward date of birth.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That <span class="filled-val">${d.newDoc || 'BIRTH CERTIFICATE'}</span> of my child/ward is being provided in support of DoB update request.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I wish to get my child/ward date of birth updated as <span class="filled-val">${d.newDob || ''}</span> for which I am submitting his/her <span class="filled-val">${d.newDoc || 'BIRTH CERTIFICATE'}</span> as proof of date of birth.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I further undertake that my child/ward shall not be eligible for any further updation of date of birth.</li>
                    </ol>
                    <div style="text-align: justify; line-height: 1.6; margin-bottom: 10px;">2. That I am the resident of the above said address.</div>
                    <div style="text-align: justify; line-height: 1.6; margin-bottom: 12px;">
                        3. I undertake that if the document submitted as proof of date of birth is found to be fraudulent/false/forged/non-genuine or my child/ward was not entitled for the said document, the ID number of my child/ward may be deactivated as per Regulation 28 of the (Enrolment and Update) Regulations, 2016 and I shall be liable to be prosecuted under provisions of the applicable law.
                    </div>
                    <div style="text-align: justify; line-height: 1.6; margin-bottom: 28px;">
                        4. I hereby declare that all the information mentioned above is true to the best of my knowledge. In case of any discrepancies, the undersigned will be held responsible.
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 22px; font-weight: bold;">
                        <div>Date: <span class="filled-val">${d.date || ''}</span></div>
                        <div style="text-align: right;">
                            <div style="margin-bottom: 4px;" class="filled-val">${d.parentName || ''}</div>
                            <div>Name &amp; Signature of Parent/Guardian of Minor (Deponent)</div>
                        </div>
                    </div>
                    <div style="text-align: center; font-weight: bold; font-size: 13.5px; line-height: 1.4;">
                        (This affidavit may be signed and attested in presence of a Judicial Magistrate or Executive<br>Magistrate/Notary Public)
                    </div>
                </div>
            </div>
        `;
    }

    if (fileId === 'LOCAL_HTML_ANNEXURE_3') {
        return `
            <div class="affidavit-paper ${shadowClass}">
                ${stampOverlayHtml}
                <div>
                    <div style="text-align: center; font-weight: bold; font-size: 17px; text-decoration: underline; margin-bottom: 6px;">Annexure III-For adults</div>
                    <div style="text-align: center; font-weight: bold; font-size: 16px; text-decoration: underline; margin-bottom: 8px;">Affidavit for reactivation</div>
                    <div style="text-align: center; font-weight: bold; font-size: 13.5px; line-height: 1.4; margin-bottom: 20px;">
                        (To be printed on non-judicial stamp paper of minimum value of <span style="font-family: Arial, sans-serif;">₹10</span>)
                    </div>
                    <div style="text-align: justify; line-height: 1.75; margin-bottom: 14px;">
                        1. I, <span class="filled-val">${d.applicantName || ''}</span> ${d.rel || 'S/D/W/o'} <span class="filled-val">${d.relativeName || ''}</span> resident of <span class="filled-val">${d.address || ''}</span> holding ID number <span class="filled-val">${d.idNumber || ''}</span> do hereby solemnly affirm and declare as under: -
                    </div>
                    <ol style="list-style-type: lower-roman; padding-left: 34px; margin-bottom: 18px; text-align: justify;">
                        <li style="margin-bottom: 10px; padding-left: 6px;">That I am resident of the above said address.</li>
                        <li style="margin-bottom: 10px; padding-left: 6px;">That I had earlier submitted an invalid document - <span class="filled-val">${d.invalidDocName || ''}</span> bearing number <span class="filled-val">${d.invalidDocNo || ''}</span> dated <span class="filled-val">${d.invalidDocDate || ''}</span> and provided false information, while enrolment/update through EID number <span class="filled-val">${d.eidNumber || ''}</span> as proof of date of birth.</li>
                        <li style="margin-bottom: 10px; padding-left: 6px;">That I understand and accept that submission of such invalid document and false information is a violation of law and legal action may be taken against me for the same under applicable laws.</li>
                        <li style="margin-bottom: 10px; padding-left: 6px;">That I sincerely regret this act and tenders an unconditional apology and ensures that such mistake shall not be repeated.</li>
                        <li style="margin-bottom: 10px; padding-left: 6px;">That I humbly seek pardon and request to kindly reactivate my ID number <span class="filled-val">${d.idNumber || ''}</span> to enable its continued usage.</li>
                        <li style="margin-bottom: 10px; padding-left: 6px;">That I undertake to submit only genuine, correct and verifiable proof of date of birth document <span class="filled-val">${d.newDoc || 'BIRTH CERTIFICATE'}</span> in support of my request to reactivate my ID.</li>
                        <li style="margin-bottom: 10px; padding-left: 6px;">That I further undertake that I shall not be eligible for any further updation of my date of birth.</li>
                    </ol>
                    <div style="text-align: justify; line-height: 1.65; margin-bottom: 14px;">
                        2. I undertake that if the document submitted as proof of date of birth is found to be fraudulent/false/forged/non-genuine or I was not entitled for the said document, my ID number may again be deactivated as per Regulation 28 of the (Enrolment and Update) Regulations, 2016 and I shall be liable to be prosecuted under provisions of the applicable laws.
                    </div>
                    <div style="text-align: justify; line-height: 1.65; margin-bottom: 34px;">
                        3. I hereby declare that all the information mentioned above is true to the best of my knowledge. In case of any discrepancies if arises, the undersigned will be held responsible.
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; font-weight: bold;">
                        <div>Date: <span class="filled-val">${d.date || ''}</span></div>
                        <div style="text-align: right;">
                            <div style="margin-bottom: 4px;" class="filled-val">${d.applicantName || ''}</div>
                            <div>Name &amp; Signature of Resident (Deponent)</div>
                        </div>
                    </div>
                    <div style="text-align: center; font-weight: bold; font-size: 13.5px; line-height: 1.4;">
                        (This affidavit may be signed and attested in presence of a Judicial Magistrate or Executive<br>Magistrate/Notary Public)
                    </div>
                </div>
            </div>
        `;
    }

    if (fileId === 'LOCAL_HTML_ANNEXURE_3A') {
        return `
            <div class="affidavit-paper ${shadowClass}">
                ${stampOverlayHtml}
                <div>
                    <div style="text-align: center; font-weight: bold; font-size: 17px; text-decoration: underline; margin-bottom: 6px;">Annexure IIIA-For children</div>
                    <div style="text-align: center; font-weight: bold; font-size: 16px; text-decoration: underline; margin-bottom: 8px;">Affidavit for reactivation</div>
                    <div style="text-align: center; font-weight: bold; font-size: 13.5px; line-height: 1.4; margin-bottom: 18px;">
                        (To be printed on non-judicial stamp paper of minimum value of <span style="font-family: Arial, sans-serif;">₹10</span>)
                    </div>
                    <div style="text-align: justify; line-height: 1.7; margin-bottom: 12px;">
                        1. I, <span class="filled-val">${d.parentName || ''}</span> ${d.rel || 'S/D/W/o'} <span class="filled-val">${d.relativeName || ''}</span> resident of <span class="filled-val">${d.address || ''}</span> holding ID number <span class="filled-val">${d.parentIdNumber || ''}</span> do hereby solemnly affirm and declare as under: -
                    </div>
                    <ol style="list-style-type: lower-roman; padding-left: 34px; margin-bottom: 16px; text-align: justify;">
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I am resident of the above said address.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I am parent/legal guardian of the <span class="filled-val">${d.childName || ''}</span> holding ID No <span class="filled-val">${d.childIdNumber || ''}</span>.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I had earlier submitted an invalid document- <span class="filled-val">${d.invalidDocName || ''}</span> bearing number <span class="filled-val">${d.invalidDocNo || ''}</span> dated <span class="filled-val">${d.invalidDocDate || ''}</span> or provided false information, while enrolment/update through EID number <span class="filled-val">${d.eidNumber || ''}</span> as proof of date of birth of my child/ward.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I understand and accepts that submission of such invalid document and false information is a violation of law and legal action may be taken against me for the same under applicable laws.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I sincerely regret this act and tenders an unconditional apology and ensures that such mistake shall not be repeated.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I humbly seek pardon and request to kindly reactivate my child/ward ID number <span class="filled-val">${d.childIdNumber || ''}</span> to enable its continued usage.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I undertake to submit only genuine, correct and verifiable proof of date of birth document <span class="filled-val">${d.newDoc || 'BIRTH CERTIFICATE'}</span> in support of my request to reactivate my child/ward ID.</li>
                        <li style="margin-bottom: 9px; padding-left: 6px;">That I further undertake that my child/ward shall not be eligible for any further updation of date of birth.</li>
                    </ol>
                    <div style="text-align: justify; line-height: 1.6; margin-bottom: 12px;">
                        2. I undertake that if the document submitted as proof of date of birth is found to be fraudulent/false/forged/non-genuine or my child/ward was not entitled for the same, ID number of my child/ward may again be deactivated as per Regulation 28 of the (Enrolment and Update) Regulations, 2016 and I shall be liable to be prosecuted under provisions of the applicable laws.
                    </div>
                    <div style="text-align: justify; line-height: 1.6; margin-bottom: 28px;">
                        3. I hereby declare that all the information mentioned above is true to the best of my knowledge. In case of any discrepancies if arises, the undersigned will be held responsible.
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 22px; font-weight: bold;">
                        <div>Date: <span class="filled-val">${d.date || ''}</span></div>
                        <div style="text-align: right;">
                            <div style="margin-bottom: 4px;" class="filled-val">${d.parentName || ''}</div>
                            <div>Name &amp; Signature of Parent/Guardian of Minor (Deponent)</div>
                        </div>
                    </div>
                    <div style="text-align: center; font-weight: bold; font-size: 13.5px; line-height: 1.4;">
                        (This affidavit may be signed and attested in presence of a Judicial Magistrate or Executive<br>Magistrate/Notary Public)
                    </div>
                </div>
            </div>
        `;
    }

    if (fileId === 'LOCAL_HTML_ANNEXURE_B' || fileId === 'LOCAL_HTML_ANNEXURE_C' || fileId === 'LOCAL_HTML_ANNEXURE_D') {
        const isChild = (fileId === 'LOCAL_HTML_ANNEXURE_C');
        const headingMap = {
            'LOCAL_HTML_ANNEXURE_B': 'Annexure B (for adults)',
            'LOCAL_HTML_ANNEXURE_C': 'Annexure C (for children)',
            'LOCAL_HTML_ANNEXURE_D': 'Annexure D (for name update)'
        };
        const subTitleText = isChild ? '(Applicable for Name Change / Correction of Minor Child by Parent/Legal Guardian)' : '(Applicable where the ID number holder seeks to update / change Name)';

        const bodyPoints = isChild ? `
            <li style="margin-bottom: 14px; padding-left: 6px;">That I am the parent/legal guardian of minor child <span class="filled-val">${d.childName || d.newName || ''}</span> holding ID Number <span class="filled-val">${d.childIdNumber || d.idNumber || ''}</span>.</li>
            <li style="margin-bottom: 14px; padding-left: 6px;">That the name of my child/ward is presently recorded as <span class="filled-val">${d.oldName || ''}</span>.</li>
            <li style="margin-bottom: 14px; padding-left: 6px;">That I intend to update/change the name of my child/ward from <span class="filled-val">${d.oldName || ''}</span> to the correct name <span class="filled-val">${d.newName || ''}</span>, both names referring to one and the same child.</li>
            <li style="margin-bottom: 14px; padding-left: 6px;">That I am submitting the prescribed supporting Proof of Identity (PoI) document (<span class="filled-val">${d.newDoc || 'BIRTH CERTIFICATE'}</span>) in support of the name sought to be updated.</li>
            <li style="margin-bottom: 14px; padding-left: 6px;">That I undertake if any declaration made herein or any document submitted by me is found to be false, fabricated, forged, fraudulent or otherwise not genuine, I shall be solely responsible for all legal consequences including deactivation of ID number and prosecution under the applicable laws.</li>
        ` : `
            <li style="margin-bottom: 14px; padding-left: 6px;">That I am the holder of ID Number <span class="filled-val">${d.idNumber || ''}</span>.</li>
            <li style="margin-bottom: 14px; padding-left: 6px;">That my name is presently recorded as <span class="filled-val">${d.oldName || ''}</span>.</li>
            <li style="margin-bottom: 14px; padding-left: 6px;">That I have changed/updated my name and intend to record my correct name as <span class="filled-val">${d.newName || ''}</span> in place of <span class="filled-val">${d.oldName || ''}</span>, both names referring to one and the same person, i.e. myself.</li>
            <li style="margin-bottom: 14px; padding-left: 6px;">That I am submitting the prescribed supporting Proof of Identity (PoI) document (<span class="filled-val">${d.newDoc || 'BIRTH CERTIFICATE'}</span>) in support of the name sought to be updated.</li>
            <li style="margin-bottom: 14px; padding-left: 6px;">That I undertake if any declaration made herein or any document submitted by me is found to be false, fabricated, forged, fraudulent or otherwise not genuine, I shall be solely responsible for all legal consequences including deactivation of my ID number and prosecution under the applicable laws.</li>
        `;

        return `
            <div class="affidavit-paper ${shadowClass}">
                ${stampOverlayHtml}
                <div>
                    <div style="display: flex; justify-content: space-between; font-family: Arial, sans-serif; font-size: 11px; color: #222; margin-bottom: 20px;">
                        <span>HQ-16024/4/2020-EU-I-HQ</span>
                        <span>I/58751/2026</span>
                    </div>
                    <div style="text-align: right; font-weight: bold; font-size: 16px; margin-bottom: 12px;">
                        ${headingMap[fileId]}
                    </div>
                    <div style="text-align: center; font-weight: bold; font-size: 17px; margin-bottom: 8px;">AFFIDAVIT</div>
                    <div style="text-align: center; font-size: 14.5px; line-height: 1.4; margin-bottom: 10px; padding: 0 10px;">
                        ${subTitleText}
                    </div>
                    <div style="text-align: center; font-size: 14.5px; margin-bottom: 22px;">
                        (To be printed on Non-Judicial Stamp Paper of minimum value of <span style="font-family: Arial, sans-serif;">₹10</span>)
                    </div>
                    <div style="text-align: justify; line-height: 1.75; margin-bottom: 16px;">
                        I, <span>${d.title || 'Shri'}</span> <span class="filled-val">${d.applicantName || ''}</span>, 
                        <span>${d.rel || 'S/o'}</span> <span class="filled-val">${d.relativeName || ''}</span>, 
                        resident of <span class="filled-val">${d.address || ''}</span>, do hereby solemnly affirm and declare as under:
                    </div>
                    <ol style="list-style-type: decimal; padding-left: 26px; margin-bottom: 20px; text-align: justify;">
                        ${bodyPoints}
                    </ol>
                    <div style="text-align: right; font-weight: bold; margin-top: 30px; margin-bottom: 16px;">Deponent</div>
                    <div style="font-weight: bold; margin-bottom: 8px;">Verification:</div>
                    <div style="text-align: justify; line-height: 1.7; margin-bottom: 34px;">
                        Verified at <span class="filled-val">${d.place || ''}</span> on this <span class="filled-val">${d.day || ''}</span> day of <span class="filled-val">${d.monthYear || ''}</span> that the contents of this affidavit are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.
                    </div>
                    <div style="text-align: right; font-weight: bold; margin-bottom: 22px;">Deponent</div>
                    <div style="text-align: center; font-size: 14.5px; line-height: 1.4;">
                        (This affidavit may be signed and attested in presence of a Judicial Magistrate or Executive<br>Magistrate/Notary Public)
                    </div>
                </div>
                <div style="text-align: right; font-family: Arial, sans-serif; font-size: 12px;">Standard Affidavit Format</div>
            </div>
        `;
    }

    if (fileId === 'LOCAL_HTML_ANNEXURE_F') {
        return `
            <div class="affidavit-paper ${shadowClass}">
                ${stampOverlayHtml}
                <div>
                    <div style="display: flex; justify-content: space-between; font-family: Arial, sans-serif; font-size: 11px; color: #222; margin-bottom: 20px;">
                        <span>HQ-16024/4/2020-EU-I-HQ</span>
                        <span>I/58751/2026</span>
                    </div>
                    <div style="text-align: right; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Annexure F (for children)</div>
                    <div style="text-align: center; font-weight: bold; font-size: 17px; margin-bottom: 8px;">AFFIDAVIT</div>
                    <div style="text-align: center; font-size: 14.5px; line-height: 1.4; margin-bottom: 10px; padding: 0 10px;">
                        (Applicable where the name of minor child is recorded with “urf” or “alias” and the<br>
                        parent/legal guardian seeks to retain one of the names)
                    </div>
                    <div style="text-align: center; font-size: 14.5px; margin-bottom: 22px;">
                        (To be printed on Non-Judicial Stamp Paper of minimum value of <span style="font-family: Arial, sans-serif;">₹10</span>)
                    </div>
                    <div style="text-align: justify; line-height: 1.75; margin-bottom: 16px;">
                        I, <span>${d.title || 'Shri'}</span> <span class="filled-val">${d.parentName || ''}</span>, 
                        <span>${d.rel || 'S/o'}</span> <span class="filled-val">${d.relativeName || ''}</span>, 
                        resident of <span class="filled-val">${d.address || ''}</span>, holding ID Number <span class="filled-val">${d.parentIdNumber || ''}</span>, do hereby solemnly affirm and declare as under:
                    </div>
                    <ol style="list-style-type: decimal; padding-left: 26px; margin-bottom: 20px; text-align: justify;">
                        <li style="margin-bottom: 13px; padding-left: 6px; line-height: 1.55;">
                            That I am the parent/legal guardian of minor child <span class="filled-val">${d.childName || ''}</span> who is the holder of ID Number <span class="filled-val">${d.childIdNumber || ''}</span>.
                        </li>
                        <li style="margin-bottom: 13px; padding-left: 6px; line-height: 1.55;">
                            That the name of my child/ward is presently recorded/used as <span class="filled-val">${d.recorded1 || ''}</span> urf or alias <span class="filled-val">${d.recorded2 || ''}</span>, both names referring to one and the same child.
                        </li>
                        <li style="margin-bottom: 13px; padding-left: 6px; line-height: 1.55;">
                            That I intend to retain the name <span class="filled-val">${d.retainName || ''}</span> for my child/ward and discontinue the use of <span class="filled-val">${d.removeName || ''}</span> as an alias/urf.
                        </li>
                        <li style="margin-bottom: 13px; padding-left: 6px; line-height: 1.5;">
                            That the requested update is limited to removal of the “urf or alias” and retention of the aforesaid name and does not amount to a change of identity or adoption of a different name.
                        </li>
                        <li style="margin-bottom: 13px; padding-left: 6px; line-height: 1.5;">
                            That I am submitting the prescribed supporting document(s) in support of the name of my child/ward sought to be retained.
                        </li>
                        <li style="margin-bottom: 13px; padding-left: 6px; line-height: 1.5;">
                            That I undertake if any declaration made herein or any document submitted by me is found to be false, fabricated, forged, fraudulent or otherwise not genuine, I shall be solely responsible for all legal consequences including deactivation of ID number and prosecution under the applicable laws.
                        </li>
                    </ol>
                    <div style="text-align: right; font-weight: bold; margin-top: 26px; margin-bottom: 14px;">Deponent (Parent/Guardian)</div>
                    <div style="font-weight: bold; margin-bottom: 8px;">Verification:</div>
                    <div style="text-align: justify; line-height: 1.65; margin-bottom: 30px;">
                        Verified at <span class="filled-val">${d.place || ''}</span> on this <span class="filled-val">${d.day || ''}</span> day of <span class="filled-val">${d.monthYear || ''}</span> that the contents of this affidavit are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.
                    </div>
                    <div style="text-align: right; font-weight: bold; margin-bottom: 20px;">Deponent (Parent/Guardian)</div>
                    <div style="text-align: center; font-size: 14.5px; line-height: 1.4;">
                        (This affidavit may be signed and attested in presence of a Judicial Magistrate or Executive<br>Magistrate/Notary Public)
                    </div>
                </div>
                <div style="text-align: right; font-family: Arial, sans-serif; font-size: 12px;">Page 11 of 11</div>
            </div>
        `;
    }

    return `
        <div class="affidavit-paper ${shadowClass}">
            ${stampOverlayHtml}
            <div>
                <div style="display: flex; justify-content: space-between; font-family: Arial, sans-serif; font-size: 11px; color: #222; margin-bottom: 20px;">
                    <span>HQ-16024/4/2020-EU-I-HQ</span>
                    <span>I/58751/2026</span>
                </div>
                <div style="text-align: right; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Annexure E (for adults)</div>
                <div style="text-align: center; font-weight: bold; font-size: 17px; margin-bottom: 8px;">AFFIDAVIT</div>
                <div style="text-align: center; font-size: 14.5px; line-height: 1.4; margin-bottom: 10px; padding: 0 10px;">
                    (Applicable where the name is recorded with “urf” or “alias” and the ID<br>
                    number holder seeks to retain one of the names)
                </div>
                <div style="text-align: center; font-size: 14.5px; margin-bottom: 22px;">
                    (To be printed on Non-Judicial Stamp Paper of minimum value of <span style="font-family: Arial, sans-serif;">₹10</span>)
                </div>
                <div style="text-align: justify; line-height: 1.75; margin-bottom: 16px;">
                    I, <span>${d.title || 'Shri'}</span> <span class="filled-val">${d.applicantName || ''}</span>, 
                    <span>${d.rel || 'S/o'}</span> <span class="filled-val">${d.relativeName || ''}</span>, 
                    resident of <span class="filled-val">${d.address || ''}</span>, do hereby solemnly affirm and declare as under:
                </div>
                <ol style="list-style-type: decimal; padding-left: 26px; margin-bottom: 20px; text-align: justify;">
                    <li style="margin-bottom: 14px; padding-left: 6px; line-height: 1.6;">
                        That I am the holder of ID Number <span class="filled-val">${d.idNumber || ''}</span>.
                    </li>
                    <li style="margin-bottom: 14px; padding-left: 6px; line-height: 1.6;">
                        That my name is presently recorded/used as <span class="filled-val">${d.recorded1 || ''}</span> urf or alias <span class="filled-val">${d.recorded2 || ''}</span>, both names referring to one and the same person, i.e. myself.
                    </li>
                    <li style="margin-bottom: 14px; padding-left: 6px; line-height: 1.6;">
                        That I intend to retain the name <span class="filled-val">${d.retainName || ''}</span> and discontinue the use of <span class="filled-val">${d.removeName || ''}</span> as an alias/urf.
                    </li>
                    <li style="margin-bottom: 14px; padding-left: 6px; line-height: 1.55;">
                        That the requested update is limited to removal of the “urf or alias” and retention of the aforesaid name and does not amount to a change of identity or adoption of a different name.
                    </li>
                    <li style="margin-bottom: 14px; padding-left: 6px; line-height: 1.55;">
                        That I am submitting the prescribed supporting document(s) in support of the name sought to be retained.
                    </li>
                    <li style="margin-bottom: 14px; padding-left: 6px; line-height: 1.55;">
                        That I undertake if any declaration made herein or any document submitted by me is found to be false, fabricated, forged, fraudulent or otherwise not genuine, I shall be solely responsible for all legal consequences including deactivation of my ID number and prosecution under the applicable laws.
                    </li>
                </ol>
                <div style="text-align: right; font-weight: bold; margin-top: 30px; margin-bottom: 16px;">Deponent</div>
                <div style="font-weight: bold; margin-bottom: 8px;">Verification:</div>
                <div style="text-align: justify; line-height: 1.7; margin-bottom: 34px;">
                    Verified at <span class="filled-val">${d.place || ''}</span> on this <span class="filled-val">${d.day || ''}</span> day of <span class="filled-val">${d.monthYear || ''}</span> that the contents of this affidavit are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.
                </div>
                <div style="text-align: right; font-weight: bold; margin-bottom: 22px;">Deponent</div>
                <div style="text-align: center; font-size: 14.5px; line-height: 1.4;">
                    (This affidavit may be signed and attested in presence of a Judicial Magistrate or Executive<br>Magistrate/Notary Public)
                </div>
            </div>
            <div style="text-align: right; font-family: Arial, sans-serif; font-size: 12px;">Page 10 of 11</div>
        </div>
    `;
};

// ================= SHARED PDF DOWNLOAD, DIRECT PRINT & SHARE =================
window.downloadHtmlDocAsPdf = async function(fileId, formDataObj, fileName, withStamp = false, stampSrc = '', certificateFileId = '') {
    const btn = document.getElementById('modalDownloadBtn');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...'; btn.disabled = true; }

    if (withStamp && typeof window.preloadAllAvailableStamps === 'function' && window.availableStampsList?.length === 0) {
        await window.preloadAllAvailableStamps();
    }

    const finalStampSrc = withStamp ? (stampSrc || (typeof window.pickRandomAvailableStamp === 'function' ? window.pickRandomAvailableStamp() : 'stamp.png')) : '';
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
        if (withStamp && typeof window.preloadAllAvailableStamps === 'function' && window.availableStampsList?.length === 0) {
            await window.preloadAllAvailableStamps();
        }
        
        if (certificateFileId) {
            window.open(`https://drive.google.com/file/d/${certificateFileId}/view`, '_blank');
        }

        const finalStampSrc = withStamp ? (stampSrc || (typeof window.pickRandomAvailableStamp === 'function' ? window.pickRandomAvailableStamp() : 'stamp.png')) : '';
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
                    .affidavit-paper { position: relative !important; font-family: 'Times New Roman', Times, serif; width: 794px; height: 1122px; padding: 46px 62px; background: #ffffff; color: #000000; font-size: 15px; line-height: 1.55; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; margin: 0 !important; overflow: hidden; }
                    .filled-val { font-weight: bold !important; color: #000000 !important; text-decoration: underline !important; text-underline-offset: 3px !important; }
                    .stamp-overlay-layer { position: absolute; top: 0; left: 0; width: 794px; height: 1122px; pointer-events: none; z-index: 30; mix-blend-mode: multiply; overflow: hidden; }
                    .stamp-overlay-layer img { width: 794px; height: 1122px; object-fit: contain; object-position: top center; mix-blend-mode: multiply; display: block; }
                </style>
            </head>
            <body>${htmlContent}</body>
            </html>
        `);
        frameDoc.close();
        setTimeout(() => { printFrame.contentWindow.focus(); printFrame.contentWindow.print(); }, 250);
    } else {
        window.open(`https://drive.google.com/file/d/${fileId}/view`, '_blank');
    }
};

window.shareHtmlDocAsPdf = async function(fileId, formDataObj, fileName, withStamp = false, stampSrc = '', certificateFileId = '') {
    const btn = document.getElementById('modalShareBtn');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...'; btn.disabled = true; }

    if (withStamp && typeof window.preloadAllAvailableStamps === 'function' && window.availableStampsList?.length === 0) {
        await window.preloadAllAvailableStamps();
    }
    const finalStampSrc = withStamp ? (stampSrc || (typeof window.pickRandomAvailableStamp === 'function' ? window.pickRandomAvailableStamp() : 'stamp.png')) : '';
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
            alert('सर्टिफिकेट की फाइल भी सुरक्षित रखने के लिए अलग टैब में खोली जा रही है।');
            window.open(`https://drive.google.com/file/d/${certificateFileId}/view`, '_blank');
        }

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: finalFileName, text: 'Here is your generated document.' });
        } else {
            alert('Aapka browser direct file share support nahi karta. Kripya PDF download karke share karein.');
        }
    } catch (err) {
        console.error(err); alert("PDF share karne mein samasya aayi.");
    } finally {
        document.body.removeChild(tempWrapper); window.scrollTo(savedScrollX, savedScrollY);
        if (btn) { btn.innerHTML = origHtml; btn.disabled = false; }
    }
};
