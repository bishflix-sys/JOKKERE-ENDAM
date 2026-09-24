
from fastapi import APIRouter, Depends
from app.auth import require_token
import random, time
router=APIRouter(dependencies=[Depends(require_token)])
SITES=[{"id":"bokhol-1","name":"Bokhol 1","power_MW":5,"energy_MWh":20,"zone":"Saint-Louis"},{"id":"dakar-1","name":"SOBOA Rufisque","power_MW":5,"energy_MWh":20,"zone":"Dakar"},{"id":"thies-1","name":"Thies","power_MW":5,"energy_MWh":20,"zone":"Thies"},{"id":"kaolack-1","name":"Kaolack","power_MW":5,"energy_MWh":20,"zone":"Kaolack"},{"id":"ziguinchor-1","name":"Ziguinchor","power_MW":5,"energy_MWh":20,"zone":"Ziguinchor"},{"id":"tambacounda-1","name":"Tambacounda","power_MW":5,"energy_MWh":20,"zone":"Tambacounda"},{"id":"louga-1","name":"Louga","power_MW":5,"energy_MWh":20,"zone":"Louga"},{"id":"touba-1","name":"Touba","power_MW":5,"energy_MWh":20,"zone":"Diourbel"},{"id":"kolda-1","name":"Kolda","power_MW":5,"energy_MWh":20,"zone":"Kolda"},{"id":"matam-1","name":"Matam","power_MW":5,"energy_MWh":20,"zone":"Matam"}]
@router.get("/compare")
def compare():
    return {"walo":{"power_MW":10,"energy_MWh":20,"duration_h":2,"cost_Md":26,"response_ms":500,"revenue_Md":0.328},"ultra":{"power_MW":50,"energy_MWh":200,"duration_h":4,"cost_Md":18,"response_ms":80,"revenue_Md":16.9},"gain":"5x 10x 30% moins cher 6x plus rapide 51x revenu"}
@router.get("/status")
def status():
    freq=random.uniform(49.7,50.4)
    action="DISCHARGE 50MW <100ms - Walo 500ms" if freq<49.8 else "CHARGE" if freq>50.3 else "STANDBY"
    return {"sites":SITES,"total_MW":50,"total_MWh":200,"freq_Hz":round(freq,3),"action":action,"response_ms":80}
@router.post("/grid-forming/test")
def test(freq: float=49.7):
    return {"freq":freq,"injected_MW":50 if freq<49.8 else 0,"latency_ms":80,"walo_ms":500,"gain":"6.25x plus rapide"}
@router.get("/business")
def business():
    return {"capex_total_Md":18,"revenu_Md_an":16.9,"payback":1.06,"walo_capex":26,"walo_revenu":0.328}
