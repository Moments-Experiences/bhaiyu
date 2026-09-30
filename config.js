/**
 * =========================================================================
 * MOMENT — EDITORIAL BIRTHDAY MAGAZINE CONFIGURATION
 * =========================================================================
 * 
 * Edit all text, jokes, and details here without touching the core code.
 * Preserves the exact original humor, personality, and punchlines.
 */

window.BIRTHDAY_CONFIG = {
  // Recipient details
  person: {
    firstName: "Sahil",
    nickname: "BHAIYU",
    honorific: "Seth",
    subtitle: "THE LEGEND OF HIS MOHALLA",
    edition: "SPECIAL EDITION // BIRTHDAY ISSUE 2026",
    issueTag: "VOL. XXIV · NO. 01"
  },

  // Opening Title Sequence
  opening: {
    kicker: "MOMENT PRESENTS",
    tag: "SPECIAL EDITION",
    headline: "SAHIL",
    titleSuffix: "BHAIYU",
    subheading: "THE LEGEND OF HIS MOHALLA",
    issue: "BIRTHDAY ISSUE // 2026",
    cta: "ENTER PUBLICATION →"
  },

  // Editorial Spreads (The 6 Iconic Jokes)
  spreads: [
    {
      id: "cancel",
      spreadNumber: "01",
      action: "CANCEL!!",
      category: "DIPLOMATIC EXPEDITIONS",
      headline: "The Art of the Immediate Cancellation",
      subline: "Zero remorse. Zero apology. Zero explanation.",
      jokeText: "plans every trip with full enthusiasm. books nothing. cancels day of. zero remorse. zero apology. zero explanation. every. single. time.",
      dossier: {
        plan: "GOA / MOUNTAINS / ROAD TRIP",
        excitementLevel: "100%",
        bookingStatus: "0% CONFIRMED",
        finalStatus: "CANCELLED AT 11:59 AM",
        officialExcuse: "bhai mood nahi ban raha yaar."
      }
    },
    {
      id: "offside",
      spreadNumber: "02",
      action: "OFFSIDE!!",
      category: "TERRITORIAL RADIUS",
      headline: "The 300-Meter Perimeter Limit",
      subline: "Never leaves his area.",
      jokeText: "never leaves his area. not because there's nothing outside. just because outside exists and that's reason enough not to go.",
      dossier: {
        registeredZone: "LANE NO. 4 // HIS MOHALLA",
        maxTravelRadius: "280 METERS",
        borderCrossingAttempts: "0",
        verdict: "OUTSIDE HAZARD LEVEL: TOO HIGH"
      }
    },
    {
      id: "redcard",
      spreadNumber: "03",
      action: "RED CARD!!",
      category: "REGULATORY COMPLIANCE",
      headline: "The 09:00 PM Curfew Protocol",
      subline: "NOT 9:30. NOT 9:15. EXACTLY 9.",
      jokeText: "9 baje ghar. not 9:30. not 9:15. 9. bhai Cinderella bhi itni strict nahi thi apne schedule ke saath.",
      dossier: {
        scheduledDeparture: "21:00:00 SHARP",
        cinderellaComparison: "SAHIL IS STRICTER",
        leniencyOffered: "0.0 SECONDS",
        cardIssued: "INSTANT DISMISSAL"
      }
    },
    {
      id: "foul",
      spreadNumber: "04",
      action: "FOUL!!",
      category: "PHYSIOLOGICAL ROUTINE",
      headline: "The Professional Retirement Schedule",
      subline: "Sleeps in the afternoon like a retired 60-year-old.",
      jokeText: "sleeps in the afternoon like a retired 60 year old. wakes up, has coffee, watches anime, sleeps again. this is the guy who plays football btw.",
      routine: [
        { time: "14:00", step: "HEAVY AFTERNOON SLEEP" },
        { time: "17:00", step: "WAKE UP & ARTISANAL COFFEE" },
        { time: "18:00", step: "ANIME BINGE SESSION" },
        { time: "20:00", step: "IMMEDIATE SLEEP AGAIN" },
        { time: "21:00", step: "TURF FOOTBALL CALLING???" }
      ]
    },
    {
      id: "golazo",
      spreadNumber: "05",
      action: "GOLAZO!!",
      category: "SPORTING PARALLELS",
      headline: "The Lionel Messi Paradox",
      subline: "Plays like Messi. Also cancels like Messi.",
      jokeLead: "messi fan. plays like messi.",
      punchline: "also cancels like messi cancelled on multiple clubs.",
      conclusion: "coincidence? we think not.",
      dossier: {
        leftFootProwess: "MAGICAL",
        contractCommitment: "UNPREDICTABLE",
        similarityIndex: "99.8%",
        status: "OFFICIALLY UNVERIFIED"
      }
    },
    {
      id: "extratime",
      spreadNumber: "06",
      action: "EXTRA TIME!!",
      category: "PSYCHOLOGICAL PROFILE",
      headline: "The Dual Duality of Man",
      subline: "WWE & Anime: A Perfectly Balanced Personality.",
      jokeText: "watches WWE and anime back to back like that's a balanced personality. somehow has strong opinions on both. we stopped arguing.",
      split: {
        leftTitle: "WWE ROYAL RUMBLE",
        leftNote: "20-minute rant about the booking decisions and heel turns",
        rightTitle: "SHONEN ANIME ARCS",
        rightNote: "Deep philosophical analysis of protagonist power scaling",
        centerStamp: "NO DEBATES ALLOWED"
      }
    }
  ],

  // Final Birthday Message (The Mohalla Legend)
  closer: {
    kicker: "EDITORIAL EPILOGUE",
    heading: "HAPPY BIRTHDAY SAHIL.",
    body: "legend of his mohalla, myth everywhere else.",
    signature: "teri lane hi teri duniya hai bc. ⚽",
    revealButton: "CLAIM TITLE: SETH →"
  },

  // Final Whistle / Typewriter Climax
  finalWhistle: {
    badge: "// FINAL WHISTLE · ARCHIVE COMPLETE",
    headline: "Happy Birthday Sahil. Seth.",
    stamp: "CERTIFIED MOHALLA LEGEND",
    footerText: "MOMENT EDITORIAL ARCHIVE © 2026 · ALL RIGHTS RESERVED TO HIS LANE"
  },

  // Sound settings
 audio: {
  enabledByDefault: false,
  useSynthesizedAudio: true,
  song: {
    enabled: true,
    src: "",
    volume: 0.85,
    loop: false
  }
}
};
