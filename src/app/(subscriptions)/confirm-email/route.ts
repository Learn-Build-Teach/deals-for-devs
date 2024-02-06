import { NextRequest, NextResponse } from 'next/server'
import { getXataClient } from '@/xata'
import { redirect } from 'next/navigation'

const client = getXataClient()

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const token = searchParams.get('token')

	if (!token) {
		return NextResponse.json({ message: 'No token provided' }, { status: 400 })
	}

	const subscriber = await client.db.subscribers.getFirst({
		filter: { token: token },
	})

	if (!subscriber) {
		return NextResponse.json(
			{ message: 'No subscriber found' },
			{ status: 404 }
		)
	}

	const data = await client.db.subscribers.update(subscriber.id, {
		verified: true,
		status: 'subscribed',
	})

	if (data) {
		return redirect(`/subscriber-preferences/${data.token}`)
	}
}
