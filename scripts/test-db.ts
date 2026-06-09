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
        const { data: cardDesigns, error } = await supabase
            .from('card_designs')
            .select('*')
            .limit(5)
        
        if (error) {
            console.error('Error fetching card designs:', error)
        } else {
            console.log('Successfully fetched card designs:', cardDesigns)
        }

        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .limit(5)

        if (profileError) {
            console.error('Error fetching profiles:', profileError)
        } else {
            console.log('Successfully fetched profiles:', profiles)
        }
    } catch (e) {
        console.error('Unexpected error:', e)
    }
}

test()
