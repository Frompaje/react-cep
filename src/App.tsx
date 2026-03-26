import { MapPin } from 'lucide-react'
import { SearchForm } from './components/search/SearchForm'
import { ResultsGrid } from './components/search/ResultsGrid'
import { Badge } from './components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { useCepSearch } from './hooks/useCepSearch'
import { Toaster } from './components/ui/sonner'

function App() {
  const { result, isLoading, rttMs, hasSearched, search } = useCepSearch()

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-8">
        <header className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <MapPin className="h-6 w-6 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              ZipRange Locator
            </h1>
            <p className="text-sm text-slate-500">
              Search ZIP codes by radius with real-time telemetry
            </p>
          </div>
        </header>

        <Card className="mx-auto w-full max-w-xl">
          <CardHeader>
            <CardTitle>Search ZIP Codes by Radius</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchForm onSubmit={search} isLoading={isLoading} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="text-sm font-medium text-slate-600">Request Telemetry</div>
            <Badge variant="secondary">
              RTT: {rttMs === null ? '--' : `${rttMs.toFixed(0)} ms`}
            </Badge>
          </CardContent>
        </Card>

        <ResultsGrid
          data={result}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  )
}

export default App
