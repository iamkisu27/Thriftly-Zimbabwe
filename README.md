# Thriftly.

**Secondhand fashion in Zimbabwe.** Find clothes from nearby shops and bhero market stands, reserve them to inspect in person, or collect them with a code.

Available in **English · chiShona · isiNdebele**.

> **Status: demo.** This is a clickable prototype with sample data. It has no real payments, accounts or backend yet.

<!-- Add screenshots here, e.g. ![Home screen](docs/home.png) -->

## Why Thriftly

Thrift shopping in Zimbabwe is hands-on. Buyers want to feel the fabric and check the size and flaws before paying, and delivery is often expensive or unreliable. Thriftly makes **pick up and reserve-to-view the main way to buy**, and treats delivery as an extra where it works.

## Features in this demo

- **Browse** secondhand items with filters for Pick up and Reserve to view
- **Stand cards** showing landmark directions (for example "Opposite the north gate"), since many vendors have no street address
- **Reserve to view** and holds, so one item can only be held by one buyer
- **My Holds & Orders** to track reservations
- **Stand Vendor Hub** for vendors to manage their stand
- **WhatsApp Bot simulation** showing how vendors without smartphones could reply to requests
- **Three languages** with an EN / SN / ND switcher and a "Report a wording problem" link
- **Light and dark mode**
- **USD and ZiG** currency toggle
- **3G Saver mode** for slow connections and low data
- Flag-inspired colours: green, yellow, red and black

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a file named `.env.local` and set your Gemini API key (only needed for the features that use Gemini):
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

Built with Google AI Studio. View the app there: https://ai.studio/apps/59f4ede4-4334-498f-8639-009618a0a678

## Languages

All on-screen text should live in the translation files rather than inside screens, with one section each for English, chiShona and isiNdebele.

> **Note:** The chiShona and isiNdebele text is placeholder and **has not been reviewed by native speakers**. Please do not treat it as final. Corrections are very welcome.

## Roadmap

- [x] Demo screens with sample data
- [ ] Native-speaker review of chiShona and isiNdebele text
- [ ] "Sell on Thriftly" vendor sign-up and quick add-item form
- [ ] Real database and saved holds
- [ ] Mobile money payments (EcoCash, OneMoney, InnBucks via Paynow)
- [ ] WhatsApp bot for vendors
- [ ] Delivery pilot in one dense zone

## Contributing

Ideas, bug reports and translation fixes are welcome. Please open an issue first to discuss larger changes.

## License

<!-- Choose a license, for example MIT, and add it here. -->