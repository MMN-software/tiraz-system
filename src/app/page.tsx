import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Services } from "@/components/home/Services";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUs } from "@/components/home/WhyUs";
import { Brands } from "@/components/home/Brands";
import { Certificates } from "@/components/home/Certificates";
import { LatestArticles } from "@/components/home/LatestArticles";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Categories />
      <FeaturedProducts />
      <WhyUs />
      <Brands />
      <Certificates />
      <LatestArticles />
      <FinalCTA />
    </>
  );
}
