import { useState } from 'react'

interface ApiResponse<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApi<T = any>(): [ApiResponse<T>, (method: string, url: string, requestBody?: object) => Promise<void>] {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    isLoading: false,
    error: null,
  })

  const baseURL = `${import.meta.env.VITE_API}`

  const fetchApi = async (method: string, url: string, requestBody?: object): Promise<void> => {
    setResponse({ ...response, isLoading: true })

    try {
      const response = await fetch(baseURL + url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody ? JSON.stringify(requestBody) : null,
      })

      if (!response.ok) {
        const errorText = response.statusText || `HTTP error: ${response.status}`
        throw new Error(errorText)
      }

      const data = await response.json()
      setResponse({ data, isLoading: false, error: null })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setResponse({ data: null, isLoading: false, error: error.message || 'An unknown error occurred' })
    }
  }

  return [response, fetchApi]
}

export default useApi
