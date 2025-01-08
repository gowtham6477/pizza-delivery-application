
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>Our pizzas are made with the finest ingredients and cooked to perfection in our brick oven. We use only the freshest vegetables and meats, sourced locally whenever possible.
          </p>
          <p>Our pizzas are crafted with care using premium ingredients, from perfectly ripe tomatoes to creamy mozzarella. Each pizza is hand-tossed and baked to crispy perfection in our traditional brick oven.</p>
          <p>We believe in making pizza the way it’s meant to be—using only the freshest, locally sourced ingredients. Our dough is made fresh daily, topped with the finest meats, vegetables, and cheeses for a truly authentic taste.</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'} mainHeader={'Contact'}
        />
        <div className="mt-8">
          <a href="tel:+45738123123" className="text-4xl underline text-gray-500">
            +91 98605 34506
          </a>
        </div>
      </section>
    </>
  );
}
