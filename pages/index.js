import Hero from '../components/Hero'
import Card from '../components/Card'
import CardProduct from '../components/CardProduct'
import Head from 'next/head'

export default function Home() {

  return (
    <>
      <Head>
        <title>Shopping.io</title>
        <meta property="og:Shopping.io Front Page" content="Shopping.io Front Page" key="Shopping.io" />
      </Head>
      <Hero />
      <Card margin="30" />
      <CardProduct margin="30"/>
    </>
  )
}
