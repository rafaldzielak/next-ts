import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../imageLoader";

import styles from "../styles/Home.module.css";
import { Character, GetCharacterResults } from "../types";

const Home: NextPage<{ characters: Character[] }> = ({ characters }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {characters.map((character) => (
        <div key={character.id}>
          <Link href={`/characters/${character.id}`}>
            <a>
              <h3>{character.name}</h3>
            </a>
          </Link>
          <Image
            // For next export
            loader={imageLoader}
            // We don't need to optimize as they are already hosted
            unoptimized
            src={character.image}
            alt={character.name}
            width='200'
            height='200'
          />
        </div>
      ))}
    </div>
  );
};

//getStaticProps is being run on app build - for building static website
export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results: characters }: GetCharacterResults = await res.json();

  return {
    props: {
      characters,
    },
  };
};

// getServerSideProps - on run? - for building dynamic server rendering website

export default Home;
