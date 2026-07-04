# Portfolio website

A polished React + Vite portfolio with a liquid-glass aesthetic, multilingual support, animated sections, and a working contact form.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root and add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Sign up at [EmailJS](https://www.emailjs.com/) and connect your email service (for example Gmail).
4. Create an email template with these variables:
   - `from_name`
   - `from_email`
   - `message`
5. Start the dev server:
   ```bash
   npm run dev
   ```
6. Test the form by submitting the contact form; if the credentials are correct, the message will be delivered to the configured mailbox.

## Notes

- The contact form includes client-side validation, a honeypot field, and a short rate limit.
- The default language is English; switching to RU or UZ updates the UI instantly.
