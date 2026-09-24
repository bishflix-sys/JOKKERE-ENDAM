"use client";

import { useEffect, useState } from "react";

export default function LoginGate() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  async function validate(candidate) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: candidate }),
      });
      if (!response.ok) throw new Error("Token invalide");
      setToken(candidate);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
      setError("Token invalide ou API indisponible.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    fetch("/api/auth", { method: "DELETE" });
    setToken("");
    setAuthenticated(false);
  }

  function submit(event) {
    event.preventDefault();
    if (token.trim()) validate(token.trim());
  }

  if (authenticated) {
    return (
      <main className="dashboard-shell">
        <button className="logout-button" type="button" onClick={logout}>Déconnexion</button>
        <iframe className="dashboard-frame" src="/dashboard.html" title="TERANGA ULTRA Dashboard Pro" />
      </main>
    );
  }

  return (
    <main className="login-shell">
      <form className="login-card" onSubmit={submit}>
        <div className="login-mark"><span /></div>
        <p className="login-eyebrow">TERANGA ULTRA / DERMS</p>
        <h1>Accès monitoring</h1>
        <p className="login-copy">Entrez votre token opérateur pour ouvrir le dashboard.</p>
        <label htmlFor="token">Token d’accès</label>
        <input id="token" type="password" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Bearer token" autoComplete="current-password" />
        {error && <p className="login-error">{error}</p>}
        <button type="submit" disabled={loading || !token.trim()}>{loading ? "Vérification..." : "Se connecter"}</button>
      </form>
    </main>
  );
}
