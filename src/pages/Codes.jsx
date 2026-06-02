import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { GAME_VERSION } from '../data/config.js'

const REDEEM_URL = 'https://cdkey.farlightgames.com/dislyte-global'

export default function Codes() {
  const [codes, setCodes]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [lastCheck, setLastCheck] = useState(null)
  const [copied, setCopied]     = useState(null)

  const fetchCodes = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('gift_codes')
      .select('*')
      .order('is_active', { ascending: false })
      .order('expires_at', { ascending: true })
    setCodes(data || [])
    setLastCheck(new Date())
    setLoading(false)
  }

  useEffect(() => { fetchCodes() }, [])

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const activeCodes   = codes.filter(c => c.is_active)
  const expiredCodes  = codes.filter(c => !c.is_active)

  const isExpiredSoon = (expires_at) => {
    if (!expires_at) return false
    const diff = new Date(expires_at) - new Date()
    return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000 // < 3 jours
  }

  const formatExpiry = (expires_at) => {
    if (!expires_at) return 'Pas de limite connue'
    return new Date(expires_at).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  return (
    <div className="page" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

      {/* Header */}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="section-title" style={{ color: 'var(--gold)' }}>Codes Cadeaux</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Codes actifs · {GAME_VERSION} · Mis à jour manuellement
          </p>
        </div>
        <div className="section-header-line" style={{ background: 'linear-gradient(90deg, rgba(255,210,0,0.3), transparent)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {lastCheck && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
              Vérifié à {lastCheck.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button
            onClick={fetchCodes}
            disabled={loading}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(255,210,0,0.08)',
              border: '1px solid rgba(255,210,0,0.25)',
              color: 'var(--gold)',
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: '12px',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'all 200ms',
            }}
          >
            {loading ? '⏳' : '🔄'} Actualiser
          </button>
        </div>
      </div>

      {/* Lien de remboursement */}
      <a
        href={REDEEM_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderRadius: '12px',
          background: 'rgba(255,210,0,0.06)',
          border: '1px solid rgba(255,210,0,0.2)',
          textDecoration: 'none',
          marginBottom: '32px',
          transition: 'all 200ms',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,210,0,0.5)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,210,0,0.2)'}
      >
        <span style={{ fontSize: '24px' }}>🎁</span>
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, color: 'var(--gold)', fontSize: '14px' }}>
            Entrer un code sur le site officiel
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            cdkey.farlightgames.com · Recommandé pour iOS & PC
          </div>
        </div>
        <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '16px' }}>↗</span>
      </a>

      {/* Comment redeem — Android + iPhone */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '40px' }}>

        {/* Android */}
        <div style={{ padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '12px' }}>
            🤖 ANDROID — EN JEU
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Avatar (haut gauche)', 'Paramètres', 'Services', 'Code Cadeau', 'Entrer le code → Confirmer'].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(255,210,0,0.15)', border: '1px solid rgba(255,210,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700, color: 'var(--gold)',
                }}>{i + 1}</div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* iPhone */}
        <div style={{ padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '12px' }}>
            🍎 IPHONE — VIA SITE WEB
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Copier le code ci-dessus',
              'Ouvrir le lien officiel (bouton jaune ci-dessus)',
              'Se connecter avec ton compte Dislyte',
              'Coller le code dans le champ prévu',
              'Valider — les récompenses arrivent en jeu',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                  background: 'rgba(255,210,0,0.15)', border: '1px solid rgba(255,210,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: 700, color: 'var(--gold)',
                }}>{i + 1}</div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{step}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: '12px', padding: '8px 12px', borderRadius: '8px',
            background: 'rgba(255,210,0,0.06)', border: '1px solid rgba(255,210,0,0.2)',
            fontSize: '11px', color: 'var(--text-muted)',
          }}>
            ⚠️ Apple interdit la saisie de codes directement dans l'app iOS — le site web est la seule méthode.
          </div>
        </div>

      </div>

      {/* Codes actifs */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', letterSpacing: '2px', color: '#52ff8a', marginBottom: '16px' }}>
          ✅ CODES ACTIFS ({loading ? '…' : activeCodes.length})
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2].map(i => <div key={i} className="skeleton" style={{ height: '90px', borderRadius: '14px' }} />)}
          </div>
        ) : activeCodes.length === 0 ? (
          <div style={{
            padding: '40px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border)',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
          }}>
            😔 Aucun code actif pour le moment.<br />
            <span style={{ fontSize: '12px' }}>Reviens bientôt ou suis le compte Discord/Twitter officiel.</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeCodes.map(c => (
              <CodeCard
                key={c.id}
                code={c}
                copied={copied === c.code}
                onCopy={() => copyCode(c.code)}
                expiredSoon={isExpiredSoon(c.expires_at)}
                formatExpiry={formatExpiry}
              />
            ))}
          </div>
        )}
      </div>

      {/* Codes expirés */}
      {!loading && expiredCodes.length > 0 && (
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            ❌ CODES EXPIRÉS ({expiredCodes.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.5 }}>
            {expiredCodes.map(c => (
              <div key={c.id} style={{
                padding: '14px 18px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <code style={{
                  fontFamily: 'monospace', fontSize: '14px',
                  color: 'var(--text-muted)', textDecoration: 'line-through',
                }}>{c.code}</code>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  Expiré le {formatExpiry(c.expires_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CodeCard({ code: c, copied, onCopy, expiredSoon, formatExpiry }) {
  return (
    <div style={{
      padding: '20px 24px',
      borderRadius: '14px',
      background: 'rgba(82,255,138,0.04)',
      border: `1px solid ${expiredSoon ? 'rgba(255,200,0,0.4)' : 'rgba(82,255,138,0.2)'}`,
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap',
      transition: 'all 200ms',
    }}>
      {/* Code */}
      <div style={{ flex: 1, minWidth: '180px' }}>
        <code style={{
          fontFamily: 'monospace',
          fontSize: '22px',
          fontWeight: 700,
          color: '#52ff8a',
          letterSpacing: '2px',
          display: 'block',
          marginBottom: '6px',
        }}>
          {c.code}
        </code>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{c.rewards}</div>
        {c.notes && (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {c.notes}
          </div>
        )}
      </div>

      {/* Expiry */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {c.expires_at ? (
          <div style={{
            fontSize: '11px',
            color: expiredSoon ? 'var(--gold)' : 'var(--text-muted)',
            fontFamily: 'var(--font-ui)',
          }}>
            {expiredSoon ? '⚠️ Expire bientôt' : '⏳ Expire le'}<br />
            <span style={{ fontWeight: 700 }}>{formatExpiry(c.expires_at)}</span>
          </div>
        ) : (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pas de limite connue</div>
        )}
      </div>

      {/* Bouton copier */}
      <button
        onClick={onCopy}
        style={{
          padding: '10px 20px',
          borderRadius: '10px',
          background: copied ? 'rgba(82,255,138,0.2)' : 'rgba(82,255,138,0.1)',
          border: `1px solid ${copied ? 'rgba(82,255,138,0.6)' : 'rgba(82,255,138,0.3)'}`,
          color: '#52ff8a',
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          fontSize: '13px',
          cursor: 'pointer',
          transition: 'all 200ms',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {copied ? '✓ Copié !' : '📋 Copier'}
      </button>
    </div>
  )
}
