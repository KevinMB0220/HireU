# Supabase Integration Guide for HireU

Este documento explica cómo se ha integrado Supabase en el proyecto HireU, replicando la estructura del repositorio offer-hub.

## Resumen de Cambios

Se ha creado una estructura completa de base de datos Supabase para gestionar los datos de la plataforma freelance descentralizada HireU, complementando los smart contracts en Avalanche.

## Estructura Creada

### 1. Migraciones de Base de Datos (`supabase/migrations/`)

Se han creado 6 archivos de migración SQL:

1. **`20250111000000_01_create_users.sql`** - Tabla de usuarios
   - Almacena perfiles de usuario
   - Direcciones de wallet
   - Reputación y roles (freelancer/client)
   - Autenticación mediante nonce

2. **`20250111000001_02_create_wallets.sql`** - Tabla de wallets
   - Wallets invisibles (generadas por la plataforma)
   - Wallets externas (conectadas por el usuario)
   - Claves privadas encriptadas para wallets invisibles

3. **`20250111000002_03_create_projects.sql`** - Tabla de proyectos
   - Proyectos publicados por clientes
   - Presupuesto, descripción, categoría
   - Estados: pending, in_progress, completed, cancelled

4. **`20250111000003_04_create_contracts.sql`** - Tabla de contratos
   - Referencia a smart contracts on-chain
   - Estado de escrow (pending, funded, released, disputed)
   - Vincula clientes, freelancers y proyectos

5. **`20250111000004_05_create_reviews.sql`** - Tabla de reseñas
   - Sistema de calificación 1-5 estrellas
   - Una reseña por usuario por contrato
   - Comentarios opcionales

6. **`20250111000005_06_create_nfts_awarded.sql`** - Tabla de NFTs otorgados
   - Rastrea NFTs de logros
   - IDs de tokens on-chain
   - Metadata flexible en formato JSON

### 2. Tipos TypeScript (`src/types/`)

Se han creado archivos de tipos para type-safety:

- **`user.types.ts`** - User, CreateUserDTO, UpdateUserDTO, UserProfile
- **`wallet.types.ts`** - Wallet, WalletType, CreateWalletDTO, GenerateWalletResult
- **`project.types.ts`** - Project, ProjectStatus, CreateProjectDTO, UpdateProjectDTO
- **`contract.types.ts`** - Contract, EscrowStatus, CreateContractDTO, UpdateContractDTO
- **`review.types.ts`** - Review, CreateReviewDTO, ReviewWithUsers
- **`nft.types.ts`** - NFTAwarded, NFTType enum, CreateNFTAwardedDTO

### 3. Configuración

- **`src/lib/supabase.ts`** - Cliente de Supabase configurado
- **`.env.example`** - Plantilla de variables de entorno
- **`supabase/README.md`** - Documentación completa del setup

## Instalación y Setup

### Paso 1: Instalar Dependencias

```bash
npm install
```

Esto instalará `@supabase/supabase-js` que se agregó al package.json.

### Paso 2: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Guarda el Project Reference ID

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

Obtén estas credenciales en el dashboard de Supabase: **Project Settings → API**

### Paso 4: Instalar CLI de Supabase

```bash
npm install -g supabase
```

### Paso 5: Vincular y Desplegar

```bash
# Login
npx supabase login

# Vincular proyecto
npx supabase link --project-ref TU_PROJECT_REF

# Desplegar migraciones
npx supabase db push
```

## Integración con Smart Contracts

La base de datos está diseñada para trabajar junto con los smart contracts de Avalanche:

### Flujo de Trabajo

1. **Usuario se registra** → Crea entrada en tabla `users` con `wallet_address`
2. **Proyecto creado** → Entrada en tabla `projects`
3. **Contrato iniciado** →
   - Smart contract desplegado en Avalanche
   - Referencia almacenada en tabla `contracts` con `contract_on_chain_id`
4. **Fondos depositados** → `escrow_status` cambia a 'funded'
5. **Trabajo completado** → `escrow_status` cambia a 'released'
6. **Review** → Entrada en tabla `reviews`
7. **NFT otorgado** → Entrada en tabla `nfts_awarded`

### Mapeo de Datos

| Smart Contract | Supabase |
|----------------|----------|
| User address | `users.wallet_address` |
| Contract address | `contracts.contract_on_chain_id` |
| Escrow amount | `contracts.amount_locked` |
| NFT token ID | `nfts_awarded.token_id_on_chain` |

## Ejemplo de Uso

### Crear un Usuario

```typescript
import { supabase } from '@/lib/supabase';
import { CreateUserDTO } from '@/types/user.types';

const newUser: CreateUserDTO = {
  wallet_address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  username: 'alice_dev',
  is_freelancer: true,
  name: 'Alice Developer'
};

const { data, error } = await supabase
  .from('users')
  .insert(newUser)
  .select()
  .single();
```

### Obtener Proyectos

```typescript
import { Project } from '@/types/project.types';

const { data: projects, error } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'pending')
  .order('created_at', { ascending: false });
```

### Crear un Contrato

```typescript
import { CreateContractDTO } from '@/types/contract.types';

const newContract: CreateContractDTO = {
  project_id: 'uuid-del-proyecto',
  freelancer_id: 'uuid-del-freelancer',
  client_id: 'uuid-del-cliente',
  contract_on_chain_id: '0xContractAddress...',
  amount_locked: 500.00
};

const { data, error } = await supabase
  .from('contracts')
  .insert(newContract)
  .select()
  .single();
```

## Características de Seguridad

### Encriptación

- Las claves privadas de wallets invisibles se almacenan encriptadas (AES-256-GCM)
- Nunca se exponen claves privadas al cliente

### Row Level Security (RLS)

Deberás configurar políticas de RLS en Supabase para:

- Los usuarios solo puedan ver/editar sus propios datos
- Los contratos solo sean visibles para las partes involucradas
- Las reviews solo puedan ser creadas por participantes del contrato

Ejemplo de política RLS:

```sql
-- Solo el dueño puede actualizar su perfil
CREATE POLICY "Users can update own profile"
ON users
FOR UPDATE
USING (auth.uid()::text = id);
```

## Próximos Pasos

### 1. Implementar Servicios

Crea servicios en `src/services/` para encapsular la lógica de base de datos:

```typescript
// src/services/userService.ts
export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    // lógica
  }

  async getUserByWallet(address: string): Promise<User | null> {
    // lógica
  }
}
```

### 2. Integrar con Frontend

Actualiza los componentes existentes para usar Supabase:

- Login con wallet → Verificar/crear usuario en Supabase
- Post project → Guardar en tabla `projects`
- Ver proyectos → Fetch desde Supabase

### 3. Sincronizar con Smart Contracts

Implementa listeners de eventos del smart contract para actualizar Supabase:

```typescript
// Cuando se crea un contrato on-chain
contract.on('ContractCreated', async (contractId, client, freelancer, amount) => {
  await supabase.from('contracts').insert({
    contract_on_chain_id: contractId,
    client_id: client,
    freelancer_id: freelancer,
    amount_locked: amount,
    escrow_status: 'pending'
  });
});
```

### 4. Configurar Row Level Security

En el dashboard de Supabase, configura las políticas de seguridad para cada tabla.

### 5. Testing

Crea tests para los servicios de base de datos y asegura la integridad de los datos.

## Diferencias con offer-hub

Esta implementación replica la estructura core de offer-hub con algunas adaptaciones:

- ✅ **Incluido**: users, wallets, projects, contracts, reviews, nfts_awarded
- ⏭️ **No incluido** (puedes agregarlo si lo necesitas):
  - services (tabla de servicios ofrecidos)
  - service_requests
  - applications (aplicaciones a proyectos)
  - conversations/messages (sistema de mensajería)
  - workflow tables (tablas de workflow de disputas)
  - mediation tables
  - refresh_tokens

## Soporte

Si tienes dudas sobre:
- Setup de Supabase → Revisa `supabase/README.md`
- Tipos TypeScript → Revisa archivos en `src/types/`
- Integración con smart contracts → Revisa la sección "Integración con Smart Contracts"

## Referencias

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase Client Library](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
