# Ojas Print Service & e-Services Studio (upeprint Edition)

## Folder Structure
- `index.html` (Root Landing & Tools Studio)
- `pages/portal.html` (VIP User Portal -> `/portal`)
- `pages/admin.html` (Super Admin Control Center -> `/admin`)
- `pages/tools.html` (8 Client-Side PDF & Photo Tools -> `/tools`)
- `templates/` (Separate HTML templates: `caste.html`, `domicile.html`, `evoter.html`, and all 9 `annexure-*.html`)
- `js/` (`config-templates.js`, `portal-forms.js`, `portal-wallet-chat.js`, `admin-logic.js`, `tools-logic.js`)
- `api/` (`create-order.js`, `webhook.js` with server-side amount verification & atomic Firestore transaction)
- `images/` (Place `logo.png`, `sealofup.jpg`, `GOVERNMENT_MONOGRAM.gif`, and city stamp `.png` files here)
