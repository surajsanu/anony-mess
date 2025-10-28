import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string //OTP
): Promise<ApiResponse> {
  try {
    if (!process.env.RESEND_API_KEY) {
      const msg = 'RESEND_API_KEY is not set in environment';
      console.error(msg);
      return { success: false, message: msg };
    }

    // Render the component to a React element by calling it (file is .ts so JSX isn't allowed here).
    const reactElement = VerificationEmail({ username, otp: verifyCode });

     const { data, error }  = await resend.emails.send({
      from:  'Mystery Message : <onboarding@resend.dev>',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: reactElement,
    });

    // Log the provider response for easier debugging (message id, status, etc.)
    // console.info('Resend send response:', sendResponse);

    if (error) {
      return { success: false, message: `Failed to send verification email: ${error?.message ?? String(error)}`};
    } 
    return { success: true, message: `Verification email sent successfully : ${data}` };
  } catch (error) {
    const emailError = error as Error;
    console.error('Error sending verification email:', emailError.message || 'Unknown error');
    return { success: false, message: `Failed to send verification email: ${emailError.message || 'Unknown error'}` };
  }
}