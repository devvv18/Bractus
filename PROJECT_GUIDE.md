# 📖 Bractus: The Ultimate Beginner's Project Guide

Welcome! If you are reading this, you are looking at the foundational guide to the **Bractus** website. This document is written assuming you have **zero prior coding knowledge**. It will explain exactly how your website works, where files live, and how everything connects together.

---

## 🌎 1. The Big Picture: How Modern Websites Work
Your project is divided into two completely separate folders (we call them "repositories"). Think of a restaurant:
1. **The Frontend (`bractus-frontend`)**: This is the dining room. It’s the visual UI, the text, the buttons, the animations, and the pages the user physically clicks on. Built with a framework called **Next.js**.
2. **The Backend (`bractus-backend`)**: This is the kitchen. It’s entirely hidden from the user. It handles the heavy logic, security, and storing data into your MongoDB database. Built with a framework called **NestJS**.

When a user submits a form in the "dining room" (frontend), the frontend sends an invisible message to the "kitchen" (backend) to store that form submission in the database permanently.

---

## 🎨 2. The Frontend (The Dining Room)
Almost every single visual change you make will happen inside the `/bractus-frontend/src/app` folder. 

### Core Structure
Here is what every major file does:

* **`globals.css`** 
  * **What it does:** This is the "Paint". It holds all the colors, fonts, and spacing rules.
  * **When to touch it:** If you want to change the dark/light mode colors, or if you want to change the Nunito font. 

* **`layout.js`**
  * **What it does:** This is the "Picture Frame". Anything you put here shows up on **every single page** automatically. This is why we placed the `<Navbar />` and `<Footer />` inside this file!
  * **When to touch it:** If you want to load a new Google Font, or add something that every page must share.

* **`page.js` (The one directly in the `src/app/` folder)**
  * **What it does:** This is the Homepage (`bractus.com`). It acts as a master assembler, pulling in all the different "components" and stacking them on top of each other.
  * **When to touch it:** If you want to permanently re-order the sections of your homepage.

### Sub-Webpages (URL Routing)
You will see folders like `/services`, `/about`, and `/process`.
* **What they do:** In Next.js, whenever you create a folder and place a `page.js` file inside it, Next.js automatically creates a real webpage for it!
* **Example:** The file located at `src/app/services/advisory/page.js` directly controls what you see when you visit `bractus.com/services/advisory`.

### Components (The Lego Blocks)
Instead of putting 5,000 lines of code into one massive file, we break the website down into small reusable Lego blocks stored in `/src/app/components`.
* **`Navbar.js`:** The top navigation bar. It controls exactly where the links point.
* **`Hero.js`:** The massive first text block you see when you open the homepage.
* **`Services.js`:** The rotating 3D carousel. 
* **`Process.js`:** The "How we work" step-by-step section.
* **`ContactForm.js`:** The bottom map, email form, and tools section.

**If you ever need to change the words, text, or SVG icons on your website, you will almost always do it by opening up the specific component file.**

---

## ⚙️ 3. The Backend (The Kitchen)
Your backend lives entirely separately in the `/bractus-backend` folder. It runs on a different port (usually `localhost:3001` while your frontend is `localhost:3000`).

* **`src/main.ts`**
  * **What it does:** The engine starter. It boots up the server so it can listen for messages.
* **`src/contact/contact.controller.ts`**
  * **What it does:** The Mailbox. When someone clicks "Submit" on the frontend Contact Form, the frontend sends a packet of data specifically to this controller. This controller then safely unpacks the email, name, and message, and permanently saves it into your MongoDB database.

---

## 🛠 4. Real-World Cheat Sheet

**"I want to change the spelling of a word in the main headline."**
> Open `/bractus-frontend/src/app/components/Hero.js`. Find the text, change it, and save.

**"I want the background color of dark mode to be blue instead of green."**
> Open `/bractus-frontend/src/app/globals.css`. Scroll to the `@media (prefers-color-scheme: dark)` section and change the `#` hex codes. 

**"I want the Services link on the navbar to go to a totally different website like google.com."**
> Open `/bractus-frontend/src/app/components/Navbar.js`. Find the `<Link href="/services">` and change it to `<a href="https://google.com">`.

**"My contact form is giving me an error when I hit submit."**
> This means your Backend server isn't running, or your MongoDB password inside `/bractus-backend/.env` is incorrect or expired. 

---

### You got this! 
Don't be intimidated by the code. Modern websites are just text files mapped to visual elements. If you read the code carefully, you can practically read it like an English paragraph!
