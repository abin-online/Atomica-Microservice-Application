import { IsentEmail } from "../../usecases/interface/service/sentEmail";
import nodeMailer from 'nodemailer'

const USER_EMAIL : string = `abinbabuonline@gmail.com`
const USER_PASSWORD : string = `suyv zykg lhvb erfp`

export class SentEmail implements IsentEmail {
    async sentEmailVerification(name: string, email: string, verification: string): Promise<any> {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: USER_EMAIL,
                pass: USER_PASSWORD
            }
        })

        const sendVerificationEmail = async (
            name: string,
            toEmail: string,
            verificationCode: string
        ) => {
            const mailOptions = {
                from: USER_EMAIL, // will env set later 
                to: toEmail,
                subject: '🌟 Welcome to Atomica - Verify Your Email 🌟',
                text: `Hello ${name},\n\nYour verification code is: ${verificationCode}\n\nThanks,\nThe LevelUP Team`, // Plain-text fallback
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h2 style="color: #4CAF50;">Welcome to LevelUP, ${name}!</h2>
                        <p>We're excited to have you onboard. Please use the verification code below to complete your email verification:</p>
                        <p style="font-size: 1.5em; font-weight: bold; color: #333; background: #f4f4f4; padding: 10px; border: 1px solid #ddd; display: inline-block;">
                            ${verificationCode}
                        </p>
                        <p>If you didn’t request this, please ignore this email.</p>
                        <br>
                        <p>Thank you,</p>
                        <p><strong>The LevelUP Team</strong></p>
                    </div>
                `,
            };
        
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log(`Email sent successfully : ${info.response}`);
                return info;
            } catch (error) {
                console.error('Error sending email:', error);
                throw new Error('Failed to send verification email');
                return
            }
        };
        await sendVerificationEmail(name,email,verification);
    }
}