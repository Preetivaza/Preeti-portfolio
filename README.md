# Preeti Vaza Portfolio

Next.js 14, TypeScript, Tailwind CSS, MongoDB and Cloudinary.

## Run locally
1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and add MongoDB Atlas, admin, JWT and Cloudinary settings.
3. Run `npm run dev` and open `http://localhost:3000`.
4. Open `/admin`, sign in, and click **Load starter content** once.

## Portfolio features
- Single-page navigation: Home, About, Skills, Experience, Projects and Education.
- Dark/light theme toggle; visitor preference is remembered in the browser.
- Dynamic portfolio sections backed by MongoDB.
- Admin CRUD for projects, skills, experience, education, achievements and certifications.
- Upload certificate images/PDFs, project images, profile photo and resume through Cloudinary.
- Contact messages are stored in MongoDB.

## Deployment
Push the project to GitHub, import it into Vercel, configure the same environment variables, and configure MongoDB Atlas Network Access for your deployment.

Uploads should remain below Vercel's request body size limit (about 4.5 MB).
