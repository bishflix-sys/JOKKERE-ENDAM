
# TERANGA ULTRA - Dashboard Pro Complet 50MW/200MWh
# 10x plus performant que Walo Storage

## Contenu du ZIP

```
teranga-ultra-dashboard-pro-complet/
├── backend/
│   ├── app/main.py              # API ULTRA 50MW/200MWh
│   ├── app/routers/ultra.py     # /compare, /status, /grid-forming/test, /business
│   └── requirements.txt
├── edge/
│   └── edge_agent_ultra.py      # Grid-Forming <100ms - Raspberry Pi + BYD MC Cube-T
├── frontend-dashboard-pro/
│   ├── index.html               # Dashboard Pro light + config (version standalone - ouvre direct)
│   ├── package.json
│   └── src/                     # (build React du dashboard pro)
├── infra/
│   └── mosquitto.conf
├── docs/
│   └── dashboard-pro.html       # Même dashboard pro
├── docker-compose.yml
└── TERANGA_ULTRA_Business_16_9Md.xlsx
```

## Installation locale - 2 minutes

### Démarrage Windows recommandé

Si PowerShell bloque les scripts, lancer `start.cmd` ou utiliser :

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\start.ps1
```

### Option 1: Dashboard seul (sans backend) - 0 package
Double-clic sur `frontend-dashboard-pro/index.html` -> dashboard s'ouvre direct dans Chrome, avec simulation live 50MW.

### Option 2: Complet avec backend

Backend:
```
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Frontend Next:
```
cd frontend-dashboard-pro
npm install
npm run dev
# ouvre http://localhost:3000
```

Ou avec Docker:
```
docker-compose up --build
# backend http://localhost:8000/docs
# dashboard http://localhost:3000
```

## Endpoints ULTRA

- GET /api/ultra/compare -> Walo vs Ultra (5x, 10x, 51x revenu)
- GET /api/ultra/status -> 10 sites, 50MW, freq live, action grid-forming
- POST /api/ultra/grid-forming/test?freq=49.7 -> Test 80ms vs Walo 500ms
- GET /api/ultra/business -> Capex 18Md vs 26Md, revenu 16.9Md/an, payback 1.06 an

## Performance vs Walo

- Walo: 10MW/20MWh, 2h, 26Md FCFA, 500ms, 0.328Md/an
- ULTRA: 50MW/200MWh, 4h, 18Md FCFA, 80ms, black-start, 16.9Md/an
- Gain: 5x puissance, 10x énergie, 30% moins cher, 6x plus rapide, 51x revenu

## Matériel ULTRA par site 5MW/20MWh

- Batterie: BYD MC Cube-T LFP 20MWh conteneur
- Onduleur: Sungrow SG350HX Grid-Forming <100ms
- Edge: Raspberry Pi 4 + Shelly Pro 3EM x10

Développé à Rufisque, Sénégal - 2026
