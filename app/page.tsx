import Hero from '@/components/sections/Hero';
import ChefCoin from '@/components/sections/ChefCoin';
import CryptoDining from '@/components/sections/CryptoDining';
import Ecosystem from '@/components/sections/Ecosystem';
import HowItWorks from '@/components/sections/HowItWorks';
import Worldchefs from '@/components/sections/Worldchefs';
import Team from '@/components/sections/Team';

export default function Home() {
  return (
    <>
      <Hero />
      <ChefCoin />
      <CryptoDining />
      <HowItWorks />
      <Ecosystem />
      <Worldchefs />
      <Team />
    </>
  );
}
