const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID
  ? parseInt(process.env.BREVO_LIST_ID)
  : undefined;

export interface SubscribeParams {
  email: string;
  name: string;
  consentTimestamp: string;
}

export async function addSubscriber(params: SubscribeParams): Promise<void> {
  const { email, name, consentTimestamp } = params;

  // Mock mode — activate by setting BREVO_API_KEY in .env.local
  if (!BREVO_API_KEY) {
    console.log("[Brevo mock] Would subscribe:", { email, name, consentTimestamp });
    return;
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: name },
      listIds: BREVO_LIST_ID ? [BREVO_LIST_ID] : [],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brevo error: ${error}`);
  }
}
