/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { sanityClient } from "../../sanity";
import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

const recipeQuery = `*[_type == 'series' && slug.current == $slug][0]{
  title,
  slug,
  description,
  url,
  image,
  releaseDate,
}`;

export default function Post({ data }) {
  const { serie } = data;
  const [url, setUrl] = React.useState(serie.url[0]);

  // function to handle the click event of the button and
  // pass the url to the iframe src
  const handleClick = (val) => {
    setUrl(val);
  };

  return (
    <div className={styles.main}>
      <iframe src={url} className="w-screen h-screen" allowFullScreen />
      <div className="m-10 flex flex-row space-x-3">
        {serie.url.map((oneUrl, index) => (
          <button
            key={oneUrl}
            onClick={() => handleClick(oneUrl)}
            className="p-4 border-2 rounded-xl"
          >
            {`${index + 1}`}
          </button>
        ))}
      </div>
      <h1 className="pl-5 text-3xl pt-8 w-screen mr-2 text-white">
        {serie.title}
      </h1>
      <div className="bg-zinc-800 m-5 rounded-3xl text-white">
        <p className="pt-6 pb-6 pl-4 pr-4 ">
          <span className="font-extrabold">The Storyline</span> :{" "}
          {serie.description}
          <br></br>
          <br></br>
          <span className="font-extrabold">Release Year</span> :{" "}
          {serie.releaseDate}
        </p>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "series" && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const serie = await sanityClient.fetch(recipeQuery, { slug });
  return {
    props: {
      data: { serie },
    },
  };
}
