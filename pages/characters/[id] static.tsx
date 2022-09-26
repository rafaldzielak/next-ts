import Image from "next/image";
import React from "react";
import imageLoader from "../../imageLoader";
import { Character, GetCharacterResults } from "../../types";

const CharacterPage = ({ character }: { character: Character }) => {
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

// This will run on build, will run through all the characters and it's going to create params with that id
export const getStaticPaths = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results: characters }: GetCharacterResults = await res.json();

  return {
    paths: characters.map((character) => {
      return { params: { id: String(character.id) } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
