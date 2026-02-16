import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/brevo";

export async function POST(req: NextRequest) {
  try {
    const { email, name, consent } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Email e nome são obrigatórios." }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: "É necessário aceitar os termos para continuar." }, { status: 400 });
    }

    await addSubscriber({
      email,
      name,
      consentTimestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Algo deu errado. Tente novamente." }, { status: 500 });
  }
}
