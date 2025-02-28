import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add structured data for SEO
const addStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Trézor.io/Start® | Starting Up Your Device | Trézor®",
    "description": "Trezor.io/start - Official guide for setting up your Trezor device. Learn how to initialize, secure, and use your hardware wallet with our step-by-step instructions.",
    "url": "https://trezor.io/start",
    "mainEntity": {
      "@type": "HowTo",
      "name": "How to Set Up Your Trezor Device",
      "description": "A step-by-step guide to initialize and secure your Trezor hardware wallet.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Connect Your Device",
          "text": "Connect your Trezor device to your computer using the USB cable provided in the package."
        },
        {
          "@type": "HowToStep",
          "name": "Install Firmware",
          "text": "Follow the on-screen instructions to install or update the latest firmware on your device."
        },
        {
          "@type": "HowToStep",
          "name": "Create Your Wallet",
          "text": "Set up a new wallet or recover an existing one using your recovery seed."
        },
        {
          "@type": "HowToStep",
          "name": "Start Using Trezor",
          "text": "Once setup is complete, you can start managing your cryptocurrencies securely."
        }
      ]
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

// Add meta tags dynamically for SEO
const addMetaTags = () => {
  // Twitter Card data
  const twitterCard = document.createElement('meta');
  twitterCard.name = 'twitter:card';
  twitterCard.content = 'summary_large_image';
  document.head.appendChild(twitterCard);

  const twitterTitle = document.createElement('meta');
  twitterTitle.name = 'twitter:title';
  twitterTitle.content = 'Trézor.io/Start® | Starting Up Your Device | Trézor®';
  document.head.appendChild(twitterTitle);

  const twitterDescription = document.createElement('meta');
  twitterDescription.name = 'twitter:description';
  twitterDescription.content = 'Trezor.io/start - Official guide for setting up your Trezor device. Learn how to initialize, secure, and use your hardware wallet.';
  document.head.appendChild(twitterDescription);
};

// Initialize the app and add SEO enhancements
const init = () => {
  addStructuredData();
  addMetaTags();
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Run initialization
init();