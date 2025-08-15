export const translations = {
  en: {
    header: {
      tagline: 'Your Friendly Listing Assistant',
    },
    welcome: {
      title: 'Hi there, kapitbahay!',
      description: 'Ready to share your pre-loved items? Let\'s create a great listing in three easy steps.',
      step1: '<strong>Upload a Photo</strong> of your item.',
      step2: '<strong>Edit AI Suggestions</strong> as you like.',
      step3: '<strong>Copy All</strong> & post in the app!',
    },
    imageUploader: {
      upload: 'Upload Photo',
      processing: 'Processing...',
    },
    resultDisplay: {
      readyToPost: 'Ready to Post?',
      readyToPostDescription: "You can edit the suggestions below. When you're happy, use the button to copy everything you need for your listing.",
      copyAllButton: 'Copy All for Listing',
      copiedToClipboard: 'Copied to Clipboard!',
      category: 'Suggested Category',
      condition: 'Suggested Condition',
      titles: 'Suggested Titles',
      description: 'Suggested Description',
    },
    copyButton: {
      copy: 'Copy',
      copied: 'Copied!',
    },
    copyAll: {
      title: 'Title',
      category: 'Category',
      condition: 'Condition',
      description: 'Description',
    },
    app: {
      startOver: 'Start Over',
      error: 'Oops! Something went wrong. Baka may problema sa network or sa image. Please try again with a different photo.',
      unknownError: 'An unknown error occurred.',
    },
    footer: {
      poweredBy: 'Powered by Google Gemini. Helping neighbors share more.',
    },
  },
  fil: {
    header: {
      tagline: 'Ang Iyong Palakaibigang Listing Assistant',
    },
    welcome: {
      title: 'Hi diyan, kapitbahay!',
      description: 'Handa ka na bang ibahagi ang iyong mga pre-loved items? Gumawa tayo ng magandang listing sa tatlong madaling hakbang.',
      step1: '<strong>Mag-upload ng Litrato</strong> ng iyong item.',
      step2: '<strong>I-edit ang Mungkahi</strong> ng AI ayon sa gusto mo.',
      step3: '<strong>Kopyahin Lahat</strong> at i-post sa app!',
    },
    imageUploader: {
      upload: 'Mag-upload ng Litrato',
      processing: 'Pinoproseso...',
    },
    resultDisplay: {
      readyToPost: 'Handa nang I-post?',
      readyToPostDescription: 'Maaari mong i-edit ang mga mungkahi sa ibaba. Kapag ayos na, gamitin ang button para kopyahin ang lahat ng kailangan mo para sa iyong listing.',
      copyAllButton: 'Kopyahin Lahat para sa Listing',
      copiedToClipboard: 'Nakopya sa Clipboard!',
      category: 'Mungkahing Kategorya',
      condition: 'Mungkahing Kondisyon',
      titles: 'Mga Mungkahing Pamagat',
      description: 'Mungkahing Deskripsyon',
    },
    copyButton: {
      copy: 'Kopyahin',
      copied: 'Nakopya!',
    },
    copyAll: {
      title: 'Pamagat',
      category: 'Kategorya',
      condition: 'Kondisyon',
      description: 'Deskripsyon',
    },
    app: {
      startOver: 'Magsimulang Muli',
      error: 'Oops! Nagkaproblema. Baka may problema sa network o sa litrato. Pakisubukang muli gamit ang ibang litrato.',
      unknownError: 'Isang hindi kilalang error ang nangyari.',
    },
    footer: {
      poweredBy: 'Pinapagana ng Google Gemini. Tumutulong sa mga kapitbahay na magbahagi.',
    },
  },
};

export type Translation = typeof translations.en;
