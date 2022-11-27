/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { NextPage , GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { sanityClient } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className='max-w-7xl mx-auto flex flex-col min-h-screen pt-5 pb-20 px-10 2xl:p-0 ' >
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='mb-6 text-4xl font-extralight text-white' >The <span className='font-extrabold'>OCTULUS</span></h1>

      <main className='bg-slate-800 px-10 pb-10 shadow-xl shadow-rose-900/30 rounded-3xl'>
        <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {collections.map(collection => (
            <Link href={`/movies/${collection.slug.current}`}>
            <div className='mt-9 flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105 '>
                <div className='p-5'>
                  <img src={collection.image} />
                <h2 className='text-3xl text-white text-center'>{collection.title}</h2>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () =>
{
  const query = `
    *[_type == 'movies']{
      title,
      slug,
      description,
      url,
      image
    }
  `

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    }
  }
}