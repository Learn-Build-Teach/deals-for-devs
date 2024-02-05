'use client'
import React from 'react'
import { subscribe } from '@/actions/subscribe'

export default function SubscribeForm() {
	return (
		<form
			id='subscribe-form'
			className='mt-4 flex justify-center'
			action={async (formData) => {
				await subscribe(formData)
			}}
		>
			<div className='relative w-[476px]'>
				<input
					name='email'
					type='email'
					placeholder='E-mail address'
					className='border-2 border-white/[67%]  rounded-xl p-2 w-full h-[70px] bg-transparent placeholder:text-white/[47%] text-white pl-4'
				/>
				<button
					type='submit'
					className='absolute right-6 top-6 hover:translate-x-1'
				>
					<svg
						width='21'
						height='20'
						viewBox='0 0 21 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M4.00004 10L1.26904 1.125C7.80191 3.025 13.9624 6.02646 19.485 10C13.9627 13.9735 7.80257 16.9749 1.27004 18.875L4.00004 10ZM4.00004 10H11.5'
							stroke='#14B8A6'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
			</div>
		</form>
	)
}
