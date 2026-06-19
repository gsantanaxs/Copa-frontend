import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm'

// ⚠️ ATENÇÃO: este arquivo NÃO está em uso pelas páginas atuais
// (index.html, avaliar.html, buscar.html, perfil.html, login.html).
// Todas elas falam com o backend através de ./js/api.js, que por sua vez
// usa o Supabase no servidor (Copa-backend-2/supabase/client.js).
//
// Este client (e os módulos que o importam: auth.js, database.js,
// realtime.js, supabaseOperations.js) só fazem sentido se você decidir
// fazer parte da aplicação falar DIRETO com o Supabase pelo navegador,
// sem passar pelo backend Express.
//
// Se for usar: preencha com a URL e a ANON KEY reais do seu projeto,
// disponíveis em Supabase > Project Settings > API.
// Se NÃO for usar: pode remover este arquivo e os 4 módulos acima sem
// quebrar nada do app atual.
const SUPABASE_URL = 'https://anhrptieadlqfujzsotw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuaHJwdGllYWRscWZ1anpzb3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMzI2NzAsImV4cCI6MjA5NjgwODY3MH0.5vFNy-MHuVlsdx40oREC2whnB2tXSI-el-y7hlskvMI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Verificar usuário atual
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

// Verificar se está logado
export const isAuthenticated = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
}

// Sair do sistema
export const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return true
}

// Inicializar auth listener
export const initSupabaseAuth = (onAuthChange) => {
    return supabase.auth.onAuthStateChange((event, session) => {
        if (onAuthChange) {
            onAuthChange(event, session)
        }
    })
}
