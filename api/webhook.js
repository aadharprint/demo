import admin from 'firebase-admin';

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
    const eventData = body.data || body.result || body;

    const orderId = eventData.client_txn_id || eventData.orderId || eventData.order_id || body.client_txn_id || body.order_id;
    const utr = eventData.utr || eventData.bank_ref_num || eventData.upi_txn_id || body.utr || orderId;
    const rawStatus = String(eventData.status || eventData.txnStatus || body.status || body.event || '').toUpperCase();
    const paidAmount = Number(eventData.amount || body.amount || 0);

    if (!orderId || rawStatus.includes('TEST') || (!rawStatus.includes('SUCCESS') && !rawStatus.includes('COMPLETED') && !rawStatus.includes('PAID'))) {
      return res.status(200).json({ message: 'Webhook received / Test OK' });
    }

    if (!admin.apps.length) {
      return res.status(500).json({ message: 'FIREBASE_SERVICE_ACCOUNT is missing in Vercel' });
    }

    const db = admin.firestore();
    const paymentRef = db.collection('payments').doc(String(orderId));
    const paymentSnap = await paymentRef.get();

    if (!paymentSnap.exists) {
      return res.status(200).json({ message: 'Order not found in payments collection' });
    }

    const paymentData = paymentSnap.data();

    if (paymentData.status === 'Auto-Approved' || paymentData.status === 'Approved') {
      return res.status(200).json({ message: 'Transaction already processed' });
    }

    const userId = paymentData.userId;
    const creditsToAdd = Number(paymentData.creditsRequested) || 0;
    const wantsVip = Boolean(paymentData.wantsVip);
    const vipDays = Number(paymentData.vipDaysRequested) || 0;

    const userRef = db.collection('users').doc(String(userId));
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      const uData = userSnap.data();
      const currentCredits = Number(uData.credits) || 0;
      const now = Date.now();
      const currentExpiry = (uData.isVip && uData.vipExpiry && uData.vipExpiry > now) ? Number(uData.vipExpiry) : now;

      const updateFields = {
        credits: currentCredits + creditsToAdd
      };

      if (wantsVip && vipDays > 0) {
        updateFields.isVip = true;
        updateFields.vipExpiry = currentExpiry + (vipDays * MS_PER_DAY);
      }

      await userRef.update(updateFields);
    }

    await paymentRef.update({
      status: 'Auto-Approved',
      utrNumber: String(utr),
      approvedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    if (utr) {
      await db.collection('usedUtrs').doc(String(utr)).set({
        userId: userId,
        orderId: orderId,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    return res.status(200).json({ message: 'Credits & VIP updated automatically!' });

  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}