
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import require_token
from app.routers import ultra
app=FastAPI(title="TERANGA ULTRA 50MW/200MWh")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(ultra.router, prefix="/api/ultra")
@app.get("/", dependencies=[Depends(require_token)])
def root():
    return {"ultra":"50MW/200MWh 4h 18Md 7fonctions <100ms black-start 16.9Md/an","walo":"10MW/20MWh 2h 26Md 2fonctions 500ms 0.3Md/an","gain":"5x 10x 51x revenu"}
