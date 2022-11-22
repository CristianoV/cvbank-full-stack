import { useRouter } from "next/router";
import { useEffect } from "react"
import Loading from "../components/Loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/account')
    } else {
      router.push('/login')
    }
  }, [router])
  return (
    <div className="flex justify-center h-screen w-screen items-center">
      <Loading />
    </div>
  )
}
