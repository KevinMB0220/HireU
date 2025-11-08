# Cómo Testear la Integración de Supabase

Esta guía te ayudará a verificar que la integración de Supabase funcione correctamente.

## Opción 1: Página de Test Visual (Recomendado)

He creado una página de test interactiva que verifica toda la configuración.

### Pasos:

1. **Instala las dependencias** (si no lo has hecho):
   ```bash
   npm install
   ```

2. **Configura las variables de entorno**:
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Copia el contenido de `.env.example`
   - Reemplaza con tus credenciales de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```

3. **Despliega las migraciones a Supabase**:
   ```bash
   # Instala CLI de Supabase globalmente
   npm install -g supabase

   # Login
   npx supabase login

   # Vincula tu proyecto (obtén el ref desde Supabase dashboard)
   npx supabase link --project-ref TU_PROJECT_REF

   # Despliega las migraciones
   npx supabase db push
   ```

4. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abre la página de test**:
   - Ve a: http://localhost:3000/test-supabase
   - Haz clic en "Ejecutar Tests"

### ¿Qué verifica la página de test?

La página ejecuta 10 tests automáticos:

✅ **Config** - Verifica variables de entorno
✅ **Connection** - Prueba conexión a Supabase
✅ **Users** - Verifica tabla users
✅ **Projects** - Verifica tabla projects
✅ **Contracts** - Verifica tabla contracts
✅ **Wallets** - Verifica tabla wallets
✅ **Reviews** - Verifica tabla reviews
✅ **NFTs** - Verifica tabla nfts_awarded
✅ **Insert** - Prueba insertar un usuario
✅ **Delete** - Prueba eliminar el usuario de prueba

Si todos los tests pasan (✅), tu integración está funcionando perfectamente!

## Opción 2: Test Manual desde la Consola del Navegador

1. Inicia el servidor: `npm run dev`
2. Abre cualquier página en http://localhost:3000
3. Abre la consola del navegador (F12)
4. Ejecuta este código:

```javascript
// Importar (si estás en una página que ya use supabase)
const { supabase } = await import('/src/lib/supabase');

// Test 1: Verificar conexión
const { data, error } = await supabase.from('users').select('count');
console.log('Conexión:', error ? 'ERROR' : 'OK', { data, error });

// Test 2: Listar tablas
const tables = ['users', 'projects', 'contracts', 'wallets', 'reviews', 'nfts_awarded'];
for (const table of tables) {
  const { error, count } = await supabase.from(table).select('*', { count: 'exact', head: true });
  console.log(`Tabla ${table}:`, error ? '❌ ERROR' : `✅ OK (${count} registros)`);
}
```

## Opción 3: Test desde Supabase Dashboard

1. Ve a tu proyecto en https://supabase.com
2. Navega a **Table Editor**
3. Deberías ver 6 tablas:
   - users
   - wallets
   - projects
   - contracts
   - reviews
   - nfts_awarded

4. Haz clic en cada tabla y verifica:
   - Estructura de columnas
   - Índices
   - Relaciones (Foreign Keys)

## Opción 4: Test con Supabase CLI

```bash
# Ver todas las migraciones aplicadas
npx supabase db remote list

# Ver el schema actual
npx supabase db pull

# Hacer un query directo
npx supabase db execute "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
```

## Errores Comunes y Soluciones

### ❌ Error: "Invalid API key"
**Solución**: Verifica que `NEXT_PUBLIC_SUPABASE_ANON_KEY` esté correcta en `.env.local`

### ❌ Error: "relation 'users' does not exist"
**Solución**: Las migraciones no se han ejecutado. Corre:
```bash
npx supabase db push
```

### ❌ Error: "Failed to fetch"
**Solución**: Verifica que `NEXT_PUBLIC_SUPABASE_URL` sea correcta y esté accesible

### ❌ Error: "permission denied for table users"
**Solución**: Necesitas configurar Row Level Security policies en Supabase. Por ahora puedes deshabilitar RLS para testing:
```sql
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE contracts DISABLE ROW LEVEL SECURITY;
ALTER TABLE wallets DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE nfts_awarded DISABLE ROW LEVEL SECURITY;
```

### ⚠️ Variables de entorno no se cargan
**Solución**:
- Asegúrate de reiniciar el servidor después de editar `.env.local`
- Verifica que el archivo se llame exactamente `.env.local` (no `.env` o `.env.example`)
- Las variables deben empezar con `NEXT_PUBLIC_` para estar disponibles en el cliente

## Siguiente Paso: Insertar Datos de Prueba

Una vez que todos los tests pasen, puedes insertar datos de prueba:

```typescript
import { supabase } from '@/lib/supabase';

// Crear un usuario
const { data: user } = await supabase.from('users').insert({
  wallet_address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  username: 'alice_dev',
  is_freelancer: true,
  name: 'Alice Developer'
}).select().single();

// Crear un proyecto
const { data: project } = await supabase.from('projects').insert({
  client_id: user.id,
  title: 'Build a Web3 dApp',
  description: 'Need a developer to build a decentralized application',
  category: 'Web Development',
  budget: 5000,
  status: 'pending'
}).select().single();

console.log('Usuario creado:', user);
console.log('Proyecto creado:', project);
```

## Verificar en Supabase Dashboard

Después de insertar datos:

1. Ve a tu proyecto en Supabase
2. Navega a **Table Editor → users**
3. Deberías ver el usuario que insertaste
4. Navega a **Table Editor → projects**
5. Deberías ver el proyecto

## ¿Todo funciona?

Si todos los tests pasan y puedes insertar/leer datos:

✅ **¡Felicidades!** Tu integración de Supabase está funcionando correctamente.

Ahora puedes:
- Integrar Supabase con tus componentes de React
- Crear servicios para encapsular la lógica de base de datos
- Sincronizar con tus smart contracts de Avalanche
- Configurar Row Level Security para producción

## Soporte

Si encuentras problemas:
1. Revisa la consola del navegador para errores
2. Revisa los logs de Supabase en el dashboard
3. Verifica que todas las variables de entorno estén configuradas
4. Asegúrate de haber ejecutado las migraciones
