'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TestResult {
  test: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  data?: any;
}

export default function TestSupabasePage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);

  const updateResult = (test: string, status: TestResult['status'], message: string, data?: any) => {
    setResults(prev => {
      const index = prev.findIndex(r => r.test === test);
      const newResult = { test, status, message, data };
      if (index >= 0) {
        const newResults = [...prev];
        newResults[index] = newResult;
        return newResults;
      }
      return [...prev, newResult];
    });
  };

  const runTests = async () => {
    setTesting(true);
    setResults([]);

    // Test 1: Verificar configuración
    updateResult('config', 'pending', 'Verificando configuración...');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      updateResult('config', 'error', 'Variables de entorno no configuradas. Revisa .env.local');
      setTesting(false);
      return;
    }
    updateResult('config', 'success', `URL: ${supabaseUrl}`);

    // Test 2: Conexión a Supabase
    updateResult('connection', 'pending', 'Probando conexión a Supabase...');
    try {
      const { data, error } = await supabase.from('users').select('count');
      if (error) throw error;
      updateResult('connection', 'success', 'Conexión exitosa a Supabase');
    } catch (error: any) {
      updateResult('connection', 'error', `Error: ${error.message}`);
      setTesting(false);
      return;
    }

    // Test 3: Verificar tabla users
    updateResult('users', 'pending', 'Verificando tabla users...');
    try {
      const { data, error, count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      updateResult('users', 'success', `Tabla users existe. Total registros: ${count || 0}`);
    } catch (error: any) {
      updateResult('users', 'error', `Error: ${error.message}`);
    }

    // Test 4: Verificar tabla projects
    updateResult('projects', 'pending', 'Verificando tabla projects...');
    try {
      const { data, error, count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      updateResult('projects', 'success', `Tabla projects existe. Total registros: ${count || 0}`);
    } catch (error: any) {
      updateResult('projects', 'error', `Error: ${error.message}`);
    }

    // Test 5: Verificar tabla contracts
    updateResult('contracts', 'pending', 'Verificando tabla contracts...');
    try {
      const { data, error, count } = await supabase
        .from('contracts')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      updateResult('contracts', 'success', `Tabla contracts existe. Total registros: ${count || 0}`);
    } catch (error: any) {
      updateResult('contracts', 'error', `Error: ${error.message}`);
    }

    // Test 6: Verificar tabla wallets
    updateResult('wallets', 'pending', 'Verificando tabla wallets...');
    try {
      const { data, error, count } = await supabase
        .from('wallets')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      updateResult('wallets', 'success', `Tabla wallets existe. Total registros: ${count || 0}`);
    } catch (error: any) {
      updateResult('wallets', 'error', `Error: ${error.message}`);
    }

    // Test 7: Verificar tabla reviews
    updateResult('reviews', 'pending', 'Verificando tabla reviews...');
    try {
      const { data, error, count } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      updateResult('reviews', 'success', `Tabla reviews existe. Total registros: ${count || 0}`);
    } catch (error: any) {
      updateResult('reviews', 'error', `Error: ${error.message}`);
    }

    // Test 8: Verificar tabla nfts_awarded
    updateResult('nfts', 'pending', 'Verificando tabla nfts_awarded...');
    try {
      const { data, error, count } = await supabase
        .from('nfts_awarded')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      updateResult('nfts', 'success', `Tabla nfts_awarded existe. Total registros: ${count || 0}`);
    } catch (error: any) {
      updateResult('nfts', 'error', `Error: ${error.message}`);
    }

    // Test 9: Crear usuario de prueba
    updateResult('insert', 'pending', 'Intentando insertar usuario de prueba...');
    try {
      const testUser = {
        wallet_address: `0x${Math.random().toString(16).substring(2, 42)}`,
        username: `test_user_${Date.now()}`,
        is_freelancer: true,
        name: 'Test User'
      };

      const { data, error } = await supabase
        .from('users')
        .insert(testUser)
        .select()
        .single();

      if (error) throw error;
      updateResult('insert', 'success', 'Usuario de prueba creado exitosamente', data);

      // Test 10: Eliminar usuario de prueba
      updateResult('delete', 'pending', 'Eliminando usuario de prueba...');
      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', data.id);

      if (deleteError) throw deleteError;
      updateResult('delete', 'success', 'Usuario de prueba eliminado exitosamente');
    } catch (error: any) {
      updateResult('insert', 'error', `Error: ${error.message}`);
    }

    setTesting(false);
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'pending': return '⏳';
      default: return '⚪';
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Test de Integración Supabase</h1>
      <p className="text-gray-600 mb-6">
        Esta página verifica que la conexión a Supabase y todas las tablas funcionen correctamente.
      </p>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Instrucciones</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Asegúrate de haber creado un proyecto en Supabase</li>
          <li>Configura las variables de entorno en <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code></li>
          <li>Ejecuta las migraciones: <code className="bg-gray-100 px-2 py-1 rounded">npx supabase db push</code></li>
          <li>Haz clic en "Ejecutar Tests" para verificar la conexión</li>
        </ol>
      </Card>

      <Button
        onClick={runTests}
        disabled={testing}
        className="mb-6 w-full"
        size="lg"
      >
        {testing ? 'Ejecutando Tests...' : 'Ejecutar Tests'}
      </Button>

      {results.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Resultados</h2>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="border-l-4 pl-4 py-2"
                style={{
                  borderColor: result.status === 'success' ? '#16a34a' :
                              result.status === 'error' ? '#dc2626' : '#ca8a04'
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">{getStatusIcon(result.status)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold capitalize">{result.test}</h3>
                    <p className={`text-sm ${getStatusColor(result.status)}`}>
                      {result.message}
                    </p>
                    {result.data && (
                      <details className="mt-2">
                        <summary className="text-xs text-gray-500 cursor-pointer">
                          Ver datos
                        </summary>
                        <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {results.filter(r => r.status === 'success').length}
                </div>
                <div className="text-sm text-gray-600">Exitosos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {results.filter(r => r.status === 'error').length}
                </div>
                <div className="text-sm text-gray-600">Errores</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {results.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pendientes</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 mt-6 bg-blue-50">
        <h3 className="font-semibold mb-2">¿Qué hace cada test?</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li><strong>Config:</strong> Verifica que las variables de entorno estén configuradas</li>
          <li><strong>Connection:</strong> Prueba la conexión a Supabase</li>
          <li><strong>Users/Projects/Contracts/etc:</strong> Verifica que cada tabla exista</li>
          <li><strong>Insert:</strong> Crea un usuario de prueba para verificar permisos de escritura</li>
          <li><strong>Delete:</strong> Elimina el usuario de prueba para limpiar</li>
        </ul>
      </Card>
    </div>
  );
}
