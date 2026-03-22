'use client'

import { useState } from 'react'

type MigrationDetail = {
  id: string
  pageUrl?: string | null
  actions: string[]
  errors: string[]
}

type MigrationResult = {
  processed: number
  migrated: number
  errors: number
  details: MigrationDetail[]
}

export const MigrateToR2Button = () => {
  const [limit, setLimit] = useState<number | ''>('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<MigrationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleMigrate = async () => {
    const effectiveLimit =
      typeof limit === 'number' && limit > 0 ? limit : undefined
    const preview = effectiveLimit
      ? `first ${effectiveLimit} item(s)`
      : 'ALL items'

    const confirmed = confirm(
      `This will migrate Supabase-hosted files to Cloudflare R2 for ${preview}.\n\nContinue?`
    )
    if (!confirmed) return

    setLoading(true)
    setResult(null)
    setError(null)
    setShowDetails(false)

    try {
      const url = effectiveLimit
        ? `/api/migrate-to-r2?limit=${effectiveLimit}`
        : '/api/migrate-to-r2'

      const response = await fetch(url, {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Migration failed')
      }

      setResult(data as MigrationResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--theme-elevation-300)',
    borderRadius: '4px',
    backgroundColor: 'var(--theme-elevation-50)',
    color: 'var(--theme-text)',
    fontSize: '0.875rem',
    width: '110px',
    outline: 'none',
  }

  const btnStyle = (
    color: string,
    disabled?: boolean
  ): React.CSSProperties => ({
    padding: '0.6rem 1.25rem',
    backgroundColor: disabled ? 'var(--theme-elevation-300)' : color,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : loading ? 'wait' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'opacity 0.2s ease',
  })

  return (
    <div
      style={{
        padding: '1.25rem',
        backgroundColor: 'var(--theme-elevation-100)',
        borderRadius: '6px',
        marginBottom: '1rem',
      }}
    >
      {/* Header */}
      <h3
        style={{
          margin: '0 0 0.25rem 0',
          fontSize: '1rem',
          fontWeight: '600',
        }}
      >
        Migrate Storage → Cloudflare R2
      </h3>
      <p
        style={{
          margin: '0 0 1rem 0',
          fontSize: '0.8125rem',
          color: 'var(--theme-elevation-600)',
          lineHeight: 1.5,
        }}
      >
        Downloads all Supabase-hosted screenshots, favicons, and media files
        from inspiration websites and re-uploads them to R2, then updates the
        database records.
      </p>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          <span
            style={{
              color: 'var(--theme-elevation-700)',
              whiteSpace: 'nowrap',
            }}
          >
            Limit (leave blank for all):
          </span>
          <input
            type='number'
            min={1}
            value={limit}
            placeholder='e.g. 5'
            onChange={(e) =>
              setLimit(
                e.target.value === '' ? '' : parseInt(e.target.value, 10)
              )
            }
            style={inputStyle}
            disabled={loading}
          />
        </label>

        <button
          onClick={handleMigrate}
          disabled={loading}
          style={btnStyle('#e67e22', loading)}
        >
          {loading
            ? '⏳ Migrating…'
            : typeof limit === 'number' && limit > 0
              ? `▶ Migrate ${limit} item(s)`
              : '▶ Migrate ALL'}
        </button>
      </div>

      {/* Success result */}
      {result && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.875rem',
            backgroundColor:
              result.errors === 0
                ? 'var(--theme-success-50)'
                : 'var(--theme-warning-50)',
            border: `1px solid ${
              result.errors === 0
                ? 'var(--theme-success-200)'
                : 'var(--theme-warning-200)'
            }`,
            borderRadius: '4px',
            fontSize: '0.875rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              marginBottom: '0.5rem',
            }}
          >
            <span>
              ✅ <strong>Processed:</strong> {result.processed}
            </span>
            <span>
              📦 <strong>Migrated:</strong> {result.migrated}
            </span>
            <span
              style={{
                color: result.errors > 0 ? 'var(--theme-error-600)' : 'inherit',
              }}
            >
              {result.errors > 0 ? '❌' : '✔️'} <strong>Errors:</strong>{' '}
              {result.errors}
            </span>
          </div>

          <button
            onClick={() => setShowDetails((v) => !v)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--theme-text)',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            {showDetails ? 'Hide details ▲' : 'Show details ▼'}
          </button>

          {showDetails && (
            <div
              style={{
                marginTop: '0.75rem',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {result.details.map((d) => (
                <div
                  key={d.id}
                  style={{
                    marginBottom: '0.5rem',
                    padding: '0.5rem',
                    backgroundColor: 'var(--theme-elevation-100)',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                    {d.pageUrl || d.id}
                  </div>
                  {d.actions.map((a, i) => (
                    <div key={i} style={{ color: 'var(--theme-success-700)' }}>
                      ↳ {a}
                    </div>
                  ))}
                  {d.errors.map((e, i) => (
                    <div key={i} style={{ color: 'var(--theme-error-600)' }}>
                      ✕ {e}
                    </div>
                  ))}
                  {d.actions.length === 0 && d.errors.length === 0 && (
                    <div style={{ color: 'var(--theme-elevation-500)' }}>
                      No Supabase files found — already on R2
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: 'var(--theme-error-50)',
            border: '1px solid var(--theme-error-200)',
            borderRadius: '4px',
            color: 'var(--theme-error-700)',
            fontSize: '0.875rem',
          }}
        >
          ❌ {error}
        </div>
      )}
    </div>
  )
}
