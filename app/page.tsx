'use client';
import { useState } from "react";


export default function Home() {

  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)
  const prompt = 'prompt'

  const handleButton = async () => {

    setLoading(true);
    try {
      const response = await fetch('/api/generate',{
        method: 'GET',
        headers: {
          'content-Type': 'application/json'
        },
      })
      const data = await response.json()
      setResult(data)
      
    } catch (error) {
      alert(error)
      console.log(error)
    }
    setLoading(false);
  }


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Holi</h1>
      <button onClick={handleButton}>Dale acá</button>
      {loading && (
        <p className="font-bold my-5">cargando...</p>
      )}
      {result && !loading && (
        <p className="font-bold my-5">{result}</p>
      )}
    </main>
  )
}
