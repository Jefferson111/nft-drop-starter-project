import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import githubLogo from './assets/github-logo.svg';
import fbLogo from './assets/fb-logo.svg';
import youtubeLogo from './assets/youtube-logo.svg';
import discordLogo from './assets/discord-logo.svg';
import mediumLogo from './assets/medium-logo.svg';
import redditLogo from './assets/reddit-logo.svg';
import background from "./img/background.jpg";
import footer from "./img/footer.jpg";
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_LINK = `https://twitter.com`;
const GITHUB_LINK = `https://github.com`;
const YOUTUBE_LINK = `https://youtube.com`;
const FACEBOOK_LINK = `https://facebook.com`;
const DISCORD_LINK = `https://discord.com`;
const REDDIT_LINK = `https://reddit.com`;
const MEDIUM_LINK = `https://medium.com`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
  
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

 const connectWallet = async () => {
  const { solana } = window;

  if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
  }
 };

 /*
  * We want to render this UI when the user hasn't connected
  * their wallet to our app yet.
  */
 const renderNotConnectedContainer = () => (
   <button
     className="cta-button connect-wallet-button"
     onClick={connectWallet}
   >
     Connect to Wallet
   </button>
 );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container" style={{backgroundImage: `url(${background})`}}>
        <div className="header-container">
          <p className="header">🍭 Candy Mint</p>
          <p className="sub-text">Solana Metaplex NFT Minting Machine</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container" style={{backgroundImage: `url(${footer})`}}>
          <a
            href={GITHUB_LINK}
          ><img alt="Github Logo" className="logo" src={githubLogo} /></a>
          <a
            href={DISCORD_LINK}
          ><img alt="Discord Logo" className="logo" src={discordLogo} /></a>
          <a
            href={TWITTER_LINK}
          ><img alt="Twitter Logo" className="logo" src={twitterLogo} /></a>
          <a
            href={MEDIUM_LINK}
          ><img alt="Medium Logo" className="logo" src={mediumLogo} /></a>
          <a
            href={REDDIT_LINK}
          ><img alt="Reddit Logo" className="logo" src={redditLogo} /></a>
          <a
            href={FACEBOOK_LINK}
          ><img alt="Fb Logo" className="logo" src={fbLogo} /></a>
          <a
            href={YOUTUBE_LINK}
          ><img alt="Youtube Logo" className="logo" src={youtubeLogo} /></a>
        </div>
      </div>
    </div>
  );
};

export default App;
