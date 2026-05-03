# SPEC - Album Figuritas Mundial

## 1. Project Overview

- **Nombre**: Figus - Album del Mundial
- **Tipo**: Webapp (PWA-ready)
- **Funcionalidad**: Organizador de figuritas del mundial para tracking de colección
- **Target**: Usuarios que abren muchos paquetes Panini

## 2. Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- localStorage (persistencia)

## 3. Data Structure

### Figuritas FWC (20)
- FWC00 a FWC19

### Figuritas por País (20 cada uno = 640)
- Estructura: [Grupo]-[Página]-[Código]-[País]
- 32 países × 20 figuritas = 640 figuritas

### Figuritas CC (14)
- CC1 a CC14

**Total: 674 figuritas**

### Distribución por Grupo

| Grupo | Países |
|-------|--------|
| A | MEX, RSA, KOR, CZE |
| B | CAN, BIH, QAT, SUI |
| C | BRA, MAR, HAI, SCO |
| D | USA, PAR, AUS, TUR |
| E | GER, CUW, CIV, ECU |
| F | NED, JPN, SWE, TUN |
| G | BEL, EGY, IRN, NZL |
| H | ESP, CPV, KSA, URU |
| I | FRA, SEN, IRQ, NOR |
| J | ARG, ALG, AUT, JOR |
| K | POR, COD, UZB, COL |
| L | ENG, CRO, GHA, PAN |

## 4. UI/UX Specification

### Layout
- Bottom navigation bar (4 tabs)
- Header con título
- Contenido scrollable

### Color Palette (Dark Premium)
- **Background**: #0a0a0a (principal), #141414 (cards)
- **Surface**: #1f1f1f (elevated), #2a2a2a (hover)
- **Accent**: #d4af37 (dorado)
- **Success**: #22c55e (verde)
- **Text Primary**: #ffffff
- **Text Secondary**: #a1a1aa

### Tipografía
- Font: Inter / System
- Headings: Bold
- Body: Regular
- Small: Gray

## 5. Screens

### 5.1 Dashboard
- Progreso total (barra % + número)
- Cards por grupo (A-L) mostrando:
  - Nombre del grupo
  - Barra de progreso %
  - Cantidad que faltan
- Nav bar inferior

### 5.2 Album (Grid por País)
- Selector de grupo (tabs A-L)
- Grid de países en el grupo (4 por fila)
- Al click país → abre grid de 20 figuritas
- Grid 5x4 de figuritas donde:
  - 0: Falta (gris oscuro)
  - x1: ✅ Obtenida (verde)
  - xN (N>1): Repetidas (dorado) + badge con cantidad
- Click ciclo: 0→1→2→3→...→0
- Toque largo (>500ms): marcar todas las de ese país

### 5.3 Agregar
- Input de texto libre
- Parsing:
  - `MEX-5` → Mexico fig 5
  - `MEX` → filtro país
  - `MEX-1:20` → rango
  - `CC5` → figurita CC
  - `FWC05` → figurita FWC
- Lista de figuritas reconocidas
- Botón "Agregar"

### 5.4 Repetidas
- Lista de figuritas con cantidad > 1
- Grupo, país, número
- Cantidad repetida
- Opción de eliminar repetidas

## 6. Components

- `StatCard` - Card de estadísticas por grupo
- `ProgressBar` - Barra de progreso
- `CountryGrid` - Grid de selección de países
- `FiguCell` - Celda individual de figurita
- `FiguGrid` - Grid 5x4 de figuritas
- `TabBar` - Navegación inferior

## 7. Data Hook

```ts
interface Collection {
  fwc: Record<string, number>  // FWC00: 2 means 2 copies
  cc: Record<string, number>  // CC1: 3 means 3 copies
  paises: Record<string, Record<string, number>> // MEX: { A8: 1, A10: 2 }
}
```

- `useCollection()` hook con:
  - `getFigu(tipo, pais?, numero?)`
  - `addFigu(tipo, pais?, numero?, cantidad?)`
  - `removeFigu(tipo, pais?, numero?)`
  - `toggleFigu(tipo, pais?, numero?)`
  - `collection` (state)
  - `stats` (computed)

## 8. Storage

- Key: `figus-album-mundial`
- localStorage con JSON stringify
- Auto-save en cada cambio

## 9. Acceptance Criteria

- [ ] Dashboard muestra progreso total y por grupo
- [ ] Album permite navegar por grupo → país → figurita
- [ ] Click marca/definit figurita como obtenida (x1)
- [ ] Click repetido aumenta cantidad (x2, x3, ...)
- [ ] Long press marca todas las del país
- [ ] Vista repetidas lista todas las figuritas con +1 copia
- [ ] Datos persisten en localStorage
- [ ] UI dark premium con dorado