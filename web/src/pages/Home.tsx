import { useEffect, useState } from "react";

import { Layout } from "../components/Layout";
import { Header } from "../components/Header";
import { Section } from "../components/Section";
import { ImageInList } from "../components/ImageInList";

export type UserPayloadProps = {
  id: string;
  name: string;
  email: string;
};

export type communityImageProps = {
  id: string;
  prompt: string;
  url: string;
  createdAt: string;
  user: {
    name: string;
  };
};

export function Home() {
  const [communityImages, setCommunityImages] = useState<communityImageProps[]>(
    []
  );

  useEffect(() => {
    fetch("http://localhost:3000/images")
      .then((response) => response.json())
      .then((data: communityImageProps[]) => {
        if (data.length > 0) {
          data.sort((a: communityImageProps, b: communityImageProps): any => {
            const firstParam = new Date(a.createdAt);
            const secondParam = new Date(b.createdAt);

            return firstParam > secondParam ? -1 : 1;
          });
        }

        return setCommunityImages(data);
      });
  }, []);

  return (
    <Layout>
      <Header />
      <Section
        title="Galeria da Comunidade"
        subtitle="Explore a coleção de imagens criativas e deslumbrantes geradas pela
    DALL·E 2"
      >
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-2 justify-items-center">
          {communityImages.map((item) => (
            <ImageInList key={item.id} {...item} />
          ))}
        </div>

        <div className="p-6 border bg-gray-200 relative mb-10">
          <h2 className="font-bold">Compartilhe sua criatividade</h2>
          <p className="font-medium text-gray-500">
            Faça parte da comunidade e apresente sua imagem na galeria
          </p>

          <a
            href="/create"
            className="my-3 px-4 py-3 inline-block font-semibold text-white text-sm bg-gray-900 rounded-md hover:opacity-90 transition-opacity"
          >
            Gerar imagem
          </a>

          <div className="absolute bottom-0 right-0 flex opacity-0 sm:opacity-100">
            <div className="w-6 h-6 bg-[#ffff65]" />
            <div className="w-6 h-6 bg-[#40ffff]" />
            <div className="w-6 h-6 bg-[#52db4d]" />
            <div className="w-6 h-6 bg-[#ff6e3e]" />
            <div className="w-6 h-6 bg-[#3e46ff]" />
          </div>
        </div>
      </Section>
    </Layout>
  );
}
