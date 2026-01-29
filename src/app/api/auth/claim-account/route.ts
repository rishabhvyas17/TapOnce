/**
 * @file Claim Account API Route
 * @description Allows customers to set their password and claim their account after placing an order
 * 
 * @owner Dev 1
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// POST: Claim account with token
export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json()

        if (!token) {
            return NextResponse.json(
                { error: 'Claim token is required' },
                { status: 400 }
            )
        }

        if (!password || password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            )
        }

        const supabase = createAdminClient()

        // Find order with this claim token that hasn't been claimed yet
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select(`
                id,
                order_number,
                customer_name,
                customer_email,
                customer_phone,
                customer_company,
                claim_token,
                claim_token_used,
                customer_id
            `)
            .eq('claim_token', token)
            .single()

        if (orderError || !order) {
            return NextResponse.json(
                { error: 'Invalid or expired claim link. Please contact support.' },
                { status: 404 }
            )
        }

        // Check if already claimed
        if (order.claim_token_used || order.customer_id) {
            return NextResponse.json(
                { error: 'This account has already been claimed. Please login instead.' },
                { status: 400 }
            )
        }

        // Check if a user with this email already exists
        const { data: existingUsers } = await supabase.auth.admin.listUsers()
        const existingUser = existingUsers?.users?.find(
            u => u.email?.toLowerCase() === order.customer_email.toLowerCase()
        )

        let userId: string

        if (existingUser) {
            // User exists, update their password
            const { error: updateError } = await supabase.auth.admin.updateUserById(
                existingUser.id,
                { password }
            )

            if (updateError) {
                console.error('Error updating user password:', updateError)
                return NextResponse.json(
                    { error: 'Failed to update password. Please try again.' },
                    { status: 500 }
                )
            }

            userId = existingUser.id
        } else {
            // Create new auth user
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email: order.customer_email,
                password: password,
                email_confirm: true,
                user_metadata: {
                    full_name: order.customer_name,
                    role: 'customer'
                }
            })

            if (authError) {
                console.error('Error creating auth user:', authError)
                return NextResponse.json(
                    { error: `Failed to create account: ${authError.message}` },
                    { status: 500 }
                )
            }

            userId = authData.user.id
        }

        // Create or update profile
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', userId)
            .single()

        if (!existingProfile) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: userId,
                    role: 'customer',
                    full_name: order.customer_name,
                    phone: order.customer_phone
                })

            if (profileError) {
                console.error('Error creating profile:', profileError)
            }
        }

        // Generate unique slug for customer
        const slug = generateSlug(order.customer_name)

        // Create or update customer record
        const { data: existingCustomer } = await supabase
            .from('customers')
            .select('id, slug')
            .eq('profile_id', userId)
            .single()

        let customerId: string
        let customerSlug: string

        if (existingCustomer) {
            customerId = existingCustomer.id
            customerSlug = existingCustomer.slug
        } else {
            const { data: newCustomer, error: customerError } = await supabase
                .from('customers')
                .insert({
                    profile_id: userId,
                    slug: slug,
                    company: order.customer_company,
                    status: 'active'
                })
                .select('id, slug')
                .single()

            if (customerError) {
                console.error('Error creating customer:', customerError)
                return NextResponse.json(
                    { error: 'Failed to create customer profile. Please contact support.' },
                    { status: 500 }
                )
            }

            customerId = newCustomer.id
            customerSlug = newCustomer.slug
        }

        // Update order: mark token as used and link customer
        await supabase
            .from('orders')
            .update({
                claim_token_used: true,
                customer_id: customerId,
                portfolio_slug: customerSlug
            })
            .eq('id', order.id)

        console.log(`Account claimed for order #${order.order_number}:`, order.customer_email)

        return NextResponse.json({
            success: true,
            message: 'Account created successfully!',
            email: order.customer_email,
            slug: customerSlug
        })

    } catch (error) {
        console.error('Claim account error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}

// GET: Validate token and return order info (for pre-filling the form)
export async function GET(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get('token')

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 }
            )
        }

        const supabase = createAdminClient()

        const { data: order, error } = await supabase
            .from('orders')
            .select(`
                order_number,
                customer_name,
                customer_email,
                claim_token_used,
                customer_id
            `)
            .eq('claim_token', token)
            .single()

        if (error || !order) {
            return NextResponse.json(
                { error: 'Invalid or expired claim link' },
                { status: 404 }
            )
        }

        if (order.claim_token_used || order.customer_id) {
            return NextResponse.json(
                { error: 'Account already claimed', alreadyClaimed: true },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            orderNumber: order.order_number,
            customerName: order.customer_name,
            customerEmail: order.customer_email
        })

    } catch (error) {
        console.error('Token validation error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}

// Helper: Generate unique slug from name
function generateSlug(name: string): string {
    const baseSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 30)

    const random = Math.random().toString(36).substring(2, 6)
    return `${baseSlug}-${random}`
}
