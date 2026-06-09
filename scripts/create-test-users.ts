import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing environment variables in .env.local')
    process.exit(1)
}

interface TestUser {
    email: string
    password: string
    role: 'admin' | 'agent' | 'customer'
    fullName: string
}

const testUsers: TestUser[] = [
    {
        email: 'admin@taponce.in',
        password: 'Admin@123',
        role: 'admin',
        fullName: 'Admin User',
    },
    {
        email: 'agent@taponce.in',
        password: 'Agent@123',
        role: 'agent',
        fullName: 'Prince (Agent)',
    },
    {
        email: 'customer@taponce.in',
        password: 'Customer@123',
        role: 'customer',
        fullName: 'Rahul Verma',
    },
]

async function createUser(user: TestUser) {
    console.log(`\n📧 Creating ${user.role}: ${user.email}...`)

    // Create user via Supabase Auth API
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            email_confirm: true,
            user_metadata: {
                full_name: user.fullName,
                role: user.role,
            },
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        if (data.msg?.includes('already been registered') || data.message?.includes('already been registered')) {
            console.log(`   ⚠️  User already exists`)
            return null
        }
        console.error(`   ❌ Error: ${JSON.stringify(data)}`)
        return null
    }

    console.log(`   ✅ Created! ID: ${data.id}`)
    return data
}

async function updateProfileRole(userId: string, role: string) {
    // Update the role in profiles table
    const response = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Prefer': 'return=representation',
        },
        body: JSON.stringify({ role }),
    })

    if (response.ok) {
        console.log(`   ✅ Role updated to: ${role}`)
    }
}

async function createAgentRecord(userId: string, fullName: string) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/agents`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Prefer': 'return=representation',
        },
        body: JSON.stringify({
            profile_id: userId,
            referral_code: 'PRINCE10',
            city: 'Indore',
            base_commission: 100,
        }),
    })

    if (response.ok) {
        console.log(`   ✅ Agent record created with code: PRINCE10`)
    } else {
        const data = await response.json()
        console.log(`   ⚠️  Agent record: ${data.message || 'May already exist'}`)
    }
}

async function createCustomerRecord(userId: string, fullName: string) {
    const slug = fullName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const response = await fetch(`${SUPABASE_URL}/rest/v1/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Prefer': 'return=representation',
        },
        body: JSON.stringify({
            profile_id: userId,
            slug: slug,
            company: 'Tech Solutions Pvt Ltd',
            job_title: 'Founder & CEO',
            bio: 'Building the future of digital networking',
            whatsapp: '+919876543210',
            linkedin_url: 'https://linkedin.com/in/rahul-verma',
        }),
    })

    if (response.ok) {
        console.log(`   ✅ Customer record created with slug: ${slug}`)
    } else {
        const data = await response.json()
        console.log(`   ⚠️  Customer record: ${data.message || 'May already exist'}`)
    }
}

async function main() {
    console.log('\n🚀 TapOnce - Creating Test Users\n')
    console.log('='.repeat(50))

    for (const user of testUsers) {
        const created = await createUser(user)

        if (created?.id) {
            // Update profile role
            await updateProfileRole(created.id, user.role)

            // Create role-specific records
            if (user.role === 'agent') {
                await createAgentRecord(created.id, user.fullName)
            } else if (user.role === 'customer') {
                await createCustomerRecord(created.id, user.fullName)
            }
        }
    }

    console.log('\n' + '='.repeat(50))
    console.log('\n✅ Test users ready!\n')
    console.log('📋 Login Credentials:')
    console.log('─'.repeat(40))
    console.log('Admin:    admin@taponce.in    / Admin@123')
    console.log('Agent:    agent@taponce.in    / Agent@123')
    console.log('Customer: customer@taponce.in / Customer@123')
    console.log('─'.repeat(40))
    console.log('\n🌐 Test URLs:')
    console.log('   Admin:    http://localhost:3000/admin')
    console.log('   Agent:    http://localhost:3000/agent')
    console.log('   Customer: http://localhost:3000/dashboard')
    console.log('   Tap View: http://localhost:3000/rahul-verma')
    console.log('')
}

main().catch(console.error)
