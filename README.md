This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Prerequisites:

Node.js 
npm or yarn

# Installation

1. Clone the repository and install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Install required dependencies:
npm install
and / or
- npm install tailwindcss
- npm install @heroicons/react
- npm install react-slick slick-carousel

4. Set up environment:
Add the following API keys, replace with the actual key 
OPENTRIPMAP_API_KEY=your_opentripmap_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

5. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Syfte och målgrupp
Syftet med denna webbapp är att skapa en inspirationskälla för människor som tycker om att resa. Här kan användare själva välja om de vill planera framtida resor, hitta inspiration och bara drömma sig bort till olika destinationer. Genom en kombination av funktioner såsom bildsökning, skapande av personliga drömresemål, en ramdomizer för inspiration, samt info om resmål syftar webbapplikationen till att låta användare engagera sig i reseplanering på ett kreativt sätt. 

Målgruppen för denna webbapplikation är personer i alla åldrar som är intresserade av att planera eller inspireras till att hitta nya resmål. Särskilt fokus ligger på unga vuxna och vuxna i åldrarna 18 och uppåt som använder digitala verktyg för att planera sina resor. 

# Val av ramverk
Applikationen är byggd i React tillsammans med Next.js.

**Fördelar med React/Next.js:**
-  Komponentbaserad struktur för att smidigt återanvända och organisera kod.
-  React är just nu ett av de mest använda frontend-ramverken i världen, vilket innebär att det finns tillgång till mängder av bibliotek, dokumentation och annat som kan vara till nytta vid byggandet av en webbapp. 
-  Next.js bidrar till smidig integrering av externa API:er med hjälp av bl.a fetch-metoder direkt i komponenter, vilket vi fick användning för i implementationen av bilder kopplade till en viss destination.

## Jämförelse med Vue.js
Vue har ungefär som React en komponentbaserad struktur, vilket hade kunnat vara till nytta i detta projekt. Däremot erbjuder react bl.a fler tredjepartsbibliotek, vilket vi ansåg var en fördel då vi till en början tänkte satsa lite högre och bygga en lite större webbapplikation. Därmed blev React ett mer självklart val då Vue passar bättre till mindre applikationer och React kan vara mer robust i större applikationer. 

## Jämförelse med Angular
Angular är ett ramverk som innehåller många hjälpfulla lösningar för exempelvis routing och forms. Då vi använde oss av både routing och forms hade Angular eventuellt kunnat passa vårt projekt bra. Dock ansåg vi att Angular var överdimensionerat för just detta projekt. Inlärningskurvan för Angular var lite för brant för den tidsram och storlekt på projekt som denna uppgift innebar. Detta till skillnad från React + Next.js som gav oss flexibilitet med komponenter och API-användning utan extra onödig komplexitet. 


# Länkar som motiverar vårt val av ramverk:
- https://www.geeksforgeeks.org/react-vs-angular-vs-vue-which-framework-is-the-best/
- https://www.w3schools.com/whatis/whatis_react.asp
- https://www.geeksforgeeks.org/what-is-vuejs/
- https://www.geeksforgeeks.org/what-is-angular/
