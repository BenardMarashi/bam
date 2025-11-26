'use client';

import { useEffect, useState } from 'react';

interface EnvCheck {
  key: string;
  exists: boolean;
  value: string;
  length: number;
  firstChars: string;
  lastChars: string;
  hasSpaces: boolean;
  hasQuotes: boolean;
  hasEquals: boolean;
}

export default function DebugPage() {
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [initStatus, setInitStatus] = useState<string>('Not initialized');

  useEffect(() => {
    // Try to initialize Firebase and catch any errors
    const testFirebase = async () => {
      try {
        const { initializeApp, getApps } = await import('firebase/app');
        const { getAuth } = await import('firebase/auth');
        
        const config = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
        };

        console.log('🔵 Attempting to initialize Firebase with config:', config);

        if (getApps().length === 0) {
          const app = initializeApp(config);
          const auth = getAuth(app);
          setInitStatus('✅ Firebase initialized successfully!');
          console.log('✅ Firebase initialized successfully');
        } else {
          setInitStatus('✅ Firebase already initialized');
        }
      } catch (error: any) {
        console.error('❌ Firebase initialization error:', error);
        setFirebaseError(error.message || error.toString());
        setInitStatus('❌ Firebase initialization failed');
      }
    };

    testFirebase();
  }, []);

  const envVars: Record<string, string | undefined> = {
    'NEXT_PUBLIC_FIREBASE_API_KEY': process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    'NEXT_PUBLIC_FIREBASE_APP_ID': process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const checks: EnvCheck[] = Object.entries(envVars).map(([key, value]) => ({
    key,
    exists: !!value,
    value: value || 'MISSING',
    length: value?.length || 0,
    firstChars: value ? value.substring(0, 15) + '...' : 'MISSING',
    lastChars: value ? '...' + value.substring(value.length - 10) : 'MISSING',
    hasSpaces: value ? (value.trim() !== value) : false,
    hasQuotes: value ? (value.includes('"') || value.includes("'")) : false,
    hasEquals: value ? value.endsWith('=') : false,
  }));

  const missingVars = checks.filter(c => !c.exists);
  const varsWithSpaces = checks.filter(c => c.hasSpaces);
  const varsWithQuotes = checks.filter(c => c.hasQuotes);
  const varsWithEquals = checks.filter(c => c.hasEquals && c.key === 'NEXT_PUBLIC_FIREBASE_API_KEY');

  const allGood = missingVars.length === 0 && 
                  varsWithSpaces.length === 0 && 
                  varsWithQuotes.length === 0 &&
                  varsWithEquals.length === 0;

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '20px', 
      background: '#0a0a0a', 
      color: '#00ff00',
      minHeight: '100vh',
      fontSize: '13px'
    }}>
      {/* Header */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '2px solid #00ff00'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>🔍 Firebase Environment Diagnostic</h1>
        <p style={{ color: '#ff0000', marginTop: '10px', marginBottom: 0 }}>
          ⚠️ DELETE THIS PAGE AFTER DEBUGGING - IT EXPOSES YOUR CONFIG!
        </p>
      </div>

      {/* Current Domain */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #333'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#00ffff' }}>📍 Current Domain</h2>
        <div style={{ background: '#000', padding: '10px', borderRadius: '4px' }}>
          <strong style={{ color: '#ffff00' }}>
            {typeof window !== 'undefined' ? window.location.hostname : 'Server-side render'}
          </strong>
        </div>
        <p style={{ marginTop: '10px', color: '#888', fontSize: '11px' }}>
          This domain must be in Firebase → Authentication → Settings → Authorized domains
        </p>
      </div>

      {/* Firebase Initialization Status */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: firebaseError ? '2px solid #ff0000' : '1px solid #333'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#00ffff' }}>🔥 Firebase Initialization</h2>
        <div style={{ 
          background: '#000', 
          padding: '10px', 
          borderRadius: '4px',
          color: firebaseError ? '#ff0000' : '#00ff00'
        }}>
          <strong>{initStatus}</strong>
        </div>
        {firebaseError && (
          <div style={{ 
            marginTop: '10px',
            padding: '10px',
            background: '#1a0000',
            border: '1px solid #ff0000',
            borderRadius: '4px'
          }}>
            <strong style={{ color: '#ff0000' }}>Error Message:</strong>
            <pre style={{ 
              marginTop: '5px', 
              whiteSpace: 'pre-wrap', 
              wordBreak: 'break-all',
              color: '#ffaaaa'
            }}>
              {firebaseError}
            </pre>
          </div>
        )}
      </div>

      {/* Environment Variables Check */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #333'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#00ffff' }}>🔧 Environment Variables</h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '11px'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333' }}>
                <th style={{ padding: '8px', textAlign: 'left', color: '#888' }}>Variable</th>
                <th style={{ padding: '8px', textAlign: 'center', color: '#888' }}>Status</th>
                <th style={{ padding: '8px', textAlign: 'center', color: '#888' }}>Length</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#888' }}>First Chars</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#888' }}>Last Chars</th>
                <th style={{ padding: '8px', textAlign: 'left', color: '#888' }}>Issues</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check, idx) => (
                <tr key={idx} style={{ 
                  borderBottom: '1px solid #222',
                  background: !check.exists ? '#1a0000' : (check.hasSpaces || check.hasQuotes || check.hasEquals) ? '#1a1a00' : 'transparent'
                }}>
                  <td style={{ padding: '8px', color: '#aaa' }}>
                    {check.key.replace('NEXT_PUBLIC_FIREBASE_', '')}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    {check.exists ? (
                      <span style={{ color: '#00ff00' }}>✅</span>
                    ) : (
                      <span style={{ color: '#ff0000' }}>❌</span>
                    )}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#fff' }}>
                    {check.length}
                  </td>
                  <td style={{ padding: '8px', color: '#ccc' }}>
                    {check.firstChars}
                  </td>
                  <td style={{ padding: '8px', color: '#ccc' }}>
                    {check.lastChars}
                  </td>
                  <td style={{ padding: '8px' }}>
                    {!check.exists && <span style={{ color: '#ff0000' }}>MISSING </span>}
                    {check.hasSpaces && <span style={{ color: '#ffff00' }}>SPACES </span>}
                    {check.hasQuotes && <span style={{ color: '#ffff00' }}>QUOTES </span>}
                    {check.hasEquals && check.key === 'NEXT_PUBLIC_FIREBASE_API_KEY' && (
                      <span style={{ color: '#ff8800' }}>ENDS_WITH_= </span>
                    )}
                    {check.exists && !check.hasSpaces && !check.hasQuotes && !(check.hasEquals && check.key === 'NEXT_PUBLIC_FIREBASE_API_KEY') && (
                      <span style={{ color: '#00ff00' }}>OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issues Summary */}
      <div style={{ 
        background: allGood ? '#001a00' : '#1a0000', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: allGood ? '2px solid #00ff00' : '2px solid #ff0000'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#00ffff' }}>⚠️ Issues Found</h2>
        
        {allGood ? (
          <div style={{ color: '#00ff00', fontSize: '16px' }}>
            <strong>✅ All environment variables look good!</strong>
            <p style={{ marginTop: '10px', color: '#88ff88' }}>
              The issue is most likely domain authorization in Firebase Console.
            </p>
          </div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {missingVars.length > 0 && (
              <li style={{ color: '#ff0000', marginBottom: '10px' }}>
                <strong>❌ Missing variables:</strong> {missingVars.map(v => v.key).join(', ')}
              </li>
            )}
            {varsWithSpaces.length > 0 && (
              <li style={{ color: '#ffff00', marginBottom: '10px' }}>
                <strong>⚠️ Variables with spaces:</strong> {varsWithSpaces.map(v => v.key).join(', ')}
              </li>
            )}
            {varsWithQuotes.length > 0 && (
              <li style={{ color: '#ffff00', marginBottom: '10px' }}>
                <strong>⚠️ Variables with quotes:</strong> {varsWithQuotes.map(v => v.key).join(', ')}
              </li>
            )}
            {varsWithEquals.length > 0 && (
              <li style={{ color: '#ff8800', marginBottom: '10px' }}>
                <strong>⚠️ API KEY ends with '=':</strong> This is unusual! Firebase API keys typically don't end with =. 
                Please verify you copied the correct API key from Firebase Console.
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Next Steps */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #333'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#00ffff' }}>📋 Next Steps</h2>
        
        <ol style={{ paddingLeft: '20px', color: '#ccc' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#ffff00' }}>Verify Firebase Authorized Domains:</strong>
            <br />
            Go to: Firebase Console → Authentication → Settings → Authorized domains
            <br />
            Make sure these are added:
            <ul style={{ marginTop: '5px' }}>
              <li><code style={{ background: '#000', padding: '2px 5px' }}>
                {typeof window !== 'undefined' ? window.location.hostname : 'bam-seven.vercel.app'}
              </code></li>
              <li><code style={{ background: '#000', padding: '2px 5px' }}>*.vercel.app</code></li>
            </ul>
          </li>
          
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#ffff00' }}>Verify API Key:</strong>
            <br />
            Go to: Firebase Console → Project Settings → Your apps
            <br />
            Copy the EXACT API key and compare with Vercel env vars
            <br />
            {varsWithEquals.length > 0 && (
              <span style={{ color: '#ff0000' }}>
                ⚠️ Your API key ends with '=' which is unusual - verify this is correct!
              </span>
            )}
          </li>
          
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#ffff00' }}>Force Redeploy with Clean Cache:</strong>
            <br />
            Go to: Vercel → Deployments → ⋯ → Redeploy
            <br />
            ✅ UNCHECK "Use existing Build Cache"
            <br />
            This is CRITICAL - the old build might be cached!
          </li>
          
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#ffff00' }}>Check Browser Console:</strong>
            <br />
            Press F12 and check the Console tab for detailed Firebase errors
          </li>
        </ol>
      </div>

      {/* Danger Warning */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: '#1a0000', 
        border: '3px solid #ff0000',
        borderRadius: '8px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#ff0000', fontSize: '18px' }}>
          🚨 SECURITY WARNING
        </h2>
        <p style={{ color: '#ffaaaa', margin: 0 }}>
          <strong>DELETE THIS FILE IMMEDIATELY AFTER DEBUGGING!</strong>
          <br />
          This page exposes your Firebase configuration which should not be public.
          <br />
          File to delete: <code style={{ background: '#000', padding: '2px 5px' }}>
            app/[locale]/debug/page.tsx
          </code>
        </p>
      </div>

      {/* Footer */}
      <div style={{ 
        marginTop: '20px',
        padding: '10px',
        textAlign: 'center',
        color: '#666',
        fontSize: '11px'
      }}>
        Debug Page v1.0 | Created: {new Date().toISOString()}
      </div>
    </div>
  );
}