const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();

const _rawListId = process.env.BREVO_LIST_ID
  ? parseInt(process.env.BREVO_LIST_ID, 10)
  : undefined;
if (_rawListId !== undefined && isNaN(_rawListId)) {
  console.warn(
    "[Brevo] BREVO_LIST_ID is set but not a valid integer:",
    process.env.BREVO_LIST_ID,
  );
}
const BREVO_LIST_ID =
  _rawListId !== undefined && !isNaN(_rawListId) ? _rawListId : undefined;

if (BREVO_API_KEY) {
  console.log(
    "[Brevo] Live mode. List ID:",
    BREVO_LIST_ID ?? "(none — contact added without list assignment)",
  );
} else {
  console.log("[Brevo] Mock mode — set BREVO_API_KEY to go live.");
}

export interface SubscribeParams {
  email: string;
  name: string;
  consentTimestamp: string;
}

export async function addSubscriber(params: SubscribeParams): Promise<void> {
  const { email, name } = params;

  // Mock mode — activate by setting BREVO_API_KEY in .env.local
  if (!BREVO_API_KEY) {
    console.log("[Brevo mock] Would subscribe:", { email, name });
    return;
  }

  const body: Record<string, unknown> = {
    email,
    attributes: { FIRSTNAME: name },
    updateEnabled: true,
  };

  // Only include listIds when a valid list ID is configured.
  // Sending an empty array causes Brevo to return a 400 error.
  if (BREVO_LIST_ID) {
    body.listIds = [BREVO_LIST_ID];
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brevo API error (${response.status}): ${error}`);
  }
}
