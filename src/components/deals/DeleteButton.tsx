'use client'
import { deleteSubscriber } from '@/actions/delete'

export default function DeleteButton({ id }: { id: string }) {
	return (
		<button
			className='text-red-600'
			type='button'
			onClick={() => deleteSubscriber(id)}
		>
			X
		</button>
	)
}
