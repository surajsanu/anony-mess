import { Resend } from 'resend';

const RESEND_KEY = process.env.RESEND_API_KEY;
if (!RESEND_KEY) {
	// Helpful runtime log if the env var is missing — this is often the root cause.
	console.error('RESEND_API_KEY is not set. Emails will not be sent.');
}

export const resend = new Resend(RESEND_KEY as string);