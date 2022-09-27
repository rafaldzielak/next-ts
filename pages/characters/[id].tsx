import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import imageLoader from "../../imageLoader";
import { Character } from "../../types";

const CharacterPage = ({ character }: { character: Character }) => {
  const router = useRouter();
  console.log(router.query.id);

  return (
    <div>
      <h1>{character.name}</h1>
      <Image
        src={character.image}
        alt={character.name}
        width='200px'
        height='200px'
        loader={imageLoader}
        unoptimized
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
  const character = await res.json();
  // Will be visible in node console
  console.log(character);

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
