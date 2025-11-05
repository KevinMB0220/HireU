# HireU - Guía de Configuración

## ✅ Proyecto Completado

Se ha creado exitosamente un **clon estético del frontend de OfferHub** llamado **HireU**, sin funcionalidades de backend, solo UI demostrativa.

## 📁 Estructura del Proyecto

```
HireU/
├── src/
│   ├── app/
│   │   ├── (client)/
│   │   │   ├── onboarding/
│   │   │   │   ├── sign-up/page.tsx
│   │   │   │   └── sign-in/page.tsx
│   │   │   └── talent/page.tsx
│   │   ├── messages/page.tsx
│   │   ├── post-project/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx (landing)
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── navbar.tsx
│   │   └── ui/ (10+ componentes shadcn/ui)
│   └── lib/
│       ├── mock-data/
│       │   └── talent-data.ts
│       └── utils.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🎨 Páginas Implementadas

1. **Landing Page** (`/`) - Página principal con hero, features y CTA
2. **Sign Up** (`/onboarding/sign-up`) - Registro con email/wallet
3. **Sign In** (`/onboarding/sign-in`) - Inicio de sesión
4. **Find Talent** (`/talent`) - Búsqueda de freelancers con mock data
5. **Post Project** (`/post-project`) - Wizard multi-step para publicar proyectos
6. **Profile** (`/profile`) - Perfil de usuario con información mock
7. **Messages** (`/messages`) - Sistema de mensajería simulado

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias (si aún no se instalaron)
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

El proyecto estará disponible en: **http://localhost:3000**

## 🎯 Características

### ✅ Implementado
- ✨ UI completamente funcional y responsive
- 🎨 Diseño idéntico a OfferHub (colores, estilos, layouts)
- 🔄 Navegación entre páginas funcionando
- 📱 Soporte mobile/tablet/desktop
- 🌙 Configuración de dark mode lista (componentes preparados)
- 🎭 Mock data para demostración
- ⚡ Componentes organizados y reutilizables

### ❌ NO Implementado (según requerimiento)
- 🚫 Sin backend - no hay APIs reales
- 🚫 Sin autenticación - solo simulada con alerts
- 🚫 Sin base de datos - todo es mock data
- 🚫 Sin funcionalidades de envío de formularios
- 🚫 Sin procesamiento de pagos
- 🚫 Sin almacenamiento persistente

## 📦 Tecnologías Utilizadas

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** Radix UI + shadcn/ui
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React

## 🎨 Paleta de Colores

- **Primary:** #15949C (Teal)
- **Secondary:** #002333 (Dark Blue)
- **Accent:** Gradientes entre primary y secondary

## 📝 Notas Importantes

1. **Modo Demo:** Todas las acciones (registro, login, envío de mensajes, etc.) muestran alerts indicando "Demo Mode"
2. **Mock Data:** Los talentos, mensajes y proyectos son datos de ejemplo
3. **Navegación:** Todos los enlaces internos funcionan correctamente
4. **Formularios:** Tienen validación visual pero no envían datos reales
5. **Responsive:** Diseñado mobile-first con breakpoints md y lg

## 🔧 Personalización

Para personalizar el proyecto:

1. **Colores:** Modifica `tailwind.config.ts`
2. **Logo:** Cambia el gradiente en navbar y footer
3. **Mock Data:** Edita `/src/lib/mock-data/talent-data.ts`
4. **Estilos globales:** Modifica `/src/app/globals.css`

## ⚠️ Recordatorio

Este es un **proyecto de demostración UI únicamente**. No contiene lógica de backend, autenticación real, ni persistencia de datos. Es perfecto para:

- Prototipos visuales
- Demostraciones de diseño
- Base para desarrollo futuro
- Presentaciones a clientes

