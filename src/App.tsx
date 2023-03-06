import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from './components/About/About';
import Home from './components/Home/Home';
import LogIn from "./components/LOGIN/Login";
import Task from "./components/Main/TaskMain";
import Projects from "./components/Projects/projects";
import './App.css';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, hardhat } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [goerli, hardhat],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Stepify',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App() {
 
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/tasklist' element={<Task />} />
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}