# Component Library Demo – Frontend

Frontend de una **librería de componentes reutilizable** con sistema de **tracking y analíticas en tiempo real**, construida como prueba técnica.

---

## 🚀 Stack Tecnológico

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Jest + Testing Library**
- **JWT Auth (integración con backend)**
- **Fetch API**
- **Responsive Design (mobile-first)**

---

## 📦 Componentes Incluidos

### Button
- Variantes: `primary`, `secondary`, `danger`
- Estados: `default`, `loading`, `disabled`
- Soporte para iconos
- Tracking automático de clicks

### Input
- Tipos: `text`, `email`, `password`
- Estados: `default`, `error`, `success`, `disabled`
- Label y placeholder
- Tracking de interacciones

### Modal
- Header, body y footer configurables
- Tamaños: `small`, `medium`, `large`
- Cierre por overlay y botón (X)
- Tracking de open / close

### Card
- Header, body y footer opcionales
- Soporte para imágenes
- Variantes visuales

---

## 📊 Analytics Dashboard

- Contador de interacciones en tiempo real
- Tabla de eventos con paginación (15 por página)
- Exportación de datos:
  - **CSV (requiere login)**
  - **JSON**
- Layout responsive:
  - Desktop: componentes + dashboard en horizontal
  - Mobile: layout vertical

---

## 🔐 Autenticación

- Login / Register integrados
- JWT almacenado en `localStorage`
- Rutas protegidas
- Logout incluido

---

## 🧪 Testing

- Mínimo 3 tests por componente:
  - Renderizado
  - Interacciones
  - Props
- Tests de integración para tracking
- Coverage ≥ 80%

Ejecutar tests:

```bash
npm test
```

---

## 🛠 Instalación

1. Clonar repositorio

```bash
git clone <repo-url>
cd component_library_t1_Marcos_Sanchez
```

2. Instalar dependencias

```bash
npm install
```

3. Variables de entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

4. Ejecutar proyecto

```bash
npm run dev
```

Frontend disponible en:

```
http://localhost:3000
```

---

## 🔗 Backend

Este frontend consume la API desarrollada en un repositorio separado:

- Auth (login / register)
- Tracking de componentes
- Estadísticas
- Exportación CSV protegida con JWT

---

## 👤 Usuario de prueba

```txt
Email: test@test.com
Password: 123456
```

---

## ✅ Estado del Proyecto

✔ Componentes completos  
✔ Tracking integrado  
✔ Dashboard funcional  
✔ Exportación de datos  
✔ Autenticación  
✔ Tests passing  

---

Prueba técnica completada 🚀
