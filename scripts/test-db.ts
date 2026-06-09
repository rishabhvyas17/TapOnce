import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('URL:', supabaseUrl)
console.log('Key length:', supabaseServiceKey ? supabaseServiceKey.length : 0)

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing env variables!')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function test() {
    try {
        const { data: latestOrders, error: ordersError } = await supabase
            .from('orders')
            .select('*')
            .order('order_number', { ascending: false })
            .limit(1)
        
        if (ordersError) {
            console.error('Error fetching orders:', ordersError)
        } else {
            console.log('Successfully fetched latest order:', latestOrders)
        }
    } catch (e) {
        console.error('Unexpected error:', e)
    }
}

test()
