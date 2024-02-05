'use server'
import { getXataClient } from '@/xata'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const subscribeSchema = z.object({
	email: z.string().email(),
	token: z.string(),
})

// generate uuid
const token = uuidv4()

export const subscribe = async (formData: FormData) => {
	let parsed

	// parse the email and token
	parsed = subscribeSchema.parse({ email: formData.get('email'), token: token })

	const newSubscriber = {
		email: parsed.email,
    token: parsed.token,
    courseNotifications: true,
    ebookNotifications: true,
    miscNotifications: true,
    officeEquipmentNotifications: true,
    toolNotifications: true,
    conferenceNotifications: true,
	}

	// send the new subscriber to the server
	const xataClient = getXataClient()
	const createRecord = await xataClient.db.subscribers.create(newSubscriber)
	console.log(createRecord)

	// send email confirmation email using resend

	// route subscriber to preference page
}
